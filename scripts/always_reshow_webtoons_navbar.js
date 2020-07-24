// ==UserScript==
// @name         make webtoons nav bar at top always visible.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.webtoons.com/en/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	function makeVisible() {
		document.getElementById("toolbar").style.display = "";
		setTimeout(makeVisible, 200);
	}
	makeVisible();
})();
