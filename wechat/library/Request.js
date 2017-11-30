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
    config = {};

    constructor(_config)
    {
        super(_config);
        this.config = _config;
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
            let data = self.getCache(_cache);
            if (data) {
                _callback(data);
                return ;
            }
        }

        wx.request({
            url: _params.url,
            data: _params.data,
            header: {},
            method: 'GET',
            dataType: 'json',
            success: function(result)
            {
                if (_cache) {
                    self.setCache(_cache, result);
                }
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
            let data = self.getCache(_cache);
            if (data) {
                _callback(data);
                return ;
            }
        }

        wx.request({
            url: _params.url,
            data: _params.data,
            header: {'content-type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            dataType: 'json',
            success: function(result)
            {
                if (_cache) {
                    self.setCache(_cache, result);
                }
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
}
