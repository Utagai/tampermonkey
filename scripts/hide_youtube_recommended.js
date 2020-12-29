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

    let hide = function() {
        let related = document.getElementById("related");
        related.style.visibility = "hidden";
        related.id = "related-HIDING";
    };
    setInterval(hide, 3000);

    document.onkeypress = function (e) {
        e = e || window.event;
        if (e.code === "Minus" || e.code == "Equal") {
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
