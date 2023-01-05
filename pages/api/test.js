import {useState} from "react";
import {useQuery} from "react-query";


export default function handler(req, res) {
    if(req.method ===  'POST') {
        console.log('posting')
        var hi = 'supmyfellas'
        console.log(req.body)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://5nn73jb7.directus.app/items/restaurants?filter[printer_mac][_eq]=00:11:62:2f:fb:18`, requestOptions)
            .then(response => response.json())
            .then(result => result.data[0].printer_queue[0] ? res.status(200).json({
                jobReady: true,
                mediaTypes: ["text/plain"]
            }) : res.status(200).json('Printer queue empty'))
            .catch(error => console.log('error', error));
    }
    else if (req.method === 'GET') {
        console.log(hi)
        console.log('getting')
        console.log(req.body)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        res.setHeader("Content-Type", "application/vnd.star.starprnt")

        fetch(`https://5nn73jb7.directus.app/items/restaurants?filter[printer_mac][_eq]=00:11:62:2f:fb:18&fields=*.*`, requestOptions)
            .then(response => response.json())
            .then((result)=>{
                fetch(`https://5nn73jb7.directus.app/assets/${result.data[0].printer_queue[0].print_job}`, requestOptions)
                    .then((response2)=> response2.text() )
                    .then(result2 => res.status(200).send(result2))
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    }
     else if(req.method === 'DELETE'){
        console.log('deleting')
        console.log(req.body)
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

        fetch(`https://5nn73jb7.directus.app/items/restaurants/2860d46e-efd4-49bc-861f-462bfc8ec667`, requestOptions)
            .then(response => response.text())
            .then(result => res.status(200).json("Print Job Done"))
            .catch(error => console.log('error', error));
    }

}
