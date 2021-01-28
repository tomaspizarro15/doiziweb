import React, { useEffect, useState } from 'react';

const Messages = (props) => {

    useEffect((data) => {
        console.log("[Main.js]" , data)
    }, [])

    return (
        <div className="dis main_container">
            Messages
        </div>
    )

}

export default Messages; 