import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import axios from 'axios';

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
const test_data = [
	{
		__v:0,
		_id:"585328decf906337147a803f",
		bg_value:114,
		hour: 5,
		meal:"before_meal",
		minute: 21,
		month: 1,
		second: 21,
		timestamp:"2015-01-01T05:21:21",
		year: 2015
	},
];


class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [] // just set it initially to get rid of warnings
		};

		this.getData = this.getData.bind(this);
	}

	componentWillMount() {
		// ivoked immediately before mounting-- called before render
		this.getData();
	}

	componentDidMount() {
		// once component mounts, we can have it check every hour for new data
		setInterval(() => {
			this.getData();
		}, 60 * 60 * 1000);
		// setInterval(() => {
		// 	this.getData();
		// }, 1000);
	}

	getData () {
		axios.get('/api/get-data')
			.then((resp) => {
				// resp seems to come in properly
				this.setState({
					data: resp.data
				});
			})
			.catch((err) => {
				console.log(`error occurred in the getData method: ${err}`);
			});
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
								data={this.state.data}
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
	curr: PropTypes.string,
	getCurr: PropTypes.func,
};


export default Main;