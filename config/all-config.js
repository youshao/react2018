/**
 * 混合项目配置文件
 * 如果项目同时在两个或以上平台运行的话，那么则将项目的配置信息写在本配置文件中
 */

var allConfig = {

	//全渠道默认项目
	allDefault: {
		name: 'allDefault',
		title: ' ',
		port: 7000,
		outputPath: 'dist',
		description: '多渠道||APP、微信、支付宝、QQ',
		publicPath: '',
		script: {
			onerror: "networkError('./images/networkError-icon.png')",
		}
	},
}

module.exports = allConfig