import Log from './Log';

export default class
{
    // 缓存状态
    cache = false;
    // 日志类
    log = null;

    constructor(cache = false, debug = false)
    {
        this.cache = cache;
        this.log = new Log(debug);
    }

    /**
     * 设置缓存
     * @param string key  缓存名
     * @param mixed  data 缓存数据
     */
    set(key, data)
    {
        if (this.cache) {
            try {
                wx.setStorageSync('wechat::' + key, data);
            } catch (e) {
                this.log.error('Cache->set::wx.setStorageSync', e);
            }
        }
    }

    /**
     * 获取缓存
     * @param  string key 缓存名
     * @return mixed
     */
    get(key)
    {
        if (this.cache) {
            return wx.getStorageSync('wechat::' + key);
        } else {
            return false;
        }
    }

    /**
     * 移除指定缓存
     * @param string key 缓存名
     */
    remove(key)
    {
        wx.removeStorageSync('wechat::' + key);
    }

    /**
     * 清除所有缓存
     */
    clear()
    {
        try {
            wx.clearStorageSync();
        } catch(e) {
            this.log.error('Cache->clear::wx.clearStorageSync', e);
        }
    }
}
