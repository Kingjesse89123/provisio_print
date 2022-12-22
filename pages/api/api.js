import Axios from 'axios'

const api = Axios.create({
    baseURL: 'https://5nn73jb7.directus.app/',
});

export const getProducts = (res_id) => api.get(`items/products?filter[restaurant][_eq]=${res_id}`).then(res=>res.data)

export const getCategories = (res_id) => api.get(`items/categories?filter[restaurant][_eq]=${res_id}`).then(res=>res.data)

export const getInfo= () => api.get(`items/restaurants?filter[url][_eq]=${window.location.host}`).then(res=>res.data)

export const sendOrder = (data) => api.post('items/orders', data).then(res=>console.log(res))

export const getIngredients = () => api.get('items/ingredients?fields=*.*').then(res=>res.data)

export const getSelections = () => api.get('items/selections?fields=*.*')

export const getImg= () => api.get('assets/').then(res=>res.data)