import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './message-box.styles.scss';
import { selectMessageBoxState } from '../../redux/message-box/message-box.selectors';
import CustomInput from '../custom-input/custom-input.component';
import { ReactComponent as Send } from '../../assets/send.svg';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            message: ''
        }
    }

    render() {
        return (
            <div className={`${this.props.show ? 'show' : ''} message-box`}>
                <form className="message-box-form">
                    <div className="message-box-inputs">
                        <CustomInput placeholder="Nom ou pseudonyme (optionnel)" />
                        <CustomInput placeholder="Ton message" textarea />
                    </div>
                    <div className="message-box-send">
                        <button type="submit">
                            <Send className="message-box-send-img" />
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    show: selectMessageBoxState
})

export default connect(mapStateToProps)(MessageBox);