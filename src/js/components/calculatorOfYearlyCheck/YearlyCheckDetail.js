import React, { Component, PropTypes } from 'react';
import Style from './index.scss'

class YearlyCheckDetail extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    /**
     * 获取年检状态的文字
     * @param {*string} state 年检状态 
     */
    getStateText(state) {
        let { bizFlag } = this.props
        state = state + ''
        let text = '';
        switch (state) { //年检状态；0：正常;1：可预约；2：逾期（仍可免检）；3：逾期；4：严重逾期；5：报废
            case '0': text = '正常'; break
            case '1': text = '可预约'; break
            case '2': text = `逾期${bizFlag==1 ? '(仍可免检)' : ''}`; break
            case '3': text = '逾期'; break
            case '4': text = '严重逾期'; break
            case '5': text = '报废'; break
            default: text = '正常';
        }
        return <span className={Style['stateText' + state]}>{text}</span>;
    }

    /**
     * 获取年检状态的提示信息
     * @param {*string} state 年检状态 
     */
    getStateMsg(state) {
        let { days, bizFlag } = this.props
        state = state + ''
        let text = '';
        let component=bizFlag!=3?<p>下一次年检类型：{bizFlag==1 ? '六年内新车年检' : '上线年检'}</p>:'';
        switch (state) { //年检状态；0：正常;1：可预约；2：逾期（仍可免检）；3：逾期；4：严重逾期；5：报废
            case '0':
                text = <div>
                    <p>车辆距离年检预约还有{days}天，请放心驾驶。</p>
                    {component}
                </div>;
                break
            case '1':
                text = <div>
                    <p>车辆已进入年检办理周期，请您在年检有效期内办完年检（还剩余{days}天），否则车辆将面临扣分和有事故不能出险的风险！</p>
                    {component}
                </div>;
                break
            case '2':
                text = <div>
                    {bizFlag==1 ?
                        <p>车辆未按规定在检验有效期内完成年检， 目前已逾期{days}天。请您尽快处理，否则逾期超过一年，将需要车主本人开车去车管所亲自办理。</p>
                        :
                        <p>车辆未按规定在检验有效期内完成年检，目前已逾期{days}天。按相关法律规定，需要车主本人开车去车管所亲自办理年检。</p>
                    }
                    {component}
                </div>;
                break
            case '3':
                text = <div>
                    <p>车辆未按规定在检验有效期内完成年检，目前已逾期{days}天。按相关法律规定，需要车主本人开车去车管所亲自办理年检。</p>
                    {component}
                </div>;
                break
            case '4':
                text = <div>
                    <p>车辆已连续两次年检逾期，请您在“下一次理论上的年检有效期”之内完成车辆上线检测，否则车辆将直接报废。</p>
                    {component}
                </div>;
                break
            case '5':
                text = <div>
                    <p>车车辆未按规定在检验有效期内完成年检，并且逾期次数已连续超过3次。按我国机动车相关法规《机动车强制报废标准》的规定，车辆已达强制报废条件。请勿再驾驶此车上路，否则将被收缴，并面临罚款和吊销驾驶证的处罚。</p>
                </div>;
                break
            default:
                text = <div>
                    <p>车辆距离年检有效期还有{days}天，请放心驾驶。</p>
                    {component}
                </div>;
        }
        return text;
    }

    /**
     * 获取年检的按钮
     * @param {*string} state 年检状态
     */
    getStateBtn(state) {
        let { bizFlag } = this.props
        let { clickLeftBtn, clickRightBtn } = this.props
        let btns = ''; //按钮

        //年检状态；0：正常;1：可预约；2：逾期（仍可免检）；3：逾期；4：严重逾期；5：报废
        if (bizFlag!=3) {
            btns = <div className={Style.stateBtns}>
                <span onClick={() => clickLeftBtn()}>返回</span><span onClick={() => clickRightBtn()}>立即办理</span>
            </div>
        } else {
            btns = <div className={Style.stateBtn}>
                <span onClick={() => clickLeftBtn()}>返回</span>
            </div>
        }

        return btns;
    }

    render() {
        let { carNum, state, registerDate, inspectDate, clickTopBtn } = this.props
        return (
            <div className={Style.detailBox}>
                <div className={Style.topRIconbox} onClick={() => clickTopBtn()}>重新计算</div>
                <div className={Style.carNum}>{carNum.substr(0, 2) + ' ' + carNum.substr(2)}</div>
                <div className={Style.stateBox}>
                    <i className={Style['stateIcon' + state]}></i>
                    {this.getStateText(state)}
                </div>
                <div className={Style.datesBox}>
                    <span>注册日期：{registerDate}</span><span>检验有效期：{inspectDate}</span>
                </div>
                <div className={Style.stateMsgBox}>
                    {this.getStateMsg(state)}
                </div>
                <div className={Style.stateBtnBox}>
                    {this.getStateBtn(state)}
                </div>
            </div>
        );
    }
}

YearlyCheckDetail.defaultProps = {
    carNum: '',
    state: '0', //年检状态；0：正常;1：可预约；2：逾期（仍可免检）；3：逾期；4：严重逾期；5：报废
    agentFlag: true, //年检类型：true为6年新车年检；false为上线年检
    bizFlag:3,//1:免检；2:上线检；3:不可办理
    registerDate: '', //注册时间
    inspectDate: '', //检验有效期
    days: '', //文案提醒中的天数 (有效天数、逾期天数等)
    clickTopBtn: () => console.log("点击了顶部按钮（重新计算按钮）"),
    clickLeftBtn: () => console.log("点击了左边按钮（返回）"),
    clickRightBtn: () => console.log("点击了右边按钮（立即办理）")
};

export default YearlyCheckDetail;