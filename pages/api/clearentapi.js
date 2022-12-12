import Axios from 'axios'

const clearentapi = Axios.create({
    baseURL: 'https://gateway-sb.clearent.net/',
       headers: {
           'Accept':'application/json',
           'Content-Type':'application/json',
           'api-key':'89bd58856efe43e48c280c130f9b0117',
        }
});

export const sendJWT = (JWT, total, tip, c_fee, email) => clearentapi.post('rest/v2/mobile/transactions/sale', {type: 'SALE', amount: total, "software-type":"Blueplate", "software-type-version":"Provisio", 'service-fee': c_fee, 'email-receipt':email,email: email}, {headers: {'mobilejwt' : JWT}})