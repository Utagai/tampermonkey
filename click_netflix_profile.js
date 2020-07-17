// ==UserScript==
// @name         Click Netflix profile.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically click my profile on Netflix.
// @author       You
// @match        https://www.netflix.com/browse
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let profiles = document.getElementsByClassName("profile-name");
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].innerText == "M") {
            profiles[i].click();
            console.log("Clicked on profile.");
            return;
        }
    }

    console.log("Did not find the correct profile to click.");
})();
