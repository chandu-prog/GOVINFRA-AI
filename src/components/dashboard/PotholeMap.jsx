import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Trash2 } from 'lucide-react';
import './PotholeMap.css';

// Fix typical Leaflet icon issues in React
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (severity) => {
    let colorClass = '';
    let shadowClass = '';

    if (severity === 'severe') {
        colorClass = 'marker-severe';
        shadowClass = 'glow-severe';
    } else if (severity === 'medium') {
        colorClass = 'marker-medium';
        shadowClass = 'glow-medium';
    } else {
        colorClass = 'marker-repaired';
        shadowClass = 'glow-repaired';
    }

    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="marker-core ${colorClass} ${shadowClass}"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

// Component to handle dynamic map theme based on dark mode setup
function MapThemeConfig() {
    const map = useMap();
    useEffect(() => {
        // We append a class to use dark CSS filters if needed.
        // Instead, using CartoDB Dark Matter base map gives the best dark aesthetic.
    }, [map]);
    return null;
}

export function PotholeMap() {
    const [mounted, setMounted] = useState(false);
    const { potholes, deletePothole } = useData();
    const { user } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="map-placeholder">Loading Map...</div>;

    return (
        <div className="map-wrapper" style={{ height: '100%', width: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
            <MapContainer
                center={[17.3850, 78.4867]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
                <MapThemeConfig />
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {potholes.map((pothole) => (
                    <Marker
                        key={pothole.id}
                        position={[pothole.lat, pothole.lng]}
                        icon={createCustomIcon(pothole.severity)}
                    >
                        <Popup className="dark-popup">
                            <div className="popup-content" style={{ position: 'relative' }}>
                                {user === 'authority' && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); deletePothole(pothole.id); }}
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--status-severe)',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            zIndex: 10
                                        }}
                                        title="Delete Fake Report"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                                <span className={`badge badge-${pothole.severity}`}>
                                    {pothole.severity.toUpperCase()}
                                </span>
                                <h4 style={{ paddingRight: user === 'authority' ? '24px' : '0' }}>Pothole Detected</h4>
                                <p>Status: {pothole.status}</p>
                                <p className="time">{pothole.timestamp}</p>
                                {pothole.image && (
                                    <img src={pothole.image} alt="Pothole" className="popup-image" />
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
