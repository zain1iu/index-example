/**
 * Created by hasee on 2017/10/18.
 */
$(function () {
    var closeEl = null;

    $(".new-input-el").focus(function () {
        $(this).next().show();
    }).blur(function () {
        if (!closeEl) {
            $(this).next().hide();
        }
    });

    $(".new-input-span").mousedown(function (event) {
        /*console.log(event);*/
        var target = event.target;
        if (target.nodeName === "I"
            && target.previousElementSibling.nodeName === "INPUT"
            && target.className === "input-clear-btn") {
            closeEl = target;
        }
    }).click(function (event) {
        if (event.target.nodeName === "I") {
            $(event.target).prev().val("").focus();
            closeEl = null;
            event.stopPropagation();
        }
    });

    $(".new-fold > .new-fold-btn").click(function () {
        $(this).toggleClass("new-fold-active");
    });

    $(".new-fold > .new-fold-btn2").click(function () {
        $(this).toggleClass("new-fold-active2");
    });

    $(".panel-heading > .nav-tabs > li").click(function () {
        $(".panel-heading > .nav-tabs > li").removeClass("active");
        $(this).addClass("active");
    });
});