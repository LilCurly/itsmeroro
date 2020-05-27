import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentSection } from '../../redux/section/section.selectors';
import Section from '../../components/section/section.component';

import './homepage.styles.scss';

const HomePage = ({ currentSection }) => (
    <div className="homepage-container">
        <div className="homepage">
            <Section key="portfolio" type="portfolio" currentSection={currentSection === 'portfolio' ? true : false} />
            <Section key="brainstorming" type="brainstorming" currentSection={currentSection === 'brainstorming' ? true : false} />
            <Section key="notes" type="notes" currentSection={currentSection === 'notes' ? true : false} />
            <Section key="contact" type="contact" currentSection={currentSection === 'contact' ? true : false} />
        </div>
    </div>
    
)

const mapStateToProps = createStructuredSelector({
    currentSection: selectCurrentSection
})

export default connect(mapStateToProps)(HomePage);