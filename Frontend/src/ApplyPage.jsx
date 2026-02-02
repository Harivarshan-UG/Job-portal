import React, { useState, useEffect } from 'react';

export default function ApplyPage() {
    const [isApplied, setIsApplied] = useState(false);
    const [job, setjob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch real data from the backend
        fetch('http://127.0.0.1:8000/jobs/')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch jobs');
                return response.json();
            })
            .then(data => {
                // Handle different response structures
                let jobs = [];
                if (Array.isArray(data)) {
                    jobs = data;
                } else if (Array.isArray(data.results)) {
                    jobs = data.results;
                } else if (Array.isArray(data.data)) {
                    jobs = data.data;
                }

                if (jobs.length > 0) {
                    // Taking the first job for this view
                    const job = jobs[0];
                    setjob({
                        id: job.id,
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        postedDate: new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        salary: job.salary_range,
                        description: job.description,
                        About: job.About,
                        fullDescription: job.description, 
                        benefits: ['Health Insurance', 'Remote Work', '401k Match', 'Professional Development', 'Flexible Hours'],
                        tags: ['Figma','HTML','JavaScript', 'Web Development', 'Full-time']
                    });
                } else {
                    setError('No jobs available');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
                setError('Failed to load job details. Is the backend running on port 8000?');
                setLoading(false);
            });
    }, []);

    const handleApply = async () => {
        if (!job) return;

        try {
            console.log('Applying for job:', job.id);
            const response = await fetch('http://127.0.0.1:8000/apply/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job: job.id,
                    applicant: 1 // Replace with actual applicant ID
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsApplied(true);
            } else {
                alert(data.message || 'Application failed');
            }
        } catch (err) {
            console.error('Error applying:', err);
            alert('Failed to submit application. Check console for details.');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                {/* Simple loading spinner */}
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium animate-pulse">Loading Job Details...</p>
            </div>
        </div>
    );
    
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold px-4 text-center">{error}</div>;
    if (!job) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex flex-col font-sans">
            {/* Header */}
            <header className="border-b bg-white">
            <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 lg:px-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-blue-700">JobPortal</h1>

                <nav className="hidden md:flex gap-6 lg:gap-10 text-sm lg:text-base font-medium text-gray-700">
                <a href="#" className="hover:text-blue-700 transition">Jobs</a>
                <a href="#" className="hover:text-blue-700 transition">Companies</a>
                <a href="#" className="hover:text-blue-700 transition">Applications</a>
                </nav>

                <div className="flex items-center gap-4 lg:gap-6">
                <span className="text-sm lg:text-base text-gray-600">Hello, Harivarshan</span>
                <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                    H
                </div>
                </div>
            </div>
            </header>

            {/* Main Content */}
            <main className="grow px-4 py-8 lg:px-8 lg:py-12">
                <div className="mx-auto max-w-5xl">
                    {/* Back Button */}
                    <button
                        onClick={() => console.log("Navigate back")}
                        className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer group"
                    >
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Jobs
                    </button>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Job Card Header Section */}
                        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 md:p-10 text-white relative overflow-hidden">
                             {/* Decorative circles for depth */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-white opacity-5 pointer-events-none"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 relative z-10 gap-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{job.title}</h1>
                                    <p className="text-blue-100 text-lg flex items-center gap-2 font-medium">
                                        <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {job.company}
                                    </p>
                                </div>
                                <div className="text-left md:text-right bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
                                    <p className="text-blue-50 text-xs uppercase tracking-wider mb-1 font-bold">Salary </p>
                                    <p className="text-xl md:text-2xl font-bold">{job.salary}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                                {job.tags.map((tag) => (
                                    <span key={tag} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/20 shadow-sm hover:bg-white/30 transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Info Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-10 py-6 bg-gray-50 border-b border-gray-200">
                            <div className="flex flex-wrap gap-6 md:gap-12">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Location</p>
                                        <p className="text-gray-900 font-semibold">{job.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Posted</p>
                                        <p className="text-gray-900 font-semibold">{job.postedDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button moved here */}
                            <div>
                                {!isApplied ? (
                                    <button
                                        onClick={handleApply}
                                        className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-base flex items-center gap-2"
                                    >
                                        <span>Apply Now</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-md text-base flex items-center gap-2 cursor-default"
                                    >
                                        <span>Applied</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Job Description Content */}
                        <div className="p-6 md:p-10">
                            <div className="prose max-w-none text-gray-600">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    About This Role
                                </h2>
                                <p className="text-lg leading-relaxed mb-8 text-gray-700">
                                    {job.About}
                                </p>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">Full Job Description</h3>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-10">
                                    <p className="whitespace-pre-line leading-relaxed text-gray-700">
                                        {job.fullDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="mt-8 mb-12">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    Benefits & Perks
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {job.benefits.map((benefit) => (
                                        <div key={benefit} className="flex items-center gap-3 bg-green-50/50 p-4 rounded-xl border border-green-100 hover:border-green-200 hover:bg-green-50 transition-colors cursor-default">
                                            <div className="bg-green-100 p-1.5 rounded-full shrink-0">
                                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-800 font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white mt-auto">
                <div className="mx-auto max-w-8xl px-4 py-6 lg:px-8 lg:py-8 text-center text-sm lg:text-base text-gray-500">
                © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>
        </div>
    );
}