import Axios from 'axios'

const api = Axios.create({
    baseURL: 'https://demo.blueplate.ai/wp-json/wc/v3/',
    headers: {
        'Authorization': 'Basic Y2tfYzMwN2RjNjJjNDg1MDljMTc5NmRhZTFmNGY0ODkzMmQzOWJhNTJkMTpjc18zNjZkMDA4MTQ1ZjcxYTE3OTE5OTUyMGU2YTQ1MmJkNzMxN2EwOTE4'
    }
});

export const getProducts = () => api.get('products/?per_page=100').then(res=>res.data)

export const getCategories = () => api.get('products/categories').then(res=>res.data)