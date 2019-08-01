import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import './style.css';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initialDown: 0,
			overValue: 0,
		}
	}

	onChangeInit = (event) => {
		if (event.target.value < parseInt(this.props.property.purchasePrice * Math.pow(1.055, 3) * 0.02)) {
			this.setState({
				initialDown: event.target.value,
				overValue: -1,
			});
		} else if (event.target.value > parseInt(this.props.property.purchasePrice * Math.pow(1.055, 3) * 0.1)) {
			this.setState({
				initialDown: event.target.value,
				overValue: 1,
			});
		} else {
			this.setState({
				initialDown: event.target.value,
				overValue: 0,
			});
		}
	}

	render() {
		const { property } = this.props;
		const { initialDown, overValue } = this.state;
		return (
			<div className="properties-side-bar">
				<div className="sale-monthly">
					<div className="for-sale">
						<div className="title">For sale</div>
						<div className="content">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'Rp. '}
								value={property.purchasePrice}
								displayType={'text'}
							/>
						</div>
					</div>
					<div className="for-monthly">
						<div className="title">Monthly payment</div>
						<div className="content">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'Rp. '}
								value={property.rentPrice}
								displayType={'text'}
							/>
						</div>
					</div>
				</div>
				<div className="payment">
					<div className="payment-item">
						<div className="payment-item-title">
							<div className="payment-point"></div>
							Initial down payment
						</div>
						<div className="payment-item-content">
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #D6D6D6', padding: '10px', borderRadius: '5px' }}>
								<div style={{ marginRight: '5px' }}>{'Rp. '}</div>
								<input style={{ width: '250px', border: 'none', color: '#444444' }} className="" type="number" onChange={this.onChangeInit} defaultValue={parseInt(property.purchasePrice * Math.pow(1.055, 3) * 0.02)} min={`${parseInt(property.purchasePrice * Math.pow(1.055, 3) * 0.02)}`} max={`${property.purchasePrice * Math.pow(1.055, 3) * 0.1}`} />
							</div>
						</div>
						{overValue !== 0 && <div className="payment-item-content">
							{overValue === -1
								? 'Please increase downpayment amount to view schedule appears'
								: 'Please decrease downpayment amount to view schedule appears'
							}
						</div>}
					</div>
					<div className="payment-item">
						<div className="payment-item-title">
							<div className="payment-point"></div>
							Year 1 payments
						</div>
						{overValue === 0 && <div className="payment-item-content">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'Rp. '}
								value={parseInt((property.purchasePrice * Math.pow(1.055, 3) * 0.15 - initialDown) / 36)}
								displayType={'text'}
								renderText={value =>
									<div style={{ width: '100%' }}>
										<span style={{ display: 'inline-block' }}>{`Rp. ${property.rentPrice} +`}</span>
										<div style={{ display: 'inline-block', color: '#2ECC71', paddingLeft: '5px' }}>{`${value} equity`}</div>
										<span style={{ display: 'inline-block' }}>{'/mo'}</span>
									</div>
								}
							/>
						</div>}
					</div>
					<div className="payment-item">
						<div className="payment-item-title">
							<div className="payment-point"></div>
							Year 2 payments
						</div>
						{overValue === 0 && <div className="payment-item-content">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'Rp. '}
								value={parseInt((property.purchasePrice * Math.pow(1.055, 3) * 0.15 - initialDown) / 36)}
								displayType={'text'}
								renderText={value =>
									<div style={{ width: '100%' }}>
										<span style={{ display: 'inline-block' }}>{`Rp. ${property.rentPrice * Math.pow(1.055, 1)} +`}</span>
										<div style={{ display: 'inline-block', color: '#2ECC71', paddingLeft: '5px' }}>{`${value} equity`}</div>
										<span style={{ display: 'inline-block' }}>{'/mo'}</span>
									</div>
								}
							/>
						</div>}
					</div>
					<div className="payment-item">
						<div className="payment-item-title">
							<div className="payment-point"></div>
							Year 3 payments
						</div>
						{overValue === 0 && <div className="payment-item-content">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'Rp. '}
								value={parseInt((property.purchasePrice * Math.pow(1.055, 3) * 0.15 - initialDown) / 36)}
								displayType={'text'}
								renderText={value =>
									<div style={{ width: '100%' }}>
										<span style={{ display: 'inline-block' }}>{`Rp. ${parseInt(property.rentPrice * Math.pow(1.055, 2))} +`}</span>
										<div style={{ display: 'inline-block', color: '#2ECC71', paddingLeft: '5px' }}>{`${value} equity`}</div>
										<span style={{ display: 'inline-block' }}>{'/mo'}</span>
									</div>
								}
							/>
						</div>}
					</div>
					<div className="payment-item">
						<div className="payment-item-title">
							<div className="payment-point"></div>
							After three years
						</div>
						{overValue === 0 && <div className="payment-item-content-no-border">
							<NumberFormat
								thousandSeparator = {'.'}
								decimalSeparator={','}
								prefix={'Rp. '}
								value={parseInt(property.purchasePrice * Math.pow(1.055, 3) * 0.15)}
								displayType={'text'}
								renderText={value =>
									<div style={{ fontWeight: 'bold', color: '#2ECC71' }}>{`${value} cash back`}</div>
								}
							/>
						</div>}
					</div>
				</div>
				{overValue === 0 && <div className="house-price">
					<NumberFormat
						thousandSeparator = {'.'}
						decimalSeparator={','}
						prefix={'House purchase price of Rp/'}
						value={parseInt(property.purchasePrice * Math.pow(1.055, 3))}
						displayType={'text'}
					/>
				</div>}
				<div className="you-choose">You choose</div>
				<div className="buy-sell">
					<div className="for-buy">
						<div className="title">Buy</div>
						<div className="content">Put Rp. 120.000.000 down toward mortgage</div>
					</div>
					<div className="mid-gap">
						<div className="mid-v-border"></div>
						<div className="mid-or">OR</div>
						<div className="mid-v-border"></div>
					</div>
					<div className="for-sell">
						<div className="title">Sell</div>
						<div className="content">Cash out your ownership at ~ Rp. 900.000.00</div>
					</div>
				</div>
				<button className="schedule">Click to schedule a private tour</button>
			</div>
		);
	}
}

Sidebar.propTypes = {
	property: PropTypes.object.isRequired,
};

export default Sidebar;
