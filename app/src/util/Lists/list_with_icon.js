import React, { useEffect, useState } from 'react';


const ListWithIcon = (props) => {
    console.log(props.elements)
    const [elements, setElements] = useState([])

    useEffect(() => {
        setElements(props.elements)
    }, [props.elements])
    return <ul>

    </ul>
}
export default React.memo(ListWithIcon);
