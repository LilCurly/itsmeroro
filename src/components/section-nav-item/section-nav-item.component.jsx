import React from 'react';

import { ReactComponent as Bulb } from '../../assets/light-bulbs.svg';

import './section-nav-item-portfolio.styles.scss';
import './section-nav-item-brainstorming.styles.scss';
import './section-nav-item-notes.styles.scss';

export const SectionNavItemPortfolio = ({ imageUrl, title, onClick }) => (
    <div className="section-nav-item-portfolio" onClick={onClick}>
        <div className="nav-item-container-portfolio">
            <div className="banner-container">
                <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="title-container">
                    <div className="item-title">{ title }</div>
                </div>
            </div>
        </div>
    </div>
)

export const SectionNavItemBrainstorming = ({ first, subject, onClick }) => (
    <div className={`${first ? 'first' : ''} section-nav-item-brainstorming`} onClick={onClick}>
        <div className="bulb-container">
            <Bulb className="bulb" />
        </div>
        <div className="nav-item-container">
            <div className="nav-item-title">{subject.title}</div>
            <div className="nav-item-count">{subject.nbrMessage} message(s)</div>
        </div>
    </div>
)

export const SectionNavItemNotes = ({ title, onClick, first }) => (
    <div className={`${first ? 'first' : ''} section-nav-item-notes`} onClick={onClick}>
        <div className="section-nav-item-notes-bg">
           {title}
        </div>
    </div>
)