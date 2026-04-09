import { motion } from 'framer-motion';
import { ShieldCheck, User, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role);
        navigate('/');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `
                radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 55%),
                radial-gradient(ellipse at 80% 70%, rgba(124, 58, 237, 0.1) 0%, transparent 55%),
                #080c14
            `,
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated grid background */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                pointerEvents: 'none'
            }} />

            {/* Floating orbs */}
            <div style={{
                position: 'absolute', top: '15%', left: '10%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '15%', right: '10%',
                width: '250px', height: '250px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: '480px', width: '100%', position: 'relative', zIndex: 1 }}
            >
                {/* Main card */}
                <div style={{
                    background: 'linear-gradient(160deg, rgba(13,18,32,0.97) 0%, rgba(8,12,22,0.97) 100%)',
                    border: '1px solid rgba(0,212,255,0.12)',
                    borderRadius: '24px',
                    padding: '48px 40px',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,212,255,0.05)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Top glow line */}
                    <div style={{
                        position: 'absolute', top: 0, left: '10%', right: '10%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)'
                    }} />

                    {/* Logo icon */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        style={{ marginBottom: '28px' }}
                    >
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '72px', height: '72px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                            border: '1px solid rgba(0,212,255,0.25)',
                            marginBottom: '20px',
                            boxShadow: '0 8px 32px rgba(0,212,255,0.15)'
                        }}>
                            <Zap size={36} color="#00d4ff" style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.8))' }} />
                        </div>
                        <h1 className="text-gradient" style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.03em' }}>
                            GOVINFRA AI
                        </h1>
                        <p style={{ color: '#4b5a7a', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            Smart City Infrastructure Platform
                        </p>
                    </motion.div>

                    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)', margin: '0 0 28px' }} />

                    <p style={{ color: '#8b9cbf', fontSize: '0.9rem', marginBottom: '24px' }}>
                        Select your access portal to continue
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Citizen button */}
                        <motion.button
                            onClick={() => handleLogin('citizen')}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                padding: '16px',
                                borderRadius: '14px',
                                background: 'rgba(0,212,255,0.04)',
                                border: '1px solid rgba(0,212,255,0.15)',
                                color: '#f0f6ff',
                                fontWeight: 600, fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit'
                            }}
                        >
                            <User size={19} color="#00d4ff" />
                            Login as Citizen
                        </motion.button>

                        {/* Authority button */}
                        <motion.button
                            onClick={() => handleLogin('authority')}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                padding: '16px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(124,58,237,0.9))',
                                border: 'none',
                                color: 'white',
                                fontWeight: 700, fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(0,212,255,0.3), 0 0 0 1px rgba(0,212,255,0.2)',
                                fontFamily: 'inherit'
                            }}
                        >
                            <ShieldCheck size={19} />
                            Login as Authority
                        </motion.button>
                    </div>

                    <p style={{ marginTop: '28px', fontSize: '0.75rem', color: '#4b5a7a' }}>
                        Demo mode · Identity verification bypassed
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

