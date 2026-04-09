import React, { useState } from 'react';
import { MOCK_CONTRACTORS, MOCK_VERIFICATIONS } from '../data/mockData';
import VerificationModal from '../components/contractors/VerificationModal';
import PerformanceChart from '../components/contractors/PerformanceChart';
import { FaUserShield, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const Contractors = () => {
  const [selectedVerification, setSelectedVerification] = useState(null);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaCheckCircle/> Approved</span>;
      case 'rejected': return <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaTimesCircle/> Rejected</span>;
      default: return <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaClock/> Pending</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FaUserShield className="text-primary" /> Contractor Verification
          </h1>
          <p className="text-gray-400">AI-powered quality control and automated payment clearance.</p>
        </div>
      </div>

      {/* Top Section: Analytics & Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        
        <div className="bg-white/5 border border-white/10 shadow-lg rounded-2xl p-6">
           <h3 className="text-xl font-bold text-white mb-6">Active Contractors Directory</h3>
           <div className="space-y-4">
              {MOCK_CONTRACTORS.map(c => (
                <div key={c.id} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/20 transition">
                  <div>
                    <p className="text-white font-bold text-lg">{c.name}</p>
                    <p className="text-sm text-gray-400 mt-1">Rating: ⭐ {c.rating} • <span className="text-primary font-medium">{c.activeJobs} Active Jobs</span></p>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-green-400">{c.completedJobs}</p>
                     <p className="text-xs text-uppercase tracking-wider text-gray-400">Completed</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom Section: Verification Queue */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Pending AI Verifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_VERIFICATIONS.map(v => (
            <div key={v.id} className="bg-white/5 border border-white/10 shadow-lg rounded-2xl p-5 hover:bg-white/10 transition group flex flex-col justify-between">
              
              <div className="flex items-start gap-4 mb-4">
                <div className="relative overflow-hidden rounded-xl w-24 h-24 shrink-0 border-2 border-white/10 group-hover:border-primary/50 transition">
                   <img src={v.imageUrl} alt="Repair" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">{v.contractor}</h3>
                  <p className="text-sm text-gray-400 mb-2 truncate"><FaClock className="inline mr-1" />{v.date}</p>
                  <p className="text-sm text-gray-300 w-full truncate">{v.location}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                   <div className="text-center">
                     <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">AI Match</p>
                     <p className={`text-lg font-black ${v.aiConfidence > 80 ? 'text-green-400' : 'text-yellow-400'}`}>{v.aiConfidence}%</p>
                   </div>
                   <div>{getStatusBadge(v.status)}</div>
                </div>
                <button 
                  onClick={() => setSelectedVerification(v)}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg text-sm font-bold transition shadow-lg shadow-primary/20"
                >
                  Review
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <VerificationModal verification={selectedVerification} onClose={() => setSelectedVerification(null)} />

    </div>
  );
};

export default Contractors;
