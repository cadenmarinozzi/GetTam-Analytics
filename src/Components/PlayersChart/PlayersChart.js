import { Component, createRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getPlayers } from '../../web/firebase';
import ChartControls from '../ChartControls';
import annotationPlugin from 'chartjs-plugin-annotation';
import './PlayersChart.scss';

Chart.register(...registerables);
Chart.register(annotationPlugin);

class LeaderboardChart extends Component {
	constructor(props) {
		super(props);

		this.ref = createRef();
		this.state = {
			chart: null
		};
	}

	async componentDidMount() {
		if (this.chart) return;

		try {
			// We have to do this for native error logs
			const ctx = this.ref.current.getContext('2d');
			const players = Object.values(await getPlayers()).filter(
				player => player.name && player.id // Remove invalid players
			);
			const labels = players.map(player => player); // No need for sorting since the leaderboard is presorted
			const dataLabels = labels.map(player => player.name);

			const data = {
				labels: dataLabels,
				datasets: [
					{
						label: 'Score',
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
						fill: true,
						borderColor: 'rgb(255, 99, 132)',
						lineTension: 0.12,
						data: players.map(player => player.score)
					}
				]
			};

			/* Under review */
			function average(ctx) {
				const values = ctx.chart.data.datasets[0].data;

				return values.reduce((a, b) => a + b, 0) / values.length;
			}

			const annotation = {
				type: 'line',
				borderColor: 'black',
				borderDash: [5, 5],
				borderDashOffset: 0,
				borderWidth: 2,
				label: {
					enabled: true,
					content: context =>
						'Average: ' + Math.floor(average(context)),
					position: 'end'
				},
				scaleID: 'y',
				value: context => Math.floor(average(context))
			};
			/* Under review */

			const config = {
				type: 'line',
				data: data,
				options: {
					responsive: true,
					maintainAspectRatio: true,
					plugins: {
						annotation: {
							annotations: [annotation]
						}
					}
				}
			};

			this.state.chart = new Chart(ctx, config);
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		return (
			<div className="controls-container">
				<ChartControls chartState={this.state} />

				<div className="chart-container">
					<canvas ref={this.ref}></canvas>
				</div>
			</div>
		);
	}
}

export default LeaderboardChart;
