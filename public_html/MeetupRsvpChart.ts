import * as d3 from "d3";
import { GMAIL_ADDON_OUTPUT, RsvpRecord } from "./gmailAddOnOutput.js";

interface SvgInterface {
    width: number;
    height: number;
    element: d3.Selection<SVGElement, undefined, HTMLElement, undefined>;
}

interface ContentInterface {
    width: number;
    height: number;
}

interface AxisInterface {
    // normally you also have a Y axis
    x: d3.Axis<Date | d3.NumberValue>;
}

interface ScaleInterface {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
}

interface GroupInterface {
    main: d3.Selection<SVGGElement, undefined, HTMLElement, undefined>,
    content: d3.Selection<SVGGElement, undefined, HTMLElement, undefined>,
    axis: {
        x: d3.Selection<SVGGElement, undefined, HTMLElement, undefined>
    }
}

type Colors = {
    [rsvpState in "Yes" | "No" | "Waitlist"]: string;
}

export class MeetupRsvpChart {

    private static colors: Colors = { Yes: "green", No: "red", Waitlist: "orange" };

    private eventDate = new Date("Dec 8 2018 2:00 PM");
    private preJsonDisplay: HTMLPreElement;
    private FONT_SIZE = 14;
    private DEBUG_PRINTOUTS = false;
    private dataToUse: RsvpRecord[];
    private dataNested: Array<{ key: string; values: RsvpRecord[]; value: undefined }>;

    private margin = { top: 20, right: 20, bottom: 20, left: 20 };

    private barHeight = 20;

    private svg: SvgInterface;
    private content: ContentInterface;
    private scale: ScaleInterface;
    private axis: AxisInterface;
    private group: GroupInterface = {
        main: null,
        content: null,
        axis: { x: null }
    };

    constructor() {

        this.preJsonDisplay = document.querySelector("pre");

        //        const eventDateStrokeDashArray = [5, 5];


        function arraySortComparatorAsc(a: RsvpRecord, b: RsvpRecord) {
            return (new Date(a.gmailMessageDate)).getTime() - (new Date(b.gmailMessageDate)).getTime();
        }
        function arraySortComparatorDesc(a: RsvpRecord, b: RsvpRecord) {
            return (new Date(b.gmailMessageDate)).getTime() - (new Date(a.gmailMessageDate)).getTime();
        }

        this.dataToUse = GMAIL_ADDON_OUTPUT.bigDateRange;

        this.dataToUse.sort(arraySortComparatorDesc);
        this.preJsonDisplay.innerHTML = JSON.stringify(this.dataToUse, null, 2);

        // https://github.com/d3/d3-collection#nests
        this.dataNested = d3.nest<RsvpRecord, undefined>()
            .key(d => d.name)
            .sortValues(arraySortComparatorAsc)
            .entries(this.dataToUse);

        this.initSVG.call(this);
        this.draw.call(this);

    }

    private initSVG() {
        this.svg = {
            width: 1000,
            height: 800,
            element: null
        };
        this.svg.element = d3.select<SVGElement, undefined>("svg")
            .attr("width", this.svg.width)
            .attr("height", this.svg.height);

        this.content = {
            width: this.svg.width - this.margin.left - this.margin.right,
            height: this.svg.height - this.margin.top - this.margin.bottom
        };


        this.initScales();
        this.initGroups();
        this.initXAxis();
        this.initPanZoom();

    }


    private initScales() {
        this.scale = {
            x: d3.scaleTime().range([0, this.content.width]),
            y: d3.scaleLinear().range([this.content.height, 0])
        };

        const firstRsvpDate = new Date(this.dataToUse[0].rsvpDate);
        const lastRsvpDate = new Date(this.dataToUse[this.dataToUse.length - 1].rsvpDate);
        const maxTime = Math.max(firstRsvpDate.getTime(), this.eventDate.getTime());
        const maxDate = new Date(maxTime);
        this.scale.x.domain([lastRsvpDate, maxDate]);
    }

