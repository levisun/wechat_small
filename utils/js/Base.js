/**
 *
 * 微信小程序基础操作类
 *
 * @package   NiPHPCMS
 * @category  utils\js
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @link      www.NiPHP.com
 * @since     2017/12
 */
const Md5 = require('/Md5.js');
const WxPromise = require('/bluebird.core.min.js');

export default class
{
    config = {};

    /**
     * 构造方法
     */
    constructor()
    {
        this.config = require('/../Config.js');

        if (typeof(this.config.appid) == 'undefined') {
            this.error('Base->constructor 未定义APPID[this.config.appid]', this.config);
            return ;
        }
        if (typeof(this.config.appsecret) == 'undefined') {
            this.error('Base->constructor 未定义APPSECRET[this.config.appsecret]', this.config);
            return ;
        }

        // 设定默认值
        if (typeof(this.config.debug) == 'undefined') {
            this.config.debug = false;
        }
        if (typeof(this.config.cache) == 'undefined') {
            this.config.cache = {
                open: true,
                expire: 1140
            };
        }
        if (typeof(this.config.cache.open) == 'undefined') {
            this.config.cache.open = true;
        }
        if (typeof(this.config.cache.expire) == 'undefined') {
            this.config.cache.expire = 1140;
        }

        // 关闭缓存时清空缓存
        if (this.config.cache.open === false) {
            this.clearCache();
        }
    }

    promise(fn)
    {
        return function (obj = {}) {
            return new WxPromise((resolve, reject) => {
                obj.success = function (result) {
                    resolve(result);
                }

                obj.fail = function (result) {
                    resolve(result);
                }

                fn(obj);
            });
        }
    }

    /**
     * 获得用户信息
     */
    getUser()
    {
        var self = this;

        return new WxPromise(function(resolve, reject){
            // 缓存开启，检查缓存是否存在
            var cache_data = self.getCache('user');
            if (cache_data) {
                resolve(cache_data);

                // 输出调试信息
                self.log(cache_data, 'Base->getUser 获得用户信息[缓存]', '返回数据[缓存]');
            } else {
                wx.getUserInfo({
                    withCredentials: true,
                    success: function(result)
                    {
                        self.setCache('user', result.userInfo);

                        // 输出调试信息
                        self.log(result.userInfo, 'Base->getUser 获得用户信息', '返回数据');

                        resolve(result.userInfo);
                    },
                    fail: function(result)
                    {
                        resolve(result);
                    },
                });
            }
        });
    }

    /**
     * 支付请求
     * @param array _params
     * @param func  _callback
     */
    pay(_params)
    {
        var self = this;

        if (typeof(self.config.payment) == 'undefined') {
            this.error('Base->pay 未定义支付URL请求地址[this.config.payment]', self.config);
            return ;
        }

        // 检查支付金额
        if (typeof(_params.amount) == 'undefined') {
            this.error('Base->pay 支付金额未定义[amount]', _params);
            return ;
        }
        return new WxPromise(function(resolve, reject){
            self.request({
                url:    self.config.payment,
                method: 'POST',
                data:   _params
            }).then(function(pay){
                if (typeof(pay.data.paySign) == 'undefined') {
                    self.error('Base->pay 返回参数错误', pay);
                } else {
                    // 发起支付请求
                    wx.requestPayment({
                        timeStamp: pay.data.timeStamp,
                        nonceStr:  pay.data.nonceStr,
                        package:   pay.data.package,
                        signType:  pay.data.signType,
                        paySign:   pay.data.paySign,
                        success: function(result)
                        {
                            resolve(result);
                        },
                        fail: function(result)
                        {
                            self.error('Base->pay::wx.requestPayment', result);
                            resolve(result);
                        }
                    });
                }
            });
        });
    }

