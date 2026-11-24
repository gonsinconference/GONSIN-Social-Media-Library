"use strict";

const view = window.gonsinView;
const { t, catalog } = view;
const isMainLibrary = view.section === "english";
const isLocalFile = window.location.protocol === "file:";
const appRelease = new URL(document.currentScript?.src || document.baseURI).searchParams.get("v");
const assetPath = name => window.gonsinAssets?.[name] || "assets/" + name + (appRelease ? "?v=" + appRelease : "");
const itemsById = new Map(catalog.items.map(item => [item.id, item]));
const categories = new Set(["all", ...catalog.items.map(item => item.category)]);
const platforms = Object.fromEntries(Object.entries(view.platformNames).filter(([key]) =>
  isMainLibrary ? !["x", "pinterest", "instagram", "tiktok"].includes(key) : catalog.items.some(item => item.links[key])));
const newDateFormat = () => new Intl.DateTimeFormat(view.locale, {
  year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
});
let dateFormat = newDateFormat();
const dateLabel = iso => dateFormat.format(new Date(iso + "T00:00:00Z"));
const pageSize = 12;

const form = document.querySelector("#filters");
const search = document.querySelector("#search");
const year = document.querySelector("#year");
const platform = document.querySelector("#platform");
const sort = document.querySelector("#sort");
const categoryButtons = [...form.querySelectorAll("[data-category]")];
const grid = document.querySelector("#resources-grid");
const resultCount = document.querySelector("#result-count");
const clear = document.querySelector("#reset-filters");
const empty = document.querySelector("#empty-state");
const loadRow = document.querySelector("#load-row");
const loadMore = document.querySelector("#load-more");
const resourceTemplate = document.querySelector("#resource-template");
const resourceDialog = document.querySelector("#resource-dialog");
const shareDialog = document.querySelector("#share-dialog");
const shareInput = document.querySelector("#share-url");
const detailShare = document.querySelector("#detail-share");
const detailFeedback = document.querySelector("#detail-feedback");
const toast = document.querySelector("#toast");
const detailImage = document.querySelector("#detail-image");

let selectedCategory = "all";
let shown = 0;
let results = [];
let returnFocus = null;
let toastTimer;

