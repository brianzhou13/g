import React, { Component } from 'react';
import { render } from 'react-dom';

class Header extends Component {
	render() {
		return(
			<div className='header-text font '>
				<div className='center'>
					<p className='header-text'>Monitor Your Glucose.</p>
					<p className='header-tag'> Check yo'self before you wreck yo'self.</p>
				</div>
			</div>
		)
	}
}

export default Header;