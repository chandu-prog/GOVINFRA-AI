import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_ROAD_HEALTH } from '../../data/mockData';

const RoadHealthMap = () => {
  // Mock coordinates for the segments
  const segmentsWithCoords = [
    { ...MOCK_ROAD_HEALTH[0], lat: 17.43, lng: 78.38 },
    { ...MOCK_ROAD_HEALTH[1], lat: 17.45, lng: 78.38 },
    { ...MOCK_ROAD_HEALTH[2], lat: 17.46, lng: 78.36 },
    { ...MOCK_ROAD_HEALTH[3], lat: 17.44, lng: 78.35 },
  ];

  const getColor = (score) => {
    if (score > 80) return '#10B981'; // Green
    if (score > 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 relative">
       {/* Leaflet Map */}
       <MapContainer 
          center={[17.44, 78.37]} 
          zoom={13} 
          style={{ height: '100%', width: '100%', background: '#1a1a2e' }}
          zoomControl={false}
       >
         <TileLayer
           url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
           attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         />
         
         {segmentsWithCoords.map((segment, idx) => (
           <CircleMarker
             key={idx}
             center={[segment.lat, segment.lng]}
             radius={segment.healthScore < 50 ? 25 : 15}
             pathOptions={{
               fillColor: getColor(segment.healthScore),
               color: getColor(segment.healthScore),
               weight: 2,
               fillOpacity: 0.4
             }}
           >
             <Popup
                className="predictive-popup"
             >
                <div className="p-2 bg-[#1E293B] text-white rounded-lg shadow-xl">
                  <h4 className="font-bold border-b border-white/10 pb-2 mb-2">{segment.segment}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex justify-between gap-4"><span className="text-gray-400">Health Score:</span> <span className="font-bold" style={{color: getColor(segment.healthScore)}}>{segment.healthScore}/100</span></p>
                    <p className="flex justify-between gap-4"><span className="text-gray-400">Traffic:</span> <span>{segment.trafficDensity}</span></p>
                    <p className="flex justify-between gap-4 mt-2 border-t border-white/10 pt-2"><span className="text-gray-400">Predicted Failure:</span> <span className="text-red-400 font-medium">{segment.predictedFailure}</span></p>
                  </div>
                </div>
             </Popup>
           </CircleMarker>
         ))}
       </MapContainer>

       {/* Legend overlay */}
       <div className="absolute bottom-4 right-4 z-[400] bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col gap-2 shadow-xl">
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-xs text-white">Healthy (&gt;80)</span></div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-xs text-white">Warning (60-80)</span></div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div><span className="text-xs text-white">At-Risk (&lt;60)</span></div>
       </div>

    </div>
  );
};

export default RoadHealthMap;
