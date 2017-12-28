import React, { Component, PropTypes } from 'react'
import 'style/w-style.scss'
import Common from '../../utils/common'

export default class AppHeader extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			addHeader: Common.needAddAppHeaderHeight(), //需要增加高度
		}
	}

	toURL(url) {
		this.context.router.push(url);
	}

	componentWillMount() {
	}

	componentDidMount() {

	}

	render() {
		console.log("需要增加高度：", this.state.addHeader)
		let addHeader = this.state.addHeader ? '' : 'notAddHeader';
		if (this.props.height == '90') {
			addHeader = 'notAddHeader';
		} else if (this.props.height == '130') {
			addHeader = '';
		}
		let isAndroid = Common.isAndroid();
		addHeader = isAndroid ? addHeader : addHeader + ' ios'; //安卓的头部为48PX IOS为44PX
		return (
			<div style={{ zIndex: this.props.zIndex, position:'relative' }}>
				{this.props.show ?
					<div className={addHeader}>
						<div className={isAndroid ? "appHeader" : "appHeader ios"}>
							<span onClick={() => this.props.left.onClick()} className="headerLeft">
								{this.props.left.text !== 'backOff' ? this.props.left.text :
									<div style={{ position: 'relative', left: '-.3rem', width: '.9rem', height: '.9rem' }} ><img style={{ position: 'relative', top: '.2rem', width: '.45rem', height: '.45rem' }} src='./images/back-off.png' /></div>
								}</span>
							<span onClick={() => this.props.center.onClick()} className="headerTitle">{this.props.center.text}</span>
							<span onClick={() => this.props.right.onClick()} className="headerRight">{this.props.right.text}</span>
						</div>
						<div className={isAndroid ? "h130" : "h130 ios"}></div>
					</div>
					: ''}
			</div>
		)
	}
}

//使用context
AppHeader.contextTypes = {
	router: React.PropTypes.object.isRequired
}

//props默认值
AppHeader.defaultProps = {
	show: true, //是否显示 兼容APP的沉浸模式
	left: {
		text: '', //为"backOff"是显示返回箭头
		onClick: () => false
	},
	center: {
		text: '',
		onClick: () => false
	},
	right: {
		text: '',
		onClick: () => false
	},
	height: '90', //头部高度，可选 90 和 130 。为空时基于APP的沉浸模式自动判断
	zIndex: '9999', //层级
}