import './ycloud';
import Vue from 'vue';
import YcloudUi, { changeEnvironment, sentry } from 'ycloud-ui';
changeEnvironment({
    IMAGE_DOWNLOAD: process.env.IMAGE_DOWNLOAD,
    SENTRY_DSN: 'http://3bf7e3515a974465840cb02d1cc06149@172.30.32.15:9000/5', // sentry的dsn
    USER_SENTRY: process.env.USER_SENTRY,
    RELEASE: '1.1',
    NODE_ENV: process.env.NODE_ENV, // development时不使用,'production',
    USER_ENVIRONMENT: process.env.USER_ENVIRONMENT // 版本
});
sentry(); // 初始化sentry
Vue.use(YcloudUi);