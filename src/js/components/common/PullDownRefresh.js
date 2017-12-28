import React, { Component, PropTypes } from 'react';
import 'style/w-style.scss'
import styles from './pullDownRefresh.scss'
import Icon from './images/progress-icon.png'

/**
 * 下拉刷新
 */
let refreshInfo = {
    y: 0, //滑动开始时的Y坐标
    x: 0, //滑动开始时的X坐标
    endY: 0, //滑动结束时的Y坐标
    endX: 0, //滑动结束时的X坐标
    touchY: 0, //滑动的距离
    msg: ['下拉刷新', '松开刷新', '正在努力加载中...', '刷新完成'], //文字提醒
    icon: Icon, //下拉刷新的icon
    height: 60, //触发刷新的高度 单位px
    delay: 2, //延迟多少秒请求数据。
    delayId: -1, //延迟器ID
    startTime: 0, //触发开始的时间
    endTime: 0, //触发结束的时间
    click: false, //是否触发点击事件
    scrollTop: 0, //当前滚动条的位置
}

class PullDownRefresh extends Component {
    constructor(props) {
        super(props);
    }

    handleTouchStart(e) {
        if (refreshInfo.click) {
            e.preventDefault(); //阻止默认事件
            refreshInfo.startTime = new Date().getTime();
        }

        refreshInfo.x = e.targetTouches[0].clientX;
        refreshInfo.endX = e.targetTouches[0].clientX;
        refreshInfo.y = e.targetTouches[0].clientY;
        refreshInfo.endY = e.targetTouches[0].clientY;
        refreshInfo.touchY = 0;
        refreshInfo.scrollTop = document.body.scrollTop; //当前滚动条的位置

        this.refs.listBox.style.transitionProperty = 'transform'; //重置位置过渡效果
        this.refs.listBox.style.transitionDuration = '0s';
        this.refs.progressBox.style.display = 'inline-block'; //显示圆形进度条
        this.refs.progressBox.style.transitionProperty = 'transform'; //加载中过渡效果
        this.refs.progressBox.style.transitionTimingFunction = "linear";
        this.refs.progressBox.style.transitionDuration = '0s';
    }

    handleTouchMove(e) {
        if (document.body.scrollTop === 0 && refreshInfo.endY - refreshInfo.y > 4) {
            e.preventDefault(); //阻止默认事件
        }

        refreshInfo.endY = e.targetTouches[0].clientY; //当前手指的位置
        refreshInfo.touchY = (refreshInfo.endY - refreshInfo.y - refreshInfo.scrollTop) / 3; //真正的下拉距离 = (滑动距离 - 滚动条距离)/拉力度

        if (refreshInfo.click) { //兼容安卓4.4及以下版本 滚动条无法滑动的bug
            refreshInfo.endX = e.targetTouches[0].clientX; //保存X轴坐标，用于判断是否重复点击事件
            if (refreshInfo.y - refreshInfo.endY > 0) {
                //上滑
                document.body.scrollTop = (refreshInfo.y - refreshInfo.endY) + refreshInfo.scrollTop;
            } else if (refreshInfo.endY - refreshInfo.y - refreshInfo.scrollTop < 0) {
                //下滑却scrollTop不等于0
                document.body.scrollTop = refreshInfo.scrollTop - (refreshInfo.endY - refreshInfo.y);
            }
        }

        refreshInfo.touchY = refreshInfo.touchY > 0 ? refreshInfo.touchY : 0;

        this.setRefTransform(this.refs.listBox, `translate3d(0px, ${refreshInfo.touchY}px, 0px)`); //兼容低版本浏览器
        this.refs.progressBox.style.display = 'inline-block'; //显示圆形进度条
        if (refreshInfo.touchY > refreshInfo.height) {
            //显示松开刷新
            this.refs.refreshMsg.innerHTML = refreshInfo.msg[1];
        } else {
            //显示下拉刷新
            this.refs.refreshMsg.innerHTML = refreshInfo.msg[0];
            //圆形进度条
            let rotateRightDeg = (-135 + (refreshInfo.touchY * 6)); //每下拉1像素=6deg
            rotateRightDeg = rotateRightDeg > 45 ? 45 : rotateRightDeg; //右边遮罩层最大45deg
            this.setRefTransform(this.refs.progressBoxBarRight, `rotate(${rotateRightDeg}deg)`); //兼容低版本浏览器
            if (rotateRightDeg == 45) {
                let rotateLeftDeg = (45 + ((refreshInfo.touchY * 6) - 180)); //每下拉1像素=6deg 减去之前下拉的180deg
                rotateLeftDeg = rotateLeftDeg > 200 ? 200 : rotateLeftDeg; //左边遮罩层最大225deg
                this.setRefTransform(this.refs.progressBoxBarLeft, `rotate(${rotateLeftDeg}deg)`); //兼容低版本浏览器
            } else {
                this.setRefTransform(this.refs.progressBoxBarLeft, `rotate(45deg)`); //兼容低版本浏览器
            }
        }
    }

