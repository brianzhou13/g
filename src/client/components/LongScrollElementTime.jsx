import React, { Component, PropTypes }from 'react';
import { render } from 'react-dom';

class LongScrollElementTime extends Component {

	// requires the time props
	constructor(props) {
		super(props);
	}

	componentDidMount() {
			// this.props.onMouseEnter();
			console.log(`value for props: ${this.props.hour}`);
			// debugger;
		}

	render() {
		return(
			<div>
				<span>{this.props.hour}:{this.props.minute}:{this.props.second}{this.props.hour > 12 ? 'PM' : 'AM'}</span>
			</div>
		)
	}
}

LongScrollElementTime.propTypes = {
	hour: PropTypes.number,
	minute: PropTypes.number,
	second: PropTypes.number,
};

export default LongScrollElementTime;