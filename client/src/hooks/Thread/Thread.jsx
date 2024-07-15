import React, {
    createContext,
    useContext,
    useState
} from 'react';

const ThreadsContext = createContext();

export const ThreadsProvider = ({ children }) => {
    const [threads, setThreads] = useState([]);


    const handleSetThreads = (threads) => {
        setThreads(threads);
    }

    return (
        <ThreadsContext.Provider value={{ threads, handleSetThreads }}>
            {children}
        </ThreadsContext.Provider>
    );
};

export const useThreads = () => useContext(ThreadsContext);
