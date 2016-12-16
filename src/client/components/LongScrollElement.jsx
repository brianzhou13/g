import React, { Component, PropTypes }from 'react';
import { render, findDOMNode } from 'react-dom';

// can use jquery due to time...
import $ from 'jquery';

import LongScrollElementTime from './LongScrollElementTime';
import LongScrollElementGlucose from './LongScrollElementGlucose';
import LongScrollElementDate from './LongScrollElementDate';

class LongScrollElement extends Component {

	// requires the time props
	constructor(props) {
		super(props);

		this.determineColor = this.determineColor.bind(this);
	}

	componentDidMount() {
		// change color once component has mounted
		this.determineColor();
	}

	determineColor() {
		if(this.props.data.bg_value <= 80) {
			$(`body`).find("." + this.props.data._id).css('background-color', `#FFB347`);
		} else if (this.props.data.bg_value > 80 && this.props.data.bg_value < 150) {
			$('body').find("." + this.props.data._id).css('background-color', `#77DD77`);
		} else {
			$('body').find("." + this.props.data._id).css('background-color', `#C23B22`);
		}
	}

	render() {
		return(
			<div className={'long-element btm-border ' + this.props.data._id}>
				<div>
					<LongScrollElementDate 
						date={this.props.data.date}
						month={this.props.data.month}
						year={this.props.data.year}
					/>
				</div>
				<div className='elements-time-glucose'>
					<LongScrollElementGlucose 
						bg_value={this.props.data.bg_value}
					/>
					<LongScrollElementTime 
						hour={this.props.data.hour}
						minute={this.props.data.minute}
						second={this.props.data.second}
					/>
				</div>
			</div>
		)
	}
}

LongScrollElement.propTypes = {
	data: PropTypes.object.isRequired,
	curr: PropTypes.object.isRequired, // not sure
	// getCurr: PropTypes.func.isRequired,
};

export default LongScrollElement;