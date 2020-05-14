import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, onClick }) => (
    <div className="custom-button" onClick={onClick}>
        {children}
    </div>
)

export default CustomButton;