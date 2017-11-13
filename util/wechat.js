


var wechat = {
    debug: false,
    cache: false,
    api: {
        // 用code换取openId(程序写在服务端)
        // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        openIdUrl: ''
    },

    request: function(req_url, req_data, callback, req_method, req_header, req_data_type)
    {
        req_header = this.hasVar(req_header, {'content-type': 'application/json'});
        req_method = this.hasVar(req_method, 'GET');
        req_data_type = this.hasVar(req_data_type, '');
        wx.request({
            url: req_url,
            data: req_data,
            header: req_header,
            method: req_method,
            dataType: req_data_type,
            success: function(result)
            {
                callback(result);
            },
            fail: function(result)
            {
                wechat.log('Error: request->wx.request', result);
            },
            complete: function (result) {
                // code
            }
        });
    },

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
     * 获取用户信息加密数据
     * 此数据不可写缓存
     * @param function callback
     */
    getEncryptedData: function(callback)
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
                self.log('Error: getRawData->wx.getUserInfo', result);
            },
            complete: function(result)
            {
                // code
            }
        });
    },

    /**
     * 获取用户信息
     * @param mixed callback
     */
    getUserInfo: function(callback)
    {
        var self = this,
            user_info = self.getCache('user_info');

        if (!user_info) {
            wx.getUserInfo({
                withCredentials: true,
                success: function(result)
                {
                    self.setCache('user_info', result.userInfo);
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
     * 获取用户联合ID(微信开放平台)
     * @param mixed callback
     */
    getUnionId: function(callback) {
        var self = this,
            union_id = self.getCache('union_id');
        if (!union_id) {
            self.getOSU(
                function(result) {
                    union_id = result.unionid;
                    // 缓存session_key
                    self.setCache('union_id', result.unionid);
                    callback(union_id);
                },
                self.api.openIdUrl
            );
        } else {
            callback(union_id);
        }
    },

    /**
     * 获取用户session_key
     * @param mixed  callback
     */
    getSessionKey: function(callback) {
        var self = this,
            session_key = self.getCache('session_key');
        if (!session_key) {
            self.getOSU(
                function(result) {
                    session_key = result.session_key;
                    // 缓存session_key
                    self.setCache('session_key', result.session_key);
                    callback(session_key);
                },
                self.api.openIdUrl
            );
        } else {
            callback(session_key);
        }
    },

    /**
     * 获取用户信息
     * @param function callback
     */
    getOpenId: function(callback)
    {
        var self = this,
            open_id = self.getCache('open_id');

        if (!open_id) {
            self.getOSU(
                function(result) {
                    open_id = result.openid;
                    // 缓存open_id
                    self.setCache('open_id', result.openid);
                    callback(open_id);
                },
                self.api.openIdUrl
            );
        } else {
            callback(open_id);
        }
    },

    /**
     * 获取用户openid|session_key|unionid
     * 此数据不可写缓存
     * @param function callback
     */
    getOSU: function(callback)
    {
        var self = this;
        if (!self.api.openIdUrl) {
            self.log('Error: getOSU api.openIdUrl fail invalid url', self.api.openIdUrl);
        }

        wx.login({
            success: function(result)
            {
                // 用code换取openid
                wx.request({
                    url: self.api.openIdUrl,
                    data: {code: result.code},
                    success: function(res)
                    {
                        // 缓存open_id
                        self.setCache('open_id', res.data.openid);
                        // 缓存union_id
                        self.setCache('union_id', res.data.unionid);
                        // 缓存session_key
                        self.setCache('session_key', res.data.session_key);
                        callback(res.data);
                    },
                    fail: function(res)
                    {
                        self.log('Error: getOSU->wx.login->wx.request', result);
                    }
                });
            },
            fail: function(result)
            {
                self.log('Error: getOSU->wx.login', result);
            },
            complete: function(result)
            {
                // code
            }
        });
    },

    /**
     * 设置缓存
     * @param string key  缓存名
     * @param mixed  data 缓存数据
     */
    setCache: function(key, data)
    {
        if (this.cache) {
            try {
                wx.setStorageSync('wechat::' + key, data);
            } catch (e) {
                this.log('Error: setCache->wx.setStorageSync', e);
            }
        }
    },

    /**
     * 获取缓存
     * @param  string key 缓存名
     * @return mixed
     */
    getCache: function(key)
    {
        if (this.cache) {
            return wx.getStorageSync('wechat::' + key);
        } else {
            return '';
        }
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
