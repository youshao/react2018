import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: sessionStorage.getItem('userId'),
			token: sessionStorage.getItem('token'),
			userType: sessionStorage.getItem('userType'),
			authType: sessionStorage.getItem('authType'),
			deviceId: sessionStorage.getItem('deviceId'),
		}
	}

	componentDidMount() { }

	render() {
		let { userId, token, userType, authType, deviceId } = this.state
		return (
			<div className='box'>
				全渠道适配，简单demo
				<div>userId:{userId}</div>
				<div>token:{token}</div>
				<div>userType:{userType}</div>
				<div>authType:{authType}</div>
				<div>deviceId:{deviceId}</div>

				<div onClick={() => alert(JSON.stringify(this.state))}>显示详情信息</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({

})

export default connect(
	mapStateToProps
)(Home);