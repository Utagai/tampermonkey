// ==UserScript==
// @name         Hide Github feed.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the feed and other assorted nonsense on the Github home page.
// @author       You
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("dashboard-user-teams").style.display = "none";
    document.getElementById("dashboard-repos-container").style.display = "none";
})();
