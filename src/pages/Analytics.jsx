import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertOctagon, TrendingUp, ShieldAlert } from 'lucide-react';

const data = [
    { name: 'Jan', risk: 4000, fixed: 2400 },
    { name: 'Feb', risk: 3000, fixed: 1398 },
    { name: 'Mar', risk: 2000, fixed: 9800 },
    { name: 'Apr', risk: 2780, fixed: 3908 },
    { name: 'May', risk: 1890, fixed: 4800 },
    { name: 'Jun', risk: 2390, fixed: 3800 },
    { name: 'Jul', risk: 3490, fixed: 4300 },
];

export default function Analytics() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-container"
            style={{ paddingTop: '16px' }}
        >
            <header style={{ marginBottom: '32px' }}>
                <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', borderRadius: 'var(--radius-pill)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    Powered by AI Prediction
                </div>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Accident Risk Intelligence</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Predictive modeling based on pothole severity, traffic density, and historical data.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                        <ShieldAlert size={120} />
                    </div>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertOctagon size={18} color="var(--status-severe)" /> High Risk Zones
                    </h3>
                    <div style={{ fontSize: '3rem', fontWeight: '800', marginTop: '12px', color: 'var(--status-severe)' }}>14</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>+2 compared to last week</p>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                    <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrendingUp size={18} color="var(--brand-primary)" /> Avg Repair Time
                    </h3>
                    <div style={{ fontSize: '3rem', fontWeight: '800', marginTop: '12px', color: 'var(--text-primary)' }}>2.4 <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>days</span></div>
                    <p style={{ color: '#6ee7b7', fontSize: '0.85rem', marginTop: '8px' }}>-15% improvement this month</p>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>Risk vs Repair Trend</h3>
                <div style={{ height: '400px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="var(--text-muted)" />
                            <YAxis stroke="var(--text-muted)" />
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(22, 25, 32, 0.9)',
                                    borderColor: 'var(--border-color)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                            <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" />
                            <Area type="monotone" dataKey="fixed" stroke="#10b981" fillOpacity={1} fill="url(#colorFixed)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}
