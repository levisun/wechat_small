/**
 *
 */

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

    /**
     * 登录
     * @param function callback
     * @param string   request_url
     */
    login(callback, request_url = '')
    {
        var self = this;
        wx.checkSession({
            success: function(result)
            {
                var ous = self.cache.get('ous');
                callback(ous);
            },
            fail: function(result)
            {
                self.getOUS(callback, request_url);
            },
            complete: function(result)
            {
                // code...
            }
        });
    }

    /**
     * 获取用户信息
     * @param mixed callback
     */
    getUserInfo(callback)
    {
        var self = this,
            user_info = self.cache.get('user_info');
        if (!user_info) {
            wx.getUserInfo({
                withCredentials: true,
                success: function(result)
                {
                    self.cache.set('user_info', result.userInfo);
                    callback(result.userInfo);
                },
                fail: function(result)
                {
                    self.log.error('Api->getUserInfo::wx.getUserInfo', result);
                },
                complete: function(result)
                {
                    // code
                }
            });
        } else {
            callback(user_info);
        }
    }

    /**
     * 获取用户openid
     * 基于getOUS方法
     * @param function callback
     * @param string   request_url
     */
    getOpenId(callback, request_url = '')
    {
        var self = this,
            open_id = self.cache.get('open_id');

        if (!open_id) {
            self.getOUS(
                function(result) {
                    callback(result.openid);
                },
                request_url
            );
        } else {
            callback(open_id);
        }
    }

    /**
     * 获取用户session_key
     * 基于getOUS方法
     * @param function callback
     * @param string   request_url
     */
    getUnionId(callback, request_url = '')
    {
        var self = this,
            union_id = self.cache.get('union_id');

        if (!union_id) {
            self.getOUS(
                function(result) {
                    callback(result.unionid);
                },
                request_url
            );
        } else {
            callback(union_id);
        }
    }

    /**
     * 获取用户session_key
     * 基于getOUS方法
     * @param function callback
     * @param string   request_url
     */
    getSessionKey(callback, request_url = '')
    {
        var self = this,
            session_key = self.cache.get('session_key');

        if (!session_key) {
            self.getOUS(
                function(result) {
                    callback(result.session_key);
                },
                request_url
            );
        } else {
            callback(session_key);
        }
    }

    /**
     * 获取用户信息加密数据
     * 此数据不可缓存实时获取
     * @param function callback
     */
    getEncryptedData(callback)
    {
        var self = this;
        wx.getUserInfo({
            withCredentials: true,
            success: function(result)
            {
                callback(result);
            },
            fail: function(result)
            {
                self.log.error('Api->getEncryptedData::wx.getUserInfo', result);
            },
            complete: function(result)
            {
                // code
            }
        });
    }

    /**
     * 获取openid unionid session_key
     * 需服务器端调用微信接口使用code返回信息
     * https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
     * @param function callback
     * @param string   request_url
     */
    getOUS(callback, request_url = '')
    {
        var self = this,
            ous = self.cache.get('ous');
        if (!ous) {
            wx.login({
                success: function(result) {
                    if (request_url) {
                        wx.request({
                            url: request_url,
                            data: {code: result.code},
                            success: function(res)
                            {
                                // 缓存open_id
                                self.cache.set('open_id', res.data.openid);
                                // 缓存union_id
                                self.cache.set('union_id', res.data.unionid);
                                // 缓存session_key
                                self.cache.set('session_key', res.data.session_key);
                                // 缓存OUS
                                self.cache.set('ous', res.data);
                                callback(res.data);
                            },
                            fail: function(res)
                            {
                                self.log.error('Api->login::wx.login::wx.request', res);
                            }
                        });
                    } else {
                        callback(result);
                    }
                },
                fail: function(result) {
                    // code...
                },
                complete: function(result) {
                    // code...
                }
            });
        } else {
            callback(ous);
        }
    }

    /**
     * 支付
     * 需服务器端
     * @param function callback
     * @param string   request_url
     */
    // pay(callback)
    // {
    //     wx.requestPayment({
    //         'timeStamp': '',
    //         'nonceStr': '',
    //         'package': '',
    //         'signType': 'MD5',
    //         'paySign': '',
    //         'success': function(result)
    //         {
    //         },
    //         'fail': function(result)
    //         {
    //             // code...
    //         },
    //         'complete': function(result)
    //         {
    //            // code...
    //         }
    //     });
    // }

    /**
     * 分享
     * 需配合Page.onShareAppMessage使用
     * 注:按钮使用需加open-type="share"
     * @param object   params
     * @param function callback
     */
    share(params, callback)
    {
        var self = this;

        if (typeof params.title == 'undefined') {
            self.log.error('Api->share::wx.onShareAppMessage undefined title', params);
            return false;
        }

        if (typeof params.path == 'undefined') {
            self.log.error('Api->share::wx.onShareAppMessage undefined path', params);
            return false;
        }

        if (typeof params.desc == 'undefined') {
            params.desc = '';
        }

        if (typeof params.img == 'undefined') {
            params.img = '';
        }

        return {
            title: params.title,
            desc: params.desc,
            path: params.path,
            imageUrl: params.img,
            success: function(result)
            {
                callback(result);
            },
            fail: function(result)
            {
                callback(false);
                self.log.error('Api->share::Page.onShareAppMessage', result);
            },
            complete: function (result) {
                // code
            }
        };
    }
}
