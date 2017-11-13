


var wechat = {
    debug: false,

    /**
     * 分享
     * @param string   share_title
     * @param string   jump_url
     * @param string   img_url
     * @param function callback
     */
    share: function(share_title, jump_url, img_url, callback)
    {
        return {
            title: share_title,
            path: jump_url,
            imageUrl: img_url,
            success: function(result)
            {
                callback(result);
            },
            fail: function(result)
            {
                wechat.log('Error: share->Page.onShareAppMessage', result);
            },
            complete: function (result) {
                // code
            }
        };
    },

    /**
     * 转发按钮
     * @param boolean status
     */
    shareMenu: function(status)
    {
        var self = this;
        if (status) {
            wx.showShareMenu({
                withShareTicket: true,
                success: function(result)
                {
                    // code
                },
                fail: function(result)
                {
                    self.log('Error: shareMenu->wx.showShareMenu', result);
                },
                complete: function(result)
                {
                    // code
                }
            });
        } else {
            self.dump(status);
            wx.hideShareMenu({
                success: function(result)
                {
                    // code
                },
                fail: function(result)
                {
                    self.log('Error: shareMenu->wx.hideShareMenu', result);
                },
                complete: function(result)
                {
                    // code
                }
            });
        }
    },

    /**
     * 获取用户信息
     * @param mixed callback
     */
    getUserInfo: function(callback)
    {
        var self = this,
            userInfo = self.getCache('userInfo');

        if (!userInfo) {
            wx.getUserInfo({
                withCredentials: true,
                success: function(result)
                {
                    self.setCache('userInfo', result.userInfo);
                    callback(result.userInfo);
                },
                fail: function(result)
                {
                    self.log('Error: getUserInfo->wx.getUserInfo', result);
                },
                complete: function(result)
                {
                    // code
                }
            });
        } else {
            callback(userInfo);
        }
    },

    /**
     * 获取用户信息
     * @param function callback
     * @param string   openIdUrl
     */
    getOpenId: function(callback, openIdUrl)
    {
        var self = this,
            openId = self.getCache('openId');

        if (!openId) {
            wx.login({
                success: function(result)
                {
                    // 用code换取openid
                    wx.request({
                        url: openIdUrl,
                        data: {code: result.code},
                        success: function(res)
                        {
                            // 缓存openId
                            self.setCache('openId', res.data.openid);
                            // 缓存sessionKey
                            self.setCache('sessionKey', res.data.session_key);
                            // 缓存unionId
                            if (self.hasVar(res.data.unionid)) {
                                self.setCache('unionId', res.data.unionid);
                            }
                            callback(res.data.openid);
                        },
                        fail: function(res)
                        {
                            self.log('Error: getOpenId->wx.login->wx.request', result);
                        }
                    });
                },
                fail: function(result)
                {
                    self.log('Error: getOpenId->wx.login', result);
                },
                complete: function(result)
                {
                    // code
                }
            });
        } else {
            callback(openId);
        }
    },

    /**
     * 设置缓存
     * @param string key  缓存名
     * @param mixed  data 缓存数据
     */
    setCache: function(key, data)
    {
        try {
            wx.setStorageSync('wechat::' + key, data);
        } catch (e) {
            this.log('Error: setCache->wx.setStorageSync', e);
        }
    },

    /**
     * 获取缓存
     * @param  string key 缓存名
     * @return mixed
     */
    getCache: function(key)
    {
        return wx.getStorageSync('wechat::' + key);
    },

    /**
     * 移除指定缓存
     * @param string key 缓存名
     */
    removeCache: function(key)
    {
        wx.removeStorageSync('wechat::' + key);
    },

    /**
     * 清除所有缓存
     */
    clearCache: function()
    {
        try {
            wx.clearStorageSync();
        } catch(e) {
            this.log('Error: clearCache->wx.clearStorageSync', e);
        }
    },

    /**
     * 调试
     * @param mixed  data 调试输出数据
     */
    bug: function(data)
    {
        console.log('调试', data);
    },

    /**
     * 日志
     * @param string msg  日志信息
     * @param mixed  data 日志输出数据
     */
    log: function(msg, data)
    {
        if (this.debug) {
            console.log('LOG::' + msg, data);
        }
    },

    /**
     * 变量是否存在
     */
    hasVar: function(name, def)
    {
        if (typeof(name) == "undefined") {
            if (typeof(def) == "undefined") {
                return false;
            } else {
                return def;
            }
        } else {
            return name;
        }
    }
}

module.exports = wechat;