    /**
     * request请求
     * @param array _params
     */
    request(_params)
    {
        var self = this;

        // 检查请求URL
        if (typeof(_params.url) == 'undefined') {
            this.error('Base->request::wx.request URL 未定义', _params);
            return ;
        }

        // 加载提示
        this.toast();

        // 检查是否开启缓存
        if (typeof(_params.cache) == 'undefined') {
            _params.cache = false;
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

        // 请求数据
        if (typeof(_params.data) == 'undefined') {
            _params.data = {};
        }

        return new WxPromise(function(resolve, reject){
            var cache_data = false;
            if (_params.cache) {
                var cache_key = '';
                for(var index in _params.data) {
                    cache_key += index;
                    cache_key += _params.data[index];
                }
                var cache_data = self.getCache(_params.url+cache_key);
            }

            if (cache_data) {
                // 输出调试信息
                self.log(_params, 'Base->request 请求参数[缓存]', '请求参数[缓存]');
                self.log(cache_data, 'Base->request 请求返回信息[缓存]', '返回数据[缓存]');

                // 隐藏加载提示框
                self.toast(false);

                resolve(cache_data);
            } else {
                self.getOpenId().then(function(ous){
                    // 请求数据追加openid等信息
                    _params.data.openid      = ous.openid;
                    _params.data.unionid     = ous.unionid;
                    _params.data.session_key = ous.session_key;

                    // 服务器SESSIONID设置
                    if (typeof(ous.sessionid) != 'undefined') {
                        _params.data.sessionid   = ous.sessionid;
                        _params.header.Cookie    = 'PHPSESSID=' + ous.sessionid;
                    } else {
                        self.log(_params.data, '请求参数缺少sessionid,请检查getOpenId()方法返回值');
                    }

                    // formid 用于发送模板信息
                    if (typeof(_params.data.formid) == 'undefined') {
                        _params.data.formid = 'undefined';
                        self.log(_params.data, '请求参数缺少formid', '请求参数缺少值');
                    }

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
                                var cache_key = '';
                                for(var index in _params.data) {
                                    cache_key += index;
                                    cache_key += _params.data[index];
                                }
                                self.setCache(_params.url+cache_key, result);
                            }

                            // 输出调试信息
                            self.log(_params, 'Base->request 请求参数', '请求参数');
                            self.log(result, 'Base->request 请求返回信息', '返回数据');

                            // 隐藏加载提示框
                            self.toast(false);

                            resolve(result);
                        },
                        fail: function (result)
                        {
                            self.error('Base->request::wx.request', result);
                        }
                    });
                })
            }
        });
    }

    /**
     * 获取openID unionId session_key
     * 服务器需要返回sessionid[PHP:session_id();]
     */
    getOpenId()
    {
        var self = this;

        return new WxPromise(function(resolve, reject){
            var ous = self.getCache('_ous');
            if (ous) {
                if (typeof(ous.sessionid) == 'undefined') {
                    self.log(ous, 'Base->getOpenId::wx.login 服务器未返回SESSIONID');
                }
                self.log(ous, 'Base->getOpenId 获得用户OpenId等信息[缓存]', '返回数据[缓存]');

                resolve(ous);
            } else {
                if (typeof(self.config.openid) == 'undefined') {
                    self.error('Base->getOpenId 未定义OPENID请求URL地址[this.config.openid]', self.config);
                } else {
                    wx.login({
                        success: function (login)
                        {
                            wx.request({
                                url:      self.config.openid,
                                data:     {
                                    code: login.code
                                },
                                header:   {'Content-Type': 'application/x-www-form-urlencoded'},
                                method:   'POST',
                                dataType: 'json',
                                success: function (result)
                                {
                                    if (typeof(result.errcode) == 'undefined') {
                                        if (typeof(result.data.sessionid) == 'undefined') {
                                            self.log(result.data, 'Base->getOpenId::wx.login 服务器未返回sessionid', );
                                        }

                                        // 缓存OUS
                                        self.setCache('_ous', result.data);
                                    }

                                    self.log(result.data, 'Base->getOpenId 获得用户OpenId等信息', '返回数据');
                                    resolve(result.data);
                                }
                            })
                        }
                    })
                }
            }
        });
    }

    /**
     * 提示信息
     * @param
     * @param
     */
    toast(_tips = '加载中...', _mask = true)
    {
        if (_tips !== false) {
            // 加载提示
            wx.showLoading({title: _tips, mask: _mask});

            // 请求超时隐藏加载提示框
            setTimeout(function(){wx.hideLoading();}, 30000);
        } else {
            setTimeout(function(){wx.hideLoading();}, 700);
        }
    }

    /**
     * 设置缓存
     * @param string _key  缓存名
     * @param mixed  _data 缓存数据
     */
    setCache(_key, _data)
    {
        if (this.config.cache.open === true) {
            try {
                var timestamp = Date.parse(new Date());
                var expire    = timestamp + (this.config.cache.expire * 1000);
                _key          = Md5(_key);
                wx.setStorageSync(_key + '_expire', expire);
                wx.setStorageSync(_key, _data);
            } catch (e) {
                this.error('Base->setCache::wx.setStorageSync', e);
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
        if (this.config.cache.open === true) {
            var timestamp = Date.parse(new Date());
            _key          = Md5(_key);

            var expire = wx.getStorageSync(_key + '_expire');
            if (expire && expire >= timestamp) {
                return wx.getStorageSync(_key);
            }
        }

        return false;
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
            this.error('Base->clearCache::wx.clearStorageSync', e);
        }
    }

    /**
     * 调试
     * @param mixed _data 调试输出数据
     */
    bug(_data, _module = '自定义调试信息')
    {
        console.group('调试');
        console.warn(_module);
        if (typeof(_data) == 'object') {
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
    log(_data, _module = '请求返回信息', _tit = '信息')
    {
        if (this.config.debug === true) {
            console.group(_tit);
            console.info(_module);
            if (typeof(_data) == 'object') {
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
        console.group('错误');
        console.error(_msg);
        for (var index in _data) {
            console.log(index+': ', _data[index]);
        }
        console.groupEnd();
    }
}
