/* global d3, GMAIL_ADDON_OUTPUT */
const DEBUG_PRINTOUTS = false;

class MeetupRsvpChart {

    constructor() {

        this.eventDate = new Date("Dec 8 2018 2:00 PM");
        this.preJsonDisplay = document.querySelector("pre");
        this.FONT_SIZE = 14;


//        const eventDateStrokeDashArray = [5, 5];


        function arraySortComparatorAsc(a, b) {
            return (new Date(a.gmailMessageDate)).getTime() - (new Date(b.gmailMessageDate)).getTime();
        }
        function arraySortComparatorDesc(a, b) {
            return (new Date(b.gmailMessageDate)).getTime() - (new Date(a.gmailMessageDate)).getTime();
        }

        const DEBUG_PRINTOUTS = false;

        this.dataToUse = GMAIL_ADDON_OUTPUT.bigDateRange;

        this.dataToUse.sort(arraySortComparatorDesc);
        this.preJsonDisplay.innerHTML = JSON.stringify(this.dataToUse, null, 2);

        // https://github.com/d3/d3-collection#nests
        this.dataNested = d3.nest()
                .key(d => d.name)
                .sortValues(arraySortComparatorAsc)
                .entries(this.dataToUse);

        this.initSVG.call(this);
        this.draw.call(this);

    }

    initSVG() {
        this.svg = {
            width: 1000,
            height: 800,
            element: null
        };
        this.svg.element = d3.select("svg")
                .attr("width", this.svg.width)
                .attr("height", this.svg.height);

        this.margin = {top: 20, right: 20, bottom: 20, left: 20};

        this.content = {
            width: this.svg.width - this.margin.left - this.margin.right,
            height: this.svg.height - this.margin.top - this.margin.bottom
        };

        this.barHeight = 40;

        initScales.call(this);
        initGroups.call(this);
        initXAxis.call(this);
        initPanZoom.call(this);

        function initScales() {
            this.scale = {
                x: d3.scaleTime().range([0, this.content.width]),
                y: d3.scaleLinear().range([this.content.height, 0])
            };

            const firstRsvpDate = new Date(this.dataToUse[0].rsvpDate);
            const lastRsvpDate = new Date(this.dataToUse[this.dataToUse.length - 1].rsvpDate);
            this.scale.x.domain([lastRsvpDate, Math.max(firstRsvpDate, this.eventDate)]);
        }



        function initGroups() {
            this.group = {
                main: null,
                content: null,
                axis: {}
            };

            //main group contains everything, translated for margins. does not get transformed during zoom.
            this.group.main = this.svg.element.append("g")
                    .attr("id", "main")
                    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

            //content group does not contain axes. does get transformed during zoom.
            this.group.content = this.group.main
                    .append("g")
                    .attr("id", "content");
//            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        function initXAxis() {
            this.axis = {
                x: d3.axisBottom(this.scale.x)
            };

            // x axis display
            this.group.axis.x = this.group.main.append("g")
                    .attr("id", "axisX")
                    .attr("transform", "translate(0," + this.content.height + ")")
                    .call(this.axis.x);
        }


        function initPanZoom() {
            const ZOOM_X_ONLY = true;
            const zoomController = d3.zoom()
//            .scaleExtent([1, 1])
                    .on("zoom", () => {

                        const transform = d3.event.transform;
                        const transformString = transform.toString();
                        const zoomLevel = transform.k;

                        if (ZOOM_X_ONLY) {
                            // https://github.com/d3/d3-zoom#zoomTransform
                            this.group.content.attr("transform",
                                    "translate(" + transform.x + ",0)" +
                                    "scale(" + transform.k + ",1)"
                                    );

                        } else {
                            this.group.content.attr("transform", transformString);

                            d3.select("g#names")
                                    .attr("transform", "translate(" + -transform.x + ",0) " + transformString)
                                    .selectAll("text").attr("font-size", FONT_SIZE / zoomLevel)
                                    ;

                        }
                        this.group.axis.x.call(this.axis.x.scale(transform.rescaleX(this.scale.x)));

                        d3.selectAll("line#eventDate,line#fortyEightHoursBefore")
                                .attr("stroke-width", 1 / zoomLevel)
//                        .attr("stroke-dasharray", eventDateStrokeDashArray.map(n => n / zoomLevel).toString())
                                ;
                    });
            this.svg.element.call(zoomController);

            d3.select("button").on("click", () => this.svg.element.call(zoomController.transform, d3.zoomIdentity));
        }
    }

