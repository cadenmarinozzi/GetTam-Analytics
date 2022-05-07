import { getPlayers } from '../../web/firebase';
import { Component } from 'react';
import DataChart from '../Chart';

class PlayersChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			data: []
		};
	}

	async componentDidMount() {
		const players = Object.values(await getPlayers()).filter(
			player => player.name && player.id
		); // Remove invalid players

		this.setState({
			labels: players.map(player => player.name),
			data: players.map(player => player.score)
		});
	}

	render() {
		if (this.state.labels.length > 0) {
			return (
				<DataChart
					averageEnabled
					label="Score"
					labels={this.state.labels}
					data={this.state.data}
					defaultChartType="bar"
				/>
			);
		}
	}
}

export default PlayersChart;
