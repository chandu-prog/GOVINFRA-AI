import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// ===================================================
// CREDENTIAL STORE
// Citizens: regular public users
// Authority: government employees only
// ===================================================
const CREDENTIALS = {
    citizen: [
        { username: 'citizen1',  password: 'citizen123',  name: 'Rahul Sharma',    id: 'C-001' },
        { username: 'citizen2',  password: 'city@456',    name: 'Priya Reddy',     id: 'C-002' },
        { username: 'user',      password: 'user123',     name: 'Ravi Kumar',      id: 'C-003' },
    ],
    authority: [
        { username: 'admin',     password: 'gov@2024',    name: 'Admin User',      department: 'City Council',       id: 'A-001' },
        { username: 'collector', password: 'collector@1', name: 'District Officer', department: 'District Office',    id: 'A-002' },
        { username: 'engineer',  password: 'roads@123',   name: 'Road Engineer',   department: 'PWD Roads Division',  id: 'A-003' },
    ]
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loginError, setLoginError] = useState('');

    const login = (username, password, portalType) => {
        setLoginError('');
        const accountList = CREDENTIALS[portalType] || [];
        const match = accountList.find(
            acc => acc.username === username.trim() && acc.password === password
        );

        if (match) {
            setUser(portalType);
            setUserProfile(match);
            return { success: true };
        } else {
            const errorMsg = portalType === 'authority'
                ? 'Invalid credentials. Only authorized government employees can access this portal.'
                : 'Invalid username or password. Please try again.';
            setLoginError(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    const logout = () => {
        setUser(null);
        setUserProfile(null);
        setLoginError('');
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, login, logout, loginError, setLoginError }}>
            {children}
        </AuthContext.Provider>
    );
};
