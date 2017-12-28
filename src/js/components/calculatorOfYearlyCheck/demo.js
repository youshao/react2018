import React, { Component, PropTypes } from 'react';
import CalculatorOfYearlyCheck from 'app/components/calculatorOfYearlyCheck'
import YearlyCheckDetail from 'app/components/calculatorOfYearlyCheck/YearlyCheckDetail'

import { Toast } from 'antd-mobile'

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: { //年检计算机的props数据
                carNum: '粤A12345', //车牌号码
                dateList: [], //检验有效期列表
                getRegisterDate: d => this.getRegisterDate(d), //获取车辆注册日期
                getInspectDate: d => console.log("父组件：检验有效期至：", d), //获取检验有效期
                onClick: (r, i) => this.showYearlyCheckDetail(r, i)
            },
            showYearlyCheckDetail: false, //显示年检状态
            yearlyCheckDetailProps: { //年检状态props数据
                carNum: '粤A12345',
                state: '0', //年检状态；0：正常;1：可预约；2：逾期（仍可免检）；3：逾期；4：严重逾期；5：报废
                registerDate: '', //注册时间
                inspectDate: '', //检验有效期
                days: '', //文案提醒中的天数 (有效天数、逾期天数等)
                clickLeftBtn: () => this.setState({ showYearlyCheckDetail: false }),
                clickRightBtn: () => console.log("父组件：点击了右边按钮（立即办理）")
            }
        }
    }

    /**
     * 联动获取检验有效时间列表
     * @param registerDate 注册时间
     */
    getRegisterDate(registerDate) {
        //这里触发接口请求

        //模拟接口请求成功
        let Y = registerDate.substr(0, 4) //年份
        let str = registerDate.substr(4, 3) //月份
        let nowY = new Date().getFullYear()
        let dateList = []
        for (let i = 1; i <= nowY - Y + 1; i++) {
            dateList.push(parseInt(Y) + i + str)
        }
        //修改检验有效期列表
        this.setState({
            data: Object.assign({}, this.state.data, {
                dateList: dateList
            })
        })
    }

    /**
     * 跳转到年检状态页面
     */
    showYearlyCheckDetail(r, i) {
        console.log("父组件：点击了保存按钮!", "注册时间：" + r, "检验有效期：" + i)
        if (!r) {
            Toast.info("请选择车辆注册日期", 1)
        } else if (!i) {
            Toast.info("请选择检验有效期", 1)
        } else {
            //这里应该去请求数据

            //模拟请求数据成功
            this.setState({
                showYearlyCheckDetail: true,
                yearlyCheckDetailProps: Object.assign({}, this.state.yearlyCheckDetailProps, {
                    carNum: '粤A12345',
                    state: Math.floor(Math.random() * 6).toString(), //随机状态 模拟数据
                    registerDate: r, //注册时间
                    inspectDate: i, //检验有效期
                    days: Math.ceil(Math.random() * 6), //文案提醒中的天数 (有效天数、逾期天数等) 模拟数据
                })
            })
        }
    }

    render() {
        let calculatorOfYearlyCheckProps = this.state.data
        let yearlyCheckDetailProps = this.state.yearlyCheckDetailProps
        return (
            <div>
                {this.state.showYearlyCheckDetail ?
                    <YearlyCheckDetail {...yearlyCheckDetailProps} />
                    :
                    <CalculatorOfYearlyCheck {...calculatorOfYearlyCheckProps} />
                }
            </div>
        );
    }
}

//使用context
Demo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

Demo.propTypes = {

};

export default Demo;