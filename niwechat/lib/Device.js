import Cache from './Cache';
import Log from './Log';

export default class
{
    // 缓存类
    cache = null;
    // 日志类
    log = null;

    constructor(cache = false, debug = false)
    {
        this.cache = new Cache(cache);
        this.log = new Log(debug);
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