    handleTouchEnd(e) {
        if (refreshInfo.click) {
            //如果滑动事件小于300毫秒，并且未移动 则触发点击事件
            refreshInfo.endTime = new Date().getTime();
            if ((refreshInfo.endTime - refreshInfo.startTime < 300) && refreshInfo.endY === refreshInfo.y && refreshInfo.endX === refreshInfo.x) {
                e.target.click(); //触发点击事件
            }
        }

        this.refs.listBox.style.transitionDuration = '0.3s'; //重置位置过渡效果
        this.refs.progressBox.style.transitionDuration = '30s'; //加载中过渡效果
        //刷新
        if (refreshInfo.touchY > 60) {
            //显示加载中
            this.setRefTransform(this.refs.listBox, `translate3d(0px, 40px, 0px)`); //兼容低版本浏览器
            this.refs.refreshMsg.innerHTML = refreshInfo.msg[2]; //提示文字
            this.refs.progressIcon.style.display = `none`; //隐藏下箭头ICON
            this.setRefTransform(this.refs.progressBox, `rotate(${30 * 360}deg)`); //兼容低版本浏览器 30秒*360deg

            clearTimeout(refreshInfo.delayId); //关闭延迟器，避免频繁请求数据
            refreshInfo.delayId = setTimeout(() => { //延迟请求，避免频繁请求数据
                this.loadingMore(); //加载中
            }, refreshInfo.delay * 1000);
        } else {
            this.clearRefreshStyle();
        }
    }

    /**
     * 清除刷新style
     */
    clearRefreshStyle() {
        this.setRefTransform(this.refs.listBox, `translate3d(0px, 0px, 0px)`); //兼容低版本浏览器
        this.setRefTransform(this.refs.progressBoxBarRight, '');
        this.setRefTransform(this.refs.progressBoxBarLeft, '');
        this.setRefTransform(this.refs.progressBox, '');
    }

    /**
     * 设置transform
     * @param ref对象
     * @param style 样式
     */
    setRefTransform(ref, style) {
        ref.style.transform = style;
        ref.style.webkitTransform = style;
        ref.style.mozTransform = style;
        ref.style.oTransform = style;
    }

    /**
     * 加载数据
     */
    loadingMore() {
        this.props.onRefresh();
    }

    /**
     * 加载完成
     */
    loadingDone() {
        try{
            this.refs.refreshMsg.innerHTML = refreshInfo.msg[3]; //提示文字
            this.refs.progressBox.style.display = 'none'; //隐藏
            this.setRefTransform(this.refs.progressBox, ''); //兼容低版本浏览器
            this.refs.progressBox.style.transitionDuration = '0s';
            this.refs.progressIcon.style.display = 'block'; //还原下箭头ICON
            setTimeout(() => { //延迟隐藏
                this.clearRefreshStyle();
            }, 500)
        }catch(e){
            // 组件还没有加载就设置完成时，会出现dom节点操作异常
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        let re = /Android\s([^;]+)/ig;
        let version = re.exec(navigator.userAgent);
        if (version) {
            version = version[1];
        }
        if (version) {
            version = version.split(".");
            if ((version[0] * 1) < 5 && (version[1] * 1) < 5) {
                refreshInfo.click = true;; //4.4及以下的系统需要触发点击事件
            }
        }
    }

    componentWillUnmount() {
    }

    render() {
        if (this.props.loadingDone) {
            this.loadingDone(); //加载完成
        }
        refreshInfo = Object.assign({}, refreshInfo, this.props.refreshInfo); //自定义配置信息
 
        return (
            <div ref="listBox" style={{ height: "100%" }} className={styles.listBox} onTouchStart={(e) => this.handleTouchStart(e)} onTouchMove={(e) => this.handleTouchMove(e)} onTouchEnd={(e) => this.handleTouchEnd(e)} >
                <div className={styles.updatasBox}>
                    <div className={styles.updatasBoxMsg}>
                        <div ref="progressBox" className={styles.progressBox}>
                            <img ref="progressIcon" src={refreshInfo.icon} className={styles.progressIcon} />
                            <div ref="progressBoxBar" className={styles.progressBoxBar}></div>
                            <div className={styles.progressBoxBarLeftBox}>
                                <div ref="progressBoxBarLeft" className={styles.progressBoxBarLeft}></div>
                            </div>
                            <div className={styles.progressBoxBarRightBox}>
                                <div ref="progressBoxBarRight" className={styles.progressBoxBarRight}></div>
                            </div>
                        </div>
                        <span ref="refreshMsg">下拉加载的提示信息</span>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

PullDownRefresh.propTypes = {

};

//props默认值
PullDownRefresh.defaultProps = {
    onRefresh: () => false, //刷新回调函数
    loadingDone: false, //加载完成
    refreshInfo: {}, //下拉刷新 配置
}

export default PullDownRefresh;