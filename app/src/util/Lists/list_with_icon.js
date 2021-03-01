import React, { useEffect, useState } from 'react';


const ListWithIcon = (props) => {

    const [elements, setElements] = useState([])

    useEffect(() => {
        setElements(props.elements)
    }, [])

    return <ul>

    </ul>

}

export default ListWithIcon;
