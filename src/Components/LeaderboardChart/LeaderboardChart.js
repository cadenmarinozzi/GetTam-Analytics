import { Component } from 'react';
import { DataChart } from '../Chart';
import { getLeaderboard } from '../../web/firebase';

class LeaderboardChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			data: []
		};
	}

	async componentDidMount() {
		const leaderboard = (await getLeaderboard()).reverse(); // We reverse the data so it's in descending order

		this.setState({
			labels: leaderboard.map(player => player.name),
			data: leaderboard.map(player => player.score)
		});
	}

	render() {
		if (this.state.labels.length > 0) {
			return (
				<DataChart
					searchEnabled
					averageEnabled
					predictedEnabled
					label="Score"
					labels={this.state.labels}
					data={this.state.data}
				/>
			);
		}
	}
}

export default LeaderboardChart;
