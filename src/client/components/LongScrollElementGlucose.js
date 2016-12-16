import React, { Component, PropTypes }from 'react';
import { render } from 'react-dom';

class LongScrollElementGlucose extends Component {

	// requires the time props
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<span>Glucose Levels:</span>
				<span>{this.props.bg_value}mg/dL</span>
			</div>
		)
	}
}

LongScrollElementGlucose.propTypes = {
	bg_value: PropTypes.number,
};

export default LongScrollElementGlucose;