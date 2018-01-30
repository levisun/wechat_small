let Config = require('./Config');

import Base from './js/Base';

/**
切换
_toggle

操作
_handle

监听
_monitor
 */

let Helper = {
    // 配置
    config: Config,

    /**
     * 设置配置数据
     */
    setConfig: function(_config)
    {
        this.config = _config;
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

    class: function ()
    {
        let object = new Base(this.config);
        return object;
    },
};

module.exports = Helper;
