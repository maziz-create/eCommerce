import { useState, useEffect, createContext, useContext } from 'react'

const BasketContext = createContext();

//localStorage'ye stringify şekilde gideceği için parse etmemiz gerekir.
const defaultBasket = JSON.parse(localStorage.getItem('basket')) || []; //sayfa yenilendiğinde sepet uçmasın istiyoruz...
//ha eğer localStoragede yoksa boş bir array olarak alsın. || işareti buna yarıyor.

const BasketProvider = ({ children }) => {
    const [items, setItems] = useState([]); //sepetteki ürünleri tutan state

    useEffect(() => {
        setItems(defaultBasket);
    }, [])

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

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id);//istenmeyen ürün haricini yeni listeye at.
        setItems(filtered); //kalan ürünleri tekrardan sepete at.
    }

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
    }

    return <BasketContext.Provider value={values} >{children}</BasketContext.Provider>

}

const useBasket = () => useContext(BasketContext);

export {
    BasketProvider,
    useBasket
};