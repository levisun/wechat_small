/**
 * 开发接口
 */
import Cache from './Cache';
import Log from './Log';
import Network from './Network';

export default class
{
    // 设置
    config = {};

    // 缓存类
    cache = null;
    // 日志类
    log = null;

    constructor(_config)
    {
        this.config = _config;

        this.cache = new Cache(this.config);
        this.log = new Log(this.config);
    }

    /**
     * 登录
     * @param function _callback
     */
    login(_callback)
    {
        let self = this;
        wx.checkSession({
            success: function(result)
            {
                let ous = self.cache.get('ous');
                _callback(ous);
            },
            fail: function(result)
            {
                self.getOUS(_callback);
            },
            complete: function(result)
            {
                // code...
            }
        });
    }

    /**
     * 获取用户信息
     * @param mixed _callback
     */
    getUserInfo(_callback)
    {
        let self = this,
            user_info = self.cache.get('user_info');
        if (!user_info) {
            wx.getUserInfo({
                withCredentials: true,
                success: function(result)
                {
                    self.cache.set('user_info', result.userInfo);
                    _callback(result.userInfo);
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
            _callback(user_info);
        }
    }

    /**
     * 获取用户openid
     * 基于getOUS方法
     * @param function _callback
     */
    getOpenId(_callback)
    {
        let self = this,
            open_id = self.cache.get('open_id');

        if (!open_id) {
            self.getOUS(
                function(result) {
                    _callback(result.openid);
                });
        } else {
            _callback(open_id);
        }
    }

    /**
     * 获取用户unionId
     * 基于getOUS方法
     * @param function _callback
     */
    getUnionId(_callback)
    {
        let self = this,
            union_id = self.cache.get('union_id');

        if (!union_id) {
            self.getOUS(
                function(result) {
                    _callback(result.unionid);
                });
        } else {
            _callback(union_id);
        }
    }

    /**
     * 获取用户session_key
     * 基于getOUS方法
     * @param function _callback
     */
    getSessionKey(_callback)
    {
        let self = this,
            session_key = self.cache.get('session_key');

        if (!session_key) {
            self.getOUS(
                function(result) {
                    _callback(result.session_key);
                });
        } else {
            _callback(session_key);
        }
    }

    /**
     * 获取用户信息加密数据
     * 此数据不可缓存实时获取
     * @param function _callback
     */
    getEncryptedData(_callback)
    {
        let self = this;
        wx.getUserInfo({
            withCredentials: true,
            success: function(result)
            {
                _callback(result);
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
     * @param function _callback
     */
    getOUS(_callback)
    {
        let self = this,
            ous = self.cache.get('ous');
        if (!ous) {
            wx.login({
                success: function(result) {
                    let network = new Network(self.config);
                    network.request({
                        url: self.config.open_id_url,
                        data: {code: result.code}
                    }, function(res){
                        // 缓存open_id
                        self.cache.set('open_id', res.data.openid);
                        // 缓存union_id
                        self.cache.set('union_id', res.data.unionid);
                        // 缓存session_key
                        self.cache.set('session_key', res.data.session_key);
                        // 缓存OUS
                        self.cache.set('ous', res.data);
                        _callback(res.data);
                    });
                },
                fail: function(result) {
                    // code...
                },
                complete: function(result) {
                    // code...
                }
            });
        } else {
            _callback(ous);
        }
    }

    /**
     * 支付
     * 需服务器端
     * @param function _callback
     * @param string   _request_url
     */
    pay(_params, _callback)
    {
        let self = this,
            network = new Network(self.config);

        // 获得用户openid
        self.getOpenId(function(result){
            _params.openid = result;
        });

        network.request({
            url: self.config.payment_url,
            data: _params,
            method: 'POST'
        }, function(result){
            wx.requestPayment({
                timeStamp: result.data.timeStamp,
                nonceStr: result.data.nonceStr,
                package: result.data.package,
                signType: result.data.signType,
                paySign: result.data.paySign,
                success: function(result)
                {
                    _callback(result);
                },
                fail: function(result)
                {
                    self.log.error('Api->pay::wx.requestPayment', _params);
                },
                complete: function(result)
                {
                   // code...
                }
            });
        });
    }

    /**
     * 分享
     * 需配合Page.onShareAppMessage使用
     * 注:按钮使用需加open-type="share"
     * @param object   _params
     * @param function _callback
     */
    share(_params, _callback)
    {
        let self = this;

        if (typeof _params.title == 'undefined') {
            self.log.error('Api->share::wx.onShareAppMessage undefined title', _params);
            return false;
        }

        if (typeof _params.path == 'undefined') {
            self.log.error('Api->share::wx.onShareAppMessage undefined path', _params);
            return false;
        }

        if (typeof _params.desc == 'undefined') {
            _params.desc = '';
        }

        if (typeof _params.img == 'undefined') {
            _params.img = '';
        }

        return {
            title: _params.title,
            desc: _params.desc,
            path: _params.path,
            imageUrl: _params.img,
            success: function(result)
            {
                _callback(result);
            },
            fail: function(result)
            {
                _callback(false);
                self.log.error('Api->share::Page.onShareAppMessage', result);
            },
            complete: function (result) {
                // code
            }
        };
    }
}
