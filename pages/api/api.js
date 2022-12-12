import Axios from 'axios'

const api = Axios.create({
    baseURL: 'https://snkdvocb.directus.app/',

});

export const getProducts = () => api.get('items/Products?filter[Restaraunt][Name]=Taste!2').then(res=>res.data)

export const getCategories = () => api.get('items/Catagory').then(res=>res.data)

export const getInfo= () => api.get('items/Restaraunt').then(res=>res.data)

export const sendOrder = (total, items) => api.post('items/Order', {
Amount: total,
Product: {items},
}).then(res=>console.log(res))

// export const getImg= () => api.get('assets/').then(res=>res.data)