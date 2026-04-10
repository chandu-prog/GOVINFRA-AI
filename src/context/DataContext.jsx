import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_POTHOLES, MOCK_REPORTS, MOCK_CONTRACTORS, MOCK_VERIFICATIONS, MOCK_ROAD_HEALTH, MOCK_MONTHLY_DEGRADATION } from '../data/mockData';

const DataContext = createContext(null);

// ─── localStorage helpers ───────────────────────────────────────────────────
const LS_POTHOLES = 'govinfra_potholes';
const LS_REPORTS  = 'govinfra_reports';

const loadFromStorage = (key, fallback) => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) return JSON.parse(stored);
    } catch (_) {}
    return fallback;
};

const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {}
};
// ───────────────────────────────────────────────────────────────────────────

export const DataProvider = ({ children }) => {
    // Load from localStorage on first mount; fall back to mock data if empty
    const [potholes, setPotholes] = useState(() => loadFromStorage(LS_POTHOLES, MOCK_POTHOLES));
    const [reports,  setReports]  = useState(() => loadFromStorage(LS_REPORTS,  MOCK_REPORTS));

    // Persist to localStorage whenever data changes
    useEffect(() => { saveToStorage(LS_POTHOLES, potholes); }, [potholes]);
    useEffect(() => { saveToStorage(LS_REPORTS,  reports);  }, [reports]);

    const addNewReport = (newPothole, newReport) => {
        const ts = Date.now();
        setPotholes(prev => [{ ...newPothole, id: ts },       ...prev]);
        setReports (prev => [{ ...newReport,  id: ts + 1 },   ...prev]);
    };

    const deleteReport = (id) => {
        setReports (prev => prev.filter(r => r.id !== id));
    };

    const deletePothole = (id) => {
        setPotholes(prev => prev.filter(p => p.id !== id));
    };

    // Authority: delete both the map marker AND the feed entry together
    const deleteIssue = (potholeId, reportId) => {
        setPotholes(prev => prev.filter(p => p.id !== potholeId));
        setReports (prev => prev.filter(r => r.id !== reportId));
    };

    return (
        <DataContext.Provider value={{
            potholes,
            reports,
            addNewReport,
            deleteReport,
            deletePothole,
            deleteIssue,
            contractors:         MOCK_CONTRACTORS,
            verifications:       MOCK_VERIFICATIONS,
            roadHealth:          MOCK_ROAD_HEALTH,
            monthlyDegradation:  MOCK_MONTHLY_DEGRADATION
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
