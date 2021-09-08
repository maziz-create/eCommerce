import { useState, createContext, useContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //eğer null ise login değildir. bu state'e user detay bilgileri yazılabilir.
    const [user, setUser] = useState(null);

    //o an login mi değil mi
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);
    }

    //AuthContextten dışa aktarmak istediğimiz şeyler.
    const values = {
        loggedIn,
        user,
        login,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }