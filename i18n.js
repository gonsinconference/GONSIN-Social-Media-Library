"use strict";

(() => {
  const strings = {
    homeTitle: ["GONSIN Social Media Library", "Biblioteca de redes sociales de GONSIN"],
    spanishTitle: ["Social media in Spanish | GONSIN", "Redes sociales en español | GONSIN"],
    skip: ["Skip to the library", "Saltar a la biblioteca"],
    brand: ["Media Library", "Biblioteca de medios"],
    home: ["Library", "Biblioteca"],
    nav: ["Main navigation", "Navegación principal"],
    highlightsNav: ["Highlights", "Destacados"],
    libraryNav: ["Browse library", "Explorar biblioteca"],
    spanishNav: ["Spanish social media", "Redes en español"],
    share: ["Share library", "Compartir"],
    language: ["Language: English", "Idioma: Español"],
    contact: ["Contact us", "Contáctanos"],
    eyebrow: ["Conference & Pro AV", "Conferencias y AV profesional"],
    titleFirst: ["Social Media", "Biblioteca de"],
    titleSecond: ["Library", "redes sociales"],
    intro: ["Product demos, conference projects and event highlights from GONSIN’s official channels.",
      "Demostraciones de productos, proyectos de conferencias y eventos de los canales oficiales de GONSIN."],
    browse: ["Browse the library", "Explorar la biblioteca"],
    showroom: ["GONSIN virtual showroom", "Visita virtual de GONSIN"],
    boardroomAlt: ["A GONSIN boardroom with paperless conference terminals and wall-mounted displays",
      "Una sala de reuniones de GONSIN con terminales para conferencias sin papel y pantallas en la pared"],
    spanishFirst: ["Social media", "Redes sociales"],
    spanishSecond: ["in Spanish", "en español"],
    spanishIntro: ["Explore product videos, case studies and conference solutions published in Spanish.",
      "Explora videos de productos, casos de éxito y soluciones para conferencias publicados en español."],
    posts: ["social posts", "publicaciones"],
    official: ["official articles", "artículos oficiales"],
    featured: ["Featured highlights", "Destacados"],
    allResourcesLink: ["View all resources", "Ver todos los recursos"],
    exhibitionPreview: ["Exhibition preview", "Próxima feria"],
    conferenceSolution: ["Conference solution", "Solución para conferencias"],
    projectArchive: ["Project archive", "Archivo de proyectos"],
    caseStudies: ["Case Studies", "Casos de éxito"],
    ise: ["GONSIN at ISE 2027", "GONSIN en ISE 2027"],
    newsletter: ["Newsletter", "Boletín"],
    find: ["Find a post by topic, product model or platform.",
      "Encuentra publicaciones por tema, modelo de producto o plataforma."],
    search: ["Search titles and product models", "Buscar por título o modelo"],
    searchLabel: ["Search and filter the library", "Buscar y filtrar la biblioteca"],
    year: ["Year", "Año"],
    allYears: ["All years", "Todos los años"],
    platform: ["Platform", "Plataforma"],
    allPlatforms: ["All platforms", "Todas las plataformas"],
    sort: ["Sort order", "Orden"],
    newest: ["Newest first", "Más recientes"],
    oldest: ["Oldest first", "Más antiguas"],
    category: ["Resource category", "Categoría de material"],
    all: ["All resources", "Todos los recursos"],
    videos: ["Videos", "Videos"],
    projects: ["Project cases", "Casos de éxito"],
    solutions: ["Products & solutions", "Productos y soluciones"],
    newsletters: ["Newsletters", "Boletines"],
    events: ["Exhibitions", "Ferias y eventos"],
    articles: ["Official articles", "Artículos oficiales"],
    updates: ["Brand updates", "Novedades de GONSIN"],
    pictures: ["Images", "Imágenes"],
    clear: ["Clear filters", "Borrar filtros"],
    noResults: ["No matching resources", "No se encontraron recursos"],
    tryAgain: ["Try a different keyword or clear your filters.", "Prueba otra palabra clave o borra los filtros."],
    more: ["Load more", "Ver más"],
    website: ["Website", "Sitio web"],
    email: ["Email", "Correo electrónico"],
    contactInfo: ["GONSIN contact information", "Información de contacto de GONSIN"],
    socialInfo: ["GONSIN social media", "Redes sociales de GONSIN"],
    backToTop: ["Back to the top", "Volver al inicio de la página"],
    closeResource: ["Close resource", "Cerrar recurso"],
    sources: ["Original sources", "Fuentes originales"],
    copy: ["Copy link", "Copiar enlace"],
    copyOriginal: ["Copy original link", "Copiar enlace original"],
    closeShare: ["Close share dialog", "Cerrar ventana para compartir"],
    copyPrompt: ["Select and copy this URL.", "Selecciona y copia esta URL."],
    copyResource: ["Copy resource link", "Copiar enlace del recurso"],
    copyFor: [title => "Copy link for " + title, title => "Copiar enlace de " + title],
    copyOriginalFor: [title => "Copy original link for " + title, title => "Copiar enlace original de " + title],
    copied: ["Link copied.", "Enlace copiado."],
    originalCopied: ["Original link copied.", "Enlace original copiado."],
    resourceCopied: ["Resource link copied.", "Enlace del recurso copiado."],
    libraryCopied: ["Library link copied.", "Enlace de la biblioteca copiado."],
    openOn: [name => "Open on " + name + " (opens in a new tab)", name => "Abrir en " + name + " (nueva pestaña)"],
    resultCount: [
      (shown, total) => (shown < total ? "Showing " + shown + " of " : "") + total + (total === 1 ? " resource" : " resources"),
      (shown, total) => (shown < total ? "Mostrando " + shown + " de " : "") + total + (total === 1 ? " recurso" : " recursos"),
    ],
    download: ["Download Excel", "Descargar Excel"],
    closeDownload: ["Close Excel download", "Cerrar descarga de Excel"],
    startDate: ["Start date", "Fecha inicial"],
    endDate: ["End date", "Fecha final"],
    pickStart: ["Choose start date", "Elegir fecha inicial"],
    pickEnd: ["Choose end date", "Elegir fecha final"],
    rangeHint: ["Leave either date blank for an open range.", "Deja una fecha en blanco para usar un rango abierto."],
    available: [dates => "Available: " + dates + ".", dates => "Fechas disponibles: " + dates + "."],
    type: ["Type", "Tipo"],
    typeHint: ["Select one or more types. Leave them unchecked to include every type.",
      "Selecciona uno o más tipos. Deja todas las casillas sin marcar para incluir todos."],
    linkTypes: ["Link types", "Tipos de enlace"],
    linkHint: ["Selected link types control the link columns and include records with any matching link. Leave all unchecked to include every link type.",
      "Elige las columnas de enlaces. Se incluirán las publicaciones que tengan al menos uno de esos enlaces. Deja todas las casillas sin marcar para incluirlos todos."],
    downloadSelection: ["Download selection", "Descargar selección"],
    downloadAll: ["Download all", "Descargar todo"],
    closeCalendar: ["Close calendar", "Cerrar calendario"],
    chooseDate: ["Choose date", "Elegir fecha"],
    previousMonth: ["Previous month", "Mes anterior"],
    nextMonth: ["Next month", "Mes siguiente"],
    month: ["Month", "Mes"],
    dates: ["Dates", "Fechas"],
    sun: ["Sun", "Dom"], mon: ["Mon", "Lun"], tue: ["Tue", "Mar"], wed: ["Wed", "Mié"],
    thu: ["Thu", "Jue"], fri: ["Fri", "Vie"], sat: ["Sat", "Sáb"],
    reversed: ["End date must be on or after the start date.", "La fecha final debe ser igual o posterior a la inicial."],
    invalidDate: ["Enter a valid date as YYYY-MM-DD.", "Introduce una fecha válida en formato AAAA-MM-DD."],
    noDownload: ["No records match. Change the dates, types or links.",
      "No hay coincidencias. Cambia las fechas, los tipos o los enlaces."],
    ready: [n => n + (n === 1 ? " record ready to download." : " records ready to download."),
      n => n + (n === 1 ? " registro listo para descargar." : " registros listos para descargar.")],
    loading: ["Loading Excel options…", "Cargando las opciones de Excel…"],
    filtersError: ["Filters could not load. Reopen this window to retry, or use Download all.",
      "No se pudieron cargar los filtros. Abre de nuevo la ventana o usa Descargar todo."],
    exportError: ["Could not create the Excel file. Please try again.",
      "No se pudo crear el archivo de Excel. Inténtalo de nuevo."],
  };
  const resourceTypes = {
    video: "Video", "case sharing": "Caso de éxito", "case study": "Caso de éxito", "case studies": "Casos de éxito",
    "project case": "Caso de éxito", exhibition: "Feria", product: "Producto", newsletter: "Boletín",
    solution: "Solución", "gonsin-ai": "GONSIN-AI", "festival poster": "Publicación de temporada",
    seasonal: "Publicación de temporada", "about gonsin": "Sobre GONSIN", "brand update": "Novedad de GONSIN",
    article: "Artículo", "official article": "Artículo oficial", image: "Imagen", picture: "Imagen",
  };

  const locationUrl = new URL(window.location.href);
  const spanish = locationUrl.searchParams.get("section") === "spanish";
  let language = locationUrl.searchParams.get("lang") === "es" ? "es" : "en";
  const menu = document.querySelector("#language-menu");
  const summary = menu.querySelector("summary");
  const dialog = document.querySelector("#language-dialog");
  const languageButtons = [...menu.querySelectorAll("[data-language]")];
  const translated = Array.from(document.querySelectorAll("[data-i18n], [data-i18n-label], [data-i18n-placeholder], [data-i18n-alt]"));

  function t(key, ...args) {
    const value = strings[key][language === "es" ? 1 : 0];
    return typeof value === "function" ? value(...args) : value;
  }

  function url({ feed = spanish, hash = "", params = {} } = {}) {
    const target = new URL(window.location.href);
    target.search = "";
    target.hash = hash;
    if (feed) target.searchParams.set("section", "spanish");
    if (language === "es") target.searchParams.set("lang", "es");
    for (const [key, value] of Object.entries(params)) target.searchParams.set(key, value);
    return target.href;
  }

  window.gonsinView = {
    spanish, t, url,
    platformNames: {
      linkedin: "LinkedIn", facebook: "Facebook", youtube: "YouTube", drive: "Google Drive",
      canva: "Canva", website: "GONSIN.com", x: "X", pinterest: "Pinterest", instagram: "Instagram", tiktok: "TikTok",
    },
    get locale() { return language === "es" ? "es" : "en-US"; },
    type: value => language === "es" ? resourceTypes[value.toLowerCase()] || value : value,
  };

  function translate() {
    document.documentElement.lang = window.gonsinView.locale;
    document.title = t(spanish ? "spanishTitle" : "homeTitle");
    for (const element of translated) {
      const { i18n, i18nLabel, i18nPlaceholder, i18nAlt } = element.dataset;
      if (i18n) element.textContent = t(i18n);
      if (i18nLabel) element.setAttribute("aria-label", t(i18nLabel));
      if (i18nPlaceholder) element.placeholder = t(i18nPlaceholder);
      if (i18nAlt) element.alt = t(i18nAlt);
    }
    document.querySelector("#language-code").textContent = language.toUpperCase();
    for (const button of languageButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    }
    for (const link of document.querySelectorAll("[data-nav]")) {
      const destination = link.dataset.nav;
      link.href = destination === "library" || destination === "highlights"
        ? "#" + destination
        : url({ feed: destination === "spanish" });
      if (spanish && destination === "spanish" && !dialog.contains(link)) link.setAttribute("aria-current", "page");
    }
  }

  function showInvitation() {
    if (!dialog.open) dialog.showModal();
  }

  function selectLanguage(next) {
    menu.open = false;
    summary.focus();
    if (next === language) return;
    language = next;
    const target = new URL(window.location.href);
    if (language === "es") target.searchParams.set("lang", "es");
    else target.searchParams.delete("lang");
    try {
      history.replaceState(history.state, "", target);
    } catch {
      if (language === "es" && !spanish) target.searchParams.set("invite", "1");
      window.location.assign(target);
      return;
    }
    translate();
    document.dispatchEvent(new Event("gonsinlocalechange"));
    if (language === "es" && !spanish) showInvitation();
  }

  for (const button of languageButtons) button.addEventListener("click", () => selectLanguage(button.dataset.language));
  document.addEventListener("click", event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  menu.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !menu.open) return;
    event.preventDefault();
    menu.open = false;
    summary.focus();
  });
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  for (const element of document.querySelectorAll("[data-home-only]")) element.hidden = spanish;
  for (const element of document.querySelectorAll("[data-spanish-only]")) element.hidden = !spanish;
  menu.hidden = false;
  translate();
  if (language === "es" && !spanish && locationUrl.searchParams.get("invite") === "1") showInvitation();
})();
