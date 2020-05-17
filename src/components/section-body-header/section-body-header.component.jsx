import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentSection } from '../../redux/section/section.selectors';

import './section-body-header.styles.scss';
import NotesModalModify from '../modal/notes-modal-modify.component';
import PortfolioModalModify from '../modal/portfolio-modal-modify.component';
import { selectNotesModifyState, selectPortfolioModifyState } from '../../redux/modal/modal.selectors';
import { toggleNotesModify, togglePortfolioModify } from '../../redux/modal/modal.actions';
import CustomButton from '../custom-button/custom-button.component';
import { selectAuthenticateState } from '../../redux/authenticate/authenticate.selectors';

const SectionBodyHeader = ({ type, item, isNotesModalOpen, toggleNotesModal, isPortfolioModalOpen, togglePortfolioModal, isAuth }) => (
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
            {
                {
                    'portfolio': isAuth ? <CustomButton onClick={togglePortfolioModal}>MODIFIER</CustomButton> : null,
                    'notes': isAuth ? <CustomButton onClick={toggleNotesModal}>MODIFIER</CustomButton> : null 
                }[type]
            }
            <NotesModalModify key="notes-modal-modify" item={item} show={isNotesModalOpen} onHide={toggleNotesModal} />
            <PortfolioModalModify key="portfolio-modal-modify" item={item} show={isPortfolioModalOpen} onHide={togglePortfolioModal} />
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    section: selectCurrentSection,
    isNotesModalOpen: selectNotesModifyState,
    isPortfolioModalOpen: selectPortfolioModifyState,
    isAuth: selectAuthenticateState
})

const mapDispatchToProps = dispatch => ({
    toggleNotesModal: () => dispatch(toggleNotesModify()),
    togglePortfolioModal: () => dispatch(togglePortfolioModify())
})

export default connect(mapStateToProps, mapDispatchToProps)(SectionBodyHeader);