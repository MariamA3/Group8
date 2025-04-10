import React from 'react';
import './Button.css'; 

export default function SiteButton({ 
    children, // Button text or content
    onClick, // Function to handle button clicks
    type = 'button', // Button type (e.g., "button", "submit", "reset")
    className = '', // Additional CSS classes for styling
    disabled = false // Disable the button if true
}) {
    return (
        <button
            type={type}
            className={`site-button ${className}`} // Base class + custom classes
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}