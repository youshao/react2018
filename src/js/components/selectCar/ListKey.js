import React, { Component } from 'react'
import Style from './index.scss'

export default class ListKey extends Component {
	constructor(props) {
		 super(props);

		 this.state = {}
	}

	//手指触摸事件
	touchStart(keyName) {
		if(this.props.touchStart){
			this.props.touchStart(keyName); //将序号返回给父元素
		}
	}

	render() {
		return(
			<div className={Style.keyList}>
				{this.props.list.map((item, i) =>
					<div key={i} onClick={(keyName) => this.touchStart(item)}>{item}</div>
				)}
			</div>
		)		
	}
}

ListKey.defaultProps = {
	list: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
}