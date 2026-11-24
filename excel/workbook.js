"use strict";

(() => {
  const detailColumns = [["Date", 14], ["Type", 20], ["Title", 72], ["Related Model", 38]];
  const linkColumns = {
    drive: ["Google drive", 34],
    linkedin: ["LinkedIn", 34],
    facebook: ["Facebook", 34],
    youtube: ["YouTube", 34],
    canva: ["Canva Link", 33],
    website: ["GONSIN.com", 42],
    x: ["X", 34],
    pinterest: ["Pinterest", 34],
    instagram: ["Instagram", 34],
    tiktok: ["TikTok", 34],
  };
  const downloadLinkKeys = ["drive", "linkedin", "facebook", "youtube", "canva", "website"];
  const regionalDownloadLinkKeys = ["drive", "facebook", "youtube", "x", "pinterest", "instagram", "tiktok"];
  const linkKeys = downloadLinkKeys.filter(key => key !== "website");
  const headers = [...detailColumns, ...linkKeys.map(key => linkColumns[key])].map(([name]) => name);
  const requiredHeaders = headers.slice(0, -1);
  const linkHosts = {
    drive: ["drive.google.com", "docs.google.com"],
    linkedin: ["www.linkedin.com", "linkedin.com", "lnkd.in"],
    facebook: ["www.facebook.com", "facebook.com", "m.facebook.com", "fb.watch"],
    youtube: ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"],
    canva: ["canva.link", "www.canva.com", "canva.com"],
    website: ["www.gonsin.com", "gonsin.com"],
    x: ["x.com", "www.x.com"],
    pinterest: ["pin.it", "pinterest.com", "www.pinterest.com"],
    instagram: ["instagram.com", "www.instagram.com"],
    tiktok: ["tiktok.com", "www.tiktok.com"],
  };
  const types = {
    video: ["videos", "Video"],
    "case sharing": ["projects", "Project case"],
    "case study": ["projects", "Project case"],
    "case studies": ["projects", "Project case"],
    "project case": ["projects", "Project case"],
    exhibition: ["events", "Exhibition"],
    product: ["solutions", "Product"],
    newsletter: ["newsletters", "Newsletter"],
    solution: ["solutions", "Solution"],
    "gonsin-ai": ["solutions", "GONSIN-AI"],
    "festival poster": ["updates", "Seasonal"],
    seasonal: ["updates", "Seasonal"],
    "about gonsin": ["updates", "Brand update"],
    "brand update": ["updates", "Brand update"],
  };
  const mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const filename = "GONSIN-Social-Media-Library.xlsx";
  const assignment = "window.gonsinCatalog = ";
  const clean = value => String(value ?? "").trim().replace(/\s+/g, " ");
  const headerKey = value => clean(value).toLowerCase();
  const titleKey = value => clean(value).normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  const newsEntryKey = (date, title) => date + "|" + titleKey(title);
  const hasInternalAddress = value => /\\\\[^\\/\s]+[\\/]|(?:file|smb):[\\/]{2}|\b[A-Z]:\\|\/\/(?:\d{1,3}(?:\.\d{1,3}){3}|localhost)(?=[/:?#\s]|$)/i.test(value);

  function formatDate(value, XLSX, date1904) {
    if (typeof value === "number") {
      const date = XLSX.SSF.parse_date_code(value, { date1904 });
      return date ? isoDate(date.y, date.m, date.d) : "";
    }
    const match = clean(value).match(/^(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})日?(?:[ T]\d{1,2}:\d{2}(?::\d{2})?Z?)?$/);
    return match ? isoDate(...match.slice(1).map(Number)) : "";
  }

  function isoDate(y, m, d) {
    if (y < 1900 || y > 9999) return "";
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d
      ? date.toISOString().slice(0, 10) : "";
  }

  function publicUrl(value, kind) {
    const url = String(value ?? "").trim();
    if (!/^https:\/\//i.test(url) || /[\s\\]/.test(url) || hasInternalAddress(url)) return "";
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.port
          || !linkHosts[kind].includes(parsed.hostname)) return "";
      if (hasInternalAddress(decodeURIComponent(parsed.pathname))
          || [...parsed.searchParams.values()].some(hasInternalAddress)
          || hasInternalAddress(decodeURIComponent(parsed.hash))) return "";
      if (parsed.pathname === "/" && !parsed.searchParams.has("id")) return "";
      return parsed.href;
    } catch {
      return "";
    }
  }

  function urlFromCell(cell) {
    const formulaUrl = cell?.f?.match(/^HYPERLINK\("((?:""|[^"])*)"(?:,.*)?\)$/i)?.[1]?.replace(/""/g, '"');
    return cell?.l?.Target || formulaUrl || cell?.v || "";
  }

  function splitLinks(value) {
    return String(value).trim().split(/(?:[,，;]\s*|\s+)(?=https?:\/\/)/i);
  }

  function linkIdentity(value) {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      if (/^utm_/i.test(key) || ["rcm", "si", "feature", "fbclid", "usp"].includes(key)) url.searchParams.delete(key);
    }
    url.hash = "";
    url.searchParams.sort();
    return url.href;
  }

  function readHeader(sheet, XLSX, required) {
    if (!sheet?.["!ref"]) return null;
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    for (let r = range.s.r; r <= Math.min(range.e.r, range.s.r + 14); r++) {
      const columns = new Map();
      for (let c = range.s.c; c <= Math.min(range.e.c, 127); c++) {
        const value = sheet[XLSX.utils.encode_cell({ r, c })]?.v;
        if (value) columns.set(headerKey(value), c);
      }
      if (required.every(key => columns.has(headerKey(key)))) return { row: r, columns };
    }
    return null;
  }

  function removeConflictingLinks(records, identityOf) {
    const uses = new Map();
    for (const record of records) {
      for (const key of ["linkedin", "facebook", "youtube"]) {
        const link = record.links[key];
        if (!link) continue;
        const id = key + "|" + (identityOf?.(key, link) || linkIdentity(link));
        if (!uses.has(id)) uses.set(id, []);
        uses.get(id).push({ key, record });
      }
    }
    let removed = 0;
    for (const placements of uses.values()) {
      if (new Set(placements.map(({ record }) => titleKey(record.title))).size <= 1) continue;
      for (const { record, key } of placements) {
        delete record.links[key];
        removed++;
      }
    }
    return removed;
  }

  function hasPublicOnlyStructure(book, sheet, header, XLSX) {
    if (book.SheetNames.length !== 1 || book.vbaraw || book.Workbook?.Sheets?.some(info => info.Hidden)) return false;
    if (book.keys?.some(key => /(?:externalLinks|connections|embeddings|activeX|customXml|vbaProject|comments|drawings|pivotCache|queryTables|printerSettings|customUI)/i.test(key))) return false;
    if (sheet["!rows"]?.some(row => row?.hidden) || sheet["!cols"]?.some(col => col?.hidden)) return false;
    const fields = new Set(headers.map(name => header.columns.get(headerKey(name))));
    if (fields.has(undefined)) return false;
    const linkColumns = new Set(headers.slice(4).map(name => header.columns.get(headerKey(name))));
    for (const [address, cell] of Object.entries(sheet)) {
      if (address.startsWith("!")) continue;
      const { r, c } = XLSX.utils.decode_cell(address);
      if (cell.c || (cell.f && !linkColumns.has(c)) || (cell.l && !linkColumns.has(c))) return false;
      if (cell.v != null && String(cell.v).trim() && (r < header.row || !fields.has(c))) return false;
      if (cell.f && !/^HYPERLINK\("(?:""|[^"])*"(?:,\s*"(?:""|[^"])*")?\)$/i.test(cell.f)) return false;
    }
    return true;
  }

  function readBook(buffer, XLSX) {
    const data = new Uint8Array(buffer);
    if (data[0] !== 0x50 || data[1] !== 0x4b) throw new Error("Choose an Excel .xlsx file.");
    return XLSX.read(data, { type: "array", cellFormula: true, cellStyles: true, cellHTML: false, cellText: false, bookVBA: true, bookFiles: true });
  }

  function readFile(buffer, XLSX) {
    return readRecords(readBook(buffer, XLSX), XLSX);
  }

  function readRecords(book, XLSX, { sourceSheet, acceptLink, identityOf } = {}) {
    const preferred = book.SheetNames.find(name => headerKey(name) === "social media");
    const candidates = sourceSheet ? [sourceSheet] : preferred ? [preferred] : book.SheetNames;
    const sheetName = candidates.find(name => readHeader(book.Sheets[name], XLSX, requiredHeaders));
    if (!sheetName) throw new Error("Required columns are missing. Use the Social Media sheet from the Marketing Log or the customer Excel file.");

    const sheet = book.Sheets[sheetName];
    const header = readHeader(sheet, XLSX, requiredHeaders);
    const columns = headers.map(name => header.columns.get(headerKey(name)));
    const lastRow = XLSX.utils.decode_range(sheet["!ref"]).e.r;
    const date1904 = book.Workbook?.WBProps?.date1904 === true;
    const records = [];
    const errors = [];
    let excludedLinks = 0;
    let excludedRows = 0;
    for (let r = header.row + 1; r <= lastRow; r++) {
      const cells = columns.map(c => c === undefined ? undefined : sheet[XLSX.utils.encode_cell({ r, c })]);
      if (!cells.some(cell => cell?.l || cell?.f || (cell?.v != null && String(cell.v).trim()))) continue;
      const [dateCell, typeCell, titleCell, modelCell] = cells;
      const date = formatDate(dateCell?.v, XLSX, date1904);
      const sourceType = clean(typeCell?.v);
      const title = clean(titleCell?.v);
      const model = clean(modelCell?.v);
      if (!date || !sourceType || !title) {
        errors.push("Row " + (r + 1) + " requires a valid Date, Type, and Title.");
        continue;
      }
      if ([sourceType, title, model].some(hasInternalAddress)) {
        errors.push("Row " + (r + 1) + " contains an internal address in a public text field.");
        continue;
      }
      const links = {};
      for (const [i, key] of linkKeys.entries()) {
        const raw = urlFromCell(cells[i + 4]);
        const alternatives = splitLinks(raw);
        const url = alternatives.map(value => publicUrl(value, key))
          .find(value => value && (!acceptLink || acceptLink(key, value)));
        if (url && alternatives.length > 1) excludedLinks += alternatives.length - 1;
        if (url) links[key] = url;
        else if (raw) excludedLinks++;
      }
      if (Object.keys(links).length) records.push({ date, sourceType, title, model, links });
      else excludedRows++;
    }
    if (errors.length) {
      const more = errors.length > 4 ? " Check " + (errors.length - 4) + " more rows." : "";
      throw new Error(errors.slice(0, 4).join(" ") + more);
    }
    const conflicts = removeConflictingLinks(records, identityOf);
    const validRecords = records.filter(record => Object.keys(record.links).length);
    excludedRows += records.length - validRecords.length;
    if (!validRecords.length) throw new Error("This workbook has no publishable records.");
    validRecords.sort((a, b) => b.date.localeCompare(a.date));
    return {
      records: validRecords,
      excludedLinks: excludedLinks + conflicts,
      conflicts,
      excludedRows,
      reuseOriginal: !excludedLinks && !conflicts && !excludedRows
        && hasPublicOnlyStructure(book, sheet, header, XLSX),
    };
  }

  function readMarketingNews(buffer, XLSX, includeAssetOnly) {
    const book = XLSX.read(new Uint8Array(buffer), { type: "array", cellHTML: false, cellText: false });
    const name = book.SheetNames.find(value => headerKey(value).replace(/\s*&\s*/, "&") === "news&emails");
    if (!name) return null;
    const sheet = book.Sheets[name];
    const header = readHeader(sheet, XLSX, ["Date", "Title", "Website"]);
    if (!header) return null;
    const date1904 = book.Workbook?.WBProps?.date1904 === true;
    const lastRow = XLSX.utils.decode_range(sheet["!ref"]).e.r;
    const rows = [];
    for (let r = header.row + 1; r <= lastRow; r++) {
      const read = key => {
        const c = header.columns.get(key);
        return c === undefined ? undefined : sheet[XLSX.utils.encode_cell({ r, c })];
      };
      rows.push({
        website: urlFromCell(read("website")),
        date: formatDate(read("date")?.v, XLSX, date1904),
        title: read("title")?.v,
        drive: urlFromCell(read("google drive")),
        canva: urlFromCell(read("canva link")),
      });
    }
    return normalizeNews(rows, includeAssetOnly);
  }

  function normalizeNews(rows, includeAssetOnly = () => false) {
    const articles = new Map();
    for (const row of rows) {
      const website = publicUrl(row?.website, "website");
      const date = typeof row?.date === "string" ? formatDate(row.date) : "";
      const title = clean(row?.title);
      if (!date || !title || hasInternalAddress(title)) continue;
      if (!website && !includeAssetOnly(date, title)) continue;
      const key = website ? linkIdentity(website) : newsEntryKey(date, title);
      if (articles.has(key)) continue;
      const article = { date, title, website };
      for (const platform of ["drive", "canva"]) {
        const url = splitLinks(row[platform]).map(value => publicUrl(value, platform)).find(Boolean);
        if (url) article[platform] = url;
      }
      if (!website && !article.drive && !article.canva) continue;
      articles.set(key, article);
    }
    return [...articles.values()];
  }

  function itemId(date, title, occurrences, kind = "media") {
    const stem = title.normalize("NFKD").replace(/[^\x00-\x7f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let short = stem.slice(0, 58).replace(/-+$/, "");
    if (stem.length > 58 && short.includes("-")) short = short.slice(0, short.lastIndexOf("-"));
    const base = kind + "-" + date + "-" + (short || "post");
    const count = (occurrences.get(base) || 0) + 1;
    occurrences.set(base, count);
    return count === 1 ? base : base + "-" + count;
  }

  function refreshNews(items, news, supplements, occurrences) {
    const oldPostIdByWebsite = new Map();
    for (const [id, visual] of Object.entries(supplements.items)) {
      if (visual.website) oldPostIdByWebsite.set(linkIdentity(visual.website), id);
    }
    const usedIds = new Set(items.map(item => item.id));
    const oldArticleIdByKey = new Map();
    for (const item of supplements.articles || []) {
      if (usedIds.has(item.id)) continue;
      const key = item.links.website ? linkIdentity(item.links.website) : newsEntryKey(item.date, item.title);
      oldArticleIdByKey.set(key, item.id);
      usedIds.add(item.id);
    }
    const brandById = new Map(items.map(item => [item.id, item]));
    const brandByTitle = new Map();
    for (const item of items) {
      const key = titleKey(item.title);
      if (!brandByTitle.has(key)) brandByTitle.set(key, []);
      brandByTitle.get(key).push(item);
      delete item.links.website;
    }
    for (const article of news) {
      const website = article.website;
      const websiteKey = website ? linkIdentity(website) : "";
      if (website) {
        const candidates = brandByTitle.get(titleKey(article.title)) || [];
        const date = Date.parse(article.date);
        const closest = candidates.reduce((best, item) => (
          !best || Math.abs(Date.parse(item.date) - date) < Math.abs(Date.parse(best.date) - date) ? item : best
        ), null);
        const post = brandById.get(oldPostIdByWebsite.get(websiteKey)) || closest;
        if (post && !post.links.website) post.links.website = website;
      }

      const previousKey = oldArticleIdByKey.has(websiteKey) ? websiteKey : newsEntryKey(article.date, article.title);
      let id = oldArticleIdByKey.get(previousKey);
      oldArticleIdByKey.delete(previousKey);
      if (!id) {
        do {
          id = itemId(article.date, article.title, occurrences, "article");
        } while (usedIds.has(id));
        usedIds.add(id);
      }
      const links = {};
      if (website) links.website = website;
      if (article.drive) links.drive = article.drive;
      if (article.canva) links.canva = article.canva;
      items.push({
        id, date: article.date, title: article.title, category: "articles", type: "Article",
        links,
      });
    }
  }

  function makeCatalog(records, supplements, news = null) {
    const occurrences = new Map();
    const items = records.map(record => {
      const id = itemId(record.date, record.title, occurrences);
      const [category, type] = types[headerKey(record.sourceType)] || ["updates", record.sourceType];
      const { website, ...visual } = supplements.items[id] || {};
      const links = { ...record.links };
      if (website) links.website = website;
      const item = { id, date: record.date, category, type, title: record.title, links, ...visual };
      if (record.model) item.model = record.model;
      return item;
    });
    const ids = new Set(items.map(item => item.id));
    if (news) refreshNews(items, news, supplements, occurrences);
    else items.push(...(supplements.articles || []));
    items.sort((a, b) => b.date.localeCompare(a.date));
    return { featured: supplements.featured.filter(feature => feature.category || ids.has(feature.id)), items };
  }

  function encodeCatalog(catalog) {
    return assignment + JSON.stringify(catalog, null, 2).replace(/</g, "\\u003c") + ";\n";
  }

  function downloadRecords(records, catalog) {
    const websites = new Map(catalog.items.map(item => [item.id, item.links.website]));
    const occurrences = new Map();
    const posts = records.map(record => {
      const id = itemId(record.date, record.title, occurrences);
      const website = websites.get(id);
      return website ? { ...record, links: { ...record.links, website } } : record;
    });
    const articles = catalog.items.filter(item => item.category === "articles").map(item => ({
      date: item.date, sourceType: "Official article", title: item.title, model: item.model || "", links: item.links,
    }));
    return [...posts, ...articles].sort((a, b) => b.date.localeCompare(a.date));
  }

  function spreadsheetRows(records, selectedLinks = linkKeys) {
    const names = [...detailColumns, ...selectedLinks.map(key => linkColumns[key])].map(([name]) => name);
    return [names, ...records.map(record => [
      Math.round((Date.parse(record.date + "T00:00:00Z") - Date.UTC(1899, 11, 30)) / 86400000),
      record.sourceType,
      record.title,
      record.model,
      ...selectedLinks.map(key => record.links[key] || ""),
    ])];
  }

  function makeWorkbook(records, XLSX, selectedLinks = linkKeys, sheetName = "Social Media") {
    const rows = spreadsheetRows(records, selectedLinks);
    const [names] = rows;
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    sheet["!cols"] = [...detailColumns, ...selectedLinks.map(key => linkColumns[key])].map(([, wch]) => ({ wch }));
    sheet["!autofilter"] = { ref: sheet["!ref"] };
    rows.slice(1).forEach((row, i) => {
      sheet["A" + (i + 2)].z = "yyyy-mm-dd";
      for (let c = detailColumns.length; c < names.length; c++) {
        if (!row[c]) continue;
        const cell = sheet[XLSX.utils.encode_cell({ r: i + 1, c })];
        cell.l = { Target: row[c], Tooltip: names[c] };
      }
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    return XLSX.write(workbook, { type: "array", bookType: "xlsx", compression: true });
  }

  globalThis.GonsinWeekly = {
    readFile, readBook, readRecords, readHeader, formatDate, urlFromCell, splitLinks, publicUrl, titleKey,
    hasInternalAddress, itemId, regionalDownloadLinkKeys, spanishDownloadLinkKeys: regionalDownloadLinkKeys,
    readMarketingNews, normalizeNews, newsEntryKey, makeCatalog, encodeCatalog, downloadRecords, downloadLinkKeys,
    makeWorkbook, spreadsheetRows, headers, filename, mime,
  };
})();
