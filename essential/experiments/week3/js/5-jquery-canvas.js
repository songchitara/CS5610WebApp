window.onload = function () {
    var pieChart = new CanvasJS.Chart("pieChartContainer",
    {
        title: {
            text: "Top Categoires of New Year's Resolution"
        },
        exportFileName: "Pie Chart",
        exportEnabled: true,
        animationEnabled: true,
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        data: [
        {
            type: "pie",
            showInLegend: true,
            toolTipContent: "{legendText}: <strong>{y}%</strong>",
            indexLabel: "{label} {y}%",
            dataPoints: [
                { y: 35, legendText: "Health", exploded: true, label: "Health" },
                { y: 20, legendText: "Finance", label: "Finance" },
                { y: 18, legendText: "Career", label: "Career" },
                { y: 15, legendText: "Education", label: "Education" },
                { y: 5, legendText: "Family", label: "Family" },
                { y: 7, legendText: "Real Estate", label: "Real Estate" }
            ]
        }
        ]
    });
    pieChart.render();

    var barChart = new CanvasJS.Chart("barChartContainer",
    {
        title: {
            text: "Top Oil Reserves"
        },
        animationEnabled: true,
        axisY: {
            title: "Reserves(MMbbl)"
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        theme: "theme2",
        data: [

        {
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "MMbbl = one million barrels",
            dataPoints: [
            { y: 297571, label: "Venezuela" },
            { y: 267017, label: "Saudi" },
            { y: 175200, label: "Canada" },
            { y: 154580, label: "Iran" },
            { y: 116000, label: "Russia" },
            { y: 97800, label: "UAE" },
            { y: 20682, label: "US" },
            { y: 20350, label: "China" }
            ]
        }
        ]
    });

    barChart.render();
}