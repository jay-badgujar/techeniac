import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = ({ data }) => {
    const navigate = useNavigate()
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md shadow-lg p-4 flex justify-between items-center z-50">
            <Link to="/" className="text-2xl font-bold text-white z-50">Techeniac</Link>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white z-50" onClick={() => { navigate("/profile", { state: { userData: data } }); }}>
                <img src={`${import.meta.env.VITE_BASE_URL}/uploads/${data?.profile_picture}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
        </nav>
    )
}

export default Navbar
