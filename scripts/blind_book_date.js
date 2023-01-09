// ==UserScript==
// @name         Simulate a blind book date via Goodreads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  THIS IS A WIP SCRIPT! LIKELY HAS BUGS/UNHANDLED EDGE CASES!
// @author       You
// @match        https://www.goodreads.com/user/show/109413761-may
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @grant        none
// ==/UserScript==

/**
NOTE: THIS IS A WIP SCRIPT! LIKELY HAS BUGS/UNHANDLED EDGE CASES!
*/

(async function() {
    'use strict';

    let bookdate = async function() {
        var config = {
            depth: 5,
            seed: 'https://www.goodreads.com/user/show/109413761-may',
            blocklist: [
                'https://www.goodreads.com/user/show/125119013-alice', // Alice only has us & another mututal friend on her friendlist, so she essentially doubles the chance of our mutual friend being the first dive. This isn't good for randomness.
            ],
            maxPages: 1,
            minBooks: 100,
            maxLoops: 10,
        };

        function getUserIDFromShowURL(url) {
            if (url.includes('.')) {
                // NOTE: I _believe_ this is for the case that the friend is a goodreads author.
                return url.split('/').at(-1).split('.')[0]
            } else {
                return url.split('/').at(-1).split('-')[0]
            }
        }

        function getBookshelfFromShowUserID(userid, page) {
            var bookshelf_page_base = 'https://www.goodreads.com/review/list/'
            var bookshelf_page_args = '?shelf=%23ALL%23&per_page=100&page=' + page;
            return bookshelf_page_base + userid + bookshelf_page_args;
        }

        function getFriendURLFromShowURL(url) {
            var userid = getUserIDFromShowURL(url)
            var friends_page_base = 'https://www.goodreads.com/friend/user/'
            return friends_page_base + userid;
        }

        function chooseRandomElem(elems) {
            return elems[Math.floor(Math.random() * elems.length)];
        }

        async function dive(url, depth, blocklist) {
            console.log('Diving to: ', url, 'current depth: ', depth);
            if (depth <= 0) {
                console.log('Nice, finished diving on person: ', url);
                return getUserIDFromShowURL(url)
            }

            blocklist[url] = true;

            var user_friends_page = getFriendURLFromShowURL(url);

            return await fetch(user_friends_page)
                .then((resp) => resp.text())
                .then(async (data) => {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(data, 'text/html');

                var friends = htmlDoc.getElementsByTagName('tr');
                if (friends.length === 0) {
                    // We got here from a friend, so a 0 here means the profile is private.
                    console.log('user @ ', url, ' likely has a private profile, returning false');
                    return false;
                } else if (friends.length === 1) {
                    console.log('user @ ', url, ' has only one friend, which would trigger a cycle, returning false')
                    return false;
                }

                friends = Array.prototype.slice.call(friends).filter((friend) => {
                    var friendhref = friend.children[1].children[0].href
                    var num_books = parseInt(friend.children[1].children[2].innerText.replace(',', '').match(/\d+/));
                    if (num_books < config.minBooks) {
                        console.log('filtering out user @ ', friendhref, ', too few books: ', num_books)
                    }
                    return num_books >= config.minBooks
                })

                if (friends.length === 0) {
                    console.log('user @ ', url, 'seems to have no book loving friends, returning false');
                    return false;
                }

                // HACK: This isn't really as efficient as it can be, whatever. Also, it is dumb, and can cause an abort when one is not needed.
                for (var i = 0; i < config.maxLoops; i++) {
                    var random_chosen_friend = chooseRandomElem(friends).children[1].children[0].href;
                    if (blocklist[random_chosen_friend]) {
                        console.log('Found a blocked user: ', random_chosen_friend, ' trying again...')
                        continue
                    }
                    var dive_res = await dive(random_chosen_friend, depth - 1, blocklist);
                    if (dive_res === false) {
                        // For some reason, this friend is not a good one to dive into. Try again.
                        continue
                    } else {
                        return dive_res;
                    }
                }

                return false;
            })
                .catch((err) => console.error(err));
        }

        async function getAllBooks(userid, page) {
            console.log('get all books for user: ', userid, ' on page: ', page);
            if (page > config.maxPages) {
                return [];
            }

            var bookshelf_url = getBookshelfFromShowUserID(userid, page)
            console.log('Hitting bookshelf url: ', bookshelf_url);
            return await fetch(bookshelf_url).then((resp) => resp.text()).then(async (data) => {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(data, 'text/html');
                var booksForPage = htmlDoc.querySelectorAll('a[title][href^="/book/show/"]');
                if (booksForPage.length > 0) {
                    console.log('more books left, just got this many: ', booksForPage.length);
                    var restOfBooks = await getAllBooks(userid, page + 1);
                    return Array.prototype.slice.call(booksForPage).concat(restOfBooks)
                } else {
                    console.log('no books found, returning []')
                    return [];
                }
            }).catch((err) => console.error(err));
        }

        function getBookSummary(book_doc) {
            var genres = Array.prototype.slice.call(book_doc.querySelectorAll('a[href^="/genres/"]')).splice(0, 3).map((genre_link) => {
                return genre_link.innerText;
            }).join(', ');
            var rating = book_doc.querySelectorAll('span[itemprop="ratingValue"]')[0].innerText.strip();
            var numRatings = book_doc.querySelectorAll('meta[itemprop="ratingCount"]')[0].content;
            var numPages = book_doc.querySelectorAll('span[itemprop="numberOfPages"]')[0].innerText.strip();
            var bookCover = book_doc.getElementById('coverImage').src;
            var bookid = book_doc.querySelectorAll('div[data-book-id]')[0].getAttribute('data-book-id');

            return {
                genres,
                rating,
                numRatings,
                numPages,
                bookCover,
                bookid,
            }
        }

        var blocklist = {[config.seed]: true};
        config.blocklist.forEach((blocked) => {
            blocklist[blocked] = true;
        });
        var random_user = await dive(window.location.pathname, config.depth, blocklist);

        console.log('Fetching bookshelf from user: ', random_user);

        var allbooks = await getAllBooks(random_user, 1)

        console.log('Found a total of ', allbooks.length, ' books');

        var random_book = chooseRandomElem(allbooks);

        var book_summary = await fetch(random_book.href).then((resp) => resp.text()).then((data) => {
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            return getBookSummary(htmlDoc);
        }).catch((err) => console.error(err))

        console.log('Random book: ', book_summary);
    };

    document.onkeypress = function (e) {
        e = e || window.event;
        if (e.code === "Minus" || e.code == "Equal") {
            bookdate();
        }
    };
})();