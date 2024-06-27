document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.startsWith('pt') ? 'pt' : 'en';

    fetch(`./assets/i18n/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const keys = element.getAttribute('data-i18n').split('.');
                let text = translations;
                keys.forEach(key => {
                    text = text[key];
                });
                element.innerHTML = text;
            });
        })
        .catch(error => console.error('Error loading translations:', error));
});
