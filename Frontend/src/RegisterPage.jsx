
import { useActionState } from 'react'

async function registerAction(_, formdata) {
    const json = Object.fromEntries(formdata)

    try {
        const res = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })

        const data = await res.json()

        if (!res.ok) {
            return data.message || 'Registration failed. Please try again.'
        }

        return data.message || 'Registration successful'
    } catch {
        return 'Network error. Please check your connection.'
    }
}

export default function RegisterPage() {
    const [message, formAction, isPending] = useActionState(registerAction, '')

    return (
        <div className="bg-gray-50 text-gray-800">
            {/* HEADER */}
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-700">
                        JobPortal
                    </div>

                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                        <a href="#" className="hover:text-blue-700">Jobs</a>
                        <a href="#" className="hover:text-blue-700">Companies</a>
                        <a href="#" className="hover:text-blue-700">Services</a>
                        <a href="#" className="hover:text-blue-700">Login</a>
                    </nav>
                </div>
            </header>

            {/* MAIN */}
            <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT INFO */}
                <section className="hidden md:block">
                    <h1 className="text-3xl font-bold leading-snug">
                        Find your dream job now
                    </h1>

                    <p className="mt-4 text-gray-600 max-w-md">
                        Register with JobPortal and get matched with the right opportunities.
                        Build your profile and apply to jobs in top companies.
                    </p>

                    <ul className="mt-6 space-y-3 text-sm text-gray-700">
                        <li>✔ Trusted by thousands of recruiters</li>
                        <li>✔ Personalized job recommendations</li>
                        <li>✔ Easy apply & profile visibility</li>
                    </ul>
                </section>

                {/* RIGHT FORM */}
                <section className="bg-white border rounded-lg p-8 max-w-md w-full mx-auto">
                    <h2 className="text-xl font-bold text-gray-900">
                        Create your JobPortal profile
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Search & apply to jobs from India’s top companies
                    </p>

                    <form action={formAction} className="mt-6 space-y-4">
                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                autoComplete="username"
                                placeholder="Enter username"
                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email ID
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Enter email"
                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                placeholder="Minimum 6 characters"
                                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        {/* CTA */}
                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded transition"
                        >
                            {isPending ? 'Registering...' : 'Register Now'}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            {message}
                        </p>

                        <p className="text-sm text-gray-500 text-center">
                            By registering, you agree to our
                            <a href="#" className="text-blue-700 hover:underline">
                                {' '}Terms & Conditions
                            </a>
                        </p>

                        <p className="text-sm text-center text-gray-600">
                            Already registered?
                            <a href="#" className="text-blue-700 font-medium hover:underline">
                                {' '}Login here
                            </a>
                        </p>
                    </form>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="border-t bg-white">
                <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 text-center">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>
        </div>
    )
}
