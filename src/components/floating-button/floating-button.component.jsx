import React from 'react';

import { ReactComponent as Send } from '../../assets/send3.svg';

import './floating-button.styles.scss';

const FloatingButton = ({ onClick }) => (
    <div className="floating-button" onClick={onClick}>
        <Send className="floating-button-image" />
    </div>
)

export default FloatingButton;