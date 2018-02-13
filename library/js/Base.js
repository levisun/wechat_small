
const Md5 = require('./Md5');

export default class
{
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
     * 获得变量值
     */
    get(_params)
    {
        let self   = this;
        let string = _params.toString();
        let array  = string.split('.');
        let type   = name = '';

        if (array.length == 2) {
            type = array[0];
            name = array[1];
        } else if (array.length == 1) {
            type = 'page';
            name = array[0];
        } else {
            self.error('Base->get params error 格式：[类型.]名称');
            return ;
        }

        // App
        if (type == 'app') {
            let App = getApp();
            return App['data'][name];
        }

        // 配置
        else if (type == 'config') {
            return this.config[name];
        }

        // ...
        else if (type == 'page') {
            let that = getCurrentPages()[getCurrentPages().length - 1];
            return that['data'][name];
        }
    }

    /**
     * 重定向
     * @param array _params
     * @param func  _callback
     */
    redirect(_params)
    {
        let self = this;

        // 检查请求URL
        if (typeof(_params.url) == 'undefined') {
            self.error('Base->redirect url undefined', _params);
            return ;
        }

        // 未设置跳转方法，默认为跳转非tabBar页面
        if (typeof(_params.method) == 'undefined') {
            _params.method = 'redirect';
        }

        if (_params.method == 'redirect') {
            // 未设置跳转类型，默认为redirectTo
            if (typeof(_params.type) == 'undefined') {
                _params.type = 'redirectTo';
            }

            if (_params.type == 'redirectTo') {
                // 关闭当前页面
                 wx.redirectTo({
                    url: _params.url,
                    fail: function (result)
                    {
                        self.error('Base->redirect::wx.redirectTo', result);
                    }
                });
            } else {
                // 关闭所有页面
                wx.reLaunch({
                    url: _params.url,
                    fail: function (result)
                    {
                        self.error('Base->redirect::wx.reLaunch', result);
                    }
                });
            }
        }

        // 跳转tabBar的页面
        else if (_params.method == 'tap') {
            wx.switchTab({
                url: _params.url,
                fail: function (result)
                {
                    // 输出调试信息
                    self.log(result);
                }
            });
        }

        else if (_params.method == 'navigate') {
            // 未设置跳转类型，默认为to
            if (typeof(_params.type) == 'undefined') {
                _params.type = 'to';
            }

            if (_params.type == 'to') {
                // 跳转非tabBar的页面
                wx.navigateTo({
                    url: _params.url,
                    fail: function (result)
                    {
                        self.error('Base->redirect::wx.navigateTo', result);
                    }
                });
            } else {
                // 未设置返回页面数，默认为1
                if (typeof(_params.delta) == 'undefined') {
                    _params.delta = 1;
                }
                // 返回
                wx.navigateBack({
                    delta: _params.delta,
                    fail: function (result)
                    {
                        self.error('Base->redirect::wx.navigateBack', result);
                    }
                });
            }
        }
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
            self.error('Base->ajax::wx.request url undefined', _params);
            return ;
        }

        // 输出调试信息
        self.log('ajax:'+_params.url, _params.data);

        // 加载提示
        if (typeof(_params.tips) == 'undefined') {
            _params.tips = '加载中...';
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

        // 获得openid、unionid、session_key信息
        self.getOpenId(function(ous){
            // 请求数据追加openid等信息
            _params.data.openid      = ous.openid;
            _params.data.unionid     = ous.unionid;
            _params.data.session_key = ous.session_key;

            // SESSION设置
            if (typeof(ous.sessionid) != 'undefined') {
                _params.data.sessionid = ous.sessionid;
                _params.header.Cookie = 'PHPSESSID=' + ous.sessionid;
            }

            if (typeof(_params.data.formid) == 'undefined') {
                _params.data.formid = 'undefined';
            }

            _params.data.open_id = ous.openid;

            wx.request({
                url:      _params.url,
                data:     _params.data,
                header:   _params.header,
                method:   _params.method,
                dataType: 'json',
                success: function (result)
                {
                    // 缓存数据
                    if (_params.cache) {
                        self.setCache(_params.cache, result);
                    }

                    _callback(result);

                    // 输出调试信息
                    self.log(result);

                    // 隐藏加载提示框
                    setTimeout(function(){wx.hideLoading();}, 700);
                },
                fail: function (result)
                {
                    self.error('Base->ajax::wx.request', result);
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
        let ous  = self.getCache('ous');

        if (!ous) {
            wx.login({
                success: function (login)
                {
                    wx.request({
                        url:      self.config.openid,
                        data:     {code: login.code},
                        header:   {'Content-Type': 'application/x-www-form-urlencoded'},
                        method:   'POST',
                        dataType: 'json',
                        success: function (openid)
                        {
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
                let expire    = timestamp + (this.config.expire * 1000);
                _key          = Md5(_key);

                wx.setStorageSync(_key + '_expire', expire);
                wx.setStorageSync(_key, _data);
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
        if (this.config.cacheOpen) {
            let timestamp = Date.parse(new Date());
            _key          = Md5(_key);

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
            this.log.error('Base->clearCache::wx.clearStorageSync', e);
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
            for (var index in _data) {
                console.log(index+': ', _data[index]);
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
                for (var index in _data) {
                    console.log(index+': ', _data[index]);
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
            for (var index in _data) {
                console.log(index+': ', _data[index]);
            }
            console.groupEnd();
        }
    }
}
