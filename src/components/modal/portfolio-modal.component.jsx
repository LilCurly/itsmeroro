import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './modal.styles.scss';
import { createNewPortfolioItem } from '../../repository/firebase/firebase.utils';
import { selectCurrentItem } from '../../redux/portfolio/portfolio.selectors';

class PortfolioModal extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.modify) {
            const { title, content, imageUrl, finished } = this.props.currentPortfolio
            this.state = {
                title,
                content,
                imageUrl,
                finished
            }
        }
        else {
            this.state = {
                title: '',
                content: '',
                imageUrl: '',
                finished: ''
            }
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
        
        createNewPortfolioItem(this.state)

        this.setState({
            title: '',
            content: '',
            imageUrl: '',
            finished: ''
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
                            <Form.Control name="title" placeholder="Titre" onChange={this.handleChange} value={this.state.title} />
                        </Form.Group>
                        <Form.Group controlId="formBasicContent">
                            <Form.Control name="content" placeholder="Contenu" as="textarea" rows="10" onChange={this.handleChange} value={this.state.content} required  />
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Control name="imageUrl" placeholder="image" onChange={this.handleChange} value={this.state.imageUrl} />
                        </Form.Group>
                        <Form.Group controlId="formBasicFinished">
                            <Form.Control
                                name="finished"
                                placeholder="fini ?"
                                value={this.state.finished}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button className="my-modal-confirm" variant="primary" type="submit">Envoyer</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    currentPortfolio: selectCurrentItem
})

export default connect(mapStateToProps)(PortfolioModal);