/**
 *
 * ??
 *
 * @package   wechat
 * @category  library
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: User.js v1.0.1 $
 * @link      www.NiPHP.com
 * @since     2017/11
 */
import Base from './Base';
export default class extends Base
{
    config = {};

    constructor(_config)
    {
        super(_config);
        this.config = _config;
    }

    /**
     * 获取用户信息
     * @param func _callback
     */
    getUserInfo(_callback)
    {
        let self = this;
        let user_info = self.getCache('user_info');

        if (user_info) {
            _callback(user_info);
        } else {
            wx.getUserInfo({
                withCredentials: true,
                success: function(result)
                {
                    self.setCache('user_info', result.userInfo);
                    _callback(result.userInfo);
                },
                fail: function(result)
                {
                    self.logError('User->getUserInfo::wx.getUserInfo', result);
                },
                complete: function(result)
                {
                    // code
                }
            });
        }
    }

    /**
     * 获取用户openid
     * 基于getOUS方法
     * @param func _callback
     */
    getOpenId(_callback)
    {
        this.getOUS(function(result){
            _callback(result.openid);
        });
    }

    /**
     * 获取用户unionId
     * 基于getOUS方法
     * @param func _callback
     */
    getUnionId(_callback)
    {
        this.getOUS(function(result){
            _callback(result.unionid);
        });
    }

    /**
     * 获取用户session_key
     * 基于getOUS方法
     * @param func _callback
     */
    getSessionKey(_callback)
    {
        this.getOUS(function(result){
            _callback(result.session_key);
        });
    }

    /**
     * 获取openID unionId session_key
     * @params func _callback
     */
    getOUS(_callback)
    {
        let self = this;
        let ous = self.getCache('ous');

        if (ous) {
            _callback(ous);
        } else {
            wx.login({
                success: function(result)
                {
                    wx.request({
                        url: self.config.openid_url,
                        data: {code: result.code},
                        header: {'content-type': 'application/x-www-form-urlencoded'},
                        method: 'POST',
                        dataType: 'json',
                        success: function(res)
                        {
                            if (typeof res.errcode == 'undefined') {
                                // 缓存OUS
                                self.setCache('ous', res.data);
                            }
                            _callback(res.data);
                        },
                        fail: function(res)
                        {
                            self.logError('Base->request::wx.request', res);
                        },
                        complete: function (res) {
                            // code
                        }
                    });
                },
                fail: function(result) {
                    // code...
                },
                complete: function(result) {
                    // code...
                }
            });
        }
    }
}
