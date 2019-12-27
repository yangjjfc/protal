import axios from 'axios';

/**
 * 匹配字符串
 * @param {*需要匹配的内容} content 
 * @param {*匹配的正则,数组} arrReg []
 */
export const match = (content, arrReg) => {
    let arr = [];
    arrReg = arrReg.split(',');
    arrReg.forEach(item => {
        let reg = new RegExp(item),
            res = content.match(reg);
        if (res && res.length) {
            arr.push(res[0]);
        }
    });
    return arr;
};

/*
* runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
*/
export const runScript = async (url) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
});

/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* 
*/
export const getManifest = (url, bundle) => new Promise(async (resolve) => {
    const { data } = await axios.get(url);
    const { entrypoints, publicPath } = data;
    const assets = entrypoints[bundle].assets;
    for (let i = 0; i < assets.length; i++) {
        await runScript(publicPath + assets[i]).then(() => {
            if (i === assets.length - 1) {
                resolve();
            }
        });
    }
});