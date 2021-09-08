import { useState, createContext, useEffect, useContext } from 'react'
import { fetchLogout, fetchMe } from '../api';

import { Flex, Spinner } from '@chakra-ui/react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //eğer null ise login değildir. bu state'e user detay bilgileri yazılabilir.
    const [user, setUser] = useState(null);

    //o an login mi değil mi
    const [loggedIn, setLoggedIn] = useState(false);

    //sayfa yenilendiğinde auth/me ' ye istek gidip gelene kadar navbar > Login ve Register görülür halde oluyor..
    const [loading, setLoading] = useState(true)

    //Auth context çalıştığı anda auth/me endpoitine ulaşıp içindeki bilgileri almak istiyoruz. login managing yapıyoruz.
    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe();

                setLoggedIn(true); //sayfa her yenilendiğinde loggedIn ' i true'ya çekmek istiyoruz.
                setUser(me); //sayfa her yenilendiğinde me ifadesini verebiliriz user state'ine 
                setLoading(false); //sayfa yenilendiğinde auth/me isteği gelene kadar Navbar > sağ butonlar gözükmesin.

                // console.log("me", me); //her sayfa yenilenişinde gözüküyor.
            } catch (e) {
                setLoading(false); //sisteme giriş yapamamış olursa Navbar > sağ butonlar gözüksün.
            }
        })()
    }, []); //  [] ifadesine dependency Array deniliyor. useEffect'i didMount haline getiriyor.

    //bir yerde login olunmasını istediğimizde bunu kullanıyoruz örneğin Signup sayfasında
    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);
    }

    //bir yerde logout olunmasını istediğimizde bunu kullanıyoruz örneğin Profile > Logout Button sayfasında
    const logout = async (callback /* çıkış yapıldığında anasayfaya atmak için*/) => {
        setLoggedIn(false); //çıkış yaptık..
        setUser(null);  //çıkış yaptık..

        await fetchLogout();

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

        callback();
    }

    //AuthContextten dışa aktarmak istediğimiz şeyler.
    const values = {
        loggedIn,
        user,
        login,
        logout,
    }

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500" />
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }