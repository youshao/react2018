import React, { Component } from 'react'
import Cars from './Cars'
import Style from './index.scss'

export default class ListCars extends Component {
	constructor(props) {
		 super(props);

		 this.state = {
		 	tops:{}
		 }
	}

	componentDidMount(){
		
	}

	carsClick(data) {
		if(this.props.onClick){
			this.props.onClick(data); //将点击的数据返回给父元素
		}
	}

	render() {
		return(
			<div className={Style.bgWhite}>
				{
					this.props.list.map((item, i) =>
						<Cars key={i} {...item} onClick={(data) => this.carsClick(data)}/>
					)
				}			
			</div>
		)		
	}
}

ListCars.defaultProps = {
	list: [{
		keyName: "A",
		list: [{
			img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
			title: "奔驰"
		},
		{
			img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
			title: "宝马"
		}]
	},{
		keyName: "B",
		list: [{
			img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
			title: "奔驰2"
		},
		{
			img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
			title: "宝马2"
		}]
	}]
}