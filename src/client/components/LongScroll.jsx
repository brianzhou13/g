import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import LongScrollElement from './LongScrollElement';

class LongScroll extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(`value for props: ${this.props}`);
		// debugger;
	}


	/*
	 * @ name: mouseElem
	 * @ input: e
	 * @ output: n/a
	 * @ fn: should get details of the component mouse glosses over
	 * @ notes: NOT working. Not sure why React isn't catching it...
	 */
	mouseElem() {
		console.log(`value for e hovered is; ${e}`);
		console.log(`mouse-over detected`);
		// this.props.getCurr()
	}

	render() {
		return(
			<div className='middle'>
				<div className='long-scroll font'>
					{ 
						this.props.data.map((item) => {
							return <LongScrollElement 
								data={item}
								curr={this.props.curr}
								getCurr={this.props.getCurr}
								onMouseEnter={this.mouseElem.bind(this)}
							/>
						})
					}
				</div>
			</div>
		)
	}
}

LongScroll.Proptypes = {
	curr: PropTypes.string.isRequired,
	getCurr: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
}

export default LongScroll;

//Elem Component (for the box) [get all the props here and pass them down]
	// date component 
	//(flexbox to split down the middle)
		//time (right)
		//left (glucose level)