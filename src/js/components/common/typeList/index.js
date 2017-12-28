/*分类展示栏组件props示例
    props={
        list:[
            {
                "type": "hd3a",//展示栏布局风格
                "adList": [ //每栏数据
                    {
                        "name": "车载精品",  //标题
                        "nameColor":"#1a1a1a",  //标题颜色
                        "describeColor":"#ababab",  //描述颜色
                        "describe": "车载精品，一件不落",  //描述
                        "image": "../../../images/car-boutique.png",  //图片链接
                        "targetUrl":"http://m.baidu.com",  //跳转链接
                        "handleClick":()=>{}  //点击时执行的操作
                    },
                    {
                        "name": "爱车保养",
                        "nameColor":"#1a1a1a",
                        "describeColor":"#ababab",
                        "describe": "保养特惠多",
                        "image": "../../../images/car-maintenance.png",
                        "targetUrl":"http://m.baidu.com", 
                        "handleClick":()=>{}  
                    },
                    {
                        "name": "自驾必备",
                        "nameColor":"#1a1a1a",
                        "describeColor":"#ababab",
                        "describe": "自驾回家必备",
                        "image": "../../../images/car-necessary.png",
                        "targetUrl":"http://m.baidu.com",  
                        "handleClick":()=>{}  
                    }
                ]
            }
        ]
    }
*/
import React from 'react'
import styles from './index.scss'

//每个小块商品类型信息
const TypeBlock = (props) => (
    <div onClick={()=>props.handleClick(props)} className={styles.typeBlock}>
        <div className={styles.typeTitle}>
            <div 
                className={styles.typeName} 
                style={{color:props.nameColor}}
            >
                {props.name}
            </div>
            <div 
                className={styles.typeDescription}  
                style={{color:props.describeColor}}
            >
                {props.describe}
            </div>
        </div>
        <img src={props.image} className={styles.typeImg}/>
    </div>
)

//每一栏
const TypeItem = (props)=>{
    const { type,adList } = props;
    return(
        <div className={styles.typeItem+" "+styles[type]}>
            {
                adList.length>0 && adList.map((item,index)=>
                    <TypeBlock {...item} key={index}/>
                )
            }
        </div>
    )
}

//分类展示栏组件
const TypeList = (props) => {
    console.log("props",props)
    const list = props.list || [];
    return(
        <div className={styles.typeList}>
            {
                list.length>0 && list.map((item,index)=>
                    <div key={index}>
                        <TypeItem {...item}/>
                        {index!=list.length-1 && <div className={styles.divider}></div>}
                    </div>
                )
            }
        </div>
        
    )
}

export default TypeList