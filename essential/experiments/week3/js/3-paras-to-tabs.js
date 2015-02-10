$(document).ready(
            function () {
                $("button")
                  .button()
                  .click(function (event) {
                      var parasDom = $("#paras");
                      var sections = parasDom.children("section");
                      // get tabs DOM 
                      var tabsDom = $("#tabs");
                      // create ul DOM
                      tabsDom.append("<ul></ul>");
                      var ulDom = tabsDom.find("ul");

                      // iterate over the sections array
                      $.each(sections, function (i, sec) {
                          i++;  // index start from 1
                          // get the title
                          var title = $(sec).find("header").text();
                          // get the paragraph
                          var para = $(sec).find("p");
                          // add title name to the tab name
                          ulDom.append("<li><a href=\"\#tabs-" + i + "\">" + title + "</a></li>");
                          // add paragraph content to the tab content
                          tabsDom.append("<div id=\"tabs-" + i + "\">" + "</div>");
                          thisDiv = $("#tabs-" + i);
                          thisDiv.append(para);
                          console.log(thisDiv.text());

                      });

                      // Transform to tabs
                      $("#tabs").tabs();
                      // Hide button
                      $(this).attr("style", "display:None");
                      // Hide original paragraphs
                      $("div#paras").attr("style", "display: None");
                  });
            });