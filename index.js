const fs = require("fs");
const path = require("path");
const fetch = require("isomorphic-fetch")
const child_process = require("child_process")

const distict_ids = [[764, 'Hojai'], [56, "Nagaon"]]
const date = '16-05-2021'

const slotChecker = () => {
    distict_ids.forEach(async ([districtId, district_name]) => {
        const URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`;
        try {
            const res = await fetch(URL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
                }
            });
            const json = await res.json();
            json.centers.map((center) => {
                child_process.exec("/bin/bash" + ' ' + 'cvlc ~/temp/cowin-vaccine-slot-checker/alarm.mp3')
                console.log(district_name)
                console.log(center.name)
                console.log(center.sessions)
            })
        } catch (err) {
            console.log("~~~~~~~~~~~~~~ ERRROR ~~~~~~~~~~~~")
            console.error(err)
        }
    })
}

let i = 0;

setInterval(() => {
    console.log('-----', i++, '------')
    slotChecker()
}, 10000)
