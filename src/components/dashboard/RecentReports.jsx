import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Camera, Clock, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function RecentReports() {
    const { reports, deleteReport } = useData();
    const { user } = useAuth();
    
    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Live Activity</h3>
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
                {reports.map((report, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={report.id}
                        style={{
                            padding: '16px',
                            marginBottom: '12px',
                            backgroundColor: 'var(--bg-surface-elevated)',
                            borderRadius: 'var(--radius-md)',
                            borderLeft: `3px solid ${report.riskScore > 8 ? 'var(--status-severe)' : report.riskScore > 6 ? 'var(--status-medium)' : 'var(--status-repaired)'}`,
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {user === 'authority' && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); deleteReport(report.id); }}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--status-severe)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)'
                                }}
                                title="Delete Fake Report"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', paddingRight: user === 'authority' ? '28px' : '0' }}>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                                {report.user.includes('AI') ? <Camera size={16} className="text-gradient" /> : <span style={{ width: '16px', height: '16px', background: 'var(--bg-surface-elevated)', borderRadius: '50%', display: 'inline-block' }}></span>}
                                {report.location}
                            </h4>
                            <span style={{
                                fontSize: '0.75rem',
                                color: report.riskScore > 8 ? 'var(--status-severe)' : 'var(--text-primary)',
                                fontWeight: '700',
                                background: 'rgba(0,0,0,0.3)',
                                padding: '2px 6px',
                                borderRadius: '4px'
                            }}>
                                Risk: {report.riskScore}
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                                {report.status.includes('Verified') ? <CheckCircle size={14} color="var(--status-repaired)" /> : <AlertTriangle size={14} color="var(--status-medium)" />}
                                {report.status}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                                <Clock size={12} />
                                {report.time}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
