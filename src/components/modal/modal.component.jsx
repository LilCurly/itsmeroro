import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createNewBrainstorming, createNewMessage } from '../../repository/firebase/firebase.utils';

import './modal.styles.scss';
import { selectCurrentSubject } from '../../redux/brainstorming/brainstorming.selectors';
import { updateSubject } from '../../redux/brainstorming/brainstorming.actions';

export class BrainstormingModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: '',
            content: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        var text = this.state.content;
        text = text.trim();

        if(!text) {
            this.setState({
                ...this.state,
                content: ''
            })
            
            return;
        }

        createNewBrainstorming(this.state.name, this.state.title, text);
        
        this.setState({
            name: '',
            title: '',
            content: ''
        })
        this.props.onHide();
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Lancer un sujet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="my-modal-body" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Control name="name" placeholder="Nom ou pseudonyme (optionnel)" onChange={this.handleChange} value={this.state.name} />
                        </Form.Group>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Control name="title" placeholder="Titre" onChange={this.handleChange} value={this.state.title} required />
                        </Form.Group>
                        <Form.Group controlId="formBasicContent">
                            <Form.Control name="content" placeholder="Décris ton sujet" as="textarea" rows="10" onChange={this.handleChange} value={this.state.content} required  />
                        </Form.Group>
                        <Button className="my-modal-confirm" variant="primary" type="submit">Envoyer</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

class MessageModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            content: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        var text = this.state.content;
        text = text.trim();

        if(!text) {
            this.setState({
                ...this.state,
                content: ''
            })

            return;
        }

        createNewMessage(this.state.name, text, this.props.currentSubject, this.props.updateSubject)

        this.setState({
            name: '',
            content: ''
        })
        this.props.onHide();
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal">
                <Modal.Body>
                    <Form className="my-modal-body" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Control name="name" placeholder="Nom ou pseudonyme (optionnel)" onChange={this.handleChange} value={this.state.name} />
                        </Form.Group>
                        <Form.Group controlId="formBasicContent">
                            <Form.Control name="content" placeholder="Que veux-tu répondre ?" as="textarea" rows="10" onChange={this.handleChange} value={this.state.content} required  />
                        </Form.Group>
                        <Button className="my-modal-confirm" variant="primary" type="submit">Envoyer</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    currentSubject: selectCurrentSubject
})

const mapDispatchToProps = dispatch => ({
    updateSubject: infos => dispatch(updateSubject(infos))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);