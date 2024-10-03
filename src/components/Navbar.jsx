import React from 'react'

export default function Navbar() {
    return (
        <div className='min-h-[10vh] bg-gradient-to-b from-indigo-900  shadow-xl text-white flex items-center justify-center gap-2'>
            <div className="logo mt-1 ">
                <svg class="w-6 h-7 text-xl" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4" />
                </svg>

            </div>
            <div className="text font-bold text-xl hover:text-3xl transition-all duration-500 ">
                Task List
            </div>
        </div>
    )
}
