import React from 'react';
import { render } from 'react-dom';
import GraphBody from './GraphBody';

class App extends React.Component {
	render() {
		return (
			<div>
				Hello World
				<div>
					<GraphBody />
				</div>
			</div>
		)
	}
}

export default App;