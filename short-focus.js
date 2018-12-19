(async function () {
    'use strict';

    const SLASH_KEY_CODE = 191;

    const FOCUSABLE_ELT_TAGS = ['input', 'textarea'];

    function isFocusable(elt) {
        if (FOCUSABLE_ELT_TAGS.includes(elt.tagName.toLowerCase())) {
            return true;
        }

        if (elt.isContentEditable) {
            return true;
        }

        return false;
    }

    const HOST = window.location.host;
    const PATHNAME = window.location.pathname;

    const SITE_CONF_KEY = 'config.selector.' + HOST;
    const PAGE_CONF_KEY = SITE_CONF_KEY + PATHNAME;

    const config = await browser.storage.local.get([SITE_CONF_KEY, PAGE_CONF_KEY]);

    const simmer = window.Simmer;

    let selector;

    if (config[PAGE_CONF_KEY]) {
        selector = config[PAGE_CONF_KEY];
    } else if (config[SITE_CONF_KEY]) {
        selector = config[SITE_CONF_KEY];
    }

    window.addEventListener('keyup', async event => {
        if (event.shiftKey && !event.altKey && event.keyCode === SLASH_KEY_CODE) {
            if (!document.activeElement || !isFocusable(document.activeElement)) {
                const elementToFocusOn = document.querySelector(selector);

                if (elementToFocusOn) {
                    elementToFocusOn.focus();
                }
            }
        }

        if (event.shiftKey && event.altKey && event.keyCode === SLASH_KEY_CODE) {
            if (document.activeElement && isFocusable(document.activeElement)) {
                selector = simmer(document.activeElement);

                const keys = {};
                keys[SITE_CONF_KEY] = keys[PAGE_CONF_KEY] = selector;
                await browser.storage.local.set(keys);
            }
        }
    });
}());