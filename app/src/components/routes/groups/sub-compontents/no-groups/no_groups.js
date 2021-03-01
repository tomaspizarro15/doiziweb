import React from 'react';
import { Link } from 'react-router-dom';
import './../../groups.css';


const NoGroups = (props) => {
    return (
        <div>
            <div className="dis group_navigation">
                <p className="group_navigation__title">It seems that you don't have any groups...</p>
                <img src={props.logo} />
                <div className="disRL group_navigation__buttons">
                    {props.links.map(nav => <Link key={nav.href} className="group_navigation__link" to={nav.href}>{nav.label}</Link>)}
                </div>
            </div>
        </div>
    )
}
export default NoGroups; 