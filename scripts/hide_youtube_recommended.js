// ==UserScript==
// @name         Hide the youtube related videos sidebar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // This function will only have an impact on the initial page load, e.g., after a refresh, first visit, etc.
    let hide = function() {
        let related = document.getElementById("related");
        related.style.visibility = "hidden";
        // Changing the ID here makes it so that this retry loop will fail to change anything once it successfully runs.
        related.id = "related-HIDING";
    };

    // We have to run hide() in a loop because for some reason this part of the page doesn't load in all the time?
    // Not sure, I don't care really either, it works. It's a dumb JS script.
    setInterval(hide, 3000);

    document.onkeypress = function (e) {
        e = e || window.event;
        if (e.code === "Minus" || e.code == "Equal") {
            // Essentially, on press, swap the "related-SHOWING" to "related-HIDING" and vice-versa.
            let related = document.getElementById("related-SHOWING");
            if (related == null) {
                let related = document.getElementById("related-HIDING");
                related.id = "related-SHOWING";
                related.style.visibility = "";
            } else {
                related.style.visibility = "hidden";
                related.id = "related-HIDING";
            }
        }
    };
})();
