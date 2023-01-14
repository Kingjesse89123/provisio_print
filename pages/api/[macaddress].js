import {macaddresses} from "../macaddresses";

export default function handler(req, res) {
    const {macaddress} = req.query
    let mac = macaddresses.find(mac => mac.id === macaddress)
    mac = mac.id
    if (req.method === 'POST') {
        console.log(req.body)
        console.log("posting")
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        if (req.body.printingInProgress === false && req.body.status.toString().charAt(0) === '2') {
            console.log(true)
            fetch(`https://blueplate.directus.app/items/restaurants?filter[printer_mac][_eq]=${mac}`, requestOptions)
                .then(response => response.json())
                .then(result => result.data[0].printer_queue[0] ? res.status(200).json({
                    jobReady: true,
                    mediaTypes: ["text/plain"]
                }) : res.status(200).json('Printer queue empty'))
                .catch(error => console.log('error', error));
        } else {
            res.status(200).json('Printer queue empty')
        }
    }
    if (req.method === 'GET') {
        console.log("getting"+mac)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        res.setHeader("Content-Type", "application/vnd.star.starprnt")

        fetch(`https://blueplate.directus.app/items/restaurants?filter[printer_mac][_eq]=${mac}&fields=*.*`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                fetch(`https://blueplate.directus.app/assets/${result.data[0].printer_queue[0].print_job}`, requestOptions)
                    .then((response2) => response2.text())
                    .then(result2 => res.status(200).send(result2))
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    }

    if (req.method === 'DELETE') {
        console.log("deleting"+mac)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions2 = {
            method: 'GET',
            redirect: 'follow'
        };
        let raw = JSON.stringify({
            restaurant: null
        });


        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://blueplate.directus.app/items/restaurants?filter[printer_mac][_eq]=${mac}&fields=*.*`, requestOptions2)
            .then((response) => response.json())
            .then(result => {
                fetch(`https://blueplate.directus.app/items/print_jobs/${result.data[0].printer_queue[0].id}`, requestOptions)
                    .then((response2) => response2.text())
                    .then((result2) => {
                        res.status(200).send("Print Job Done")
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    }
}
