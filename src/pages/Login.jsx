import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Zap, Eye, EyeOff, AlertTriangle, ArrowLeft, Lock, AtSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login, loginError, setLoginError } = useAuth();
    const navigate = useNavigate();

    const [portal, setPortal] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectPortal = (type) => {
        setPortal(type);
        setUsername('');
        setPassword('');
        setLoginError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setLoginError('Please enter both username and password.');
            return;
        }
        setIsLoading(true);
        // Small delay for UX feel
        await new Promise(r => setTimeout(r, 600));
        const result = login(username, password, portal);
        setIsLoading(false);
        if (result && result.success) {
            navigate('/');
        }
    };

    const portalConfig = {
        citizen: {
            label: 'Citizen Portal',
            subtitle: 'Report potholes & track issues',
            icon: User,
            color: '#00d4ff',
            glow: 'rgba(0,212,255,0.12)',
            border: 'rgba(0,212,255,0.28)',
            hint: { user: 'citizen1', pass: 'citizen123' }
        },
        authority: {
            label: 'Government Portal',
            subtitle: 'Authorized personnel only',
            icon: ShieldCheck,
            color: '#a78bfa',
            glow: 'rgba(124,58,237,0.12)',
            border: 'rgba(124,58,237,0.3)',
            hint: { user: 'admin', pass: 'gov@2024' }
        }
    };

    const cfg = portal ? portalConfig[portal] : null;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at 20% 30%, rgba(0,212,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(124,58,237,0.09) 0%, transparent 55%), #080c14',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Space Grotesk', sans-serif"
        }}>
            {/* Grid background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

                {/* Logo */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(0,212,255,0.2)', marginBottom: '12px', boxShadow: '0 8px 32px rgba(0,212,255,0.1)' }}>
                        <Zap size={30} color="#00d4ff" style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }} />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', background: 'linear-gradient(135deg,#00d4ff,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GOVINFRA AI</h1>
                    <p style={{ color: '#4b5a7a', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>Smart City Infrastructure Platform</p>
                </motion.div>

                {/* Card */}
                <motion.div layout style={{
                    background: 'linear-gradient(160deg, rgba(13,18,32,0.97), rgba(8,12,22,0.97))',
                    border: `1px solid ${cfg ? cfg.border : 'rgba(0,212,255,0.1)'}`,
                    borderRadius: '22px',
                    padding: '32px',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.4s'
                }}>
                    {/* Top shimmer */}
                    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px', background: cfg ? `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` : 'linear-gradient(90deg, transparent, #00d4ff, #a78bfa, transparent)' }} />

                    <AnimatePresence mode="wait">
                        {/* — Portal Selection — */}
                        {!portal && (
                            <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f0f6ff', marginBottom: '4px', textAlign: 'center' }}>Select Your Access Portal</h2>
                                <p style={{ color: '#4b5a7a', fontSize: '0.82rem', textAlign: 'center', marginBottom: '24px' }}>Only login through your authorized role</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {Object.entries(portalConfig).map(([key, p]) => {
                                        const Icon = p.icon;
                                        return (
                                            <motion.button key={key} onClick={() => handleSelectPortal(key)}
                                                whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', borderRadius: '14px', background: p.glow, border: `1px solid ${p.border}`, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%' }}>
                                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: p.glow, border: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <Icon size={20} color={p.color} />
                                                </div>
                                                <div>
                                                    <div style={{ color: '#f0f6ff', fontWeight: 700, fontSize: '0.9rem' }}>{p.label}</div>
                                                    <div style={{ color: '#8b9cbf', fontSize: '0.75rem', marginTop: '2px' }}>{p.subtitle}</div>
                                                </div>
                                                <div style={{ marginLeft: 'auto', color: p.color, fontSize: '1.2rem' }}>›</div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                                <p style={{ marginTop: '20px', fontSize: '0.7rem', color: '#2b3a55', textAlign: 'center' }}>Unauthorized access is monitored and logged.</p>
                            </motion.div>
                        )}

                        {/* — Credential Form — */}
                        {portal && cfg && (
                            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <button onClick={() => { setPortal(null); setLoginError(''); }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5a7a', fontSize: '0.78rem', fontWeight: 600, marginBottom: '18px', cursor: 'pointer', fontFamily: 'inherit', background: 'none', border: 'none' }}>
                                    <ArrowLeft size={13} /> Back to portals
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: cfg.glow, border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {portal === 'citizen' ? <User size={19} color={cfg.color} /> : <ShieldCheck size={19} color={cfg.color} />}
                                    </div>
                                    <div>
                                        <div style={{ color: '#f0f6ff', fontWeight: 800, fontSize: '0.95rem' }}>{cfg.label}</div>
                                        <div style={{ color: cfg.color, fontSize: '0.72rem', fontWeight: 600 }}>{cfg.subtitle}</div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Username */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#8b9cbf', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>Username</label>
                                        <div style={{ position: 'relative' }}>
                                            <AtSign size={15} color="#4b5a7a" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={e => { setUsername(e.target.value); setLoginError(''); }}
                                                placeholder={`Enter your username`}
                                                autoComplete="username"
                                                style={{ width: '100%', padding: '12px 13px 12px 38px', borderRadius: '11px', background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.1)`, color: '#f0f6ff', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none' }}
                                                onFocus={e => e.target.style.borderColor = cfg.border}
                                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#8b9cbf', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <Lock size={15} color="#4b5a7a" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={e => { setPassword(e.target.value); setLoginError(''); }}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                style={{ width: '100%', padding: '12px 42px 12px 38px', borderRadius: '11px', background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.1)`, color: '#f0f6ff', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none' }}
                                                onFocus={e => e.target.style.borderColor = cfg.border}
                                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                            <button type="button" onClick={() => setShowPassword(s => !s)}
                                                style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4b5a7a' }}>
                                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Error */}
                                    <AnimatePresence>
                                        {loginError && (
                                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                style={{ padding: '10px 13px', borderRadius: '10px', background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.25)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                <AlertTriangle size={14} color="#ff4757" style={{ flexShrink: 0, marginTop: '1px' }} />
                                                <p style={{ color: '#ff7f8a', fontSize: '0.78rem', fontWeight: 600, margin: 0 }}>{loginError}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                                        style={{
                                            padding: '13px', borderRadius: '12px', border: 'none', color: 'white',
                                            fontWeight: 700, fontSize: '0.9rem', cursor: isLoading ? 'wait' : 'pointer',
                                            opacity: isLoading ? 0.75 : 1, fontFamily: 'inherit', marginTop: '4px',
                                            background: portal === 'citizen'
                                                ? 'linear-gradient(135deg, #00b4d8, #0077b6)'
                                                : 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                                            boxShadow: `0 8px 24px ${cfg.glow}`
                                        }}>
                                        {isLoading ? 'Authenticating...' : `Sign In →`}
                                    </motion.button>
                                </form>

                                {/* Demo hint */}
                                <div style={{ marginTop: '18px', padding: '11px 14px', borderRadius: '10px', background: 'rgba(255,165,2,0.05)', border: '1px solid rgba(255,165,2,0.12)' }}>
                                    <p style={{ color: '#ffa502', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>Demo Credentials</p>
                                    <p style={{ color: '#8b9cbf', fontSize: '0.76rem', margin: 0 }}>
                                        User: <strong style={{ color: '#f0f6ff' }}>{cfg.hint.user}</strong> &nbsp;|&nbsp; Pass: <strong style={{ color: '#f0f6ff' }}>{cfg.hint.pass}</strong>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
