import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { toggleAuthenticate } from '../../redux/authenticate/authenticate.actions';

class AuthenticatePage extends React.Component {
    constructor(state) {
        super(state);

        this.state = {
            mdp: ''
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.mdp !== 'GiGgLeAtAFuNeRaL~8462584625') return;

        this.props.toggleAuth()
    }

    render() {
        return (
            <Form className="my-modal-body" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicMdp">
                    <Form.Control name="mdp" placeholder="MDP" onChange={this.handleChange} value={this.state.mdp} />
                </Form.Group>
                <Button className="my-modal-confirm" variant="primary" type="submit">Envoyer</Button>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleAuth: () => dispatch(toggleAuthenticate())
})

export default connect(null, mapDispatchToProps)(AuthenticatePage);