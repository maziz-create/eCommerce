// All api calls will be made here
import axios from 'axios'

// Add a request interceptor
// Alttaki methodu yazma amacımız token ile auth/me'ye istekler yapmak. tokeni isteğin headers'ına eklemek. 
axios.interceptors.request.use(
    function (config) {
        const { origin } = new URL(config.url);

        //hangi endpointlere istek yapılırken bu eklenmeli ? içinde react_app_base_endpoint varsa ekle..
        const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]
        const token = localStorage.getItem('access-token'); //tokeni al.

        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = token;
        }


        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

//pageParam => sayfa parametresi. Ürünlerin sayfa sayfa gösterilmesini sağlıyoruz.
export const fetchProductList = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`);

    return data;
}

export const fetchProductDetail = async (productId) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${productId}`);

    return data;
}

export const fetchRegister = async (input) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
        input
    );

    return data;
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
        input
    );

    return data;
}

export const fetchMe = async () => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);

    return data;
}

export const fetchLogout = async () => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
        {
            refresh_token: localStorage.getItem('refresh-token')
        });

    return data;
}

export const postOrder = async (input) => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_ENDPOINT}/order`, input);

    return data;
}

export const fetchOrders = async () => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_ENDPOINT}/order`);

    return data;
}

export const deleteProduct = async (product_id) => {
    const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);

    return data;
}
