import Vue from 'vue';
import axios from 'axios';
import { registerApplication, start } from 'single-spa';
import { match, getManifest } from './utils/global';
import './utils/init';
let permission = require('./store/app').default;
// 注册
const generateApplication = () => {
    // 注册事件
    window.EventBus = new Vue(); 
    window.EventBus.$on('getRouter', (data) => { 
        window.EventBus.addRoute = data;
    });
    axios.get(window.location.origin + '/project.js?' + new Date().getTime()).then(res => {
        for (let obj of res.data) {
            registerApplication(obj.name, async () => {
                let singleVue = null;
                await getManifest(obj.url + '/manifest.json?' + new Date().getTime(), 'app').then(() => {
                    singleVue = window.singleVue;
                });
                return singleVue;
            }, () => {
                if (obj.base) {
                    return true;
                } else {
                    let res = match(window.location.pathname, obj.path);
                    return res && res.length;
                }
            }, {
                store: permission
            });
        } 
    });
    start();
};   
generateApplication();
