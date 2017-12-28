import React, { Component } from 'react'
import Style from './index.scss'

export default class Cars extends Component {
	constructor(props) {
		 super(props);

		 this.state = {}
	}

	click(item) {
		if(this.props.onClick){
			let data = {
				keyName: this.props.keyName,
				data: item
			}
			this.props.onClick(data); //将点击的数据返回给父元素
		}
	}

	render() {
		return(
			<div className={Style.carBox}>
				{this.props.list.length > 0 ? 
				<div>
					<div className={Style.header}>{this.props.keyName}</div>
					<div className={Style.listCar}>
					{
						this.props.list.map((item, i) =>
							<div key={i} className={Style.car} onClick={(data) => this.click(item)}>
								<div className={Style.img}>
									<img src={item.img} />
								</div>
								<div className={Style.text}>{item.title}</div>
							</div>
						)
					}
					</div>				
				</div>
				: '<div></div>'
				}
			</div>			
		)		
	}
}

Cars.defaultProps = {
	keyName: "A",
	list: [{
		img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
		title: "奔驰"
	},
	{
		img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
		title: "宝马"
	}]
}