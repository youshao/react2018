import React, { Component, PropTypes } from 'react';
import Style from './index.scss'
import closeIcon from '../../../../images/alert-close-icon.png' //关闭图标

class AlertDemo extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={Style.alertBox}>
                <div className={Style.close} onClick={() => this.props.close()}>
                    <img src={closeIcon} />
                </div>
                <div className={Style.demo + ' center-center-column'}>
                    {this.props.demo}
                </div>
            </div>
        );
    }
}

AlertDemo.propTypes = {

};

AlertDemo.defaultProps = {
    demo: '展示的内容，支持HTML标签', //需要展示的demo
    close: () => console.log('点击关闭按钮'), //点击关闭按钮
}

export default AlertDemo;
