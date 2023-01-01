import {useState} from "react";

export default function handler(req, res) {

    if (req.method === 'GET') {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        res.setHeader("Content-Type", "application/vnd.star.starprnt")
        console.log('saw')
        fetch("https://5nn73jb7.directus.app/items/print_jobs/5bbae1b7-68db-439b-ab53-fa0f593d6034", requestOptions)
            .then(response => response.json())
            .then((result)=>{
                fetch(`https://5nn73jb7.directus.app/assets/${result.data.print_job}`, requestOptions)
                    .then((response2)=> response2.text() )
                    .then(result2 => res.status(200).send(result2))
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    }
    else if(req.method ===  'POST'){
        console.log(req.body)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://5nn73jb7.directus.app/items/restaurants?filter[id][_eq]=2860d46e-efd4-49bc-861f-462bfc8ec667", requestOptions)
            .then(response => response.json())
            .then(result => result.data[0].printer_queue[0] ? res.status(200).json({
                jobReady: true,
                mediaTypes: ["text/plain"]
            }) : res.status(200).json('Printer queue empty'))
            .catch(error => console.log('error', error));
    } else if(req.method === 'DELETE'){
        console.log("deleted")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "printer_queue": []
        });

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://5nn73jb7.directus.app/items/restaurants/2860d46e-efd4-49bc-861f-462bfc8ec667", requestOptions)
            .then(response => response.text())
            .then(result => res.status(200).json("Print Job Done"))
            .catch(error => console.log('error', error));
    }

}