function normalize(value) {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

const searchText = new Map(catalog.items.map(item => [
  item.id, normalize([item.title, item.model, item.type, item.description].filter(Boolean).join(" ")),
]));
const years = [...new Set(catalog.items.map(item => item.date.slice(0, 4)))].sort().reverse();

function shareUrl(id) {
  if (isLocalFile && id) {
    const item = itemsById.get(id);
    if (item.category === "videos" && item.links.youtube) return item.links.youtube;
    return ["website", "linkedin", "facebook", "youtube", "x", "instagram", "pinterest", "tiktok", "drive", "canva"]
      .map(key => item.links[key]).find(Boolean);
  }
  return view.url({ hash: id || "" });
}

function mediaImage(item) {
  if (item.image) return assetPath(item.image.src);
  if (item.youtubeThumbnail) return "https://i.ytimg.com/vi/" + item.youtubeThumbnail + "/hqdefault.jpg";
}

function platformLinks(item) {
  const fragment = document.createDocumentFragment();
  for (const [key, label] of Object.entries(platforms)) {
    if (!item.links[key]) continue;
    const anchor = document.createElement("a");
    anchor.className = "platform-link";
    anchor.href = item.links[key];
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = label;
    anchor.setAttribute("aria-label", t("openOn", label));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    anchor.append(arrow);
    fragment.append(anchor);
  }
  return fragment;
}

function renderArchive() {
  const resources = catalog.items.filter(item => item.category !== "articles");
  document.querySelector("#post-count").textContent = resources.length;
  document.querySelector("#article-count").textContent = catalog.items.length - resources.length;

  const dates = resources.map(item => item.date).sort();
  if (!dates.length) return;
  const archive = document.querySelector("#archive-dates");
  const month = new Intl.DateTimeFormat(view.locale, { month: "short", year: "numeric", timeZone: "UTC" });
  const formatMonth = iso => month.format(new Date(iso + "T00:00:00Z"));
  const start = formatMonth(dates[0]);
  const end = formatMonth(dates.at(-1));
  archive.textContent = start === end ? start : start + " – " + end;
  archive.hidden = false;
}

function renderHighlights() {
  const template = document.querySelector("#highlight-template");
  const grid = document.querySelector("#highlights-grid");
  grid.replaceChildren();
  for (const feature of catalog.featured ?? []) {
    const item = itemsById.get(feature.id);
    const cover = feature.image || item?.image;
    const source = cover ? assetPath(cover.src) : item && mediaImage(item);
    if (!item && !feature.category) continue;
    const tile = template.content.firstElementChild.cloneNode(true);
    if (feature.category) {
      tile.href = view.url({ hash: "library", params: { category: feature.category } });
      tile.dataset.highlightCategory = feature.category;
    } else {
      tile.href = "#" + item.id;
      tile.dataset.resource = item.id;
    }
    if (source) {
      const image = tile.querySelector("img");
      image.src = source;
      image.alt = cover?.alt || "";
      image.addEventListener("error", () => { image.parentElement.hidden = true; }, { once: true });
      if (feature.category && feature.image) tile.classList.add("highlight-cover");
      if (cover?.focus === "upper") tile.classList.add("highlight-focus-upper");
    } else {
      tile.querySelector(".highlight-media").hidden = true;
    }
    const titleKey = { "GONSIN at ISE 2027": "ise", Newsletter: "newsletter", "Case Studies": "caseStudies" }[feature.title];
    tile.querySelector("h3").textContent = titleKey ? t(titleKey) : feature.title;
    const label = tile.querySelector(".highlight-type");
    const labelKey = { "Exhibition preview": "exhibitionPreview", "Conference solution": "conferenceSolution",
      "Project archive": "projectArchive" }[feature.label];
    label.textContent = labelKey ? t(labelKey) : feature.label || "";
    label.hidden = !label.textContent;
    if (feature.category && item) {
      const caption = tile.querySelector(".highlight-caption");
      const [topic, subtitle] = item.title.split(/\s+\|\s+/, 2);
      caption.textContent = topic === "GONSIN" && subtitle ? subtitle : topic;
      caption.lang = view.contentLanguage;
      caption.hidden = false;
    }
    grid.append(tile);
  }
  document.querySelector("#highlights").hidden = !grid.childElementCount;
  document.querySelector('[data-nav="highlights"]').hidden = !grid.childElementCount;
}

function renderCard(item) {
  const card = resourceTemplate.content.firstElementChild.cloneNode(true);
  const title = card.querySelector(".resource-title");
  title.textContent = item.title;
  title.lang = view.contentLanguage;
  title.href = "#" + item.id;
  title.dataset.resource = item.id;
  const time = card.querySelector("time");
  time.dateTime = item.date;
  time.textContent = dateLabel(item.date);
  card.querySelector(".resource-type").textContent = view.type(item.type);

  if (item.model) {
    const model = card.querySelector(".resource-model");
    model.textContent = item.model;
    model.hidden = false;
  }

  card.querySelector(".platform-links").append(platformLinks(item));
  const copy = card.querySelector("[data-copy]");
  copy.dataset.copy = item.id;
  copy.title = t(isLocalFile ? "copyOriginal" : "copyResource");
  copy.setAttribute("aria-label", t(isLocalFile ? "copyOriginalFor" : "copyFor", item.title));
  return card;
}

function appendPage(focusNext = false) {
  const next = results.slice(shown, shown + pageSize);
  const cards = next.map(renderCard);
  grid.append(...cards);
  shown += next.length;
  resultCount.textContent = t("resultCount", shown, results.length);
  loadRow.hidden = shown >= results.length;
  if (focusNext && cards.length) {
    cards[0].querySelector(".resource-title").focus();
  }
}

function renderResults() {
  const terms = normalize(search.value).split(" ").filter(Boolean);
  results = catalog.items.filter(item => {
    const inCategory = selectedCategory === "all" || item.category === selectedCategory;
    return inCategory
      && (!year.value || item.date.startsWith(year.value))
      && (!platform.value || item.links[platform.value])
      && terms.every(term => searchText.get(item.id).includes(term));
  });
  if (sort.value === "oldest") results.reverse();
  grid.replaceChildren();
  shown = 0;
  clear.hidden = !search.value.trim() && !year.value && !platform.value && sort.value === "newest" && selectedCategory === "all";
  empty.hidden = results.length > 0;
  appendPage();
}

function selectCategory(value) {
  selectedCategory = categories.has(value) ? value : "all";
  for (const button of categoryButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.category === selectedCategory));
  }
}

function initializeFilters() {
  for (const value of years) year.add(new Option(value, value));
  for (const [key, label] of Object.entries(platforms)) platform.add(new Option(label, key));
  for (const button of categoryButtons) button.hidden = !categories.has(button.dataset.category);
  const params = new URLSearchParams(window.location.search);
  search.value = (params.get("q") || "").slice(0, 250);
  year.value = years.includes(params.get("year")) ? params.get("year") : "";
  platform.value = Object.hasOwn(platforms, params.get("platform")) ? params.get("platform") : "";
  sort.value = params.get("sort") === "oldest" ? "oldest" : "newest";
  selectCategory(params.get("category"));
}

function saveFilters() {
  if (isLocalFile) return;
  const url = new URL(window.location.href);
  const values = {
    q: search.value.trim(),
    year: year.value,
    platform: platform.value,
    sort: sort.value === "oldest" ? "oldest" : "",
    category: selectedCategory === "all" ? "" : selectedCategory,
  };
  for (const [key, value] of Object.entries(values)) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  history.replaceState(history.state, "", url);
}

function updateFilters() {
  saveFilters();
  renderResults();
}

