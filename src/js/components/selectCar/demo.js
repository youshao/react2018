import React, { Component } from 'react'
import { ListCars, ListKey } from 'app/components/selectCar/'
import Style from './demo.scss'
import { Toast } from 'antd-mobile'

export default class SelectCar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			top: 0,
			keyTops: [], //所有序号的scrollTop位置
			keyName: "", //当前点击的key
			showKeyName: false, //是否显示key
			data: {
				carClass: {
					keyName: '',
					data: {
						img: '',
						title: ''
					}
				},
				carType: {
					keyName: '',
					data: {
						img: '',
						title: ''
					}
				}
			},
			ListCars: this.props.ListCars, //车系列表
			ListKey: { list: [] }, //字母索引列表
			cars: { list: [] }, //车型列表
		}
	}

	toUrl() {
		this.context.router.push('/edit');
	}

	//获取点击的序号
	getKeyName(keyName) {
		this.refs.ListCars.scrollTop = this.state.keyTops[keyName]; //页面滚动到指定位置
		this.setState({
			keyName: keyName,
			showKeyName: true
		});
		setTimeout(() => {
			this.setState({
				showKeyName: false
			});
		}, 300);
	}

	//页面滚动
	scroll(i) {
		let top = this.refs.ListCars.scrollTop;
		console.log("页面滚动了:" + top);
	}

	//获取所有序号的scrollTop位置
	getScrollTop(tops) {
		this.setState({
			keyTops: tops
		})
		console.log(tops, "getScrollTop");
	}

	//隐藏车型列表
	hideCars() {
		this.refs.Cars.style.display = "none";
	}

	//显示车型列表
	showCars(data) {
		console.log("车系信息", data, data.data.title);

		this.refs.Cars.style.display = "block";
	}

	//获取车辆信息
	getCar(data) {
		console.log("车型信息", data);
	}

	componentWillMount() {
		document.querySelector("title").innerHTML = "选择车型";

		//模拟数据
		this.setState({
			ListCars: this.props.ListCars, //车系列表
			ListKey: this.props.ListKey, //字母索引列表
			cars: this.props.cars, //车型列表
		})
	}

	render() {
		let param = this.props.params.param;

		return (
			<div className={Style.fiexd100}>
				<div className={Style.container}>
					<div ref="ListCars" className={Style.left}>
						{this.state.ListCars.list.length > 0 ?
							<ListCars {...this.state.ListCars} getScrollTop={(tops) => this.getScrollTop(tops)} onClick={(data) => this.showCars(data)} />
							: ''
						}
					</div>
					<div className={Style.right}>
						<ListKey {...this.state.ListKey} touchStart={(keyName) => this.getKeyName(keyName)} />
					</div>
					<div className={Style.showKeyName} style={this.state.showKeyName ? { "display": "block" } : {}}>{this.state.keyName}</div>
					<div ref="Cars" className={Style.left + " " + Style.cars} onClick={() => this.hideCars()}>
						<ListCars {...this.state.cars} onClick={(data) => this.getCar(data)} />
					</div>
				</div>
			</div>
		)
	}
}

//使用context
SelectCar.contextTypes = {
	router: React.PropTypes.object.isRequired
}

SelectCar.defaultProps = {
	ListCars: {
		list: [{
			keyName: "A",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奔驰"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马"
			}]
		}, {
			keyName: "B",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奔驰2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马2"
			}]
		}, {
			keyName: "C",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奔驰3"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马3"
			}]
		}, {
			keyName: "D",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奔驰4"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马4"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马4"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马4"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马4"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马4"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马4"
			}]
		}, {
			keyName: "E",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奔驰5"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马5"
			}]
		}, {
			keyName: "F",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奔驰6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "宝马6"
			}]
		}]
	},
	ListKey: {
		list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	},
	cars: {
		list: [{
			keyName: "一汽 - 大众奥迪",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奥迪A4L"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "奥迪A6L"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "奥迪Q3"
			}]
		}, {
			keyName: "奥迪进口",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奥迪Q7"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S5"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S8"
			}]
		}, {
			keyName: "奥迪进口2",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奥迪Q7"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S5"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S8"
			}]
		}, {
			keyName: "奥迪进口3",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奥迪Q7"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S5"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S8"
			}]
		}, {
			keyName: "奥迪进口4",
			list: [{
				img: 'http://img5.imgtn.bdimg.com/it/u=3747381357,1005215364&fm=21&gp=0.jpg',
				title: "奥迪Q7"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S5"
			},
			{
				img: 'http://img0.imgtn.bdimg.com/it/u=3828647692,1403014506&fm=21&gp=0.jpg',
				title: "S8"
			}]
		}]
	}
}