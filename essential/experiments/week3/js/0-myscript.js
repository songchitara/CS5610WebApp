console.log("Playing with jQuery");


$(function () {
    console.log("Hello from jQuery, lambda");
    $("p")
        .css("color", "blue")
        .css("background-color", "yellow");
    $("h1")
        .css({
            "color": "white",
            "background-color":"grey"
        });
    $("p#p3")
        .css({
            "background-color": "black"

        });

    $("h2").append(" New added h2");

    $("body").append("<p>This is a new para</p>");

    var newPara = $("<p>New Paragraph</p>");

    $("body").append(newPara);

});


$(function () {
    var paraArr = ["Para A", "Para B", "Para C"];
    var ul = $("ul#ul-1");
    ul.empty();
    for (var i in paraArr) {
        var li = $("<li>" + paraArr[i] + "</li>");
        ul.append(li);
    }
});

$(function () {
    var employeeObj = {
        fName: "Alice",
        lName: "Wonderland"
    };

    var employee = $("#employee");
    employee.find("#fName").html(employeeObj.fName);
});


$(function () {
    var employees = [
        { fName: "Chi", lName: "Song" },
        { fName: "Lin", lName: "Zhu" },
        { fName: "Tara", lName: "Goinbo" }
    ];

    var employeesDom = $("#employees");
    employeesDom.empty();
    for (var i in employees) {
        var e = employees[i];
        var tr = $("<tr>");
        var td = $("<td>");
        td.append(e.fName);
        tr.append(td);
        var td = $("<td>");
        td.append(e.lName);
        tr.append(td);
        employeesDom.append(tr);
    };
});


