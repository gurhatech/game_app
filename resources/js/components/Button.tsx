import React from "react";
import '../assets/css/button.css'

interface ButtonType 
extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title : string,
    className? : string
}

export default function Button({title,className= "btn",...props} : ButtonType) {
    return (
        <button className={`${className}`} {...props} type="button">
            {title}
        </button>
    );
}
