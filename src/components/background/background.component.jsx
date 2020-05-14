import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentSection } from '../../redux/section/section.selectors';

import './background.styles.scss';

class Background extends React.Component {
    constructor(state) {
        super(state);

        this.state = {
            ...state,
            animate: false
        }

        this.rootRef = React.createRef();
        this.backgroundRef = React.createRef();
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props });
        if (this.state.section === props.section) return;
        const computedMargin = window.getComputedStyle(this.backgroundRef.current).getPropertyValue("margin-left").match(/\d+/g)[0]
        if (computedMargin < 1250 && computedMargin > 0) return;
        
        this.setState({ ...props, animate: false }, () => {
            const _ = this.rootRef.current.offsetHeight
            this.setState({ animate: true })
        })
    }

    render() {
        const {animate} = this.state
        return (
            <div className="bg" ref={this.rootRef}>
                <div className={`${animate ? 'animate' : ''} wave-bg`} ref={this.backgroundRef} />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    section: selectCurrentSection
})

export default connect(mapStateToProps)(Background);