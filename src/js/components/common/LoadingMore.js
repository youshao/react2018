import React, { Component, PropTypes } from 'react';
import Style from './loadingMore.scss'

/**
 * 上拉加载更多
 */
class LoadingMore extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 加载数据
     */
    loadingMore() {
        if (this.refs.loadMore.innerHTML != this.props.msg[0]) {
            return false;
        }

        this.props.loadingMore();
    }

    handleScroll(e) {
        //滚动高度+视图可视高度+距离触发底部刷新的高度 > 列表高度+列表距离顶部的高度
        const winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //窗口高度
        const listBox = this.refs.listBox;
        const scrollTop = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
        if (!listBox) {
            return; //refs不存在时，不执行
        }
        if (scrollTop + winH + this.props.height > this.refs.listBox.clientHeight + this.refs.listBox.offsetTop) {
            this.loadingMore();
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        window.loadingMoreScroll = () => this.handleScroll()
        window.addEventListener('scroll', window.loadingMoreScroll); //绑定页面滚动事件
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', window.loadingMoreScroll); //取消绑定页面滚动事件
    }

    render() {
        const hasLine = this.props.msg[this.props.msgType] == "END" && this.props.line //判断是否需要添加横线
        return (
            <div
                ref="listBox"
                className={Style.box}
            >
                {this.props.children}
                <div className={hasLine ? Style.hasLine : ''} style={this.props.bgColor ? { background: this.props.bgColor } : {}}>
                    <div ref='loadMore'
                        className={Style.loadMoreBtn}
                        style={this.props.showMsg ? {} : { display: 'none' }}
                        onClick={() => this.loadingMore(this.props.loadingMore)}
                    >
                        {this.props.msg[this.props.msgType]}
                    </div>
                    {hasLine && <div className={Style.line}></div>}
                </div>
            </div>
        );
    }
}

LoadingMore.propTypes = {

};

//props默认值
LoadingMore.defaultProps = {
    showMsg: true, //显示文字提醒
    msgType: 0, // 对应msg字段的下标
    msg: ['点击加载更多', '加载中...', 'END'], //文字提醒
    height: 60, //触发加载数据的高度 单位px
    loadingMore: () => false, //到达底部时，触发的事件
    line: false, //END时,是否添加贯穿文本的横线
    //bgColor:"#fff", //背景颜色
}

export default LoadingMore;