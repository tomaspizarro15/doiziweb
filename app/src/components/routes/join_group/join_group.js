import React, { useEffect, useState } from 'react';

const JoinGroup = (props) => {

    useEffect((data) => {
        console.log("[Main.js]" , data)
    }, [])

    return (
        <div className="dis main_container">
            <p>Group</p>
        </div>
    )

}

export default JoinGroup; 