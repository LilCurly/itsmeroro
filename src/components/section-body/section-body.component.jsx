import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import StickyShadow from '../sticky-shadow/sticky-shadow.component';
import SectionBodyHeader from '../section-body-header/section-body-header.component';
import SectionMessage from '../section-message/section-message.component';
import FloatingButton from '../floating-button/floating-button.component';
import MessageModal from '../modal/modal.component';
import { selectMessageState } from '../../redux/modal/modal.selectors';
import { toggleSendMessage } from '../../redux/modal/modal.actions';
import { selectCurrentSubject, selectMessages, selectLoadingMessages } from '../../redux/brainstorming/brainstorming.selectors';
import { ReactComponent as Loading } from '../../assets/loading.svg';

import './section-body.styles.scss';
import { selectCurrentItem } from '../../redux/portfolio/portfolio.selectors';
import { selectCurrentNote } from '../../redux/notes/notes.selectors';
import { selectAuthenticateState } from '../../redux/authenticate/authenticate.selectors';

const SectionBody = ({ type, isMessageModalOpen, toggleMessageModal, currentBrainstorming, messages, loadingMessages, currentPortfolioItem, currentNoteItem }) => (
    <div className="section-body">
        <StickyShadow />
        <div className="section-body-box">
            {
                {
                    'brainstorming': <SectionBodyHeader key="brainstorming" type={type} item={currentBrainstorming} />,
                    'portfolio': <SectionBodyHeader key="portfolio" type={type} item={currentPortfolioItem} />,
                    'notes': <SectionBodyHeader key="note" type={type} item={currentNoteItem} />
                }[type]
            }
            
            <div className="section-body-content">
                <div className={`${loadingMessages ? '' : 'finished-loading'} section-body-content-main`} >
                    {
                        {
                            'brainstorming':
                                loadingMessages ?
                                <Loading className="loading" /> :
                                Object.keys(messages).map((key, index) => (
                                    <SectionMessage key={messages[key].id} message={messages[key]} />
                                )),
                            'portfolio':
                                currentPortfolioItem ?
                                <div className="section-body-content-main-final" dangerouslySetInnerHTML={{__html: currentPortfolioItem.content}} /> :
                                null,
                            'notes':
                                currentNoteItem ?
                                <div className="section-body-content-main-final" dangerouslySetInnerHTML={{__html: currentNoteItem.content}} /> :
                                null
                        }[type]
                    }
                </div>
            </div>
        </div>
        {
            type === 'brainstorming' && currentBrainstorming ?
            <FloatingButton onClick={toggleMessageModal} /> :
            null
        }
        <MessageModal show={isMessageModalOpen} onHide={toggleMessageModal} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    isMessageModalOpen: selectMessageState,
    currentBrainstorming: selectCurrentSubject,
    messages: selectMessages,
    loadingMessages: selectLoadingMessages,
    currentPortfolioItem: selectCurrentItem,
    currentNoteItem: selectCurrentNote,
})

const mapDispatchToProps = dispatch => ({
    toggleMessageModal: () => dispatch(toggleSendMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(SectionBody);