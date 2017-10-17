/**
 * Created by hasee on 2017/10/13.
 */
$(function () {

    $("#notify-btn").click(function () {
        $(this).toggleClass("notify-btn-white");
        $("#notify-list").toggleClass("open");
        $("#notify-detail-close").click();
    });

    $("#notify-detail-close").click(function () {
        cancelNotifySelected();
    });

    function cancelNotifySelected() {
        $("#notify-detail").removeClass("open").hide();
        $(".notify-list-selected").toggleClass("notify-list-selected").find(":first-child").toggleClass("sms-icon-open");
    }

    $("#notify-list-ul").click(function (event) {
        var target = event.target;
        if (target.nodeName === "SPAN") {
            /*console.log(target.parentNode);*/
            target = target.parentNode;
        }
        if (target.nodeName === "LI") {
            /*console.log(target);*/
            cancelNotifySelected();
            var $target = $(target).toggleClass("notify-list-selected");
            $target.find(":first-child").toggleClass("sms-icon-open");
            /**
             * todo 清空并填充消息详情
             */
            $("#notify-detail").css({
                "top": $target.offset().top
            }).addClass("open");
        }
        event.stopPropagation();
    })
});