import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class LongScroll extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return(
			<div className='middle'>
				<div className='long-scroll'>
				</div>
			</div>
		)
	}
}

LongScroll.Proptypes = {
	curr: PropTypes.string,
	getCurr: PropTypes.func,
}

export default LongScroll;