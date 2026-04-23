document.addEventListener("DOMContentLoaded", () => {
  const SUPPORTED_LANGS = ["pt", "en"];
  const userLang = navigator.language?.split("-")[0] || "en";
  const lang = SUPPORTED_LANGS.includes(userLang) ? userLang : "en";

  if (lang === "pt") {
    document.documentElement.lang = "pt-BR";
    return;
  }

  fetch(`./assets/i18n/${lang}.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const keys = element.getAttribute("data-i18n")?.split(".");
        if (!keys) return;

        const text = keys.reduce((obj, key) => obj?.[key], translations);
        if (text) {
          element.innerHTML = text;
        } else {
          console.warn(`Missing translation: ${keys.join(".")}`);
        }
      });
      document.documentElement.lang = lang;
    })
    .catch((error) => {
      console.error("i18n failed:", error);
    });
});
