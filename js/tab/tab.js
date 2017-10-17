'use strict';

(function () {
    var scrollSetp = 500,
        operationWidth = 280,
        leftOperationWidth = 30,
        animateSpeed = 150,
        linkFrame = function (url, value) {
            $("#menu-list a.active").removeClass("active");
            $("#menu-list a[data-url='" + url + "'][data-value='" + value + "']").addClass("active");
            $("#page-content iframe.active").removeClass("active");
            $("#page-content .iframe-content[data-url='" + url + "'][data-value='" + value + "']").addClass("active");
            $("#menu-all-ul li.active").removeClass("active");
            $("#menu-all-ul li[data-url='" + url + "'][data-value='" + value + "']").addClass("active")
        },
        move = function (el) {
            var nav = $("#menu-list");
            var reLeft = el.offset().left;
            var wWidth = parseInt($("#page-tab").width());
            var left = parseInt(nav.css("margin-left"));
            if (reLeft < 0 && reLeft <= wWidth) {
                nav.animate({
                        "margin-left": (left - reLeft + leftOperationWidth) + "px"
                    },
                    animateSpeed)
            } else {
                if (reLeft + el.width() > wWidth - operationWidth) {
                    nav.animate({
                            "margin-left": (left - reLeft + wWidth - el.width() - operationWidth) + "px"
                        },
                        animateSpeed)
                }
            }
        },
        createMove = function () {
            var nav = $("#menu-list");
            var wWidth = parseInt($("#page-tab").width());
            var navWidth = parseInt(nav.width());
            if (wWidth - operationWidth < navWidth) {
                nav.animate({
                        "margin-left": "-" + (navWidth - wWidth + operationWidth) + "px"
                    },
                    animateSpeed)
            }
        },
        closeMenu = function () {
            $(this.parentElement).animate({
                    "width": "0",
                    "padding": "0"
                },
                0,
                function () {
                    var $this = $(this);
                    if ($this.hasClass("active")) {
                        var liNext = $this.next();
                        if (liNext.length > 0) {
                            liNext.click();
                            move(liNext)
                        } else {
                            var liPrev = $this.prev();
                            if (liPrev.length > 0) {
                                liPrev.click();
                                move(liPrev)
                            }
                        }
                    }
                    this.remove();
                    $("#page-content .iframe-content[data-url='" + $this.data("url") + "'][data-value='" + $this.data("value") + "']").remove()
                });
            event.stopPropagation()
        },
        init = function () {
            $("#page-prev").bind("click", function () {
                var nav = $("#menu-list");
                var left = parseInt(nav.css("margin-left"));
                if (left !== 0) {
                    nav.animate({
                            "margin-left": (left + scrollSetp > 0 ? 0 : (left + scrollSetp)) + "px"
                        },
                        animateSpeed)
                }
            });
            $("#page-next").bind("click", function () {
                var nav = $("#menu-list");
                var left = parseInt(nav.css("margin-left"));
                var wWidth = parseInt($("#page-tab").width());
                var navWidth = parseInt(nav.width());
                var allShowLeft = -(navWidth - wWidth + operationWidth);
                if (allShowLeft !== left && navWidth > wWidth - operationWidth) {
                    var temp = (left - scrollSetp);
                    nav.animate({
                            "margin-left": (temp < allShowLeft ? allShowLeft : temp) + "px"
                        },
                        animateSpeed)
                }
            });
            $("#menu-all-ul").bind("click", function (event) {
                /*console.log(event.target);*/
                var li = event.target;
                if (li) {
                    var $closeEl = $(li);
                    console.log($currEl);
                    switch ($closeEl.attr("close-op")) {
                        case "another":
                            var $currEl;
                            var $tabList = $("#menu-list a");
                            var closeList = [];
                            $tabList.each(function (i, item) {
                                var $tabEl = $(item);
                                if ($tabEl.hasClass("active")) {
                                    $currEl = $tabEl;
                                } else {
                                    closeList.push($tabEl);
                                }
                            });
                            $.each(closeList, function (i, item) {
                                $(item).children("i").click();
                            });
                            if ($currEl) {
                                $currEl.click();
                            }
                            break;
                        case "right":
                            var $currEl = $("#menu-list a.active");
                            var $rightAll = $currEl.nextAll();
                            $rightAll.each(function (i, item) {
                                $(item).children("i").click();
                            });
                            $currEl.click();
                            break;
                        case "left":
                            var $currEl = $("#menu-list a.active");
                            var $leftAll = $currEl.prevAll();
                            $leftAll.each(function (i, item) {
                                $(item).children("i").click();
                            });
                            $currEl.click();
                            break;
                        case "all":
                            /*console.log("all");*/
                            /*console.log($tabList);*/
                            var $defTabEl;
                            var $tabList = $("#menu-list a");
                            $tabList.each(function (i, item) {
                                var $tabEl = $(item);
                                var $closeEl = $tabEl.children("i");
                                if ($closeEl.attr("op-data") && $closeEl.attr("op-data") === "no-close") {
                                    $defTabEl = $tabEl;
                                } else {
                                    $closeEl.click();
                                }
                            });
                            if ($defTabEl) {
                                $defTabEl.click();
                            }
                            break;
                    }
                }
                /*event.stopPropagation();*/
            });
            $("#page-operation").bind("click", function () {
                var menuAll = $("#menu-all");
                if (menuAll.is(":visible")) {
                    menuAll.hide()
                } else {
                    menuAll.show()
                }
            });
            $("body").bind("mousedown", function (event) {
                if (!(event.target.id === "menu-all" || event.target.id === "menu-all-ul" || event.target.id === "page-operation" || event.target.id === "page-operation" || event.target.parentElement.id === "menu-all-ul")) {
                    $("#menu-all").hide()
                }
            })
        };
    $.fn.tab = function () {
        init();
        this.bind("click", function () {
            var linkUrl = this.href;
            var linkHtml = this.text.trim();
            var opData = this.attributes["op-data"] ? this.attributes["op-data"].nodeValue : undefined;
            var el = $("#menu-list a[data-url='" + linkUrl + "'][data-value='" + linkHtml + "']");
            if (el.length === 0) {
                var iel = "";

                if (opData && opData === "no-close") {
                    iel = $("<i>", {
                        "op-data": "no-close",
                        "class": "menu-no-close"
                    });
                } else {
                    iel = $("<i>", {
                        "class": "menu-close"
                    }).bind("click", closeMenu);
                }

                $("<a>", {
                    "html": linkHtml,
                    "href": "javascript:void(0);",
                    "data-url": linkUrl,
                    "data-value": linkHtml
                }).bind("click", function () {
                    var $this = $(this);
                    linkFrame($this.data("url"), $this.data("value"))
                }).append(iel).appendTo("#menu-list");

                $("<iframe>", {
                    "class": "iframe-content",
                    "data-url": linkUrl,
                    "data-value": linkHtml,
                    src: linkUrl
                }).appendTo("#page-content");

                /*$("<li>", {
                 "view": linkHtml,
                 "data-url": linkUrl,
                 "data-value": linkHtml
                 }).bind("click", function () {
                 var $this = $(this);
                 linkFrame($this.data("url"), $this.data("value"));
                 move($("#menu-list a[data-url='" + linkUrl + "'][data-value='" + linkHtml + "']"));
                 $("#menu-all").hide();
                 event.stopPropagation()
                 }).appendTo("#menu-all-ul");*/

                createMove()
            } else {
                move(el)
            }
            linkFrame(linkUrl, linkHtml);
            return false
        });
        return this
    }
})();