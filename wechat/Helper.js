let Config = require('./Config');

import Interact from './library/Interact';
import Redirect from './library/Redirect';
import Request from './library/Request';
import User from './library/User';

import Ui from './library/Ui';

let Helper = {
    class: function(_name)
    {
        let obj;

        switch (_name) {
            case 'interact':
                obj = new Interact(this.config);
                break;

            case 'redirect':
                obj = new Redirect(this.config);
                break;

            case 'request':
                obj = new Request(this.config);
                break;

            case 'user':
                obj = new User(this.config);
                break;

            case 'ui':
                obj = new Ui(this.config);
                break;
        }

        return obj;
    },

    getData: function(_name, _result = {})
    {
        let string = _name.toString();
        let array = string.split('.');

        let var_type = array[0];
        let var_name = array[1];

        // App
        if (var_type == 'app') {
            let App = getApp();
            return App['data'][var_name];
        }

        // Page
        // else if (var_type == 'self') {
        //     let that = getCurrentPages()[getCurrentPages().length - 1];
        //     return that['data'][var_name];
        // }

        // 配置
        else if (var_type == 'config') {
            return this.config[var_name];
        }

        // 绑定事件
        else if (var_type == 'bind') {
            return _result['currentTarget']['dataset'][var_name];
        }

        // 返回
        else if (var_type == 'rec') {
            return _result['data'][var_name];
        }
    },

    /**
     * 不建议使用
     * 微信小程序Page()方法
     */
    setData: function(_params)
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];
        that.setData(_params);
    },

    /**
     * 调试
     */
    bug: function(_data, _module = 'self')
    {
        console.group('Debug');
        console.warn(_module);
        if (typeof _data == 'object') {
            for (var key in _data) {
                console.log(key+': ', _data[key]);
            }
        } else {
            console.log(_data);
        }
        console.groupEnd();
    },

    // 配置
    config: Config
}

module.exports = Helper;
