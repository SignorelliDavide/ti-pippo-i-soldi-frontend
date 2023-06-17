import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/navbar.css'

function Navbar() {
  const navigate = useNavigate();
  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      });

      const result = await response.json();
      console.log("Success:", result);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <nav className="navbar ">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className='nav-item'>
            <Link to="/info" className="nav-link link">
              Storia
            </Link>
          </li>

          <li className="nav-item">
            <a onClick={logout} className="nav-link link">
              Logout
            </a>
          </li>

          <li className="nav-item">
            <Link to="/selection" className="nav-link active link" aria-current="page">
              Gioca
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;