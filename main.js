/* global simple, d3, gmailAddOnOutput */

document.addEventListener("DOMContentLoaded", function () {

    const svgWidth = 1000;
    const svgHeight = 800;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const contentWidth = svgWidth - margin.left - margin.right;
    const contentHeight = svgHeight - margin.top - margin.bottom;
//    var zoomLevel = 1;
    const barHeight = 10;
    const eventDate = new Date("Dec 8 2018 2:00 PM");
    const preJsonDisplay = document.querySelector("pre");
    const FONT_SIZE = 14;

    const eventDateStrokeDashArray = [5, 5];


    function arraySortComparatorAsc(a, b) {
        return (new Date(a.gmailMessageDate)).getTime() - (new Date(b.gmailMessageDate)).getTime();
    }
    function arraySortComparatorDesc(a, b) {
        return (new Date(b.gmailMessageDate)).getTime() - (new Date(a.gmailMessageDate)).getTime();
    }

    const DEBUG_PRINTOUTS = false;

    const dataToUse = everything;

    dataToUse.sort(arraySortComparatorDesc);
    preJsonDisplay.innerHTML = JSON.stringify(dataToUse, null, 2);

    const firstRsvpDate = new Date(dataToUse[0].rsvpDate);
    const lastRsvpDate = new Date(dataToUse[dataToUse.length - 1].rsvpDate);

    // https://github.com/d3/d3-collection#nests
    const nested = d3.nest()
            .key(d => d.name)
            .sortValues(arraySortComparatorAsc)
            .entries(dataToUse);

//    preJsonDisplay.innerHTML = JSON.stringify(nested, null, 2);


    //////////////////////// svg initialization /////////////////////////////////////////



    const scaleX = d3.scaleTime().range([0, contentWidth]);
    const scaleY = d3.scaleLinear().range([contentHeight, 0]);

    scaleX.domain([lastRsvpDate, Math.max(firstRsvpDate, eventDate)]);

    const svg = d3.select("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            ;


    //main group contains everything, translated for margins. does not get transformed during zoom.
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


    const ZOOM_X_ONLY = true;

    // pan & zoom
    const zoomController = d3.zoom()
//            .scaleExtent([1, 1])
            .on("zoom", () => {

                const transform = d3.event.transform;
                const transformString = transform.toString();
                const zoomLevel = transform.k;

                if (ZOOM_X_ONLY) {
                    // https://github.com/d3/d3-zoom#zoomTransform
                    groupContent.attr("transform",
                            "translate(" + transform.x + ",0)" +
                            "scale(" + transform.k + ",1)"
                            );

                } else {
                    groupContent.attr("transform", transformString);

                    d3.select("g#names")
                            .attr("transform", "translate(" + -transform.x + ",0) " + transformString)
                            .selectAll("text").attr("font-size", FONT_SIZE / zoomLevel)
                            ;

                }
                groupAxisX.call(axisX.scale(transform.rescaleX(scaleX)));

                d3.selectAll("line#eventDate,line#fortyEightHoursBefore")
                        .attr("stroke-width", 1 / zoomLevel)
//                        .attr("stroke-dasharray", eventDateStrokeDashArray.map(n => n / zoomLevel).toString())
                        ;
            });
    svg.call(zoomController);

    d3.select("button").on("click", () => svg.call(zoomController.transform, d3.zoomIdentity));


    //////////////////////// drawing the data ////////////////////////////////////
    const colors = {yes: "green", no: "red", "waitlist": "orange"};

    const count = nested.length;

    const barSpacing = (contentHeight - (barHeight * count)) / count;
    if (barSpacing < 0) {
        console.warn("svg is not tall enough for this many records and the given bar height");
    }
    const groupRsvps = groupContent.append("g").attr("id", "rsvps");

    const groupNames = groupMain.append("g").attr("id", "names");

    for (var i = 0; i < count; i++) {
        const nestObj = nested[i];

        const name = nestObj.key;

        const yPosition = (barHeight + barSpacing) * i;

        const groupPerson = groupRsvps
                .append("g")
                .attr("id", name)
                .attr("transform", "translate(0," + yPosition + ")");

        groupNames.append("text")
                .text(name)
                .attr("text-anchor", "left")
//                .attr("x", -50)
                .attr("y", yPosition + barHeight / 2)
                .attr("alignment-baseline", "middle")
                .attr("font-size", barHeight + "px")
                .classed("name", true);



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

            if (DEBUG_PRINTOUTS) {
                console.group("drawing rect for " + previousRsvpObj.rsvp);
                console.log("current=" + currentRsvpObj.rsvp + ", previous=" + previousRsvpObj.rsvp);
            }

            let startDate;
            if (previousRsvpObj.isUpdate && nestObj.values[j - 2].rsvp.toLowerCase() === "waitlist") {
                startDate = new Date(previousRsvpObj.gmailMessageDate);
            } else {
                startDate = new Date(previousRsvpObj.rsvpDate);
            }
            if (DEBUG_PRINTOUTS) {
                console.log("start date: " + startDate);
            }
            const xStart = scaleX(startDate);

            let xEnd;
            if (previousRsvpObj.rsvp.toLowerCase() === "waitlist" && currentRsvpObj.isUpdate) {
                // THIS IS WRONG because the gmail message date doesn't matter.
                // actually need to use date from other rsvps in that email!!!
                const endDate = currentRsvpObj.gmailMessageDate;
                if (DEBUG_PRINTOUTS) {
                    console.log("end date from gmail message: " + endDate);
                }
                xEnd = scaleX(new Date(endDate));
            } else {
                const endDate = currentRsvpObj.rsvpDate;
                if (DEBUG_PRINTOUTS) {
                    console.log("end date: " + endDate);
                }
                xEnd = scaleX(new Date(endDate));
            }


            const width = xEnd - xStart;
            if (DEBUG_PRINTOUTS) {
                console.log("width: " + width);
            }

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

    const xPositionEventDate = scaleX(eventDate);
    groupContent.append("line")
            .attr("id", "eventDate")
            .attr("x1", xPositionEventDate)
            .attr("y1", -999)
            .attr("x2", xPositionEventDate)
            .attr("y2", 999)
//            .attr("stroke-dasharray", eventDateStrokeDashArray.toString())
            .attr("stroke", "black");


    const millisecondsIn48Hrs = 1000 * 60 * 24 * 48;
    const fortyEightHoursBefore = new Date(eventDate.getTime() - millisecondsIn48Hrs);
    const xPosition48hrsBefore = scaleX(fortyEightHoursBefore);
    groupContent.append("line")
            .attr("id", "fortyEightHoursBefore")
            .attr("x1", xPosition48hrsBefore)
            .attr("y1", -999)
            .attr("x2", xPosition48hrsBefore)
            .attr("y2", 999)
//            .attr("stroke-dasharray", eventDateStrokeDashArray.toString())
            .attr("stroke", "black");




});