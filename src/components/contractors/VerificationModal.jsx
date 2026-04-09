import React from 'react';

const VerificationModal = ({ verification, onClose }) => {
  if (!verification) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-4xl border border-white/10 shadow-2xl overflow-hidden">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">AI Repair Verification</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-light">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="space-y-3">
            <h3 className="text-gray-300 font-semibold uppercase tracking-wider text-sm">Before (Detected Pothole)</h3>
            <div className="h-64 rounded-xl overflow-hidden bg-gray-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400" 
                alt="Before" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                Severe Defect
              </div>
            </div>
          </div>

          {/* After */}
          <div className="space-y-3">
            <h3 className="text-gray-300 font-semibold uppercase tracking-wider text-sm">After (Contractor Submission)</h3>
            <div className="h-64 rounded-xl overflow-hidden bg-gray-800 relative border-2 border-primary/50">
              <img 
                src={verification.imageUrl} 
                alt="After" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* AI Analysis Results */}
        <div className="mt-8 bg-black/30 rounded-xl p-5 border border-white/5">
          <h3 className="text-white font-semibold mb-4 text-lg">AI Vision Analysis</h3>
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1">Confidence Score</div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-green-400">{verification.aiConfidence}%</div>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                   <div className="h-full bg-green-400 rounded-full" style={{ width: `${verification.aiConfidence}%` }}></div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2">
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400">Surface Uniformity:</span>
                 <span className="text-white font-medium">Verified</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400">Material Match:</span>
                 <span className="text-white font-medium">Verified</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-gray-400">Structural Seal:</span>
                 <span className="text-yellow-400 font-medium">Warning (Edges)</span>
               </div>
            </div>

          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
           <button onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition">
             Request Rework
           </button>
           <button onClick={onClose} className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition shadow-lg shadow-green-500/20">
             Approve & Release Payment
           </button>
        </div>

      </div>
    </div>
  );
};

export default VerificationModal;
