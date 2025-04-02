import React, { useContext, useEffect, useState } from "react";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import { UserContext } from "../../context/UserContext";
import { TbMenu3 } from "react-icons/tb";
import Search from "../../components/Search/Search";
import { FaRegMap } from "react-icons/fa";
import "./nav.css";

const Nav = ({ data, genres }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const location = useLocation();

  const handleLogout = () => {
    updateUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/" className="link img">
            <img src="/uploads/images/logo.png" alt="" />
          </NavLink>
        </div>
        {/* <div>
          <SearchByCategory genres={genres} data={data} />
        </div> */}
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "link active" : "link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) => (isActive ? "link active" : "link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Catégories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "link active" : "link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="buttons">
          <div>
            <Search data={data} />
          </div>
          <NavLink to="/maps">
            <Button
              className="profile-icon"
              type="icon"
              backgroundColor="transparent"
              color="#fff"
              border="2px solid #fff"
              icon={FaRegMap}
            ></Button>
          </NavLink>
          {
            user ? (
              <div className="nav__profile">
                <Button
                  className="profile-icon"
                  type="icon"
                  backgroundColor="#fff"
                  color="#000"
                  border="2px solid #fff"
                  onClick={() => setMenuOpen(!menuOpen)}
                  icon={FaRegUser}
                ></Button>
                {menuOpen && (
                  <div className="dropdown-menu">
                    <div className="profile__img">
                      <span>{user.firstname.charAt(0).toUpperCase()}</span>
                    </div>
                    <p className="username">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="email">{user.email}</p>
                    <NavLink to="/profile" className="button-profil">
                      Mon Profil
                    </NavLink>
                    <NavLink to="/favorites" className="button-profil">
                      Liste des favoris
                    </NavLink>
                    <button onClick={handleLogout} className="button-logout">
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <Button
                    type="text"
                    backgroundColor="transparent"
                    color="#fff"
                    border="1px solid #fff"
                  >
                    Se connecter
                  </Button>
                </NavLink>

                <NavLink
                  to="/register"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  <Button
                    type="text"
                    backgroundColor="#fff"
                    color="hsl(240, 3%, 8%)"
                    border="1px solid #fff"
                  >
                    S'inscrire
                  </Button>
                </NavLink>
              </>
            )
          }
          <div className="menu-icon">
            <Button
              className="profile-icon"
              type="icon"
              backgroundColor="#fff"
              color="hsl(0, 93%, 42%)"
              border="1px solid #fff"
              onClick={handleShowNavbar}
              icon={TbMenu3}
            ></Button>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Nav;