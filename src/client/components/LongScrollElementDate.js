import React, { Component, PropTypes }from 'react';
import { render } from 'react-dom';

class LongScrollElementDate extends Component {

	// requires the time props
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className='element-date-meal cursor-text'>
				<div className='element-date'>
					<span>Date:</span>
					<span>{this.props.month}-{this.props.date}-{this.props.year}</span>
				</div>
				<div className='element-meal'>
					<span>Meal: {this.props.meal}</span>
				</div>
			</div>
		)
	}
}

LongScrollElementDate.propTypes = {
	date: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	meal: PropTypes.string.isRequired,
};

export default LongScrollElementDate;