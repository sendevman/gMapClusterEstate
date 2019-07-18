import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'text',
		};
	}

	handleFocus = () => {
		const { input: { onFocus, value }, type } = this.props;
		this.setState({ type }, () => {
			onFocus(value);
		});
	};

	handleBlur = () => {
		const { input: { onBlur, value }, type } = this.props;
		this.setState({ type }, () => {
			onBlur(value);
		});
	};

	render() {
		const {
			input,
			placeholder,
			meta: { touched, error, warning },
		} = this.props;

		const classWarning = touched && warning ? ' warning' : '';
		const classError = touched && error ? ' error' : '';
		return (
			<div
				className={'form-group' + classWarning + classError}
			>
				<input
					{...input}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					className="form-control"
					placeholder={placeholder}
					type={this.state.type}
					id={input.name}
				/>
				<div className="invalid-feedback">
					<span className="error_content">
						{touched && warning} {touched && error}
					</span>
				</div>
			</div>
		);
	}
}

FormInput.propTypes = {
	input: PropTypes.object.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string,
	meta: PropTypes.object.isRequired,
};

FormInput.defaultProps = {
	type: 'text',
};

export default FormInput;
