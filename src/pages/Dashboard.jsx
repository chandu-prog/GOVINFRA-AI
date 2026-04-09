import { motion } from 'framer-motion';
import { PotholeMap } from '../components/dashboard/PotholeMap';
import { RecentReports } from '../components/dashboard/RecentReports';
import { AlertOctagon, Wrench, Activity, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const statConfig = [
    {
        label: 'Total Reports',
        icon: Activity,
        color: '#00d4ff',
        glow: 'rgba(0,212,255,0.15)',
        border: 'rgba(0,212,255,0.25)',
        getValue: (potholes) => potholes.length.toLocaleString()
    },
    {
        label: 'Severe Hazards',
        icon: AlertOctagon,
        color: '#ff4757',
        glow: 'rgba(255,71,87,0.15)',
        border: 'rgba(255,71,87,0.25)',
        getValue: (potholes) => potholes.filter(p => p.severity === 'severe').length
    },
    {
        label: 'Repaired This Month',
        icon: Wrench,
        color: '#2ed573',
        glow: 'rgba(46,213,115,0.15)',
        border: 'rgba(46,213,115,0.25)',
        getValue: (potholes) => potholes.filter(p => p.status === 'repaired').length
    },
    {
        label: 'AI Risk Avg',
        icon: TrendingUp,
        color: '#ffa502',
        glow: 'rgba(255,165,2,0.15)',
        border: 'rgba(255,165,2,0.25)',
        getValue: () => '7.4 / 10'
    },
];

export default function Dashboard() {
    const { potholes } = useData();

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            className="dashboard-container"
            style={{ paddingTop: '24px' }}
        >
            <header style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ed573', boxShadow: '0 0 8px #2ed573', animation: 'pulseGlow 2s infinite' }} />
                    <span style={{ fontSize: '0.75rem', color: '#2ed573', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live Feed Active</span>
                </div>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '6px' }}>
                    <span className="text-gradient">City Overview</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Real-time pothole tracking and AI-powered road safety analytics.</p>
            </header>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {statConfig.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            style={{
                                padding: '22px',
                                borderRadius: '18px',
                                background: `linear-gradient(135deg, ${stat.glow}, rgba(8,12,22,0.9))`,
                                border: `1px solid ${stat.border}`,
                                boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${stat.border}`,
                                cursor: 'default',
                                transition: 'transform 0.3s ease',
                                position: 'relative', overflow: 'hidden'
                            }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</p>
                                <div style={{ padding: '8px', borderRadius: '10px', background: `${stat.glow}`, border: `1px solid ${stat.border}` }}>
                                    <Icon size={16} color={stat.color} />
                                </div>
                            </div>
                            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: stat.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
                                {stat.getValue(potholes)}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Map and Reports Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div style={{
                    height: '520px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,212,255,0.12)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05)'
                }}>
                    <PotholeMap />
                </div>
                <div style={{ height: '520px' }}>
                    <RecentReports />
                </div>
            </div>
        </motion.div>
    );
}


