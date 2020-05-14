import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentSection } from '../../redux/section/section.selectors';

import './section-body-header.styles.scss';

const SectionBodyHeader = ({ type, item }) => (
    <div className="section-body-header">
        <div className="section-body-header-wrapper">
            <div className="title">{item.title}</div>
            <div className="created-at">Créé le {item.createdAt}</div>
            <div className="updated-at">
                {type === "brainstorming" ? 'Dernier message' : "Dernière mise à jour"} le {item.updatedAt}
            </div>
        </div>
        <div>
            {
                type === 'portfolio' ?
                <div className={`section-body-state ${item.finished ? 'finished' : 'in-progress'}`}>{item.finished ? "TERMINÉ" : "EN COURS"}</div> :
                null
            }
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    section: selectCurrentSection,
})

export default connect(mapStateToProps)(SectionBodyHeader);