/**
 *
 * 基础类
 * 缓存、调试和错误输出
 *
 * @package   wechat
 * @category  library
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: Base.js v1.0.1 $
 * @link      www.NiPHP.com
 * @since     2017/11
 */
export default class
{
    config = {};

    constructor(_config)
    {
        this.config = _config;
    }

    /**
     * 设置置顶栏文字内容
     * @param string _text
     */
    setTopBar(_text)
    {
        let self = this;

        wx.setTopBarText({
            text: _text,
            success: function(result)
            {
                // code...
            },
            fail: function(result) {
                self.logError('Base->setTopBar::wx.setTopBarText', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 设置当前页面的标题
     * @param string _title
     */
    setBarTitle(_title)
    {
        let self = this;

        wx.setNavigationBarTitle({
            title: _title,
            success: function(result)
            {
                // code...
            },
            fail: function(result) {
                self.logError('Base->setTopBar::wx.setTopBarText', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 设置缓存
     * @param string _key  缓存名
     * @param mixed  _data 缓存数据
     */
    setCache(_key, _data)
    {
        if (this.config.cache) {
            try {
                let timestamp = Date.parse(new Date());
                let expire = timestamp + (this.config.cacheExpire * 1000);
                wx.setStorageSync('wechat_' + _key + '_expire', expire);
                wx.setStorageSync('wechat_' + _key, _data);
            } catch (e) {
                this.log.error('Base->setCache::wx.setStorageSync', e);
            }
        }
    }

    /**
     * 获取缓存
     * @param  string _key 缓存名
     * @return mixed
     */
    getCache(_key)
    {
        if (this.config.cache) {
            let timestamp = Date.parse(new Date());
            let expire = wx.getStorageSync('wechat_' + _key + '_expire');
            if (expire && expire >= timestamp) {
                return wx.getStorageSync('wechat_' + _key);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * 移除指定缓存
     * @param string _key 缓存名
     */
    removeCache(_key)
    {
        wx.removeStorageSync('wechat_' + _key + '_expire');
        wx.removeStorageSync('wechat_' + _key);
    }

    /**
     * 清除所有缓存
     */
    clearCache()
    {
        try {
            wx.clearStorageSync();
        } catch(e) {
            this.log.error('Base->clearCache::wx.clearStorageSync', e);
        }
    }

    /**
     * 调试
     * @param mixed _data 调试输出数据
     */
    bug(_data, _module = 'self')
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
    }

    /**
     * 信息
     * @param mixed _data 输出数据
     */
    logInfo(_module, _data)
    {
        if (this.config.debug) {
            console.group('Info');
            console.info(_module);
            if (typeof _data == 'object') {
                for (var key in _data) {
                    console.log(key+': ', _data[key]);
                }
            } else {
                console.log(_data);
            }
            console.groupEnd();
        }
    }

    /**
     * 错误
     * @param string _msg  日志信息
     * @param mixed  _data 日志输出数据
     */
    logError(_msg, _data)
    {
        if (this.config.debug) {
            console.group('Error');
            console.error(_msg);
            for (var key in _data) {
                console.log(key+': ', _data[key]);
            }
            console.groupEnd();
        }
        // 缺少日志记录
    }
}
