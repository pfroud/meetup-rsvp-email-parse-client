function lookupClickTracking(url: string): Promise<string> {
    // looks up a URL of the form https://meet.meetup.com/wf/click?upn=...


    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#syntax
    const promiseExecutor = (
        resolve: (response: string) => void,
        reject: (rejectReason: Error) => void
    ) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 302) {
                    resolve(xhr.getResponseHeader("location"));
                } else {
                    reject(new Error(`xhr returned HTTP status ${xhr.status}, expected 302`));
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    };
    return new Promise<string>(promiseExecutor);


}

function getMemberPhotoUrl(urlFromRsvpEmail: string): string {
    const split = urlFromRsvpEmail.split(/[/.]/);
    const memberID = split[split.length - 2];
    return `https://secure.meetupstatic.com/photos/member/b/b/3/5/highres_${memberID}.jpeg`;

    // looks like `https://secure.meetupstatic.com/photo_api/member/sc1/sg99108c826c/${memberID}.jpeg` would also work

}