export interface RsvpRecord {
    name: string;
    rsvp: "Yes" | "No" | "Waitlist";
    isUpdate: boolean;
    rsvpDate: string;
    gmailMessageID: string;
    gmailMessageDate: string;
}

const everything: RsvpRecord[] = [
    { "name": "Ro", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-12-03T05:07:00.000Z", "gmailMessageID": "1678fd5b2bcae421", "gmailMessageDate": "Sat Dec 08 2018 14:00:03 GMT-0800 (PST)" },
    { "name": "James Song", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-08T21:50:00.000Z", "gmailMessageID": "1678fd5b2bcae421", "gmailMessageDate": "Sat Dec 08 2018 14:00:03 GMT-0800 (PST)" },
    { "name": "Sanchit Sharma", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-08T20:48:00.000Z", "gmailMessageID": "1678f9ecefc3b536", "gmailMessageDate": "Sat Dec 08 2018 13:00:06 GMT-0800 (PST)" },
    { "name": "john hoang", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-08T20:00:00.000Z", "gmailMessageID": "1678f9ecefc3b536", "gmailMessageDate": "Sat Dec 08 2018 13:00:06 GMT-0800 (PST)" },
    { "name": "Alex", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-08T17:24:00.000Z", "gmailMessageID": "1678f9ecefc3b536", "gmailMessageDate": "Sat Dec 08 2018 13:00:06 GMT-0800 (PST)" },
    { "name": "Karl", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-27T00:50:00.000Z", "gmailMessageID": "1678ed8588562a07", "gmailMessageDate": "Sat Dec 08 2018 09:23:20 GMT-0800 (PST)" },
    { "name": "praveen m.s.", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-08T16:39:00.000Z", "gmailMessageID": "1678ed8588562a07", "gmailMessageDate": "Sat Dec 08 2018 09:23:20 GMT-0800 (PST)" },
    { "name": "Kumar", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-08T14:27:00.000Z", "gmailMessageID": "1678ed8588562a07", "gmailMessageDate": "Sat Dec 08 2018 09:23:20 GMT-0800 (PST)" },
    { "name": "Han", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-08T14:58:00.000Z", "gmailMessageID": "1678ed8588562a07", "gmailMessageDate": "Sat Dec 08 2018 09:23:20 GMT-0800 (PST)" },
    { "name": "Kairi Kozuma", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-24T18:40:00.000Z", "gmailMessageID": "1678e3022773fe3c", "gmailMessageDate": "Sat Dec 08 2018 06:19:36 GMT-0800 (PST)" },
    { "name": "Han", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-22T02:07:00.000Z", "gmailMessageID": "1678e3022773fe3c", "gmailMessageDate": "Sat Dec 08 2018 06:19:36 GMT-0800 (PST)" },
    { "name": "Swetha", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-08T09:06:00.000Z", "gmailMessageID": "1678e3022773fe3c", "gmailMessageDate": "Sat Dec 08 2018 06:19:36 GMT-0800 (PST)" },
    { "name": "Max", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-08T09:24:00.000Z", "gmailMessageID": "1678e3022773fe3c", "gmailMessageDate": "Sat Dec 08 2018 06:19:36 GMT-0800 (PST)" },
    { "name": "Matthew FarkasDyck", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-08T08:30:00.000Z", "gmailMessageID": "1678e3022773fe3c", "gmailMessageDate": "Sat Dec 08 2018 06:19:36 GMT-0800 (PST)" },
    { "name": "Asha", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-12T05:30:00.000Z", "gmailMessageID": "1678c41bb80b0104", "gmailMessageDate": "Fri Dec 07 2018 21:19:35 GMT-0800 (PST)" },
    { "name": "Erica", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-08T01:39:00.000Z", "gmailMessageID": "1678c41bb80b0104", "gmailMessageDate": "Fri Dec 07 2018 21:19:35 GMT-0800 (PST)" },
    { "name": "shruti g", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-07T23:23:00.000Z", "gmailMessageID": "1678c41bb80b0104", "gmailMessageDate": "Fri Dec 07 2018 21:19:35 GMT-0800 (PST)" },
    { "name": "Muj", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-07T19:15:00.000Z", "gmailMessageID": "1678c41bb80b0104", "gmailMessageDate": "Fri Dec 07 2018 21:19:35 GMT-0800 (PST)" },
    { "name": "Namrata", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-07T17:24:00.000Z", "gmailMessageID": "1678c41bb80b0104", "gmailMessageDate": "Fri Dec 07 2018 21:19:35 GMT-0800 (PST)" },
    { "name": "Max", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-12T05:28:00.000Z", "gmailMessageID": "16789ae8d2018afa", "gmailMessageDate": "Fri Dec 07 2018 09:19:35 GMT-0800 (PST)" },
    { "name": "Jay Mahadev", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-07T17:04:00.000Z", "gmailMessageID": "16789ae8d2018afa", "gmailMessageDate": "Fri Dec 07 2018 09:19:35 GMT-0800 (PST)" },
    { "name": "CN", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-07T00:48:00.000Z", "gmailMessageID": "167863147902edb0", "gmailMessageDate": "Thu Dec 06 2018 17:03:53 GMT-0800 (PST)" },
    { "name": "Rajendran Seetharaman", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-06T07:18:00.000Z", "gmailMessageID": "167836ee5455de7e", "gmailMessageDate": "Thu Dec 06 2018 04:12:19 GMT-0800 (PST)" },
    { "name": "VARNITH CHORDIA", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-11T08:12:00.000Z", "gmailMessageID": "16781d9429f01b98", "gmailMessageDate": "Wed Dec 05 2018 20:49:16 GMT-0800 (PST)" },
    { "name": "Karthik", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-06T04:34:00.000Z", "gmailMessageID": "16781d9429f01b98", "gmailMessageDate": "Wed Dec 05 2018 20:49:16 GMT-0800 (PST)" },
    { "name": "Brian B", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-05T07:54:00.000Z", "gmailMessageID": "1677e45148766545", "gmailMessageDate": "Wed Dec 05 2018 04:08:33 GMT-0800 (PST)" },
    { "name": "Samprit", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T23:51:00.000Z", "gmailMessageID": "1677bb1e09f87037", "gmailMessageDate": "Tue Dec 04 2018 16:08:33 GMT-0800 (PST)" },
    { "name": "Jaspreet Singh", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T18:55:00.000Z", "gmailMessageID": "1677bb1e09f87037", "gmailMessageDate": "Tue Dec 04 2018 16:08:33 GMT-0800 (PST)" },
    { "name": "Jane", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T18:26:00.000Z", "gmailMessageID": "1677bb1e09f87037", "gmailMessageDate": "Tue Dec 04 2018 16:08:33 GMT-0800 (PST)" },
    { "name": "Erica", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T08:20:00.000Z", "gmailMessageID": "167791eb378c6902", "gmailMessageDate": "Tue Dec 04 2018 04:08:33 GMT-0800 (PST)" },
    { "name": "Adi", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T05:28:00.000Z", "gmailMessageID": "167791eb378c6902", "gmailMessageDate": "Tue Dec 04 2018 04:08:33 GMT-0800 (PST)" },
    { "name": "Darsh", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T03:54:00.000Z", "gmailMessageID": "167791eb378c6902", "gmailMessageDate": "Tue Dec 04 2018 04:08:33 GMT-0800 (PST)" },
    { "name": "shruti g", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-04T00:45:00.000Z", "gmailMessageID": "167791eb378c6902", "gmailMessageDate": "Tue Dec 04 2018 04:08:33 GMT-0800 (PST)" },
    { "name": "David", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-04T04:58:00.000Z", "gmailMessageID": "167791eb378c6902", "gmailMessageDate": "Tue Dec 04 2018 04:08:33 GMT-0800 (PST)" },
    { "name": "Pooja Voladoddi", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-03T18:21:00.000Z", "gmailMessageID": "167768b82c883116", "gmailMessageDate": "Mon Dec 03 2018 16:08:33 GMT-0800 (PST)" },
    { "name": "A$ if", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-03T17:00:00.000Z", "gmailMessageID": "167768b82c883116", "gmailMessageDate": "Mon Dec 03 2018 16:08:33 GMT-0800 (PST)" },
    { "name": "Lila", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-03T21:12:00.000Z", "gmailMessageID": "167768b82c883116", "gmailMessageDate": "Mon Dec 03 2018 16:08:33 GMT-0800 (PST)" },
    { "name": "Karen Lin", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-07T05:25:00.000Z", "gmailMessageID": "16773f859c1ba15a", "gmailMessageDate": "Mon Dec 03 2018 04:08:32 GMT-0800 (PST)" },
    { "name": "Stephanie Downey", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-06T04:38:00.000Z", "gmailMessageID": "16773f859c1ba15a", "gmailMessageDate": "Mon Dec 03 2018 04:08:32 GMT-0800 (PST)" },
    { "name": "Ro", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-03T05:07:00.000Z", "gmailMessageID": "16773f859c1ba15a", "gmailMessageDate": "Mon Dec 03 2018 04:08:32 GMT-0800 (PST)" },
    { "name": "James Song", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-03T05:00:00.000Z", "gmailMessageID": "16773f859c1ba15a", "gmailMessageDate": "Mon Dec 03 2018 04:08:32 GMT-0800 (PST)" },
    { "name": "Chady", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-03T08:44:00.000Z", "gmailMessageID": "16773f859c1ba15a", "gmailMessageDate": "Mon Dec 03 2018 04:08:32 GMT-0800 (PST)" },
    { "name": "Andrea", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-03T02:06:00.000Z", "gmailMessageID": "16773f859c1ba15a", "gmailMessageDate": "Mon Dec 03 2018 04:08:32 GMT-0800 (PST)" },
    { "name": "nandhiny durai", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-12-02T23:53:00.000Z", "gmailMessageID": "1677165221bf3b61", "gmailMessageDate": "Sun Dec 02 2018 16:08:32 GMT-0800 (PST)" },
    { "name": "Carolyn", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-27T15:26:00.000Z", "gmailMessageID": "16757d9e6633243c", "gmailMessageDate": "Tue Nov 27 2018 17:05:55 GMT-0800 (PST)" },
    { "name": "CiCi", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-03T15:19:00.000Z", "gmailMessageID": "1675546b23740245", "gmailMessageDate": "Tue Nov 27 2018 05:05:55 GMT-0800 (PST)" },
    { "name": "Stephen", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-11-27T02:38:00.000Z", "gmailMessageID": "1675546b23740245", "gmailMessageDate": "Tue Nov 27 2018 05:05:55 GMT-0800 (PST)" },
    { "name": "Karl", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-27T00:50:00.000Z", "gmailMessageID": "16752b38557a8c80", "gmailMessageDate": "Mon Nov 26 2018 17:05:55 GMT-0800 (PST)" },
    { "name": "Kairi Kozuma", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-24T18:40:00.000Z", "gmailMessageID": "1674713d2939bde0", "gmailMessageDate": "Sat Nov 24 2018 10:55:38 GMT-0800 (PST)" },
    { "name": "Han", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-22T02:07:00.000Z", "gmailMessageID": "167393a4d3176952", "gmailMessageDate": "Wed Nov 21 2018 18:23:00 GMT-0800 (PST)" },
    { "name": "Lila", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-19T23:18:00.000Z", "gmailMessageID": "1672e5232cfa769b", "gmailMessageDate": "Mon Nov 19 2018 15:33:18 GMT-0800 (PST)" },
    { "name": "Dee", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-17T19:57:00.000Z", "gmailMessageID": "167234d503537076", "gmailMessageDate": "Sat Nov 17 2018 12:12:07 GMT-0800 (PST)" },
    { "name": "Kiran Akkineni", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-17T01:24:00.000Z", "gmailMessageID": "1671f52bb34dbd44", "gmailMessageDate": "Fri Nov 16 2018 17:39:32 GMT-0800 (PST)" },
    { "name": "John Trabelsi (+1)", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-14T23:05:00.000Z", "gmailMessageID": "167148716246a86f", "gmailMessageDate": "Wed Nov 14 2018 15:20:55 GMT-0800 (PST)" },
    { "name": "Coriander", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-11-14T02:54:00.000Z", "gmailMessageID": "16710324ef3e75b9", "gmailMessageDate": "Tue Nov 13 2018 19:09:49 GMT-0800 (PST)" },
    { "name": "Asha", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-12T05:30:00.000Z", "gmailMessageID": "1670671f3df4ec66", "gmailMessageDate": "Sun Nov 11 2018 21:43:08 GMT-0800 (PST)" },
    { "name": "Max", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-12T05:28:00.000Z", "gmailMessageID": "1670671f3df4ec66", "gmailMessageDate": "Sun Nov 11 2018 21:43:08 GMT-0800 (PST)" },
    { "name": "VARNITH CHORDIA", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-11T08:12:00.000Z", "gmailMessageID": "16701e2088cbcb0b", "gmailMessageDate": "Sun Nov 11 2018 00:27:27 GMT-0800 (PST)" },
    { "name": "Coriander", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-09T07:29:00.000Z", "gmailMessageID": "166f906e996e4589", "gmailMessageDate": "Fri Nov 09 2018 07:11:10 GMT-0800 (PST)" },
    { "name": "Yehwen Cheng", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-09T02:56:00.000Z", "gmailMessageID": "166f673b8a818f81", "gmailMessageDate": "Thu Nov 08 2018 19:11:09 GMT-0800 (PST)" },
    { "name": "Karen Lin", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-07T05:25:00.000Z", "gmailMessageID": "166ecafa06187527", "gmailMessageDate": "Tue Nov 06 2018 21:40:23 GMT-0800 (PST)" },
    { "name": "Stephanie Downey", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-06T04:38:00.000Z", "gmailMessageID": "166e75eb1c37ae9a", "gmailMessageDate": "Mon Nov 05 2018 20:53:53 GMT-0800 (PST)" },
    { "name": "CiCi", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-03T15:19:00.000Z", "gmailMessageID": "166da36944789400", "gmailMessageDate": "Sat Nov 03 2018 08:35:00 GMT-0700 (PDT)" },
    { "name": "Daniel Tan", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-11-01T00:09:00.000Z", "gmailMessageID": "166cca8167a08ec4", "gmailMessageDate": "Wed Oct 31 2018 17:24:18 GMT-0700 (PDT)" },
    { "name": "Yang", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-31T06:12:00.000Z", "gmailMessageID": "166c9795595ef6c6", "gmailMessageDate": "Wed Oct 31 2018 02:34:23 GMT-0700 (PDT)" },
    { "name": "Jay Mahadev", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-30T21:19:00.000Z", "gmailMessageID": "166c6e626eadf3ac", "gmailMessageDate": "Tue Oct 30 2018 14:34:22 GMT-0700 (PDT)" },
    { "name": "Karthik", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-30T04:02:00.000Z", "gmailMessageID": "166c330e0562c2d5", "gmailMessageDate": "Mon Oct 29 2018 21:17:31 GMT-0700 (PDT)" },
    { "name": "Namrata", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-28T18:59:00.000Z", "gmailMessageID": "166bc19a972e7218", "gmailMessageDate": "Sun Oct 28 2018 12:14:49 GMT-0700 (PDT)" },
    { "name": "Andrea", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-22T15:56:00.000Z", "gmailMessageID": "1669c8bb16bfa5d2", "gmailMessageDate": "Mon Oct 22 2018 09:11:30 GMT-0700 (PDT)" },
    { "name": "Stephen", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-22T00:12:00.000Z", "gmailMessageID": "166992be25c79f04", "gmailMessageDate": "Sun Oct 21 2018 17:28:01 GMT-0700 (PDT)" },
    { "name": "Devon", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-21T01:08:00.000Z", "gmailMessageID": "1669437ec80b0b97", "gmailMessageDate": "Sat Oct 20 2018 18:23:03 GMT-0700 (PDT)" },
    { "name": "Michael White", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-10-16T00:59:00.000Z", "gmailMessageID": "1667a708a3bb2921", "gmailMessageDate": "Mon Oct 15 2018 18:14:45 GMT-0700 (PDT)" },
    { "name": "Rowan Pike", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-10T01:16:00.000Z", "gmailMessageID": "1665b999c3233661", "gmailMessageDate": "Tue Oct 09 2018 18:31:23 GMT-0700 (PDT)" },
    { "name": "Vikram", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-04T06:36:00.000Z", "gmailMessageID": "1663dd81d0148fd2", "gmailMessageDate": "Wed Oct 03 2018 23:51:02 GMT-0700 (PDT)" },
    { "name": "SummerGirl", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-02T00:32:00.000Z", "gmailMessageID": "1663361a3fd18500", "gmailMessageDate": "Mon Oct 01 2018 23:05:27 GMT-0700 (PDT)" },
    { "name": "Kyle Mausser", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-01T20:50:00.000Z", "gmailMessageID": "16631733f061abc5", "gmailMessageDate": "Mon Oct 01 2018 14:05:27 GMT-0700 (PDT)" },
    { "name": "Michelle", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-01T20:50:00.000Z", "gmailMessageID": "16631733f061abc5", "gmailMessageDate": "Mon Oct 01 2018 14:05:27 GMT-0700 (PDT)" }
];

const bigDateRange: RsvpRecord[] = [
    { "name": "Michelle", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-01T20:50:00.000Z", "gmailMessageID": "16631733f061abc5", "gmailMessageDate": "Mon Oct 01 2018 14:05:27 GMT-0700 (PDT)" },
    { "name": "Kyle Mausser", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-01T20:50:00.000Z", "gmailMessageID": "16631733f061abc5", "gmailMessageDate": "Mon Oct 01 2018 14:05:27 GMT-0700 (PDT)" },
    { "name": "SummerGirl", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-02T00:32:00.000Z", "gmailMessageID": "1663361a3fd18500", "gmailMessageDate": "Mon Oct 01 2018 23:05:27 GMT-0700 (PDT)" },
    { "name": "Rowan Pike", "rsvp": "Yes", "isUpdate": false, "rsvpDate": "2018-10-10T01:16:00.000Z", "gmailMessageID": "1665b999c3233661", "gmailMessageDate": "Tue Oct 09 2018 18:31:23 GMT-0700 (PDT)" }
];

const han: RsvpRecord[] = [
    { "name": "Han", "rsvp": "No", "isUpdate": true, "rsvpDate": "2018-12-08T14:58:00.000Z", "gmailMessageID": "1678ed8588562a07", "gmailMessageDate": "Sat Dec 08 2018 09:23:20 GMT-0800 (PST)" },
    { "name": "Han", "rsvp": "Yes", "isUpdate": true, "rsvpDate": "2018-11-22T02:07:00.000Z", "gmailMessageID": "1678e3022773fe3c", "gmailMessageDate": "Sat Dec 08 2018 06:19:36 GMT-0800 (PST)" },
    { "name": "Han", "rsvp": "Waitlist", "isUpdate": false, "rsvpDate": "2018-11-22T02:07:00.000Z", "gmailMessageID": "167393a4d3176952", "gmailMessageDate": "Wed Nov 21 2018 18:23:00 GMT-0800 (PST)" }
];

export const GMAIL_ADDON_OUTPUT = {
    han: han,
    bigDateRange: bigDateRange,
    everything: everything
};