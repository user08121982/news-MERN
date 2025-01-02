import React from "react";
import "./Navbar.css";

const Navbar = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className={`navbar-item ${activeCategory === category.name ? "active" : ""
                            }`}
                        onClick={() => onCategoryChange(category)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;