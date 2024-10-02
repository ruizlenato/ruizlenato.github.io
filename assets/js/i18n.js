document.addEventListener("DOMContentLoaded", () => {
	const userLang = navigator.language || navigator.userLanguage;
	const lang = userLang.startsWith("pt") ? "pt" : "en";

	fetch(`./assets/i18n/${lang}.json`)
		.then((response) => response.json())
		.then((translations) => {
			for (const element of document.querySelectorAll("[data-i18n]")) {
				const keys = element.getAttribute("data-i18n").split(".");
				let text = translations;
				for (const key of keys) {
					text = text[key];
				}
				element.innerHTML = text;
			}
		})
		.catch((error) => console.error("Error loading translations:", error));
});
