import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentSection } from '../../redux/section/section.selectors';
import { changeCurrentSection } from '../../redux/section/section.actions';

import './option-item.styles.scss';

const OptionItem = ({ currentSection, changeSection, children, section }) => (
    <div className={`${currentSection === section ? 'selected' : ''} option-item`} onClick={() => changeSection(section)}>
        <span className="title">{children}</span>
        <span className="title-select">&diams;</span>
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentSection: selectCurrentSection
})

const mapDispatchToProps = dispatch => ({
    changeSection: section => dispatch(changeCurrentSection(section))
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionItem);