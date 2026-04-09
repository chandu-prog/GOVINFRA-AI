import React, { createContext, useContext, useState } from 'react';
import { MOCK_POTHOLES, MOCK_REPORTS, MOCK_CONTRACTORS, MOCK_VERIFICATIONS, MOCK_ROAD_HEALTH, MOCK_MONTHLY_DEGRADATION } from '../data/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [potholes, setPotholes] = useState(MOCK_POTHOLES);
    const [reports, setReports] = useState(MOCK_REPORTS);

    const addNewReport = (newPothole, newReport) => {
        setPotholes(prev => [{...newPothole, id: Date.now()}, ...prev]);
        setReports(prev => [{...newReport, id: Date.now() + 1}, ...prev]);
    };

    const deleteReport = (id) => {
        setReports(prev => prev.filter(report => report.id !== id));
    };

    const deletePothole = (id) => {
        setPotholes(prev => prev.filter(pothole => pothole.id !== id));
    };

    return (
        <DataContext.Provider value={{ 
            potholes, 
            reports, 
            addNewReport,
            deleteReport,
            deletePothole,
            contractors: MOCK_CONTRACTORS,
            verifications: MOCK_VERIFICATIONS,
            roadHealth: MOCK_ROAD_HEALTH,
            monthlyDegradation: MOCK_MONTHLY_DEGRADATION
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
