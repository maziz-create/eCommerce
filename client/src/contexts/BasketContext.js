import { useState, useEffect, createContext, useContext } from 'react'

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
    const [items, setItems] = useState([]); //sepetteki ürünleri tutan state

    const addToBasket = (data, findBasketItem) => { //sepete ürün ekleyecek fonksiyonu üretip context value'suna ekledik.
        if (!findBasketItem) {  //ilgili ürün eğer sepette değilse sepete ekle.
            return setItems((items) => [data, ...items]) //gelen ürünü en başa ekliyor
        }

        //eğer ürün zaten sepetteyse..

        //sepetteki tüm ürünlerden, gelen ürünü çıkart ve hepsini filtered dizisine yaz.
        const filtered = items.filter((item) => item._id !== findBasketItem._id);

        //sepetteki kalan ürünleri tekrar sepete koy.
        setItems(filtered)
    }

    const values = {
        items,
        setItems,
        addToBasket
    }

    return <BasketContext.Provider value={values} >{children}</BasketContext.Provider>

}

const useBasket = () => useContext(BasketContext);

export {
    BasketProvider,
    useBasket
};