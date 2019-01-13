/* global simple, d3 */

document.addEventListener("DOMContentLoaded", function () {

    const svgWidth = 1000;
    const svgHeight = 700;
    const margin = {top: 20, right: 20, bottom: 50, left: 70};
    const contentWidth = svgWidth - margin.left - margin.right;
    const contentHeight = svgHeight - margin.top - margin.bottom;
//    var zoomLevel = 1;
    const barHeight = 100;
    const eventDate = new Date("Dec 8 2018 2:00 PM");


    function arraySortComparatorAsc(a, b) {
        return (new Date(a.gmailMessageDate)).getTime() - (new Date(b.gmailMessageDate)).getTime();
    }
    function arraySortComparatorDesc(a, b) {
        return (new Date(b.gmailMessageDate)).getTime() - (new Date(a.gmailMessageDate)).getTime();
    }

    const dataToUse = simple;

//    dataToUse.sort(arraySortComparatorDesc);

    const firstDate = new Date(dataToUse[0].rsvpDate);
    const lastDate = new Date(dataToUse[dataToUse.length - 1].rsvpDate);

    // https://github.com/d3/d3-collection#nests
    const nested = d3.nest()
            .key(d => d.name)
            .sortValues(arraySortComparatorAsc)
            .entries(dataToUse);

    document.querySelector("pre").innerHTML = JSON.stringify(nested, null, 2);
    //////////////////////// svg initialization /////////////////////////////////////////



    const scaleX = d3.scaleTime().range([0, contentWidth]);
    const scaleY = d3.scaleLinear().range([contentHeight, 0]);

    scaleX.domain([lastDate, firstDate]);//.nice();

    const svg = d3.select("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

    //main group contains everything, translated for margins
    const groupMain = svg.append("g")
            .attr("id", "main")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //content group does not contain axes. does get transformed during zoom.
    const groupContent = groupMain
            .append("g")
            .attr("id", "content");
//            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const axisX = d3.axisBottom(scaleX);

    // x axis display
    const groupAxisX = groupMain.append("g")
            .attr("id", "axisX")
            .attr("transform", "translate(0," + contentHeight + ")")
            .call(axisX);

    // label for x axis 
    groupMain.append("text")
            .attr("transform",
                    "translate(" + (contentWidth / 2) + " ," +
                    (contentHeight + margin.top + 20) + ")")
            .attr("text-anchor", "middle")
            .text("Date");

    const xPositionEventDate = scaleX(eventDate);
    groupContent.append("line")
            .attr("x1", xPositionEventDate)
            .attr("y1", -999)
            .attr("x2", xPositionEventDate)
            .attr("y2", 999)
            .attr("stroke", "black");


    // pan & zoom
    const zoomController = d3.zoom().on("zoom", () => {
        const transform = d3.event.transform;
        groupContent.attr("transform", transform);
        groupAxisX.call(axisX.scale(transform.rescaleX(scaleX)));
        const zoomLevel = transform.k;
        d3.selectAll("rect").attr("height", barHeight / zoomLevel);
    });
    svg.call(zoomController);

    d3.select("button").on("click", () => svg.call(zoomController.transform, d3.zoomIdentity));


    //////////////////////// drawing the data ////////////////////////////////////
    const colors = {yes: "green", no: "red", "waitlist": "orange"};

    const count = nested.length / 2;

    const barSpacing = (contentHeight - (barHeight * count)) / count;
    if (barSpacing < 0) {
        console.warn("svg is not tall enough for this many records and the given bar height");
    }
    const groupRsvps = groupContent.append("g").attr("id", "rsvps");

    for (var i = 0; i < count; i++) {
        const nestObj = nested[i];

        const name = nestObj.key;

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



        const countInThisNest = nestObj.values.length;

        if (countInThisNest < 2) {
            // the below for loop won't work, not sure when this case would happen though
        }

        for (var j = 1; j < countInThisNest; j++) {
            const currentRsvpObj = nestObj.values[j];
            const previousRsvpObj = nestObj.values[j - 1];
            if (!previousRsvpObj) {
                console.warn("looks like this for loop when out of bounds");
            }

            console.group("drawing rect for " + previousRsvpObj.rsvp);
            console.log("current=" + currentRsvpObj.rsvp + ", previous=" + previousRsvpObj.rsvp);

            let startDate;
            if (previousRsvpObj.isUpdate && nestObj.values[j - 2].rsvp.toLowerCase() === "waitlist") {
                startDate = new Date(previousRsvpObj.gmailMessageDate);
            } else {
                startDate = new Date(previousRsvpObj.rsvpDate);
            }
            console.log("start date: " + startDate);
            const xStart = scaleX(startDate);

            let xEnd;
            if (previousRsvpObj.rsvp.toLowerCase() === "waitlist" && currentRsvpObj.isUpdate) {
                // THIS IS WRONG because the gmail message date doesn't matter.
                // actually need to use date from other rsvps in that email!!!
                const endDate = currentRsvpObj.gmailMessageDate;
                console.log("end date from gmail message: " + endDate);
                xEnd = scaleX(new Date(endDate));
            } else {
                const endDate = currentRsvpObj.rsvpDate;
                console.log("end date: " + endDate);
                xEnd = scaleX(new Date(endDate));
            }


            const width = xEnd - xStart;
            console.log("width: " + width);

            groupPerson.append("rect")
                    .attr("x", xStart)
                    .attr("y", 0)
                    .attr("width", width)
                    .attr("height", barHeight)
//                    .attr("opacity", 0.6)
                    .attr("fill", colors[previousRsvpObj.rsvp.toLowerCase()]);

            console.groupEnd();

        }

        //now need to draw rect for last row, which ends at the event start
        const lastRsvpObj = nestObj.values[countInThisNest - 1];
        const startDate = new Date(lastRsvpObj.rsvpDate);
        const xStart = scaleX(startDate);
        const xEnd = scaleX(eventDate);
        const width = xEnd - xStart;

        groupPerson.append("rect")
                .attr("x", xStart)
                .attr("y", 0)
                .attr("width", width)
                .attr("height", barHeight)
//                .attr("opacity", 0.6)
                .attr("fill", colors[lastRsvpObj.rsvp.toLowerCase()]);



    }



});