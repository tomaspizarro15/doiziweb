import React from 'react';

const Fields = (props) => {
    let component;
    switch (props.field.type) {
        case 'input':
            component = <input className="field_input" type={props.field.type} onChange={props.change} placeholder={props.field.placeholder} value={props.field.value} />
            break;
        case 'textarea':
            component = <textarea  className="field_textarea"onChange={props.change} placeholder={props.field.placeholder} value={props.field.value} ></textarea>
            break;
        case 'file':
            component = <input  className="field_input"type={props.field.type} onChange={props.change} placeholder={props.field.placeholder} value={props.field.value} />
            break;
    }

    return component
}
export default Fields; 