import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './Toggle.scss';

class Toggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ref: createRef(),
			enabled: props.enabled
		};

		this.props.onClick(this.state.enabled);
	}

	handleClick() {
		this.setState({
			enabled: !this.state.enabled
		});

		this.props.onClick(!this.state.enabled);

		this.setState(state => {
			const newRef = state.ref;
			newRef.current.className = state.enabled ? 'button-active' : '';

			return { newRef };
		});
	}

	render() {
		return (
			<div>
				<button
					ref={this.state.ref}
					onClick={this.handleClick.bind(this)}
					className={this.props.enabled ? 'button-active' : ''}
				>
					{this.props.label}
				</button>
			</div>
		);
	}
}

Toggle.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	enabled: PropTypes.bool
};

export default Toggle;
