import React, {
    createContext,
    useContext,
    useState
} from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const userToken = localStorage.getItem('user');

    const [user, setUser] = useState(userToken);

    const handleSetUser = (user, email) => {
        setUser(user);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
    }

    return (
        <UserContext.Provider value={{ user, handleSetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
