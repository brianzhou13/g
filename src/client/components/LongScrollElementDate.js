import React, { Component, PropTypes }from 'react';
import { render } from 'react-dom';

class LongScrollElementDate extends Component {

	// requires the time props
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<span>Date:</span>
				<span>{this.props.month}-{this.props.date}-{this.props.year}</span>
			</div>
		)
	}
}

LongScrollElementDate.propTypes = {
	date: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
};

export default LongScrollElementDate;