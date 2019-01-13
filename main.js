/* global gmailAddOnOutput, d3 */

document.addEventListener("DOMContentLoaded", function () {



    function arraySortComparator(a, b) {
        return (new Date(a.messageDate)).getTime() - (new Date(b.messageDate)).getTime();
    }

    gmailAddOnOutput.sort(arraySortComparator);

    const firstDate = new Date(gmailAddOnOutput[0].rsvpDate);
    const lastDate = new Date(gmailAddOnOutput[gmailAddOnOutput.length - 1].rsvpDate);
    initSvg(firstDate, lastDate);

    const pre = document.querySelector("pre");

    const nested = d3.nest()
            .key(d => d.name)//.sortValues(arraySortComparator)
            .entries(gmailAddOnOutput);

    pre.innerHTML = JSON.stringify(nested, null, 2);



    function initSvg(firstDate, lastDate) {

        const svgWidth = 600;
        const svgHeight = 400;
        const margin = {top: 20, right: 20, bottom: 50, left: 70};
        const contentWidth = svgWidth - margin.left - margin.right;
        const contentHeight = svgHeight - margin.top - margin.bottom;

        const scaleX = d3.scaleTime().range([0, contentWidth]);
        const scaleY = d3.scaleLinear().range([contentHeight, 0]);

        scaleX.domain([lastDate, firstDate]).nice();
//        scaleY.domain();

        const groupContent = d3.select("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .append("g")
                .attr("id", "content")
                .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

        // x axis
        groupContent.append("g")
                .attr("id", "axisX")
                .attr("transform", "translate(0," + contentHeight + ")")
                .call(d3.axisBottom(scaleX));

        // label for x axis 
        groupContent.append("text")
                .attr("transform",
                        "translate(" + (contentWidth / 2) + " ," +
                        (contentHeight + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Date");

        // y axis
        groupContent.append("g")
                .attr("id", "axisY")
                .call(d3.axisLeft(scaleY));

        // label for y axis
        groupContent.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (contentHeight / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Value");

    }

});