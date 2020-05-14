import React from 'react';

import './section-preview.styles.scss';

const SectionPreview = ({ title, content }) => (
    <div className="section-preview">
        <h1 className="title">{title}</h1>
        <span className="content">{content}</span>
    </div>
)

export default SectionPreview;