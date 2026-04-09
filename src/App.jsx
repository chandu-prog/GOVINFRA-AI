import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Analytics from './pages/Analytics';
import { PotholeMap } from './components/dashboard/PotholeMap';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Contractors from './pages/Contractors';
import PredictiveMaintenance from './pages/PredictiveMaintenance';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user)) {
    return <Navigate to="/report" replace />; // Default fallback for unauthorized
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<ProtectedRoute allowedRoles={['authority']}><Dashboard /></ProtectedRoute>} />
        <Route path="map" element={<ProtectedRoute allowedRoles={['citizen', 'authority']}><div className="glass-panel" style={{ height: 'calc(100vh - 100px)', padding: '0', marginTop: '16px', overflow: 'hidden' }}><PotholeMap /></div></ProtectedRoute>} />
        <Route path="report" element={<ProtectedRoute allowedRoles={['citizen', 'authority']}><Report /></ProtectedRoute>} />
        <Route path="analytics" element={<ProtectedRoute allowedRoles={['authority']}><Analytics /></ProtectedRoute>} />
        <Route path="contractors" element={<ProtectedRoute allowedRoles={['authority']}><Contractors /></ProtectedRoute>} />
        <Route path="predictive" element={<ProtectedRoute allowedRoles={['authority']}><PredictiveMaintenance /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute allowedRoles={['authority']}><div className="glass-panel" style={{ padding: '40px', marginTop: '40px' }}><h2 className="text-gradient">Platform Settings</h2><p>Configure API integrations, map layers, and AI threshold settings.</p></div></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
