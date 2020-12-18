import React from 'react';
import './../register.css'
const Fields = (props) => {
    let field;
    let errorMsg; 
    let fieldStatus = "register_input cyberpunk" 
    if(!props.field.status) {
        fieldStatus = "register_input error"
        errorMsg = <p>{props.field.errorHelp}</p>
    }
    switch (props.field.element) {
        case 'input':
            field = <input  type = {props.field.type} className={fieldStatus} onChange={props.change} placeholder={props.field.placeholder} value={props.field.value} />
            break;
        case 'select':
            field = [<select className="register_select cyberpunk" onChange={props.change}>{props.field.options.map(option => <option className="register_select" selected={option.default} value={option.value}>{option.value}</option>)}</select>]
        default:
            break;
    }
    return (
        <div className="field_container">
            <label className="field_label">{props.field.label}</label>
            {field}
            {errorMsg}
        </div>
    )
}

export default Fields; 