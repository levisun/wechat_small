import Cache from './Cache';
import Log from './Log';

export default class
{
    // 设置
    config = {};

    // 缓存类
    cache = null;
    // 日志类
    log = null;

    constructor(_config)
    {
        this.config = _config;

        this.cache = new Cache(this.config);
        this.log = new Log(this.config);
    }

    getSystemInfo(callback)
    {
        wx.getSystemInfo({
            success: function(result){
                // this.cache.set('system_info', result);
                callback(result);
            }
        });
    }
}
