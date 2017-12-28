import React, { Component, PropTypes } from 'react';
import CarPrefixList from 'app/components/common/carPrefixList'

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carPrefix: '粤',
            carPrefixListProps: {
                getName: name => this.getName(name), //获取车牌前缀
                show: false, //显示或隐藏
            }
        }
    }

    showCarPrefixListProps() {
        this.setState({
            carPrefixListProps: Object.assign({}, this.state.carPrefixListProps, {
                show: true
            })
        })
    }

    getName(name) {
        if (name) {
            //用户修改车牌前缀后保存车牌前缀
            this.setState({
                carPrefix: name
            })
          this.props.getChooseProvince(name)
        }
        //隐藏
        this.setState({
            carPrefixListProps: Object.assign({}, this.state.carPrefixListProps, {
                show: false
            })
        })
    }

    render() {
        console.log('----')
        let props = {
            getName: name => console.log('获取车牌前缀:', name), //获取车牌前缀
            show: false, //显示或隐藏
        }
        return (
            <div>
                <div onClick={() => this.showCarPrefixListProps()}>{this.state.carPrefix}</div>
                <CarPrefixList {...this.state.carPrefixListProps} />
            </div>
        );
    }
}

Demo.propTypes = {

};

export default Demo;