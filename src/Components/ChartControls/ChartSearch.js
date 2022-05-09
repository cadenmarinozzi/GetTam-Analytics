import PropTypes from 'prop-types';
import { Component, createRef } from 'react';
import './ChartSearch.scss';

function debounce(callback, timeout = 300) {
	let timer;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback.apply(this, args);
		}, timeout);
	};
}

class ChartSearch extends Component {
	constructor(props) {
		super(props);
		this.ref = createRef();
		this.state = {
			defaultLabels: null,
			defaultData: null
		};
	}

	handleInput() {
		let data = this.props.chartState.chart.config.data;

		if (!this.state.defaultLabels) {
			this.setState(
				{
					defaultLabels: data.labels.slice(0),
					defaultData: data.datasets[0].data.slice(0)
				},
				this.handleInput.bind(this)
			);

			return;
		}

		let selectedIndexes = [];

		data.labels = this.state.defaultLabels.filter((label, index) => {
			if (
				label
					.toLowerCase()
					.includes(this.ref.current.value.toLowerCase())
			) {
				selectedIndexes.push(index);

				return true;
			}
		});

		data.datasets[0].data = this.state.defaultData.filter((user, index) => {
			return selectedIndexes.includes(index);
		});

		this.props.chartState.chart.update();
	}

	render() {
		return (
			<input
				ref={this.ref}
				onInput={debounce(this.handleInput.bind(this), 100)}
				type="search"
				placeholder="username"
			/>
		);
	}
}

ChartSearch.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object
	}).isRequired
};

export default ChartSearch;
