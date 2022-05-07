import ChartType from './ChartType';
import ChartAverage from './ChartAverage';
import ChartPredicted from './ChartPredicted';
import PropTypes from 'prop-types';
import './ChartControls.scss';

function ChartControls(props) {
	return (
		<div className="controls-div">
			<ChartType chartState={props.chartState} />

			<div>
				<ChartAverage
					enabled={props.averageEnabled}
					chartState={props.chartState}
				/>
				<ChartPredicted
					enabled={props.predictedEnabled}
					chartState={props.chartState}
				/>
			</div>
		</div>
	);
}

ChartControls.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object
	}).isRequired,
	averageEnabled: PropTypes.bool,
	predictedEnabled: PropTypes.bool
};

export default ChartControls;
