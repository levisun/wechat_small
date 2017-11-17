
import Log from './Log';

export default class
{
    // 设置
    config = {};
    // 缓存状态
    cache = false;
    // 日志类
    log = null;

    constructor(_config)
    {
        this.config = _config;

        this.cache = _config.cache;

        this.log = new Log(this.config);
    }

    /**
     * 设置缓存
     * @param string _key  缓存名
     * @param mixed  _data 缓存数据
     */
    set(_key, _data)
    {
        if (this.cache) {
            try {
                wx.setStorageSync('wechat::' + _key, _data);
            } catch (e) {
                this.log.error('Cache->set::wx.setStorageSync', e);
            }
        }
    }

    /**
     * 获取缓存
     * @param  string _key 缓存名
     * @return mixed
     */
    get(_key)
    {
        if (this.cache) {
            return wx.getStorageSync('wechat::' + _key);
        } else {
            return false;
        }
    }

    /**
     * 移除指定缓存
     * @param string _key 缓存名
     */
    remove(_key)
    {
        wx.removeStorageSync('wechat::' + _key);
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
