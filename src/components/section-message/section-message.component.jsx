import React from 'react';

import './section-message.styles.scss';

const SectionMessage = ({ message }) => (
    <div className="section-message">
        <div className="ball-f" />
        <div className="ball-s" />
        <div className="message-body">
            <div className="message-author">
                <div className="name">{ message.name }</div>
                <div className="date">{ message.createdAt }</div>
            </div>
            <div className="message-content">{ message.content }</div>
        </div>
    </div>
)

export default SectionMessage;