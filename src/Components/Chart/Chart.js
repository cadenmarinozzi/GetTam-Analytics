import { Component, createRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartControls from '../ChartControls';
import annotationPlugin from 'chartjs-plugin-annotation';
import './Chart.scss';

Chart.register(...registerables);
Chart.register(annotationPlugin);

class DataChart extends Component {
	constructor(props) {
		super(props);

		this.ref = createRef();
		this.state = {
			chart: null
		};
	}

	async componentDidMount() {
		const ctx = this.ref.current.getContext('2d');

		const data = {
			labels: this.props.labels,
			datasets: [
				{
					label: this.props.label,
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					fill: true,
					borderColor: 'rgb(255, 99, 132)',
					lineTension: 0.12,
					data: this.props.data
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
				content: context => 'Average: ' + Math.floor(average(context)),
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

export default DataChart;
