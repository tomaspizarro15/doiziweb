import React, { useEffect, useState } from 'react';

const SearchBar = (props) => {
    const [state, setState] = useState({
        searchResult: [],
    })

    return (
        <input className="global_input" placeholder={props.placeholder} value={props.value} onKeyDown={props.keyDown} onKeyUp={props.keyUp}  onChange={props.change} />
    )
}
export default SearchBar