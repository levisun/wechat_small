/**
 *
 * 助手类
 *
 * @package   wechat_small
 * @category  util
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: Helper.js v1.0.1 $
 * @link      www.NiPHP.com
 * @since     2017/11
 */
import Api from './library/Api';
import Cache from './library/Cache';
// import Device from './library/Device';
import Interfaces from './library/Interfaces';
// import Location from './library/Location';
import Log from './library/Log';
// import Media from './library/Media';
import Network from './library/Network';
// import Storage from './library/Storage';

import UI_Modal from './ui/js/Modal';
import UI_Popup from './ui/js/Popup';
import UI_Toast from './ui/js/Toast';

let Config = require('./Config');

let Helper = {
    // 配置
    Config: Config,

    // 获得变量
    input: function(_result, _type = '')
    {
        let val;

        if (_type == 'input') {
            val = _result.datail.value;
        } else if (_type == 'rec') {
            // 返回变量
            val = _result.data;
        } else {
            // 点击页面变量
            val = _result.currentTarget.dataset;
        }

        return val;
    },

    // API方法
    class: function(_name)
    {
        let obj;

        switch (_name) {
            case 'Api':
                obj = new Api(Config);
                break;

            case 'Cache':
                obj = new Cache(Config);
                break;

            case 'Device':
                obj = new Device(Config);
                break;

            case 'Interfaces':
                obj = new Interfaces(Config);
                break;

            case 'Location':
                obj = new Location(Config);
                break;

            case 'Log':
                obj = new Log(Config);
                break;

            case 'Media':
                obj = new Media(Config);
                break;

            case 'Network':
                obj = new Network(Config);
                break;

            case 'Storage':
                obj = new Storage(Config);
                break;

            // 微信小程序Page()方法
            case 'Page':
                obj = getCurrentPages()[getCurrentPages().length - 1];
                break;

            default:
                // code...
                break;
        }

        return obj;
    },

    // UI方法
    ui: function(_name)
    {
        let obj;
        switch (_name) {
            case 'Modal':
            case 'modal':
                obj = new UI_Modal();
                break;

            case 'Popup':
            case 'popup':
                obj = new UI_Popup();
                break;

            case 'Toast':
            case 'toast':
                obj = new UI_Toast();
                break;

            default:
                // code...
                break;
        }

        return obj;
    }
};

module.exports = Helper;
