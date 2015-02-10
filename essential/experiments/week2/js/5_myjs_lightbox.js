$(document).ready(function () {
    $(".lightbox").click(function (event) {
        event.preventDefault();
        originalLink = $(this).attr("href");
        window.startMask(originalLink);
        //return false;
    });
});

function startMask(originalLink) {
    $("body")
        .append('<div class="mask"></div><div id="holder"></div>')
        .css({ "overflow-y": "hidden" });

    $(".mask").animate({ "opacity": "0.5" }, 500, "linear");

    $("#holder").html('<img src="' + originalLink + '" alt="" />');

    $("#holder img").load(function () {
        var imgW = $("#holder img").width();
        var imgH = $("#holder img").height();
        $("#holder")
            .css({
                "top": "50%",
                "left": "50%",
                "width": imgW,
                "height": imgH,
                "margin-top": -(imgH / 2),
                "margin-left": -(imgW / 2) //to position it in the middle

            })
            .animate({ "opacity": "1" }, 500, "linear");
        window.removeMask();
    });
}
function removeMask() {
    $(".mask").click(function () {
        $("#holder, .mask").animate({ "opacity": "0" }, 200, "linear", function () {
            $("#holder, .mask").remove();
        });
        $('body').css({ "overflow-y": "auto" })
    });
}