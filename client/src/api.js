// All api calls will be made here
import axios from 'axios'

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