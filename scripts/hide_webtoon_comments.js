// ==UserScript==
// @name         Hide the webtoons comment section
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.webtoons.com/en/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	document.getElementsByClassName("comment_area")[0].style.visibility = "hidden";
})();
