import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import OptionItem from '../option-item/option-item.component';

import './header.styles.scss';

const Header = () => (
    <div className="header">
        <div className="logo-container">
            <Logo className="logo" />
        </div>
        <div className="options">
            <OptionItem key='2' section="portfolio">PORTFOLIO</OptionItem>
            <OptionItem key='3' section="notes">NOTES</OptionItem>
            <OptionItem key='1' section="brainstorming">BRAINSTORMING</OptionItem>
            <OptionItem key='4' section="contact">ME CONTACTER</OptionItem>
        </div>
    </div>
)

export default Header;