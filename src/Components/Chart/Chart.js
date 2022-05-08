import { Component, createRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartControls from '../ChartControls';
import annotationPlugin from 'chartjs-plugin-annotation';
import PropTypes from 'prop-types';
import './Chart.scss';

Chart.register(...registerables);
Chart.register(annotationPlugin);

function sanitizeData(data) {
	return data.filter(
		value =>
			value !== null &&
			value !== undefined &&
			typeof value === 'number' &&
			!isNaN(value)
	);
}

function linearRegression(data) {
	const input = sanitizeData(data);
	const n = input.length;
	let xSum = 0;
	let ySum = 0;
	let xSquaredSum = 0;
	let xySum = 0;

	input.forEach((y, x) => {
		ySum += y;
		xSum += x;
		xSquaredSum += x * x;
		xySum += x * y;
	});

	const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
	const yIntercept = (ySum - slope * xSum) / n;

	let regressedData = [];

	for (let x = 0; x < n; x++) {
		regressedData.push(Math.floor(slope * x + yIntercept));
	}

	return regressedData;
}

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

		const regressedData = linearRegression(this.props.data);

		const data = {
			labels: this.props.labels,
			datasets: [
				{
					label: this.props.label,
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					fill: true,
					borderColor: 'rgb(255, 99, 132)',
					lineTension: 0.12,
					data: this.props.data,
					barThickness: 7
				},
				{
					label: `Predicted ${this.props.label}`,
					backgroundColor: this.props.predictedEnabled
						? 'rgb(0, 0, 0)'
						: 'rgba(0, 0, 0, 0)',
					fill: false,
					borderColor: this.props.predictedEnabled
						? 'rgb(0, 0, 0)'
						: 'rgba(0, 0, 0, 0)',
					data: regressedData,
					pointRadius: 0
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
			type: this.props.defaultChartType ?? 'line',
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
				<ChartControls
					averageEnabled={this.props.averageEnabled}
					predictedEnabled={this.props.predictedEnabled}
					chartState={this.state}
					defaultChartType={this.props.defaultChartType}
				/>

				<div className="chart-container">
					<canvas ref={this.ref}></canvas>
				</div>
			</div>
		);
	}
}

Chart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.number).isRequired,
	labels: PropTypes.arrayOf(PropTypes.string).isRequired,
	label: PropTypes.string.isRequired,
	averageEnabled: PropTypes.bool,
	predictedEnabled: PropTypes.bool,
	defaultChartType: PropTypes.string
};

Chart.defaultProps = {
	defaultChartType: 'line'
};

export default DataChart;
