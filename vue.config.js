const PZ = require('./config');
const SentryPlugin = require('@sentry/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/protal/' : '/',
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'element-ui': 'ELEMENT',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'echarts': 'echarts',
            'ycloud-ui': 'YCLOUD'
        }
    },
    productionSourceMap: IS_PRODUCTION && PZ.USER_SENTRY,
    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                args[0].CDN_JS = PZ.CDN_JS;
                args[0].CDN_CSS = PZ.CDN_CSS;
                return args;
            }).end();
        config.plugin('define')
            .tap(definitions => {
                Object.assign(definitions[0]['process.env'], {
                    IMAGE_DOWNLOAD: '"' + PZ.IMAGE_DOWNLOAD + '"',
                    ReportURL: '"' + PZ.ReportURL + '"',
                    END_URL: '"' + PZ.END_URL + '"',
                    USER_SENTRY: PZ.USER_SENTRY,
                    USER_ENVIRONMENT: '"' + PZ.ENVIRONMENT + '"'
                });
                return definitions;
            });
        if (IS_PRODUCTION) {
            config
                .plugin('compression')
                .use(CompressionPlugin, {
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    cache: true
                })
                .tap(args => { });
        }
        // 后期开启
        if (PZ.USER_SENTRY && IS_PRODUCTION) {
            // config
            //     .plugin('webpack-bundle-analyzer')
            //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            //     .end();
            config.plugin('sentry').use(SentryPlugin, [{
                ignore: ['node_modules'],
                include: './dist', // 上传dist文件的js
                configFile: './.sentryclirc', // 配置文件地址
                release: '1.1', // 版本号
                environment: PZ.ENVIRONMENT,
                deleteAfterCompile: true
            }]);
        }
    },
    devServer: {
        port: 9000,
        proxy: {
            '/gateway': {
                target: 'http://dms-admin.dev.cloudyigou.com',
                changeOrigin: true
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    }
};