    private initGroups() {

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

    private initXAxis() {
        this.axis = {
            x: d3.axisBottom(this.scale.x)
        };

        // x axis display
        this.group.axis.x = this.group.main.append("g")
            .attr("id", "axisX")
            .attr("transform", "translate(0," + this.content.height + ")")
            .call(this.axis.x);
    }

    private initPanZoom() {
        const ZOOM_X_ONLY = true;

        /*
        const zoomController: d3.ZoomBehavior<SVGElement, undefined> = d3.zoom<SVGElement, undefined>()
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
                        .selectAll("text").attr("font-size", this.FONT_SIZE / zoomLevel)
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
        */
    }

    private draw() {
        const peopleCount = this.dataNested.length;

        const barSpacing = (this.content.height - (this.barHeight * peopleCount)) / peopleCount;
        if (barSpacing < 0) {
            console.warn("svg is not tall enough for this many records and the given bar height");
        }
        const svgGroupOfRsvps = this.group.content.append("g").attr("id", "rsvps");

        const svgGroupOfNames = this.group.main.append("g").attr("id", "names");

        for (let indexOverPeople = 0; indexOverPeople < peopleCount; indexOverPeople++) {
            const nestObj = this.dataNested[indexOverPeople];
            const name = nestObj.key;

            const yPosition = (this.barHeight + barSpacing) * indexOverPeople;

            const groupPerson = svgGroupOfRsvps
                .append("g")
                .attr("id", name)
                .attr("transform", "translate(0," + yPosition + ")");

            svgGroupOfNames.append("text")
                .text(name)
                .attr("text-anchor", "left")
                //                .attr("x", -50)
                .attr("y", yPosition + this.barHeight / 2)
                .attr("alignment-baseline", "middle")
                .attr("font-size", (this.barHeight - 10) + "px")
                .classed("name", true);



            for (let indexOverRsvpRecords = 1; indexOverRsvpRecords < nestObj.values.length; indexOverRsvpRecords++) {
                const presentRsvpObj = nestObj.values[indexOverRsvpRecords];
                const previousRsvpObj = nestObj.values[indexOverRsvpRecords - 1];
                if (!previousRsvpObj) {
                    console.warn("looks like this for loop when out of bounds");
                }

                if (this.DEBUG_PRINTOUTS) {
                    console.group("drawing rect for " + previousRsvpObj.rsvp);
                    console.log("current=" + presentRsvpObj.rsvp + ", previous=" + previousRsvpObj.rsvp);
                }

                let rectangleStartDate: Date;
                if (previousRsvpObj.isUpdate && nestObj.values[indexOverRsvpRecords - 2].rsvp.toLowerCase() === "waitlist") {
                    rectangleStartDate = new Date(previousRsvpObj.gmailMessageDate);
                } else {
                    rectangleStartDate = new Date(previousRsvpObj.rsvpDate);
                }
                if (this.DEBUG_PRINTOUTS) {
                    console.log("start date: " + rectangleStartDate);
                }
                const rectangleXStart = this.scale.x(rectangleStartDate);

                let rectangleXEnd: number;
                if (previousRsvpObj.rsvp.toLowerCase() === "waitlist" && presentRsvpObj.isUpdate) {
                    // THIS IS WRONG because the gmail message date doesn't matter.
                    // actually need to use date from other rsvps in that email!!!
                    const endDate = presentRsvpObj.gmailMessageDate;
                    if (this.DEBUG_PRINTOUTS) {
                        console.log("end date from gmail message: " + endDate);
                    }
                    rectangleXEnd = this.scale.x(new Date(endDate));
                } else {
                    const endDate = presentRsvpObj.rsvpDate;
                    if (this.DEBUG_PRINTOUTS) {
                        console.log("end date: " + endDate);
                    }
                    rectangleXEnd = this.scale.x(new Date(endDate));
                }


                const rectangleWidth = rectangleXEnd - rectangleXStart;
                if (this.DEBUG_PRINTOUTS) {
                    console.log("width: " + rectangleWidth);
                }


                groupPerson.append("rect")
                    .attr("x", rectangleXStart)
                    .attr("y", 0)
                    .attr("width", rectangleWidth)
                    .attr("height", this.barHeight)
                    //                    .attr("opacity", 0.6)
                    .attr("fill", MeetupRsvpChart.colors[previousRsvpObj.rsvp])
                    ;

                if (this.DEBUG_PRINTOUTS) {
                    console.groupEnd();
                }

            }

            //now need to draw rect for last record, which ends at the event start
            const lastRsvpObj = nestObj.values[nestObj.values.length - 1];
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
                .attr("fill", MeetupRsvpChart.colors[lastRsvpObj.rsvp])
                ;



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