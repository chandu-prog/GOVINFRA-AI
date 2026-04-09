import React from 'react';
import { FaChartLine, FaExclamationTriangle, FaRoad, FaMoneyBillWave } from 'react-icons/fa';
import RoadHealthMap from '../components/predictive/RoadHealthMap';
import DegradationChart from '../components/predictive/DegradationChart';
import { MOCK_ROAD_HEALTH } from '../data/mockData';

const PredictiveMaintenance = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FaChartLine className="text-primary" /> Predictive Infrastructure Maintenance
          </h1>
          <p className="text-gray-400">Proactively identify and address road structural degradation before potholes form.</p>
        </div>
        <button className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition shadow-lg shadow-primary/30">
          Generate City Report
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xl">
               <FaExclamationTriangle />
            </div>
            <div>
               <p className="text-gray-400 text-sm">Critical Risk Zones</p>
               <h3 className="text-2xl font-bold text-white">12</h3>
            </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl">
               <FaRoad />
            </div>
            <div>
               <p className="text-gray-400 text-sm">Monitored Segments</p>
               <h3 className="text-2xl font-bold text-white">245</h3>
            </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xl">
               <FaMoneyBillWave />
            </div>
            <div>
               <p className="text-gray-400 text-sm">Est Prov. Savings</p>
               <h3 className="text-2xl font-bold text-white">₹35 Cr</h3>
            </div>
         </div>
         <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xl">
               <FaChartLine />
            </div>
            <div>
               <p className="text-gray-400 text-sm">Avg Deterioration</p>
               <h3 className="text-2xl font-bold text-white">-4% / mo</h3>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-lg shrink-0">
           <h3 className="text-xl font-bold text-white mb-4">City-Wide Health Map</h3>
           <div className="rounded-xl overflow-hidden shadow-inner">
              <RoadHealthMap />
           </div>
        </div>

        {/* Chart */}
        <div className="shadow-lg shrink-0">
           <DegradationChart />
        </div>
      </div>

      {/* Actionable items */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg mt-8">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><FaExclamationTriangle className="text-yellow-500" /> Critical Segments Action Center</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {MOCK_ROAD_HEALTH.filter(h => h.healthScore < 75).map((segment, idx) => (
                <div key={idx} className="bg-[#1a1f33] p-5 rounded-xl border border-white/5 hover:border-white/20 transition hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
                   
                   {/* Background Glow */}
                   <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 transition group-hover:opacity-40 ${segment.healthScore < 50 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>

                   <div className="flex justify-between items-start mb-4 relative z-10">
                      <h4 className="font-bold text-white text-lg">{segment.segment}</h4>
                      <div className={`flex flex-col items-end`}>
                         <span className="text-gray-400 text-xs mb-1">Health Score</span>
                         <span className={`text-sm font-black px-3 py-1 rounded-full shadow-inner ${segment.healthScore < 50 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                            {segment.healthScore} / 100
                         </span>
                      </div>
                   </div>
                   
                   <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                         <span className="text-xs text-gray-400">Traffic Density</span>
                         <span className="text-sm text-white font-medium">{segment.trafficDensity}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                         <span className="text-xs text-gray-400">Predicted Failure</span>
                         <span className="text-sm font-bold text-red-400">{segment.predictedFailure}</span>
                      </div>
                   </div>
                   
                   <button className="mt-5 w-full py-3 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-primary/20 relative z-10">
                      Schedule Maintenance Team
                   </button>
                </div>
             ))}
          </div>
      </div>

    </div>
  );
};

export default PredictiveMaintenance;
