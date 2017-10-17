$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();
        if ($this.attr("op-data") && $this.attr("op-data") === 'home') {
            return;
        }
        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
    };

    $("#menu-view-op").unbind('click').on('click', function (event) {
        event.stopPropagation();
        /*var $target = $(event.target);*/
        if (event.target.nodeName === "I") {
            $(".accordion .open .menu-list-row i").click();
            $("#tree-menu").toggleClass("tree-hide");
            $("#page-main").toggleClass("multi-tab-big");
            $(".menu-icon-last").toggleClass("element-hide");
            $("div.link span").toggleClass("element-hide");
        } else {
            $("#home-a").click();
        }
        /*console.log(deName);*/
    });

    var DragMenu = (function () {

        var dragging = null;
        var $menu = $("#tree-menu");
        var $page = $("#page-main");
        var dragSpeed = 15; //拖动速度
        return {
            start: function () {
                /*console.log("屏幕分辨率为：" + screen.width + "*" + screen.height);*/
                $(document).mousedown(function (event) {
                    /*鼠标按下，设置拖拽对象*/
                    if (event.target.nodeName === "DIV" && event.target.id === "drag-menu-area") {
                        dragging = event.target;
                    }
                }).mousemove(function (event) {
                    if (dragging) {
                        /*console.log(draging);*/
                        /*console.log("ClientX:" + event.clientX + ",ClientY:" + event.clientY);*/
                        if (event.clientX > 144 && event.clientX < (screen.width / (100 / 25))) {
                            /*增加一定像素的矿量，让元素拖动更加的流畅*/
                            var mWidth = event.clientX + dragSpeed;
                            if (event.clientX <= 150) {
                                mWidth = 144;
                            } else if (event.clientX >= (screen.width / (100 / 25)) - dragSpeed) {
                                mWidth = (screen.width / (100 / 30));
                            }
                            $menu.css({
                                "width": mWidth + "px"
                            });
                            $page.css({
                                "width": "calc(100% - " + mWidth + "px)"
                            });
                        }
                    }
                }).mouseup(function () {
                    /*鼠标抬起，释放拖拽对象*/
                    dragging = null;
                });
            }
        }
    })();

    DragMenu.start();

    var accordion = new Accordion($('#accordion'), false);
});