function showResource(item, trigger = null) {
  returnFocus = trigger;
  const source = mediaImage(item);
  detailImage.hidden = !source;
  if (source) {
    detailImage.src = source;
    detailImage.alt = item.image?.alt || "";
  } else {
    detailImage.removeAttribute("src");
    detailImage.alt = "";
  }

  document.querySelector("#detail-meta").textContent = view.type(item.type) + " · " + dateLabel(item.date);
  document.querySelector("#detail-title").textContent = item.title;
  document.querySelector("#detail-title").lang = view.contentLanguage;
  const model = document.querySelector("#detail-model");
  model.textContent = item.model || "";
  model.hidden = !item.model;
  const description = document.querySelector("#detail-description");
  description.textContent = item.description || "";
  description.hidden = !item.description;

  document.querySelector("#detail-links").replaceChildren(platformLinks(item));
  detailShare.dataset.copy = item.id;
  detailFeedback.textContent = "";
  if (!resourceDialog.open) resourceDialog.showModal();
}

function followHash() {
  const item = itemsById.get(window.location.hash.slice(1));
  if (item) {
    if (!resourceDialog.open || detailShare.dataset.copy !== item.id) showResource(item);
  } else if (resourceDialog.open) {
    resourceDialog.close();
  }
}

function openResource(link) {
  const id = link.dataset.resource;
  const hash = "#" + id;
  if (window.location.hash !== hash) {
    history.pushState({ resource: id, previousHash: window.location.hash }, "", hash);
  }
  showResource(itemsById.get(id), link);
}

function closeResource() {
  const focusTarget = returnFocus;
  if (itemsById.has(window.location.hash.slice(1))) {
    const previousHash = history.state?.previousHash || "#library";
    history.replaceState(null, "", previousHash);
  }
  if (focusTarget?.isConnected) {
    focusTarget.focus({ preventScroll: true });
  } else if (!focusTarget && !itemsById.has(window.location.hash.slice(1))) {
    document.querySelector("#library-title").focus();
  }
  returnFocus = null;
}

function notifyCopy(id) {
  if (resourceDialog.open) {
    detailFeedback.textContent = t("copied");
    return;
  }
  toast.textContent = t(isLocalFile ? "originalCopied" : id ? "resourceCopied" : "libraryCopied");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toast.textContent = ""; }, 3000);
}

async function copyLink(id) {
  const url = shareUrl(id);
  try {
    await navigator.clipboard.writeText(url);
    notifyCopy(id);
  } catch {
    shareInput.value = url;
    shareDialog.showModal();
    shareInput.focus();
    shareInput.select();
  }
}

form.addEventListener("submit", event => event.preventDefault());
search.addEventListener("input", updateFilters);
form.addEventListener("change", event => {
  if (event.target.matches("select")) updateFilters();
});
form.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectCategory(button.dataset.category);
  updateFilters();
});
clear.addEventListener("click", () => {
  form.reset();
  selectCategory("all");
  updateFilters();
  search.focus();
});
loadMore.addEventListener("click", () => appendPage(true));

document.addEventListener("click", event => {
  const resourceLink = event.target.closest("[data-resource]");
  const highlightLink = event.target.closest("[data-highlight-category]");
  const unmodified = !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
  if (highlightLink && unmodified) {
    event.preventDefault();
    form.reset();
    selectCategory(highlightLink.dataset.highlightCategory);
    updateFilters();
    if (window.location.hash !== "#library") history.pushState(null, "", "#library");
    document.querySelector("#library-title").focus({ preventScroll: true });
    document.querySelector("#library").scrollIntoView({ block: "start" });
    return;
  }
  if (resourceLink && unmodified) {
    event.preventDefault();
    openResource(resourceLink);
    return;
  }
  const copy = event.target.closest("[data-copy]");
  if (copy) copyLink(copy.dataset.copy);
  const close = event.target.closest("[data-close]");
  if (close) close.closest("dialog").close();
});
for (const dialog of [resourceDialog, shareDialog]) {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}
resourceDialog.addEventListener("close", closeResource);
detailImage.addEventListener("error", () => { detailImage.hidden = true; });
window.addEventListener("hashchange", followHash);

if ("IntersectionObserver" in window) {
  const contactShortcut = document.querySelector(".contact-shortcut");
  const contactVisibility = new IntersectionObserver(([entry]) => {
    contactShortcut.hidden = entry.isIntersecting;
  });
  contactVisibility.observe(document.querySelector(".footer-details"));
}

if (isLocalFile) {
  document.querySelector(".header-share").hidden = true;
  document.querySelector("#detail-copy-label").textContent = t("copyOriginal");
}

document.addEventListener("gonsinlocalechange", () => {
  dateFormat = newDateFormat();
  if (isLocalFile) document.querySelector("#detail-copy-label").textContent = t("copyOriginal");
  if (isMainLibrary) renderArchive();
  renderHighlights();
  renderResults();
});

initializeFilters();
if (isMainLibrary) renderArchive();
renderHighlights();
renderResults();
followHash();
