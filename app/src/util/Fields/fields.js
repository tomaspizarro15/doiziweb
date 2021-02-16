import React, { Fragment } from 'react';
import Tooltip from '../Tooltip/tooltip'
const Fields = (props) => {
    let component;
    let classes = {
        input: "global_input",
        textarea: "global_textarea"
    }
    if (props.field.error) {
        classes = {
            input: "global_input error",
            textarea: "global_textarea error"
        }
    }
    switch (props.field.type) {
        case 'input':
            component =<input className={classes.input} type={props.field.type} onChange={props.change} placeholder= {!props.field.error ? props.field.placeholder : props.field.errorMsg} value={props.field.value} />
            break;
        case 'textarea':
            component = <textarea className={classes.textarea} onChange={props.change} placeholder= {!props.field.error ? props.field.placeholder : props.field.errorMsg} value={props.field.value} ></textarea>
            break;
        case 'file':
            component = <input className={classes.input} type={props.field.type} onChange={props.change} placeholder={props.field.placeholder} value={props.field.value} />
            break;
    }

    return component

}
export default Fields; 