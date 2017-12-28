/**
 * 启动项目：npm start -- --project=项目名称
 * 打包项目：npm run build -- --project=项目名称
 */

/**
 * 配置信息
 */
var appConfig = require('./config/app-config');
var alipayConfig = require('./config/alipay-config');
var qqConfig = require('./config/qq-config');
var weixinConfig = require('./config/weixin-config');
var allConfig = require('./config/all-config');

var websConfig = {
	default: {
		name: 'allDefault',
		title: ' ',
		port: 7000,
		outputPath: 'dist',
		description: '多渠道||APP、微信、支付宝、QQ',
		publicPath: '',
		script: {
			onerror: "networkError('./images/networkError-icon.png')",
		}
	}

	//请不要直接在这里配置项目的信息，项目应该配置到对应的平台项目中
}

Object.assign(websConfig, appConfig, alipayConfig, qqConfig, weixinConfig, allConfig); //合并配置文件到websConfig中

/**
 * 获取传递过来参与
 */
const get_argv = (name = '') => {
	var argv;
	var config;
	try {
		argv = JSON.parse(process.env.npm_config_argv).original;
	}
	catch (ex) {
		argv = process.argv;
		console.log("ERROR: Not NPM")
	}
	for (var i = 0; i < argv.length; i++) {
		if (argv[i].indexOf("--" + name + "=") === 0) {
			config = argv[i].substr(name.length + 3);
		}
	}
	console.log("配置信息：", config, argv)
	return config;
}

/**
 * 返回指定项目的配置信息
 */
var webConfig = websConfig[get_argv('project')] || websConfig['default']
var startPath = get_argv('startPath');
webConfig.startPath = startPath ? '/' + startPath : '';
console.log("webConfig:", webConfig)
module.exports = webConfig