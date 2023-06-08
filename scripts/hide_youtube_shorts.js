// ==UserScript==
// @name         Hide Youtube Shorts Uploads in Subscriptions Page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/feed/subscriptions
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        try {
            Array.from(document.getElementsByTagName("ytd-rich-item-renderer")).forEach((vid) => {
                if (vid.querySelectorAll('[href*="/shorts/"]').length > 0) {
                    vid.remove()
                }
            })
        } catch {}
    }, 1000)
})();
