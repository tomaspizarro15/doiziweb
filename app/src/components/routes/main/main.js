import React, { useEffect, useState } from 'react';
import './main.css'
const Main = (props) => {

    useEffect((data) => {
        console.log("[Main.js]" , data)
    }, [])

    return (
        <div className="dis main_container">

        </div>
    )

}

export default Main; 