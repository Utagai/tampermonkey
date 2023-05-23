// ==UserScript==
// @name         Grays out videos that have been watched for more than 90% of their length
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
      let els = document.getElementsByTagName('ytd-grid-video-renderer')

      for (let i = 0; i < els.length; i++) {
        let progress = els[i].querySelector("#progress");
        if (progress !== null) {
          let width_str = progress.style.width;
          let width = parseInt(width_str.substring(0, width_str.length - 1), 10);
          if (width > 90) {
            els[i].style.opacity = "0.2"
          }
        }
      }
    }, 1000)
})();
