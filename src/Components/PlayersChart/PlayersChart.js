import { getPlayers } from '../../web/firebase';
import { Component } from 'react';
import { DataChart } from '../Chart';
import validatePlayer from '../../web/validate';

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
			player => !validatePlayer(player)
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
					searchEnabled
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
