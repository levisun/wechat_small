
const Md5 = require('./Md5');

export default class {
    config = {
        cacheOpen: false,

        requestApi: {
            openid: '',
        },
    }

    /**
     * 构造方法
     */
    constructor(_config)
    {
        this.config = _config;
    }

    /**
     * Ajax请求
     * @param array _params
     * @param func  _callback
     */
    ajax(_params, _callback)
    {
        let self = this;

        // 检查请求URL
        if (typeof(_params.url) == 'undefined') {
            self.error('Request->ajax::wx.request url undefined', _params);
            return ;
        }

        // 输出调试信息
        self.log('ajax:'+_params.url, _params.data);

        // 加载提示
        if (typeof(_params.tips) == 'undefined') {
            _params.tips = '正在拼命加载中...';
        }
        wx.showLoading({title: _params.tips, mask: true});

        // 检查是否开启缓存
        if (typeof(_params.cache) == 'undefined') {
            _params.cache = false;
        }
        // 缓存开启，检查缓存是否存在
        if (_params.cache) {
            let cache_data = self.getCache(_params.cache);
            if (cache_data) {
                // 隐藏加载提示框
                setTimeout(function(){wx.hideLoading();}, 700);

                // 输出调试信息
                self.log(cache_data);

                _callback(cache_data);
                return ;
            }
        }

        // 检查请求类型
        if (typeof(_params.method) == 'undefined') {
            _params.method = 'GET';
        }

        // 请求头信息
        if (_params.method == 'GET') {
            _params.header = {'Content-Type': 'application/json'};
        } else {
            _params.header = {'Content-Type': 'application/x-www-form-urlencoded'};
        }

        // SESSION设置
        let session_id = wx.getStorageSync('wechat_PHPSESSID');
        session_id = session_id ? session_id : true;
        if (session_id !== false) {
            _params.header.Cookie = 'PHPSESSID=' + session_id;
        }

        // 获得openid、unionid、session_key信息
        self.getOpenId(function(ous){
            // 请求数据追加openid等信息
            _params.data.openid      = ous.openid;
            _params.data.unionid     = ous.unionid;
            _params.data.session_key = ous.session_key;
            _params.data.open_id     = ous.openid;

            wx.request({
                url:      _params.url,
                data:     _params.data,
                header:   _params.header,
                method:   _params.method,
                dataType: 'json',
                success: function(result)
                {
                    // 缓存数据
                    if (_params.cache) {
                        self.setCache(_params.cache, result);
                    }
                    // 当有返回session_id时保存数据
                    if (session_id === false && typeof(result.data.session_id) != 'undefined') {
                        wx.setStorageSync('wechat_PHPSESSID', result.data.session_id);
                    }

                    // 隐藏加载提示框
                    setTimeout(function(){wx.hideLoading();}, 700);

                    // 输出调试信息
                    self.log(result);

                    _callback(result);
                },
                fail: function(result)
                {
                    self.error('Request->ajax::wx.request', result);
                },
                complete: function (result) {
                    // code
                }
            });
        });
    }

    /**
     * 获取openID unionId session_key
     * @params func _callback
     */
    getOpenId(_callback)
    {
        let self = this;

        let ous = self.getCache('ous');
        if (!ous) {
            wx.login({
                success: function(login){
                    wx.request({
                        url:      self.config.requestApi.openid,
                        data:     {code: login.code},
                        header:   {'Content-Type': 'application/x-www-form-urlencoded'},
                        method:   'POST',
                        dataType: 'json',
                        success: function(openid){
                            if (typeof(openid.errcode) == 'undefined') {
                                // 缓存OUS
                                self.setCache('ous', openid.data);
                            }
                            _callback(openid.data);
                        }
                    });
                }
            });
        } else {
            _callback(ous);
        }
    }

    /**
     * 设置缓存
     * @param string _key  缓存名
     * @param mixed  _data 缓存数据
     */
    setCache(_key, _data)
    {
        if (this.config.cacheOpen) {
            try {
                let timestamp = Date.parse(new Date());
                let expire = timestamp + (this.config.expire * 1000);
                _key = Md5(_key);
                wx.setStorageSync(_key + '_expire', expire);
                wx.setStorageSync(_key, _data);
            } catch (e) {
                this.log.error('Cache->setCache::wx.setStorageSync', e);
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
        if (this.config.cacheOpen) {
            let timestamp = Date.parse(new Date());
            _key = Md5(_key);
            let expire = wx.getStorageSync(_key + '_expire');
            if (expire && expire >= timestamp) {
                return wx.getStorageSync(_key);
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
        wx.removeStorageSync(_key + '_expire');
        wx.removeStorageSync(_key);
    }

    /**
     * 清除所有缓存
     */
    clearCache()
    {
        try {
            wx.clearStorageSync();
        } catch(e) {
            this.log.error('Cache->clearCache::wx.clearStorageSync', e);
        }
    }

    /**
     * 调试
     * @param mixed _data 调试输出数据
     */
    bug(_data, _module = '自定义调试信息')
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
    log(_data, _module = '自定义输出信息')
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
    error(_msg, _data)
    {
        if (this.config.debug) {
            console.group('Error');
            console.error(_msg);
            for (var key in _data) {
                console.log(key+': ', _data[key]);
            }
            console.groupEnd();
        }
    }
}
