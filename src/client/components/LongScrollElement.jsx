import React, { Component, PropTypes }from 'react';
import { render } from 'react-dom';

import LongScrollElementTime from './LongScrollElementTime';
import LongScrollElementGlucose from './LongScrollElementGlucose';
import LongScrollElementDate from './LongScrollElementDate';

class LongScrollElement extends Component {

	// requires the time props
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className='long-element btm-border'>
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
	data: PropTypes.array.isRequired,
	curr: PropTypes.object.isRequired, // not sure
	// getCurr: PropTypes.func.isRequired,
};

export default LongScrollElement;