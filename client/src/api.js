// All api calls will be made here
import axios from 'axios'

export const fetchProductList = async() => {
    const { data } = await axios.get('http://localhost:4000/product');

    return data;
}