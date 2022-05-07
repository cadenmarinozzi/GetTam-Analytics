import { Component, createRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getGameDates } from '../../web/firebase';
import ChartControls from '../ChartControls';
import annotationPlugin from 'chartjs-plugin-annotation';
import './UsageChart.scss';

Chart.register(...registerables);
Chart.register(annotationPlugin);

/**
 *
 * @param {string} date - The date to be formatted. Should be in the format M-D-TESTING or M-D
 * @return {Object} An object containing the parsed date
 */
function parseDate(date) {
	const parts = date.split('-'); // Split the date into the day, month, and testing flag

	const month = parseInt(parts[0]);
	const day = parseInt(parts[1]);

	const dateData = new Date(2022, month, day); // Create the date object

	return {
		month: month,
		day: day,
		testing: parts[2] === 'testing',
		date: dateData,
		comparativeDate: dateData[Symbol.toPrimitive]('number') // Get the numerical representation of the date
	};
}

class UsageChart extends Component {
	constructor(props) {
		super(props);

		this.ref = createRef();
		this.state = {
			chart: null
		};
	}

	async componentDidMount() {
		if (!this.chart) {
			const ctx = this.ref.current.getContext('2d');
			const gamesDates = await getGameDates();
			const labels = Object.values(gamesDates)
				// Map the values to the parsed date
				.map(([key]) => parseDate(key))
				// Sort the dates from oldest to newest
				.sort((a, b) => a.comparativeDate - b.comparativeDate);

			const dataLabels = labels.map(
				date => date.date.toDateString().replace('2022', '') // ew
			);

			const data = {
				labels: dataLabels,
				datasets: [
					{
						label: 'Games Played',
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
						fill: true,
						borderColor: 'rgb(255, 99, 132)',
						lineTension: 0.12,
						data: Object.values(gamesDates).map(
							dateData => dateData[1]
						)
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

export default UsageChart;
