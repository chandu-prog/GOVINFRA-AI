// Mock Data simulating AI-detected potholes and user reports

export const MOCK_POTHOLES = [
    { id: 1, lat: 17.3850, lng: 78.4867, severity: 'severe', status: 'reported', timestamp: '2 mins ago', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400' },
    { id: 2, lat: 17.3950, lng: 78.4900, severity: 'medium', status: 'verified', timestamp: '15 mins ago', image: 'https://images.unsplash.com/photo-1544605988-cb7f9b0f4435?auto=format&fit=crop&q=80&w=400' },
    { id: 3, lat: 17.3750, lng: 78.4750, severity: 'repaired', status: 'resolved', timestamp: '1 day ago' },
    { id: 4, lat: 17.4000, lng: 78.4600, severity: 'severe', status: 'verified', timestamp: '1 hour ago', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400' },
    { id: 5, lat: 17.3600, lng: 78.4950, severity: 'medium', status: 'reported', timestamp: '3 hours ago' },
];

export const MOCK_REPORTS = [
    { id: 101, user: 'John D.', location: 'Madhapur Main Road', time: '10 mins ago', status: 'Pending AI Verification', riskScore: 8.5 },
    { id: 102, user: 'Sarah M.', location: 'Banjara Hills Rd 12', time: '45 mins ago', status: 'Verified', riskScore: 9.2 },
    { id: 103, user: 'AI Camera #42', location: 'Jubilee Hills Checkpost', time: '2 hours ago', status: 'High Accident Risk', riskScore: 9.8 },
    { id: 104, user: 'Mike T.', location: 'Kukatpally Y Junction', time: '5 hours ago', status: 'Repair Dispatched', riskScore: 6.4 },
];

export const MOCK_CONTRACTORS = [
    { id: "C01", name: 'RoadTech Builders Ltd.', rating: 4.8, activeJobs: 3, completedJobs: 145 },
    { id: "C02", name: 'Prime Paving & Infra', rating: 4.5, activeJobs: 5, completedJobs: 89 },
    { id: "C03", name: 'Metro InfraWorks', rating: 3.9, activeJobs: 2, completedJobs: 42 },
];

export const MOCK_VERIFICATIONS = [
    { id: "V100", contractor: 'RoadTech Builders Ltd.', location: 'Jubilee Hills Checkpost', date: 'Oct 12, 2026', aiConfidence: 98, status: 'approved', imageUrl: 'https://images.unsplash.com/photo-1584742547141-94e4334360e2?auto=format&fit=crop&q=80&w=400' },
    { id: "V101", contractor: 'Prime Paving & Infra', location: 'Madhapur Main Road', date: 'Oct 14, 2026', aiConfidence: 65, status: 'rejected', imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400' },
    { id: "V102", contractor: 'Metro InfraWorks', location: 'Banjara Hills Rd 12', date: 'Oct 15, 2026', aiConfidence: 92, status: 'pending', imageUrl: 'https://images.unsplash.com/photo-1584742547141-94e4334360e2?auto=format&fit=crop&q=80&w=400' },
];

export const MOCK_ROAD_HEALTH = [
    { segment: 'NH-65 Outer Ring', healthScore: 82, trafficDensity: 'High', predictedFailure: '14 Months' },
    { segment: 'Hi-Tech City Main', healthScore: 45, trafficDensity: 'Very High', predictedFailure: '2 Months (Critical)' },
    { segment: 'Kondapur Road 5', healthScore: 68, trafficDensity: 'Medium', predictedFailure: '6 Months' },
    { segment: 'Gachibowli Flyover', healthScore: 95, trafficDensity: 'High', predictedFailure: '36 Months' },
];

export const MOCK_MONTHLY_DEGRADATION = [
    { month: 'Jan', 'Hi-Tech City': 85, 'Outer Ring': 90 },
    { month: 'Feb', 'Hi-Tech City': 82, 'Outer Ring': 89 },
    { month: 'Mar', 'Hi-Tech City': 78, 'Outer Ring': 88 },
    { month: 'Apr', 'Hi-Tech City': 72, 'Outer Ring': 87 },
    { month: 'May', 'Hi-Tech City': 65, 'Outer Ring': 85 },
    { month: 'Jun', 'Hi-Tech City': 58, 'Outer Ring': 84 },
    { month: 'Jul', 'Hi-Tech City': 45, 'Outer Ring': 82 }, 
];
