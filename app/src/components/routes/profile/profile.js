import React, { useEffect, useState } from 'react';

const Profile = (props) => {

    useEffect((data) => {
        console.log("[Main.js]" , data)
    }, [])

    return (
        <div className="dis main_container">

        </div>
    )

}

export default Profile; 