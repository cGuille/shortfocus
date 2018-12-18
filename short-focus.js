(function () {
    'use strict';

    const DO_NOT_UNFOCUS_TAGS = ['input', 'textarea'];
    const SLASH_KEY_CODE = 191;
    const elementToFocusOn = document.querySelector('#short-focus');// TODO configure selector per web site and/or page

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