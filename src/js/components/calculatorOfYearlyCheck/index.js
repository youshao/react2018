import React, { Component, PropTypes } from 'react';
import { DatePicker, List, Popup, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'style/calculatorOfYearlyCheck/antd.scss'
import Style from './index.scss'


const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment().utcOffset(8);
const minDate = moment('1998-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);


class CalculatorOfYearlyCheck extends Component {
    constructor(props) {
        super(props);

        let { registerDate } = this.props
        this.state = {
            dpValue: registerDate ? moment(registerDate + ' +0800', 'YYYY-MM-DD Z').utcOffset(8) : '', //车辆注册时间
            dateList: {
                show: false, //显示
            }
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    /**
     * 显示 检验有效期列表
     */
    showDateList() {
        let { dpValue } = this.state
        let registerDate = dpValue ? dpValue.format("YYYY-MM-DD") : ''

        if (!registerDate) {
            Toast.info("请先选择车辆注册日期", 1)
            return;
        }

        let dateList = this.props.dateList && this.props.dateList.constructor === Array ? this.props.dateList : [] //检验有效期列表
        let list = dateList.map((item, i) =>
            <div key={'dateList' + i} onClick={(date) => this.showDate(item)}>{item}</div>
        )
        let JSX = <div className={Style.dateList}>{list}</div>
        Popup.show(JSX, { animationType: 'slide-up' }
        );
    }

    /**
     * 显示检验有效期
     */
    showDate(date) {
        Popup.hide()

        this.props.getInspectDate(date) //返回检验有效期给父组件
    }

    /**
     * 车辆注册日期发送改变
     */
    datePickerOnChange(dpValue) {
        //日期格式化
        let date = dpValue.format("YYYY-MM-DD"); //选择的注册日期

        this.setState({
            dpValue: dpValue
        })

        this.showDate('') //清空检验有效期
        this.props.getRegisterDate(date) //返回注册时间给父组件
    }

    /**
     * 保存
     */
    send() {
        let { dpValue } = this.state
        let { inspectDate } = this.props

        let registerDate = dpValue ? dpValue.format("YYYY-MM-DD") : ''

        this.props.onClick(registerDate, inspectDate || '') //返回车辆注册日期和检验有效期
    }

    render() {
        let { carNum, btnText, inspectDate } = this.props;
        const { getFieldProps } = this.props.form;

        return (
            <div className='box calculatorOfYearlyCheck'>
                <div className={Style.subTitle}>请补充{carNum.substr(0, 2) + ' ' + carNum.substr(2)}车辆年检计算所需的资料：</div>
                <div className={Style.inputs}>
                    <List
                        className="date-picker-list"
                        style={{ backgroundColor: 'white' }}
                    >
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            extra={<span className={Style.listItemExtra}>请选择</span>}
                            {...getFieldProps('date1', {}) }
                            minDate={minDate}
                            maxDate={maxDate}
                            value={this.state.dpValue}
                            onChange={v => this.datePickerOnChange(v)}
                        >
                            <List.Item arrow="horizontal"><span className={Style.listItem}>车辆注册日期</span></List.Item>
                        </DatePicker>
                        <List.Item extra={
                            inspectDate ?
                                <span className={Style.listItemExtra} style={{ color: '#6a6a6a' }}>{inspectDate}</span>
                                :
                                <span className={Style.listItemExtra}>请选择</span>}
                            arrow="horizontal"
                            onClick={() => this.showDateList()}>
                            <span className={Style.listItem}>检验有效期至</span>
                        </List.Item>
                    </List>
                </div>
                <div className={Style.btn} onClick={() => this.send()}>{btnText}</div>
                <div className={Style.desBox}>
                    <div className={Style.desTitle}>
                        <span>年检时间计算说明</span>
                    </div>
                    <div className={Style.desText}>
                        <p><span>1、</span>输入准确的车辆信息，系统会智能计算出车辆的年检状态，以及下一次年检的类型。如果进入预约周期，系统还能自动提醒您需要准备哪些资料，该如何办理。如果一不小心逾期，系统还能协助您如何尽量避免损失。</p>
                        <p><span>2、</span>本计算方式只适用于7座以下的蓝牌小轿车。</p>
                    </div>
                </div>
            </div >
        );
    }
}

CalculatorOfYearlyCheck.defaultProps = {
    carNum: '', //车牌号码
    dateList: [], //检验有效期列表
    registerDate: '', //车辆注册日期
    inspectDate: '', //检验有效期
    getRegisterDate: d => console.log("车辆注册日期：", d), //获取车辆注册日期
    getInspectDate: d => console.log("检验有效期至：", d), //获取检验有效期
    onClick: (r, i) => console.log("点击了保存按钮!", "注册时间：" + r, "检验有效期：" + i), //点击保存按钮
    btnText: '保存并计算' //按钮文本
};

export default createForm()(CalculatorOfYearlyCheck);
