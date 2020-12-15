import React from 'react';
import './../register.css'
const Fields = (props) => {
    let field;

    switch (props.field.type) {
        case 'input':
            field = <input className="register_input" onChange={props.change} placeholder={props.field.placeholder} value={props.field.value} />
            break;
        case 'select':
            field = [<select className="register_select" onChange={props.change}>{props.field.options.map(option => <option className="register_select" selected={option.default} value={option.value}>{option.value}</option>)}</select>]
        default:
            break;
    }
    return (
        <div className="field_container">
            <label className="field_label">{props.field.label}</label>
            {field}
        </div>
    )
}

export default Fields; 