import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SectionPreview from '../section-preview/section-preview.component';
import SectionPreviewsStore from '../../repository/local/section-previews'
import SectionNav from '../section-nav/section-nav.component';
import SectionBody from '../section-body/section-body.component';
import CustomButton from '../custom-button/custom-button.component';
import { BrainstormingModal } from '../modal/modal.component';
import { selectBrainstormingState, selectPortfolioState, selectNotesState } from '../../redux/modal/modal.selectors';
import { toggleCreateBrainstorming, togglePortfolioModal, toggleNotesModal } from '../../redux/modal/modal.actions';

import './section.component.scss';
import { firestore, convertBrainstormingSnapshotToMap, convertPortfolioSnapshotToMap, convertNotesSnapshotToMap } from '../../repository/firebase/firebase.utils';
import { loadSubjects } from '../../redux/brainstorming/brainstorming.actions';
import { selectCurrentSubject } from '../../redux/brainstorming/brainstorming.selectors';
import PortfolioModal from '../modal/portfolio-modal.component';
import { loadPortfolioItems } from '../../redux/portfolio/portfolio.actions';
import { selectCurrentItem } from '../../redux/portfolio/portfolio.selectors';
import NotesModal from '../modal/notes-modal.component';
import { loadNotes } from '../../redux/notes/notes.actions';
import { selectCurrentNote } from '../../redux/notes/notes.selectors';
import { selectAuthenticateState } from '../../redux/authenticate/authenticate.selectors';
import Contact from '../contact/contact.component';

class Section extends React.Component {

    componentWillMount() {
        const brainstormingRef = firestore.collection("brainstorming");
        const portfolioRef = firestore.collection("portfolio");
        const notesRef = firestore.collection("notes");

        brainstormingRef.onSnapshot(async snapshot => {
            const collectionMap = convertBrainstormingSnapshotToMap(snapshot)

            this.props.loadSubjects(collectionMap)
        })

        portfolioRef.onSnapshot(async snapshot => {
            const collectionMap = convertPortfolioSnapshotToMap(snapshot)

            this.props.loadPortfolioItems(collectionMap)
        })

        notesRef.onSnapshot(async snapshot => {
            const collectionMap = convertNotesSnapshotToMap(snapshot)
            
            this.props.loadNotes(collectionMap)
        })
    }

    render() {
        const { type, isAuth, currentSection, isBrainstormingModalOpen, toggleBrainstormingModal, isPortfolioModalOpen, togglePortfolioModal, isNotesModalOpen, toggleNotesModal } = this.props;
        return (
            <div className={`${currentSection ? 'current-section' : 'not-current'} section`}>
                <div className="section-header">
                    <SectionPreview title={ SectionPreviewsStore[type].title } content={ SectionPreviewsStore[type].content } />
                    <div className="section-options">
                        {
                            {
                                'brainstorming': <CustomButton onClick={toggleBrainstormingModal}>Lancer un sujet</CustomButton>,
                                'portfolio': isAuth ? <CustomButton onClick={togglePortfolioModal}>NOUVEAU PROJET</CustomButton> : null,
                                'notes': isAuth ? <CustomButton onClick={toggleNotesModal}>Nouvelle note</CustomButton> : null
                            }[type]
                        }
                    </div>
                    <BrainstormingModal show={isBrainstormingModalOpen} onHide={toggleBrainstormingModal} />
                    <PortfolioModal show={isPortfolioModalOpen} onHide={togglePortfolioModal} />
                    <NotesModal show={isNotesModalOpen} onHide={toggleNotesModal} />
                </div>
                {
                    type !== 'contact' ?
                    <div className="section-content">
                        <SectionNav type={type} />
                        {
                            {
                                'brainstorming':
                                    this.props.selectedSubject ?
                                    <SectionBody type={type} /> :
                                    <div className="no-subject">Aucun sujet sélectionné</div>,
                                'portfolio':
                                    this.props.selectedItem ?
                                    <SectionBody type={type} /> :
                                    <div className="no-subject">Aucun projet sélectionné</div>,
                                'notes':
                                    this.props.selectedNote ?
                                    <SectionBody type={type} /> :
                                    <div className="no-subject">Aucune note sélectionnée</div>
                            }[type]
                        }
                    </div> :
                    <div className="section-content-contact">
                        <Contact />
                    </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isBrainstormingModalOpen: selectBrainstormingState,
    selectedSubject: selectCurrentSubject,
    isPortfolioModalOpen: selectPortfolioState,
    selectedItem: selectCurrentItem,
    isNotesModalOpen: selectNotesState,
    selectedNote: selectCurrentNote,
    isAuth: selectAuthenticateState
})

const mapDispatchToProps = dispatch => ({
    toggleBrainstormingModal: () => dispatch(toggleCreateBrainstorming()),
    loadSubjects: payload => dispatch(loadSubjects(payload)),
    togglePortfolioModal: () => dispatch(togglePortfolioModal()),
    loadPortfolioItems: payload => dispatch(loadPortfolioItems(payload)),
    toggleNotesModal: () => dispatch(toggleNotesModal()),
    loadNotes: payload => dispatch(loadNotes(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Section);