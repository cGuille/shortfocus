(async function () {
    'use strict';

    const HOST = window.location.host;
    const PATHNAME = window.location.pathname;

    const SITE_CONF_KEY = 'config.selector.' + HOST;
    const PAGE_CONF_KEY = SITE_CONF_KEY + PATHNAME;

    const config = await browser.storage.local.get([SITE_CONF_KEY, PAGE_CONF_KEY]);

    let selector;

    if (config[PAGE_CONF_KEY]) {
        selector = config[PAGE_CONF_KEY];
    } else if (config[SITE_CONF_KEY]) {
        selector = config[SITE_CONF_KEY];
    } else {
        return;
    }

    const DO_NOT_UNFOCUS_TAGS = ['input', 'textarea'];
    const SLASH_KEY_CODE = 191;
    const elementToFocusOn = document.querySelector(selector);

    if (!elementToFocusOn) {
        return;
    }

    window.addEventListener('keyup', event => {
        if (document.activeElement) {
            if (DO_NOT_UNFOCUS_TAGS.includes(document.activeElement.tagName.toLowerCase())) {
                return;
            }

            if (document.activeElement.isContentEditable) {
                return;
            }
        }

        if (event.shiftKey && event.keyCode === SLASH_KEY_CODE) {
            elementToFocusOn.focus();
        }
    });
}());