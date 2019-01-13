/* global simple, d3 */

document.addEventListener("DOMContentLoaded", function () {

    const svgWidth = 600;
    const svgHeight = 700;
    const margin = {top: 20, right: 20, bottom: 50, left: 70};
    const contentWidth = svgWidth - margin.left - margin.right;
    const contentHeight = svgHeight - margin.top - margin.bottom;


    function arraySortComparatorAsc(a, b) {
        return (new Date(a.messageDate)).getTime() - (new Date(b.messageDate)).getTime();
    }
    function arraySortComparatorDesc(a, b) {
        return (new Date(b.messageDate)).getTime() - (new Date(a.messageDate)).getTime();
    }

    const dataToUse = simple;

    dataToUse.sort(arraySortComparatorDesc);

    const firstDate = new Date(dataToUse[0].rsvpDate);
    const lastDate = new Date(dataToUse[dataToUse.length - 1].rsvpDate);

    // https://github.com/d3/d3-collection#nests
    const nested = d3.nest()
            .key(d => d.name)
            .sortValues(arraySortComparatorDesc)
            .entries(dataToUse);

    document.querySelector("pre").innerHTML = JSON.stringify(nested, null, 2);
    /////////////////////////////////////////////////////////////////

    const scaleX = d3.scaleTime().range([0, contentWidth]);
    const scaleY = d3.scaleLinear().range([contentHeight, 0]);

    scaleX.domain([lastDate, firstDate]).nice();

    const groupContent = d3.select("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("id", "content")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
            .attr("text-anchor", "middle")
            .text("Date");



    ////////////////////////////////////////////////////////////
    const colors = {yes: "green", no: "red", "waitlist": "orange"};

    const count = nested.length / 2;

    const barHeight = 100;
    const barSpacing = (contentHeight - (barHeight * count)) / count;
    if (barSpacing < 0) {
        console.warn("svg is not tall enough for this many records and the given bar height");
    }
    const groupRsvps = groupContent.append("g").attr("id", "rsvps");

    for (var i = 0; i < count; i++) {
        const nestObj = nested[i];

        const name = nestObj.key;

//        if(name !== "Han") {
//            continue;
//        }


        const yPosition = (barHeight + barSpacing) * i;

        const groupPerson = groupRsvps
                .append("g")
                .attr("id", name)
                .attr("transform", "translate(" + 0 + "," + yPosition + ")");

        groupPerson.append("text")
                .text(name)
                .attr("text-anchor", "right")
                .attr("x", -50)
                .attr("y", barHeight / 2)
                .attr("alignment-baseline", "middle")
                .attr("font-size", "14px");


        var previousRsvpObj = null;
        nestObj.values.forEach(rsvpObj => {



            groupPerson.append("rect")
                    .attr("x", scaleX(new Date(rsvpObj.rsvpDate)))
                    .attr("y", 0)
                    .attr("width", 20)
                    .attr("height", barHeight)
                    .attr("opacity", 0.8)
                    .attr("fill", colors[rsvpObj.rsvp.toLowerCase()]);

        });



    }



});