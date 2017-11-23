
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
            case 'api':
                obj = new Api(Config);
                break;

            case 'Cache':
            case 'cache':
                obj = new Cache(Config);
                break;

            case 'Device':
            case 'device':
                obj = new Device(Config);
                break;

            case 'Interfaces':
            case 'interfaces':
                obj = new Interfaces(Config);
                break;

            case 'Location':
            case 'location':
                obj = new Location(Config);
                break;

            case 'Log':
            case 'log':
                obj = new Log(Config);
                break;

            case 'Media':
            case 'media':
                obj = new Media(Config);
                break;

            case 'Network':
            case 'network':
                obj = new Network(Config);
                break;

            case 'Storage':
            case 'storage':
                obj = new Storage(Config);
                break;

            // 微信小程序Page()方法
            case 'Page':
            case 'page':
            case 'self':
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
