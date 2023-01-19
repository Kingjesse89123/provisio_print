import {macAddresses} from "../../macaddresses";

export default function handler(req, res) {
    const {macaddress} = req.query
    const mac = macAddresses.find(mac => mac.id === macaddress)
    if (req.method === 'POST') {
        console.log(req.body)
        console.log("posting")
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        if (req.body.printingInProgress === false && req.body.status.toString().charAt(0) === '2') {
            console.log(true)
            fetch(`https://blueplate.directus.app/items/restaurants?filter[printer_mac][_eq]=${mac.id}`, requestOptions)
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
        console.log("getting")
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        res.setHeader("Content-Type", "application/vnd.star.starprnt")

        fetch(`https://blueplate.directus.app/items/restaurants?filter[printer_mac][_eq]=${mac.id}&fields=*.*`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                fetch(`https://blueplate.directus.app/assets/${result.data[0].printer_queue[0].print_job}`, requestOptions)
                    .then((response2) => response2.text())
                    .then(result2 => res.status(200).send(result2))
                    .catch(error => res.status(404).send(error));
            })
            .catch(error => console.log('error', error));
    }

    if (req.method === 'DELETE') {
        console.log("deleting")
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

        fetch(`https://blueplate.directus.app/items/restaurants?filter[printer_mac][_eq]=${mac.id}&fields=*.*`, requestOptions2)
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
