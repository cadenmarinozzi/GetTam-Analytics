import { getPlayers } from '../../web/firebase';
import { Component } from 'react';
import { DataChart } from '../Chart';
import validatePlayer from '../../web/validate';
import PropTypes from 'prop-types';

class PlayersChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			data: []
		};
	}

	async componentDidMount() {
		const players = Object.values(await getPlayers())
			.filter(player => !validatePlayer(player))
			.sort((a, b) => a.score - b.score); // Remove invalid players and sort by score

		this.setState({
			labels: players.map(
				(player, index) => `${player.name} (${players.length - index})`
			),
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
					theme={this.props.theme}
				/>
			);
		}
	}
}

PlayersChart.propTypes = {
	theme: PropTypes.string
};

export default PlayersChart;
