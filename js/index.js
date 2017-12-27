/**
 * Created by Administrator on 2017/12/21 0021.
 */
$(function () {
    banerRender();
    initTabSwipe();
});
var banerRender = function () {
    var renderHtml = function () {
        var isMobile = $(window).width() < 768;
        $(".carousel-indicators").html(template("prointTpl", window.data));
        $(".carousel-inner").html(template("imgTpl", {list: window.data, isM: isMobile}));
    }
    var render = function () {
        if (window.data) {
            renderHtml();
        } else {
            $.ajax({
                type: "get",
                url: "./js/data.json",
                data: "",
                dataType: "json",
                success: function (data) {
                    window.data = data;
                    renderHtml();
                }
            })
        }
    };
    render();
    $(window).resize(function () {
        render();
    });

    var startX = 0,
        distanceX = 0,
        isMove = false;
    $(".wjs_slideshow").on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].pageX;
    });
    $(".wjs_slideshow").on("touchmove", function (e) {
        distanceX = e.originalEvent.touches[0].pageX - startX;
        isMove = true;
    });
    $(".wjs_slideshow").on("touchend", function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                $('#carousel-example-generic').carousel('prev');
            } else {
                $('#carousel-example-generic').carousel('next');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
};
var initTabSwipe = function () {
    var $tab = $(".wjs_product .nav-tabs");
    var $tabChildren = $tab.children();
    var width = 0;
    $tabChildren.each(function (i, item) {
        width += $(item).outerWidth(true);
    });
    $tab.width(width);
    new IScroll(".nav-tabs-parent",{
        scrollX: true,
        scrollY: false,
        click:true
    });
};