    draw() {
        const colors = {yes: "green", no: "red", "waitlist": "orange"};

        const count = this.dataNested.length;

        const barSpacing = (this.content.height - (this.barHeight * count)) / count;
        if (barSpacing < 0) {
            console.warn("svg is not tall enough for this many records and the given bar height");
        }
        const groupRsvps = this.group.content.append("g").attr("id", "rsvps");

        const groupNames = this.group.main.append("g").attr("id", "names");

        for (var i = 0; i < count; i++) {
            const nestObj = this.dataNested[i];

            const name = nestObj.key;

            const yPosition = (this.barHeight + barSpacing) * i;

            const groupPerson = groupRsvps
                    .append("g")
                    .attr("id", name)
                    .attr("transform", "translate(0," + yPosition + ")");

            groupNames.append("text")
                    .text(name)
                    .attr("text-anchor", "left")
//                .attr("x", -50)
                    .attr("y", yPosition + this.barHeight / 2)
                    .attr("alignment-baseline", "middle")
                    .attr("font-size", this.barHeight + "px")
                    .classed("name", true);



            const countInThisNest = nestObj.values.length;

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
                const xStart = this.scale.x(startDate);

                let xEnd;
                if (previousRsvpObj.rsvp.toLowerCase() === "waitlist" && currentRsvpObj.isUpdate) {
                    // THIS IS WRONG because the gmail message date doesn't matter.
                    // actually need to use date from other rsvps in that email!!!
                    const endDate = currentRsvpObj.gmailMessageDate;
                    if (DEBUG_PRINTOUTS) {
                        console.log("end date from gmail message: " + endDate);
                    }
                    xEnd = this.scale.x(new Date(endDate));
                } else {
                    const endDate = currentRsvpObj.rsvpDate;
                    if (DEBUG_PRINTOUTS) {
                        console.log("end date: " + endDate);
                    }
                    xEnd = this.scale.x(new Date(endDate));
                }


                const width = xEnd - xStart;
                if (DEBUG_PRINTOUTS) {
                    console.log("width: " + width);
                }

                groupPerson.append("rect")
                        .attr("x", xStart)
                        .attr("y", 0)
                        .attr("width", width)
                        .attr("height", this.barHeight)
//                    .attr("opacity", 0.6)
                        .attr("fill", colors[previousRsvpObj.rsvp.toLowerCase()]);

                console.groupEnd();

            }

            //now need to draw rect for last row, which ends at the event start
            const lastRsvpObj = nestObj.values[countInThisNest - 1];
            const startDate = new Date(lastRsvpObj.rsvpDate);
            const xStart = this.scale.x(startDate);
            const xEnd = this.scale.x(this.eventDate);
            const width = xEnd - xStart;

            groupPerson.append("rect")
                    .attr("x", xStart)
                    .attr("y", 0)
                    .attr("width", width)
                    .attr("height", this.barHeight)
//                .attr("opacity", 0.6)
                    .attr("fill", colors[lastRsvpObj.rsvp.toLowerCase()]);



        }

        const xPositionEventDate = this.scale.x(this.eventDate);
        this.group.content.append("line")
                .attr("id", "eventDate")
                .attr("x1", xPositionEventDate)
                .attr("y1", -999)
                .attr("x2", xPositionEventDate)
                .attr("y2", 999)
//            .attr("stroke-dasharray", eventDateStrokeDashArray.toString())
                .attr("stroke", "black");


        const millisecondsIn48Hrs = 1000 * 60 * 24 * 48;
        const fortyEightHoursBefore = new Date(this.eventDate.getTime() - millisecondsIn48Hrs);
        const xPosition48hrsBefore = this.scale.x(fortyEightHoursBefore);
        this.group.content.append("line")
                .attr("id", "fortyEightHoursBefore")
                .attr("x1", xPosition48hrsBefore)
                .attr("y1", -999)
                .attr("x2", xPosition48hrsBefore)
                .attr("y2", 999)
//            .attr("stroke-dasharray", eventDateStrokeDashArray.toString())
                .attr("stroke", "black");



    }

}