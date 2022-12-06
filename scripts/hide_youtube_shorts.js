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
        Array.from(document.getElementsByTagName("ytd-grid-video-renderer")).forEach((vid) => {
            if (vid.querySelectorAll('[overlay-style="SHORTS"]').length > 0) {
                vid.remove()
            }
        })
    }, 1000)
})();