import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';

/* example of a data entry
	{
		__v:0
		_id:"585328decf906337147a803f",
		bg_value:114,
		hour:"05",
		meal:"before_meal",
		minute:"21",
		month:"01",
		second:"21",
		date: ""
		timestamp:"2015-01-01T05:21:21",
		year:"2015"
	},
*/

class Main extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		// victoryAxis made oru data go away...
		//<VictoryToolTip
							// labels={(d) => `x: ${d.x} \n ${d.y}`}
						// />
		return (
			<div className='vic-chart middle'>
					<V.VictoryChart
						theme={V.VictoryTheme.material}
						animate={{duration: 500}}
					>
						<V.VictoryAxis
							label="24-Hour Military Time"
							style={{
							        axisLabel: { padding: 30 }
							      }}
							tickValues={['1', '2', '3', '4', '5', '6', '7', '8', 
													 '9', '10', '11', '12', '13', '14', '15',
													 '16', '17', '18', '19', '20', '21', '22',
													 '23', '24']}
					  />

					  <V.VictoryAxis
					  	label="Glucose Level mg/dL"
					  	dependentAxis
					  	style={{
					  	        axisLabel: { padding: 30 }
					  	      }}
					  />
							<V.VictoryScatter
								style={{
								  data: {fill: (d) => {
								  	// d is each elem
								  	if(d.bg_value <= 80) {
								  		return "red";
								  	} else if (d.bg_value >= 150) {
								  		return "orange";
								  	} else {
								  		return "green";
								  	}
								  }}
								}}
								events={[
									{
										target: "data",
										eventHandlers: {
											onClick: () => {
												return [{
													target: "labels",
													mutation: (props) => {
														let curr = props.data[props.index];
														this.props.getCurr(curr);

														// still need to showcase an apple being eaten
														// different colors
														// clean up data to reflect proper display
														// also need to be able to display by colors

														return props.text !== null ? { text: curr.bg_value.toString() + 'mg/dL' + '\n' + curr.month.toString() + '/' +
																																 curr.date.toString() + ' @ ' + curr.hour.toString() + ':' + 
																																 curr.minute.toString() } : { text: null }
													}
												}]
											}
										}
									}
								]}
								labelComponent = { 
									<V.VictoryTooltip
										active
									/>
								}
								label={(d) => d.hour}
								data={this.props.data}
								x = "hour"
								y = "bg_value"
								animate={{
			            onExit: {
			              duration: 500,
			              before: () => ({
			                y: 0,
			                fill: "orange",
			                label: "BYE"
			              })
			            }
			          }}
							/>
					</V.VictoryChart>
			</div>
		)
	}
}

Main.Proptypes = {
	curr: PropTypes.string.isRequired,
	getCurr: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
};


export default Main;