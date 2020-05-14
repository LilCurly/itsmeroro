import React from 'react';
import emailjs from 'emailjs-com';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ReactComponent as Loading } from '../../assets/loading-s.svg';
import utils from '../../emailjs/emailjs.utils';

import './contact.styles.scss';

class Contact extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            from_email: '',
            email_content: '',
            loading: false,
            success: ''
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    sendMail = event => {
        event.preventDefault();
        const { from_email, email_content } = this.state;
        this.setState({ loading: true });
        emailjs.send(utils.SERVICE_ID, utils.TEMPLATE_ID, { from_email, email_content }, utils.USER_ID).then((result) => {
            this.setState({ loading: false, success: 'y', from_email: '', email_content: '' })
        }, (error) => {
            this.setState({ loading: false, success: 'n' })
        });
    }

    render() {
        return (
            <div className="contact">
                <Form className="contact-form" onSubmit={this.sendMail}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Control name="from_email" placeholder="Votre addresse email" onChange={this.handleChange} value={this.state.from_mail} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicContent">
                        <Form.Control name="email_content" placeholder="Votre message" as="textarea" rows="10" onChange={this.handleChange} value={this.state.email_content} required  />
                    </Form.Group>
                    {
                        this.state.loading ?
                            <Loading /> :
                            <Button className="my-modal-confirm" variant={`${this.state.success === '' ? 'primary' : this.state.success === 'y' ? 'success' : 'danger'}`} type="submit">Envoyer</Button>
                    }
                </Form>
            </div>
        )
    }
}

export default Contact;