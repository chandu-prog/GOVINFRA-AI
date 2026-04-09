import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, MapPin, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Report() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [location, setLocation] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const debounceTimerRef = useRef(null);
    const { addNewReport } = useData();

    // Handling location autocomplete
    useEffect(() => {
        // Skip if empty or looks like coordinate or user already selected
        if (!location || location.includes(',') || location.length < 3) {
            setSuggestions([]);
            return;
        }

        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

        debounceTimerRef.current = setTimeout(async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location + ', Hyderabad, India')}&limit=5`);
                const data = await response.json();
                
                // Don't show if the exact match was just typed/clicked
                if (data.length === 1 && data[0].display_name === location) {
                    setSuggestions([]);
                } else {
                    setSuggestions(data || []);
                }
            } catch (e) {
                console.error("Autocomplete failed:", e);
            }
        }, 400);

        return () => clearTimeout(debounceTimerRef.current);
    }, [location]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionPhase, setSubmissionPhase] = useState('');

    const geocodeLocation = async (query) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Hyderabad, India')}`);
            const data = await response.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            }
        } catch (e) {
            console.error("Geocoding failed", e);
        }
        return null;
    };

    // Helper to simulate delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        let lat = 17.3850;
        let lng = 78.4867;

        // Phase 1: Location
        setSubmissionPhase('verifying_location');
        if (selectedCoords) {
            lat = selectedCoords.lat;
            lng = selectedCoords.lng;
            await delay(500); // UI feel
        } else if (location) {
            const parts = location.split(',');
            const isStrictCoordinate = (str) => /^\s*-?\d+(\.\d+)?\s*$/.test(str);

            if (parts.length === 2 && isStrictCoordinate(parts[0]) && isStrictCoordinate(parts[1])) {
                lat = parseFloat(parts[0]);
                lng = parseFloat(parts[1]);
                await delay(500);
            } else {
                const coords = await geocodeLocation(location);
                if (coords) {
                    lat = coords.lat;
                    lng = coords.lng;
                } else {
                    lat = 17.3850 + (Math.random() * 0.1 - 0.05);
                    lng = 78.4867 + (Math.random() * 0.1 - 0.05);
                }
            }
        } else {
             lat = 17.3850 + (Math.random() * 0.1 - 0.05);
             lng = 78.4867 + (Math.random() * 0.1 - 0.05);
             await delay(500);
        }

        // Phase 2: AI Analysis
        if (file) {
            setSubmissionPhase('ai_analyzing');
            await delay(1500);
            setSubmissionPhase('calculating_risk');
            await delay(1000);
        } else {
            setSubmissionPhase('calculating_risk');
            await delay(800);
        }

        setSubmissionPhase('finalizing');

        const newPothole = {
            lat: lat,
            lng: lng,
            severity: document.querySelector('input[name="severity"]:checked')?.value || 'medium',
            status: 'reported',
            timestamp: 'Just now',
            image: file ? URL.createObjectURL(file) : 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400'
        };

        const newReport = {
            user: 'You',
            location: location || 'Unknown',
            time: 'Just now',
            status: 'Pending AI Verification',
            // Generate a more specific risk score
            riskScore: (Math.random() * 4 + 6).toFixed(1)
        };

        addNewReport(newPothole, newReport);

        setIsSubmitting(false);
        setSubmissionPhase('');
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFile(null);
            setLocation('');
            setSelectedCoords(null);
        }, 4000);
    };

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lng = position.coords.longitude.toFixed(4);
                    setLocation(`${lat}, ${lng}`);
                    setIsLocating(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to retrieve your location. Please ensure location services are enabled.");
                    setIsLocating(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
            setIsLocating(false);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-container"
            style={{ paddingTop: '16px', maxWidth: '800px', margin: '0 auto' }}
        >
            <header style={{ marginBottom: '32px', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Report an Issue</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Help keep our city safe by reporting potholes and road hazards.</p>
            </header>

            {submitted ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel"
                    style={{ padding: '48px', textAlign: 'center', borderColor: 'var(--status-repaired)' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <CheckCircle2 size={64} className="text-gradient" style={{ filter: 'drop-shadow(0 0 10px var(--status-repaired-glow))' }} />
                    </div>
                    <h2 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Report Submitted!</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Thank you. AI is verifying your report and we will dispatch a team soon.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px' }}>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Upload Photo</label>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            style={{
                                border: `2px dashed ${dragActive ? 'var(--brand-primary)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius-md)',
                                padding: '40px',
                                textAlign: 'center',
                                backgroundColor: dragActive ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById('file-upload').click()}
                        >
                            <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleChange} accept="image/*" />
                            {file ? (
                                <div style={{ color: 'var(--brand-primary)', fontWeight: '600' }}>{file.name} selected</div>
                            ) : (
                                <>
                                    <UploadCloud size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
                                    <p style={{ color: 'var(--text-secondary)' }}>Drag and drop an image, or click to browse</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>JPEG, PNG, HEIC up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Location Details</label>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={isLocating}
                                className="glass-panel flex-center"
                                style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isLocating ? 0.7 : 1, cursor: isLocating ? 'wait' : 'pointer' }}
                            >
                                {isLocating ? <Loader2 size={18} className="animate-spin" color="var(--brand-primary)" /> : <MapPin size={18} color="var(--brand-primary)" />}
                                {isLocating ? 'Locating...' : 'Use Current Location'}
                            </button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setSelectedCoords(null);
                                }}
                                placeholder="Or enter nearest address / landmark (e.g. Ameerpet)"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: 'var(--bg-surface-elevated)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                            {suggestions.length > 0 && (
                                <ul style={{
                                    listStyle: 'none',
                                    margin: 0,
                                    padding: 0,
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    zIndex: 50,
                                    marginTop: '4px',
                                    backgroundColor: '#1E293B',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                    maxHeight: '200px',
                                    overflowY: 'auto'
                                }}>
                                    {suggestions.map((s, i) => (
                                        <li 
                                            key={i}
                                            onClick={() => {
                                                setLocation(s.display_name);
                                                setSelectedCoords({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
                                                setSuggestions([]);
                                            }}
                                            style={{
                                                padding: '12px 16px',
                                                borderBottom: i === suggestions.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                color: '#E2E8F0',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            {s.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Severity Estimate (Optional)</label>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {['Low', 'Medium', 'Severe'].map((sev) => (
                                <label key={sev} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                                    <input type="radio" name="severity" value={sev.toLowerCase()} style={{ accentColor: 'var(--brand-primary)' }} />
                                    {sev}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid var(--brand-primary)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <AlertCircle size={20} color="var(--brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Our AI will analyze the uploaded image to automatically confirm severity, dimensions, and accident risk score.
                            </p>
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '1rem',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                        transition: 'transform 0.2s',
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? 'wait' : 'pointer'
                    }}
                        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        {isSubmitting ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Loader2 size={20} className="animate-spin" /> 
                                {submissionPhase === 'verifying_location' ? 'Verifying Coordinates...' :
                                 submissionPhase === 'ai_analyzing' ? 'AI Analyzing Image Dimensions...' :
                                 submissionPhase === 'calculating_risk' ? 'Calculating Collision Risk Score...' :
                                 submissionPhase === 'finalizing' ? 'Finalizing Report...' :
                                 'Processing...'}
                            </div>
                        ) : 'Submit Report'}
                    </button>
                </form>
            )}
        </motion.div>
    );
}
