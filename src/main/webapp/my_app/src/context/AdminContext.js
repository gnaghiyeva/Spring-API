import React, { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, ); // Boş bağımlılık dizisi, sadece bir kez çalışmasını sağlar

    const contextValue = [admin, setAdmin];

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
