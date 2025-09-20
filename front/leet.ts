import {useEffect, useState} from "react";

var hIndex = function(citations) {
    if (!citations.length) {
        return 0
    }
    const numbers = new Array(citations.length + 1).fill(0);
    let h = 0;

    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= citations.length) {
            numbers[citations.length]++;
        } else {
            numbers[citations[i]]++;
        }
    }

    for (let i = citations.length; i > 0; i--) {
        h += numbers[i];
        if (h === i) {
            return h;
        } else if (h > i) {
            return i + 1;
        }
    }
    return 0
};

console.log(hIndex([0]))

function Dashboard() {
    const [data, setData] = useState();
    const params = { when: 69 };

    const [stateTick, setStateTick] = useState(0);
    useEffect(() => {
        let aborted = false;
        fetch('/api/test')
            .then(r => r.json())
            .then(j => { if (!aborted) setData(j) })
            .catch(() => {})
        return () => { aborted = true; }
    }, [params]);
}