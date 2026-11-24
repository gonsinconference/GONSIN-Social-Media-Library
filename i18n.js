"use strict";

(() => {
  const strings = {
    homeTitle: ["GONSIN Social Media Library", "Biblioteca de redes sociales de GONSIN"],
    spanishTitle: ["Social media in Spanish | GONSIN", "Redes sociales en español | GONSIN"],
    frenchTitle: ["Social media in French | GONSIN", "Redes sociales en francés | GONSIN"],
    guideTitle: ["User Guide | GONSIN Social Media Library", "Guía de uso | Biblioteca de redes sociales de GONSIN"],
    skip: ["Skip to the library", "Saltar a la biblioteca"],
    brand: ["Media Library", "Biblioteca de medios"],
    home: ["Library", "Biblioteca"],
    nav: ["Main navigation", "Navegación principal"],
    highlightsNav: ["Highlights", "Destacados"],
    libraryNav: ["Browse library", "Explorar biblioteca"],
    guideNav: ["User guide", "Guía de uso"],
    guideHeading: ["How to use the library", "Cómo usar la biblioteca"],
    guideIntro: ["Find official GONSIN resources, share links and download a customized Excel list.",
      "Encuentra recursos oficiales de GONSIN, comparte enlaces y descarga una lista de Excel a tu medida."],
    guideBack: ["Back to the library", "Volver a la biblioteca"],
    guideSkip: ["Skip to the user guide", "Saltar a la guía de uso"],
    guideShare: ["Share guide", "Compartir guía"],
    guideCopied: ["Guide link copied.", "Enlace de la guía copiado."],
    guideSteps: ["Guide steps", "Pasos de la guía"],
    guideStepLanguage: ["Choose a language", "Elegir el idioma"],
    guideStepSearch: ["Find resources", "Buscar recursos"],
    guideStepShare: ["Open and share", "Abrir y compartir"],
    guideLanguageDirect: ["Open Spanish social media or French social media from the library header to browse posts in that language.",
      "En el encabezado de la biblioteca, selecciona Redes en español o Redes en francés para ver publicaciones en ese idioma."],
    guideLanguageMenu: ["The language menu changes the interface and this guide. When a library page offers to open a language section, you can go there or keep browsing.",
      "El menú de idioma cambia la interfaz y esta guía. Cuando aparezca una invitación en la biblioteca, podrás entrar a la sección correspondiente o seguir explorando."],
    guideLanguageBack: ["In a language section, use the left-arrow button at the top to return to the English library.",
      "En una sección por idioma, usa el botón con la flecha hacia la izquierda para volver a la biblioteca en inglés."],
    guideLanguageAlt: ["Spanish and French section links and the open language menu",
      "Enlaces a las secciones en español y francés con el menú de idioma abierto"],
    guideSearchQuery: ["In Browse the library, enter a title keyword or product model.",
      "En Explorar la biblioteca, escribe una palabra del título o el modelo del producto."],
    guideSearchFilters: ["Combine year, platform and category filters. Select Clear filters to start over.",
      "Combina los filtros de año, plataforma y categoría. Selecciona Borrar filtros para empezar de nuevo."],
    guideSearchHighlights: ["Open the Newsletter or Case Studies highlight to jump to its category.",
      "Abre el destacado de Boletín o Casos de éxito para ir a la categoría correspondiente."],
    guideSearchAlt: ["Search field and the year, platform and category filters",
      "Campo de búsqueda y filtros de año, plataforma y categoría"],
    guideShareOriginal: ["Choose a platform button on a resource card to open the original post or file. Select the title to view the resource details.",
      "Usa los botones de la tarjeta para abrir la publicación original o el archivo. Selecciona el título para ver los detalles."],
    guideShareResource: ["Use the link icon on the card to copy that resource’s link.",
      "Usa el icono de enlace de la tarjeta para copiar el enlace del recurso."],
    guideShareLibrary: ["Use Share library in the header to copy the address of the library you’re viewing.",
      "Pulsa Compartir en el encabezado de la biblioteca para copiar la dirección de la sección que estás viendo."],
    guideShareAlt: ["A resource card with platform links and a copy-link icon",
      "Tarjeta de un recurso con enlaces a las plataformas y el icono para copiar el enlace"],
    guideExcelOpen: ["Select Download Excel in the library to open the download options.",
      "Selecciona Descargar Excel en la biblioteca para abrir las opciones de descarga."],
    guideExcelFilter: ["Set a start date, an end date or both. Select Type and Link types to refine the export. Leave a group unchecked to include all its options.",
      "Indica la fecha inicial, la fecha final o ambas. Elige las opciones de Tipo y Tipos de enlace. Si dejas un grupo sin marcar, se incluirán todas sus opciones."],
    guideExcelDownload: ["Select Download selection for filtered records. Download all exports the entire library you’re viewing.",
      "Pulsa Descargar selección para exportar los resultados filtrados. Descargar todo exporta la biblioteca que estás viendo."],
    guideExcelLinks: ["Open the original posts and files using the clickable links in the downloaded workbook.",
      "Abre las publicaciones originales y los archivos desde los enlaces del Excel descargado."],
    guideExcelAlt: ["Excel download options with dates, resource types, link types and download buttons",
      "Opciones de descarga de Excel con fechas, tipos de recursos, tipos de enlaces y botones de descarga"],
    spanishNav: ["Spanish social media", "Redes en español"],
    frenchNav: ["French social media", "Redes en francés"],
    englishNav: ["Back to English library", "Volver a la biblioteca en inglés"],
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
    frenchFirst: ["Social media", "Redes sociales"],
    frenchSecond: ["in French", "en francés"],
    frenchIntro: ["Explore product videos, case studies and conference solutions published in French.",
      "Explora videos de productos, casos de éxito y soluciones para conferencias publicados en francés."],
    invitationFirst: ["Looking for posts", "¿Buscas publicaciones"],
    invitationSecond: ["in Spanish?", "en español?"],
    invitationDescription: ["Find product videos and case studies from GONSIN’s official channels.",
      "Encuentra videos de productos y casos de éxito de los canales oficiales de GONSIN."],
    invitationLink: ["View posts in Spanish", "Ver publicaciones en español"],
    invitationStay: ["Stay in the library", "Seguir en la biblioteca"],
    closeInvitation: ["Close invitation", "Cerrar aviso"],
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
  const french = {
    homeTitle: "Médiathèque des réseaux sociaux de GONSIN",
    spanishTitle: "Réseaux sociaux en espagnol | GONSIN",
    frenchTitle: "Réseaux sociaux en français | GONSIN",
    guideTitle: "Guide d’utilisation | Médiathèque GONSIN",
    skip: "Aller à la médiathèque",
    brand: "Médiathèque",
    home: "Médiathèque",
    nav: "Navigation principale",
    highlightsNav: "À la une",
    libraryNav: "Explorer",
    guideNav: "Guide d’utilisation",
    guideHeading: "Utiliser la médiathèque",
    guideIntro: "Trouvez les ressources officielles de GONSIN, partagez des liens et téléchargez une liste Excel personnalisée.",
    guideBack: "Retour à la médiathèque",
    guideSkip: "Aller au guide d’utilisation",
    guideShare: "Partager le guide",
    guideCopied: "Lien du guide copié.",
    guideSteps: "Étapes du guide",
    guideStepLanguage: "Choisir une langue",
    guideStepSearch: "Trouver des ressources",
    guideStepShare: "Ouvrir et partager",
    guideLanguageDirect: "Dans l’en-tête de la médiathèque, sélectionnez Réseaux en espagnol ou Réseaux en français pour consulter les publications dans cette langue.",
    guideLanguageMenu: "Le menu des langues traduit l’interface et ce guide. Si la médiathèque vous propose d’ouvrir la rubrique correspondante, vous pouvez la rejoindre ou poursuivre votre navigation.",
    guideLanguageBack: "Dans une rubrique par langue, utilisez le bouton avec la flèche vers la gauche pour revenir à la médiathèque en anglais.",
    guideLanguageAlt: "Accès aux rubriques en espagnol et en français et menu des langues ouvert",
    guideSearchQuery: "Dans Explorer la médiathèque, saisissez un mot du titre ou le modèle du produit.",
    guideSearchFilters: "Combinez les filtres d’année, de plateforme et de catégorie. Cliquez sur Effacer les filtres pour recommencer.",
    guideSearchHighlights: "Ouvrez la mise en avant Newsletter ou Études de cas pour accéder à la catégorie correspondante.",
    guideSearchAlt: "Champ de recherche et filtres d’année, de plateforme et de catégorie",
    guideShareOriginal: "Utilisez les boutons de la fiche pour ouvrir la publication originale ou le fichier. Cliquez sur le titre pour afficher les détails.",
    guideShareResource: "Cliquez sur l’icône de lien de la fiche pour copier le lien de la ressource.",
    guideShareLibrary: "Cliquez sur Partager dans l’en-tête de la médiathèque pour copier l’adresse de la rubrique affichée.",
    guideShareAlt: "Fiche de ressource avec liens vers les plateformes et icône de copie du lien",
    guideExcelOpen: "Cliquez sur Télécharger Excel dans la médiathèque pour ouvrir les options de téléchargement.",
    guideExcelFilter: "Indiquez la date de début, la date de fin ou les deux. Sélectionnez les options Type et Types de liens. Pour inclure toutes les options d’un groupe, laissez ses cases décochées.",
    guideExcelDownload: "Cliquez sur Télécharger la sélection pour exporter les résultats filtrés. Tout télécharger exporte l’ensemble de la médiathèque affichée.",
    guideExcelLinks: "Ouvrez les publications originales et les fichiers à partir des liens cliquables du classeur Excel.",
    guideExcelAlt: "Options Excel avec dates, types de ressources, types de liens et boutons de téléchargement",
    spanishNav: "Réseaux en espagnol",
    frenchNav: "Réseaux en français",
    englishNav: "Retour à la version anglaise",
    share: "Partager",
    language: "Langue : français",
    contact: "Contactez-nous",
    eyebrow: "Conférence et audiovisuel professionnel",
    titleFirst: "Médiathèque",
    titleSecond: "GONSIN",
    intro: "Démonstrations de produits, projets de conférence et temps forts des événements sur les canaux officiels de GONSIN.",
    browse: "Explorer la médiathèque",
    showroom: "Visite virtuelle de GONSIN",
    boardroomAlt: "Une salle de réunion GONSIN équipée de terminaux de conférence sans papier et d’écrans muraux",
    spanishFirst: "Réseaux sociaux",
    spanishSecond: "en espagnol",
    spanishIntro: "Découvrez les vidéos de produits, les études de cas et les solutions de conférence publiées en espagnol.",
    frenchFirst: "Réseaux sociaux",
    frenchSecond: "en français",
    frenchIntro: "Découvrez les vidéos de produits, les études de cas et les solutions de conférence publiées en français.",
    invitationFirst: "Vous cherchez des publications",
    invitationSecond: "en français ?",
    invitationDescription: "Retrouvez les démonstrations de produits et les études de cas des canaux officiels de GONSIN.",
    invitationLink: "Voir les publications en français",
    invitationStay: "Rester dans la médiathèque",
    closeInvitation: "Fermer l’invitation",
    posts: "publications",
    official: "articles officiels",
    featured: "À la une",
    allResourcesLink: "Voir toutes les ressources",
    exhibitionPreview: "Prochain salon",
    conferenceSolution: "Solution de conférence",
    projectArchive: "Nos projets",
    caseStudies: "Études de cas",
    ise: "GONSIN à l’ISE 2027",
    newsletter: "Newsletter",
    find: "Trouvez une publication par sujet, modèle de produit ou plateforme.",
    search: "Rechercher par titre ou modèle",
    searchLabel: "Rechercher et filtrer les ressources",
    year: "Année",
    allYears: "Toutes les années",
    platform: "Plateforme",
    allPlatforms: "Toutes les plateformes",
    sort: "Ordre de tri",
    newest: "Les plus récents",
    oldest: "Les plus anciens",
    category: "Catégorie de ressource",
    all: "Toutes les ressources",
    videos: "Vidéos",
    projects: "Études de cas",
    solutions: "Produits et solutions",
    newsletters: "Newsletters",
    events: "Salons et événements",
    articles: "Articles officiels",
    updates: "Actualités GONSIN",
    pictures: "Images",
    clear: "Effacer les filtres",
    noResults: "Aucune ressource trouvée",
    tryAgain: "Essayez un autre mot-clé ou effacez les filtres.",
    more: "Voir plus",
    website: "Site web",
    email: "E-mail",
    contactInfo: "Coordonnées de GONSIN",
    socialInfo: "Réseaux sociaux de GONSIN",
    backToTop: "Retour en haut de la page",
    closeResource: "Fermer la ressource",
    sources: "Sources d’origine",
    copy: "Copier le lien",
    copyOriginal: "Copier le lien d’origine",
    closeShare: "Fermer la fenêtre de partage",
    copyPrompt: "Sélectionnez et copiez cette adresse.",
    copyResource: "Copier le lien de la ressource",
    copyFor: title => "Copier le lien de " + title,
    copyOriginalFor: title => "Copier le lien d’origine de " + title,
    copied: "Lien copié.",
    originalCopied: "Lien d’origine copié.",
    resourceCopied: "Lien de la ressource copié.",
    libraryCopied: "Lien de la médiathèque copié.",
    openOn: name => "Ouvrir sur " + name + " (nouvel onglet)",
    resultCount: (shown, total) => (shown < total ? shown + " sur " : "") + total + (total === 1 ? " ressource" : " ressources"),
    download: "Télécharger Excel",
    closeDownload: "Fermer le téléchargement Excel",
    startDate: "Date de début",
    endDate: "Date de fin",
    pickStart: "Choisir la date de début",
    pickEnd: "Choisir la date de fin",
    rangeHint: "Laissez une date vide pour ouvrir l’intervalle.",
    available: dates => "Période disponible : " + dates + ".",
    type: "Type",
    typeHint: "Sélectionnez un ou plusieurs types. Laissez toutes les cases décochées pour inclure tous les types.",
    linkTypes: "Types de liens",
    linkHint: "Choisissez les colonnes de liens à inclure. Laissez toutes les cases décochées pour inclure tous les types de liens.",
    downloadSelection: "Télécharger la sélection",
    downloadAll: "Tout télécharger",
    closeCalendar: "Fermer le calendrier",
    chooseDate: "Choisir une date",
    previousMonth: "Mois précédent",
    nextMonth: "Mois suivant",
    month: "Mois",
    dates: "Dates",
    sun: "Dim", mon: "Lun", tue: "Mar", wed: "Mer", thu: "Jeu", fri: "Ven", sat: "Sam",
    reversed: "La date de fin doit être égale ou postérieure à la date de début.",
    invalidDate: "Saisissez une date valide au format AAAA-MM-JJ.",
    noDownload: "Aucun résultat. Modifiez les dates, les types ou les liens.",
    ready: n => n + (n === 1 ? " ressource prête à télécharger." : " ressources prêtes à télécharger."),
    loading: "Chargement des options Excel…",
    filtersError: "Les filtres sont indisponibles. Rouvrez cette fenêtre ou cliquez sur Tout télécharger.",
    exportError: "Impossible de créer le fichier Excel. Réessayez.",
  };
  const spanishTypes = {
    video: "Video", "case sharing": "Caso de éxito", "case study": "Caso de éxito", "case studies": "Casos de éxito",
    "project case": "Caso de éxito", exhibition: "Feria", product: "Producto", newsletter: "Boletín",
    solution: "Solución", "gonsin-ai": "GONSIN-AI", "festival poster": "Publicación de temporada",
    seasonal: "Publicación de temporada", "about gonsin": "Sobre GONSIN", "brand update": "Novedad de GONSIN",
    article: "Artículo", "official article": "Artículo oficial", image: "Imagen", picture: "Imagen",
  };
  const frenchTypes = {
    video: "Vidéo", "case sharing": "Étude de cas", "case study": "Étude de cas", "case studies": "Études de cas",
    "project case": "Étude de cas", exhibition: "Salon", product: "Produit", newsletter: "Newsletter",
    solution: "Solution", "gonsin-ai": "GONSIN-AI", "festival poster": "Publication saisonnière",
    seasonal: "Publication saisonnière", "about gonsin": "À propos de GONSIN", "brand update": "Actualité GONSIN",
    article: "Article", "official article": "Article officiel", image: "Image", picture: "Image",
  };

  const sections = {
    english: { contentLanguage: "en", title: "homeTitle", catalog: window.gonsinCatalog, sheetName: "Social Media" },
    spanish: { contentLanguage: "es", title: "spanishTitle", catalog: window.gonsinSpanishCatalog, sheetName: "Spanish Social Media" },
    french: { contentLanguage: "fr", title: "frenchTitle", catalog: window.gonsinFrenchCatalog, sheetName: "French Social Media" },
  };
  const translatedSections = { es: "spanish", fr: "french" };
  const locationUrl = new URL(window.location.href);
  const requestedSection = locationUrl.searchParams.get("section");
  const section = Object.hasOwn(sections, requestedSection) ? requestedSection : "english";
  const isGuide = locationUrl.searchParams.get("page") === "guide";
  const requestedLanguage = locationUrl.searchParams.get("lang");
  let language = Object.hasOwn(translatedSections, requestedLanguage) ? requestedLanguage : "en";
  const menu = document.querySelector("#language-menu");
  const summary = menu.querySelector("summary");
  const dialog = document.querySelector("#language-dialog");
  const invitationLink = document.querySelector("#language-invitation-link");
  const languageButtons = [...menu.querySelectorAll("[data-language]")];
  const translated = Array.from(document.querySelectorAll("[data-i18n], [data-i18n-label], [data-i18n-placeholder], [data-i18n-alt]"));

  function t(key, ...args) {
    const value = language === "fr" ? french[key] : strings[key][language === "es" ? 1 : 0];
    return typeof value === "function" ? value(...args) : value;
  }

  function url({ section: destination = section, lang = language, page = isGuide ? "guide" : "", hash = "", params = {} } = {}) {
    const target = new URL(window.location.href);
    target.search = "";
    target.hash = hash;
    if (destination !== "english") target.searchParams.set("section", destination);
    if (page) target.searchParams.set("page", page);
    if (lang !== "en") target.searchParams.set("lang", lang);
    for (const [key, value] of Object.entries(params)) target.searchParams.set(key, value);
    return target.href;
  }

  window.gonsinView = {
    section, isGuide, ...sections[section], t, url,
    platformNames: {
      linkedin: "LinkedIn", facebook: "Facebook", youtube: "YouTube", drive: "Google Drive",
      canva: "Canva", website: "GONSIN.com", x: "X", pinterest: "Pinterest", instagram: "Instagram", tiktok: "TikTok",
    },
    get locale() { return language === "en" ? "en-US" : language; },
    type: value => ({ es: spanishTypes, fr: frenchTypes })[language]?.[value.toLowerCase()] || value,
  };

  function translate() {
    document.documentElement.lang = window.gonsinView.locale;
    document.title = t(isGuide ? "guideTitle" : sections[section].title);
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
      if (destination === "guide") {
        link.href = url({ page: "guide" });
        if (isGuide) link.setAttribute("aria-current", "page");
      } else if (["library", "highlights", "guide-back"].includes(destination)) {
        const hash = destination === "guide-back" ? "library" : destination;
        link.href = isGuide ? url({ page: "", hash }) : "#" + hash;
      } else {
        link.href = url({ section: destination === "home" ? "english" : destination, page: "", lang: destination === "english" ? "en" : language });
      }
    }
    if (isGuide) {
      for (const image of document.querySelectorAll("[data-guide-image]")) {
        image.src = "assets/guide-" + language + "-" + image.dataset.guideImage + ".webp";
      }
    }
    dialog.lang = window.gonsinView.locale;
    if (translatedSections[language]) invitationLink.href = url({ section: translatedSections[language] });
  }

  function shouldInvite() {
    return !isGuide && Object.hasOwn(translatedSections, language) && translatedSections[language] !== section;
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
    if (language !== "en") target.searchParams.set("lang", language);
    else target.searchParams.delete("lang");
    try {
      history.replaceState(history.state, "", target);
    } catch {
      if (shouldInvite()) target.searchParams.set("invite", "1");
      window.location.assign(target);
      return;
    }
    translate();
    document.dispatchEvent(new Event("gonsinlocalechange"));
    if (shouldInvite()) showInvitation();
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

  document.querySelector("#library-page").hidden = isGuide;
  document.querySelector("#guide").hidden = !isGuide;
  if (isGuide) {
    const skipLink = document.querySelector(".skip-link");
    skipLink.href = "#guide";
    skipLink.dataset.i18n = "guideSkip";
    document.querySelector(".header-share .share-label").dataset.i18n = "guideShare";
  }
  for (const element of document.querySelectorAll("[data-home-only]")) element.hidden = section !== "english";
  for (const element of document.querySelectorAll("[data-section-only]")) element.hidden = section === "english";
  for (const languageSection of Object.values(translatedSections)) {
    for (const element of document.querySelectorAll("[data-" + languageSection + "-only]")) {
      element.hidden = section !== languageSection;
    }
  }
  if (section !== "english") {
    const attribute = "data-" + section + "-href";
    for (const link of document.querySelectorAll(".footer-social a")) {
      const destination = link.getAttribute(attribute);
      link.hidden = !destination;
      if (destination) link.href = destination;
    }
  }
  menu.hidden = false;
  translate();
  if (shouldInvite() && locationUrl.searchParams.get("invite") === "1") showInvitation();
})();
