import React, { Component, PropTypes } from 'react';
import Style from './index.scss'

class carPrefixList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        //这里应该去请求车牌前缀的数据
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={Style.carPrefixList} onClick={name => this.props.getName('')} style={this.props.show ? {display:'inherit'} : {display: 'none'}}>
                <dl>
                    {
                        this.props.list.map((item, i) => <dd key={i} onClick={name => this.props.getName(item)}>
                            {Object.prototype.toString.call(item)=="[object String]"?item:item.ProvincePrefix}
                        </dd>)
                    }
                </dl>
            </div>
        );
    }
}

carPrefixList.propTypes = {

};

carPrefixList.defaultProps = {
    getName: name => console.log('获取车牌前缀:', name), //获取车牌前缀
    show: false, //显示或隐藏
    list: ['京', '津', '沪', '渝', '湘', '黑', '琼', '贵', '苏', '闽', '辽', '宁', '粤', '陕', '豫', '新', '赣', '冀', '甘', '鄂', '吉', '浙', '云', '桂', '皖', '晋', '鲁', '川','蒙','藏','青'], //列表数据
    //list:[{ProvinceID:'123',ProvincePrefix:'京'}]
}

export default carPrefixList;
