"use strict";

(() => {
  const dialog = document.querySelector("#excel-dialog");
  const form = document.querySelector("#excel-form");
  const from = document.querySelector("#excel-from");
  const to = document.querySelector("#excel-to");
  const range = document.querySelector("#excel-range");
  const typeList = document.querySelector("#excel-types");
  const status = document.querySelector("#excel-status");
  const submit = document.querySelector("#download-selection");
  const fullWorkbook = document.querySelector("#download-full-workbook");
  const calendar = document.querySelector("#excel-calendar");
  const calendarTitle = document.querySelector("#calendar-title");
  const calendarMonth = document.querySelector("#calendar-month");
  const calendarYear = document.querySelector("#calendar-year");
  const calendarPrev = document.querySelector("#calendar-prev");
  const calendarNext = document.querySelector("#calendar-next");
  const calendarDays = document.querySelector("#calendar-days");
  const calendarButtons = [...document.querySelectorAll("[data-calendar-for]")];
  const release = new URL(fullWorkbook.href).searchParams.get("v");
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
  const monthFormat = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" });
  const calendarDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeZone: "UTC" });
  let toolsPromise;
  let records;
  let recordsPromise;
  let selection = [];
  let dateInput;

  function loadScript(path) {
    return new Promise((resolve, reject) => {
      const src = new URL(path, document.baseURI);
      if (release) src.searchParams.set("v", release);
      const script = document.createElement("script");
      script.src = src.href;
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        reject(new Error("Could not load the Excel tools."));
      };
      document.head.append(script);
    });
  }

  function loadWorkbookTools() {
    if (!toolsPromise) {
      toolsPromise = Promise.all([
        window.XLSX || loadScript("excel/xlsx.mini.min.js"),
        window.GonsinWeekly || loadScript("excel/workbook.js"),
      ]).then(() => {
        if (!window.XLSX || !window.GonsinWeekly) throw new Error("Could not initialize the Excel tools.");
      }).catch(error => {
        toolsPromise = undefined;
        throw error;
      });
    }
    return toolsPromise;
  }

  window.loadGonsinWorkbookTools = loadWorkbookTools;

  function message(text, error = false) {
    status.textContent = text;
    status.dataset.error = String(error);
  }

  function renderOptions() {
    const labels = [...new Set(records.map(row => row.sourceType))].sort((a, b) => a.localeCompare(b, "en"));
    for (const type of labels) {
      const label = document.createElement("label");
      label.className = "excel-type-option";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "type";
      checkbox.value = type;
      label.append(checkbox, type);
      typeList.append(label);
    }
    const format = value => dateFormat.format(new Date(value + "T00:00:00Z"));
    const first = records.at(-1).date;
    const last = records[0].date;
    const dates = first === last ? format(first) : format(first) + " to " + format(last);
    range.textContent = "Available: " + dates + ". Leave either date blank for an open range.";
    for (const button of calendarButtons) button.disabled = false;
  }

  function readRecords() {
    if (!recordsPromise) {
      recordsPromise = Promise.all([
        loadWorkbookTools(),
        fetch(fullWorkbook.href).then(response => {
          if (!response.ok) throw new Error("Could not load the published Excel file.");
          return response.arrayBuffer();
        }),
      ]).then(([, bytes]) => {
        records = window.GonsinWeekly.readFile(bytes, window.XLSX).records;
        renderOptions();
      }).catch(error => {
        recordsPromise = undefined;
        throw error;
      });
    }
    return recordsPromise;
  }

  function validDate(value) {
    if (!isoDate.test(value) || Number(value.slice(0, 4)) < 1900) return false;
    const date = new Date(value + "T00:00:00Z");
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function updateSelection() {
    if (!records) return;
    const start = from.value.trim();
    const end = to.value.trim();
    const invalidStart = Boolean(start && !validDate(start));
    const invalidEnd = Boolean(end && !validDate(end));
    const reversed = !invalidStart && !invalidEnd && start && end && start > end;
    from.setAttribute("aria-invalid", String(Boolean(invalidStart || reversed)));
    to.setAttribute("aria-invalid", String(Boolean(invalidEnd || reversed)));
    if (invalidStart || invalidEnd || reversed) {
      selection = [];
      submit.disabled = true;
      message(reversed ? "End date must be on or after the start date." : "Enter a valid date as YYYY-MM-DD.", true);
      return;
    }
    const types = new Set(new FormData(form).getAll("type"));
    selection = records.filter(row =>
      (!start || row.date >= start) && (!end || row.date <= end)
      && (!types.size || types.has(row.sourceType)));
    submit.disabled = selection.length === 0;
    if (!selection.length) {
      message("No records match. Choose different dates or types.");
      return;
    }
    const label = selection.length === 1 ? "record" : "records";
    message(selection.length + " " + label + " ready to download.");
  }

  function utcDate(year, month, day) {
    const date = new Date(0);
    date.setUTCFullYear(year, month, day);
    return date;
  }

  function renderCalendar() {
    const year = Number(calendarYear.value);
    const month = Number(calendarMonth.value);
    const firstDay = utcDate(year, month, 1).getUTCDay();
    const dayCount = utcDate(year, month + 1, 0).getUTCDate();
    const selected = dateInput.value.trim();
    const body = document.createDocumentFragment();
    for (let i = 0; i < firstDay + dayCount; i += 7) {
      const week = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        const day = i + j - firstDay + 1;
        if (day >= 1 && day <= dayCount) {
          const date = utcDate(year, month, day);
          const button = document.createElement("button");
          button.className = "calendar-day";
          button.type = "button";
          button.textContent = String(day);
          button.dataset.date = date.toISOString().slice(0, 10);
          button.setAttribute("aria-label", calendarDate.format(date));
          button.setAttribute("aria-pressed", String(button.dataset.date === selected));
          cell.append(button);
        }
        week.append(cell);
      }
      body.append(week);
    }
    calendarDays.replaceChildren(body);
    calendarPrev.disabled = month === 0 && calendarYear.selectedIndex === 0;
    calendarNext.disabled = month === 11 && calendarYear.selectedIndex === calendarYear.length - 1;
  }

  function openCalendar(button) {
    dateInput = document.getElementById(button.dataset.calendarFor);
    const value = dateInput.value.trim();
    const first = records.at(-1).date;
    const last = records[0].date;
    const date = validDate(value) ? value : dateInput === from ? first : last;
    const year = Number(date.slice(0, 4));
    const firstYear = Number(first.slice(0, 4));
    const lastYear = Number(last.slice(0, 4));
    const years = [];
    if (year < firstYear) years.push(new Option(String(year), String(year)));
    for (let y = firstYear; y <= lastYear; y++) years.push(new Option(String(y), String(y)));
    if (year > lastYear) years.push(new Option(String(year), String(year)));
    calendarYear.replaceChildren(...years);
    calendarYear.value = String(year);
    calendarMonth.value = String(Number(date.slice(5, 7)) - 1);
    calendarTitle.textContent = dateInput === from ? "Choose start date" : "Choose end date";
    renderCalendar();
    calendar.showModal();
    (calendarDays.querySelector('[aria-pressed="true"]') || calendarMonth).focus();
  }

  function moveMonth(direction) {
    const month = Number(calendarMonth.value) + direction;
    if (month < 0) calendarYear.selectedIndex--;
    if (month > 11) calendarYear.selectedIndex++;
    calendarMonth.value = String((month + 12) % 12);
    renderCalendar();
  }

  async function openDownload(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (dialog.open) return;
    dialog.showModal();
    if (!records) {
      message("Loading the published Excel…");
      try {
        await readRecords();
      } catch {
        message("Filters could not load. Reopen this window to retry, or use Download all.", true);
        return;
      }
    }
    updateSelection();
  }

  function downloadSelection(event) {
    event.preventDefault();
    if (!selection.length) return;
    if (selection.length === records.length) {
      fullWorkbook.click();
      return;
    }
    try {
      const tools = window.GonsinWeekly;
      const bytes = tools.makeWorkbook(selection, window.XLSX);
      const url = URL.createObjectURL(new Blob([bytes], { type: tools.mime }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "GONSIN-Social-Media-Selection.xlsx";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch {
      message("Could not create the Excel file. Try again or use Download all.", true);
    }
  }

  for (const link of document.querySelectorAll("[data-excel-download]")) link.addEventListener("click", openDownload);
  for (let month = 0; month < 12; month++) {
    calendarMonth.add(new Option(monthFormat.format(utcDate(2000, month, 1)), String(month)));
  }
  for (const button of calendarButtons) button.addEventListener("click", () => openCalendar(button));
  calendarMonth.addEventListener("change", renderCalendar);
  calendarYear.addEventListener("change", renderCalendar);
  calendarPrev.addEventListener("click", () => moveMonth(-1));
  calendarNext.addEventListener("click", () => moveMonth(1));
  calendarDays.addEventListener("click", event => {
    const button = event.target.closest("[data-date]");
    if (!button) return;
    dateInput.value = button.dataset.date;
    updateSelection();
    calendar.close();
  });
  form.addEventListener("input", updateSelection);
  form.addEventListener("submit", downloadSelection);
  for (const modal of [dialog, calendar]) {
    modal.addEventListener("click", event => {
      if (event.target === modal) modal.close();
    });
  }
})();
