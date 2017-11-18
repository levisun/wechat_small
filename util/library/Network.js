/**
 * 网络
 */
import Log from './Log';
import Interfaces from './Interfaces';

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

        this.log = new Log(this.config);
    }

    /**
     * 网络请求
     * @param object   _params
     * @param function _callback
     */
    request(_params, _callback)
    {
        let self = this;

        if (typeof _params.url == 'undefined') {
            self.log.error('Network->request::wx.request undefined url', _params);
            return false;
        }

        if (typeof _params.data == 'undefined') {
            _params.data = {};
        }

        if (typeof _params.header == 'undefined') {
            _params.header = {};
        }

        if (typeof _params.method == 'undefined') {
            _params.method = 'GET';
        }

        if (typeof _params.dataType == 'undefined') {
            _params.dataType = 'json';
        }

        if (_params.method == 'POST') {
            _params.header = {'content-type': 'application/x-www-form-urlencoded'};
        }

        wx.request({
            url: _params.url,
            data: _params.data,
            header: _params.header,
            method: _params.method,
            dataType: _params.dataType,
            success: function(result)
            {
                _callback(result);
            },
            fail: function(result)
            {
                self.log.error('Network->request::wx.request', result);
            },
            complete: function (result) {
                // code
            }
        });
    }

    loadingMore(_params, _callback)
    {
        let self = this,
            interfaces = new Interfaces(self.config.cache, self.config.debug),
            that = getCurrentPages()[getCurrentPages().length - 1];

        if (typeof _params.loading == 'undefined') {
            self.log.error('Page->loadingMore undefined loading', _params);
            return false;
        }

        if (typeof _params.page == 'undefined') {
            self.log.error('Page->loadingMore undefined page', _params);
            return false;
        }

        if (typeof _params.url == 'undefined') {
            self.log.error('Page->loadingMore undefined url', _params);
            return false;
        }

        if (_params.loading == 'true') {
            that.setData({
                loading: 'false'
            });

            interfaces.showLoading('正在玩命加载中...', function(){});
            self.request({
                url: _params.url,
                data: {page: _params.page}
            }, function(result){
                if (result.data) {
                    _callback(result);

                    setTimeout(function(){
                        interfaces.hideLoading();
                        that.setData({
                            loading: 'true',
                            page: ++_params.page
                        });
                    }, 1500);
                }
            });
        }
    }
}
