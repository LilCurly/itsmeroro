import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { SectionNavItemPortfolio, SectionNavItemBrainstorming, SectionNavItemNotes } from '../section-nav-item/section-nav-item.component';
import StickyShadow from '../sticky-shadow/sticky-shadow.component';
import { selectBrainstormingSubjects } from '../../redux/brainstorming/brainstorming.selectors';
import { changeCurrentSubject, loadMessages, setLoading } from '../../redux/brainstorming/brainstorming.actions';
import { convertMessagesSnapshotToMap, firestore } from '../../repository/firebase/firebase.utils';
import { selectPortfolioItems } from '../../redux/portfolio/portfolio.selectors';

import './section-nav.styles.scss';
import { changeCurrentItem } from '../../redux/portfolio/portfolio.actions';
import { selectNotesItems } from '../../redux/notes/notes.selectors';
import { changeCurrentNote } from '../../redux/notes/notes.actions';

const SectionNav = ({ type, brainstormingSubjects, changeCurrentSubject, loadMessages, setLoading, portfolioItems, changeCurrentItem, notesItems, changeCurrentNote }) => {
    const onBrainstormingClick = subject => {
        changeCurrentSubject(subject);
        setLoading(true);

        const messagesRef = firestore.collection("brainstorming").doc(subject.id).collection("messages");

        messagesRef.onSnapshot(async snapshot => {
            const messages = convertMessagesSnapshotToMap(snapshot);
            setLoading(false);

            loadMessages(messages);
        })
    }

    return (
        <div className="section-nav">
            <StickyShadow />
            {
                {
                    'portfolio': Object.keys(portfolioItems).map((key, index) => (
                        <SectionNavItemPortfolio
                            key={portfolioItems[key].id}
                            imageUrl={portfolioItems[key].imageUrl}
                            title={portfolioItems[key].title}
                            onClick={() => changeCurrentItem(portfolioItems[key])}
                        />
                    )),
                    'brainstorming': Object.keys(brainstormingSubjects).map((key, index) => (
                        <SectionNavItemBrainstorming 
                            onClick={() => onBrainstormingClick(brainstormingSubjects[key])} 
                            key={brainstormingSubjects[key].id} first={index === 0 ? true : false} 
                            subject={brainstormingSubjects[key]} />
                    )),
                    'notes': Object.keys(notesItems).map((key, index) => (
                        <SectionNavItemNotes 
                            key={notesItems[key].id}
                            title={notesItems[key].title}
                            onClick={() => changeCurrentNote(notesItems[key])}
                            first={index === 0 ? true : false}
                        />
                    ))
                }[type]
            }
        </div>
)}

const mapStateToProps = createStructuredSelector({
    brainstormingSubjects: selectBrainstormingSubjects,
    portfolioItems: selectPortfolioItems,
    notesItems: selectNotesItems
})

const mapDispatchToProps = dispatch => ({
    changeCurrentSubject: subject => dispatch(changeCurrentSubject(subject)),
    loadMessages: messages => dispatch(loadMessages(messages)),
    setLoading: state => dispatch(setLoading(state)),
    changeCurrentItem: item => dispatch(changeCurrentItem(item)),
    changeCurrentNote: note => dispatch(changeCurrentNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(SectionNav);