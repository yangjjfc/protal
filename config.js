/**
 * config 打包配置文件
 * cnd引用相关js,目前公司本地引用外部的cnd,线上环境徐引用公司阿里云环境的,每新加一条cnd需要去阿里云生成相关cnd.js
 */

// 基本cnd,区分环境
let CDN_JS = [ 
    '//at.alicdn.com/t/font_977230_tks3qipwyto.js', // svg 阿里图标
    'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' // 微信登录
];
const CDN_CSS = [
    '//at.alicdn.com/t/font_977230_tks3qipwyto.css' // iconfont
];
let IMAGE_DOWNLOAD = 'http://dfs.dev.cloudyigou.com/dfs/';
let END_URL = 'http://dms.dev.cloudyigou.com';
let ReportURL = 'http://dms-admin.dev.cloudyigou.com';
let USER_SENTRY = false; // 是否启用sentry
let ENVIRONMENT = 'dev'; // 环境
// process.env.NODE_BUILD 区分环境
// if (process.env.NODE_BUILD !== 'online') {
CDN_JS = [...CDN_JS, ...[
    'https://lib.baomitu.com/vue/2.6.10/vue.min.js', // cdn
    'https://lib.baomitu.com/vue-router/3.1.3/vue-router.min.js',
    'https://lib.baomitu.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.bootcss.com/element-ui/2.12.0/index.js',
    'https://lib.baomitu.com/echarts/4.2.1-rc1/echarts-en.common.min.js',
    'https://lib.baomitu.com/jquery/3.3.1/jquery.min.js',
    'https://cdn.bootcss.com/tinymce/4.7.5/tinymce.min.js'
]];
// }
switch (process.env.NODE_BUILD) {
case 'dev': 
    IMAGE_DOWNLOAD = 'http://dfs.dev.cloudyigou.com/dfs/';
    END_URL = 'http://dms.dev.cloudyigou.com';
    ReportURL = '';
    break;  
case 'test': 
    IMAGE_DOWNLOAD = 'http://dfs.test.cloudyigou.com/dfs/';
    END_URL = 'http://dms.test.cloudyigou.com';
    ReportURL = '';
    ENVIRONMENT = 'test';
    break; 
case 'demo': 
    IMAGE_DOWNLOAD = 'http://dms-dfs.yyigou.com/dfs/';
    END_URL = 'http://dms.yyigou.com';
    ReportURL = '';
    USER_SENTRY = false;
    ENVIRONMENT = 'demo';
    break; 
case 'online-test': // 线上测试
    IMAGE_DOWNLOAD = 'http://yhlo-dfs.yyigou.com/dfs/'; // 线上https
    END_URL = 'http://yhlo.yyigou.com'; // 跳转地址
    ReportURL = '';
    USER_SENTRY = false;
    break;
case 'online': // 线上
    IMAGE_DOWNLOAD = 'http://dms-dfs.szyhlo.com/dfs/'; // 线上https
    END_URL = 'http://dms.szyhlo.com '; // 跳转地址
    ReportURL = '';
    USER_SENTRY = false;
    ENVIRONMENT = 'online';
    break;
default: // 开发 测试 演练
    break;
}

module.exports = {
    CDN_JS,
    CDN_CSS,
    IMAGE_DOWNLOAD,
    END_URL,
    ReportURL,
    USER_SENTRY,
    ENVIRONMENT
};
