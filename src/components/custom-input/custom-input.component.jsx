import React from 'react';

import './custom-input.styles.scss';

const CustomInput = (props) => (
    <>
    {
        props.textarea ?
        <textarea className="custom-input" {...props} /> :
        <input className="custom-input" {...props} />
    }
    </>
    
)

export default CustomInput;