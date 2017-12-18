/**
 *
 * 网络请求
 *
 * @package   wechat
 * @category  library
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: Request.js v1.0.1 $
 * @link      www.NiPHP.com
 * @since     2017/11
 */
import Base from './Base';
export default class extends Base
{
    constructor(_config)
    {
        super(_config);
    }

    /**
     * GET请求
     * @param array _params
     * @param func  _callback
     * @param boll  _cache
     */
    get(_params, _callback, _cache = false)
    {
        let self = this;

        self.logInfo('GET:'+_params.url, _params.data);

        if (_cache) {
            let cache_data = self.getCache(_cache);
            if (cache_data) {
                self.logInfo(cache_data);
                _callback(cache_data);
                return ;
            }
        }

        wx.request({
            url:      _params.url,
            data:     _params.data,
            header:   {'Content-Type': 'application/json'},
            method:   'GET',
            dataType: 'json',
            success: function(result)
            {
                if (_cache) {
                    self.setCache(_cache, result);
                }
                self.logInfo(result);
                _callback(result);
            },
            fail: function(result)
            {
                self.logError('Request->get::wx.request', result);
            },
            complete: function (result) {
                // code
            }
        });
    }

    /**
     * POST请求
     * @param array _params
     * @param func  _callback
     * @param boll  _cache
     */
    post(_params, _callback, _cache = false)
    {
        let self = this;

        self.logInfo('POST:'+_params.url, _params.data);

        if (_cache) {
            let cache_data = self.getCache(_cache);
            if (cache_data) {
                self.logInfo(cache_data);
                _callback(cache_data);
                return ;
            }
        }

        wx.request({
            url:      _params.url,
            data:     _params.data,
            header:   {'Content-Type': 'application/x-www-form-urlencoded'},
            method:   'POST',
            dataType: 'json',
            success: function(result)
            {
                if (_cache) {
                    self.setCache(_cache, result);
                }
                self.logInfo(result);
                _callback(result);
            },
            fail: function(result)
            {
                self.logError('Request->post::wx.request', result);
            },
            complete: function (result) {
                // code
            }
        });
    }

    /**
     * 下拉刷新请求
     * @param array _params
     * @param func  _callback
     */
    downRefresh(_params, _callback)
    {
        let self = this;

        wx.showLoading({title: '', mask: true});

        self.logInfo('downRefresh:'+_params.url, _params.data);

        if (typeof _params.method == 'undefined') {
            _params.method = 'POST';
        }

        if (_params.method == 'GET') {
            _params.header = {'Content-Type': 'application/json'};
        } else {
            _params.header = {'Content-Type': 'application/x-www-form-urlencoded'};
        }

        wx.request({
            url:      _params.url,
            data:     _params.data,
            header:   {'Content-Type': 'application/x-www-form-urlencoded'},
            method:   _params.method,
            dataType: 'json',
            success: function(result)
            {
                self.logInfo(result);
                _callback(result);

                wx.hideLoading();
                wx.stopPullDownRefresh();
            },
            fail: function(result)
            {
                self.logError('Request->downRefresh::wx.request', result);
            },
            complete: function (result) {
                // code
            }
        });
    }

    /**
     * 支付请求
     * 需服务器端支持
     * @param array    _params
     * @param function _callback
     */
    payment(_params, _callback)
    {
        let self = this;

        self.logInfo('payment:'+_params.url, _params);

        this.post({
            url:  _params.url,
            data: _params,
        }, function(result){
            wx.requestPayment({
                timeStamp: result.data.timeStamp,
                nonceStr:  result.data.nonceStr,
                package:   result.data.package,
                signType:  result.data.signType,
                paySign:   result.data.paySign,
                success: function(result)
                {
                    _callback(result);
                },
                fail: function(result)
                {
                    self.logError('Request->payment::wx.requestPayment[result]', result);
                },
                complete: function(result)
                {
                   // code...
                }
            });
        });
    }
}
