$(function () {
    $("#accordion")
      .accordion({
          header: "> div > h3",
          collapsible: true
      })
      .sortable({
          axis: "y",
          handle: "h3",
          stop: function (event, ui) {
              // IE doesn't register the blur when sorting
              // so trigger focusout handlers to remove .ui-state-focus
              ui.item.children("h3").triggerHandler("focusout");

              // Refresh accordion to handle new order
              $(this).accordion("refresh");
          }
      });
});

$(function () {
    var tabs = $("#tabs").tabs();
    tabs.find(".ui-tabs-nav").sortable({
        axis: "x",
        stop: function () {
            tabs.tabs("refresh");
        }
    });
});

$(function () {
    var accordionDom = $("div#accordion");
    var tabsDom = $("div#tabs");
    if ($(window).width() <= 700) {
        accordionDom.attr("style", "display:block");
        tabsDom.attr("style", "display: none");
    }
    else {
        $(function () {
            accordionDom.attr("style", "display:none");
            tabsDom.attr("style", "display: block");
        });
    }
});


$(window).resize(function () {
    var accordionDom = $("div#accordion");
    var tabsDom = $("div#tabs");

    if ($(window).width() <= 700) {
        $(function () {
            accordionDom.attr("style", "display:block");
            tabsDom.attr("style", "display: none");
        });

    }
    else {
        $(function () {
            accordionDom.attr("style", "display:none");
            tabsDom.attr("style", "display: block");
        });
    }
});