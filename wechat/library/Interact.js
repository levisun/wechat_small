/**
 *
 * 互动
 *
 * @package   wechat
 * @category  library
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: Interact.js v1.0.1 $
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
     * 弹窗
     * @param object _params
     * @param func   _callback
     */
    modal(_params, _callback)
    {
        let self = this;

        if (typeof _params.title == 'undefined') {
            self.logError('Interact->modal::wx.showModal undefined title', _params);
            return false;
        }

        if (typeof _params.content == 'undefined') {
            self.logError('Interact->modal::wx.showModal undefined content', _params);
            return false;
        }

        if (typeof _params.showCancel == 'undefined') {
            _params.showCancel = true;
        }

        if (typeof _params.cancelText == 'undefined') {
            _params.cancelText = '取消';
        }

        if (typeof _params.cancelColor == 'undefined') {
            _params.cancelColor = '#000000';
        }

        if (typeof _params.confirmText == 'undefined') {
            _params.confirmText = '确定';
        }

        if (typeof _params.confirmColor == 'undefined') {
            _params.confirmColor = '#3CC51F';
        }

        self.logInfo('Interact->modal', _params);

        wx.showModal({
            title: _params.title,
            content: _params.content,
            showCancel: _params.showCancel,
            cancelText: _params.cancelText,
            cancelColor: _params.cancelColor,
            confirmText: _params.confirmText,
            confirmColor: _params.confirmColor,
            success: function(result)
            {
                var status = false;
                if (result.confirm === true) {
                    status = true;
                }
                _callback(status);
            },
            fail: function(result) {
                self.logError('Interact->modal::wx.showModal', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 转发分享
     * 需配合Page.onShareAppMessage使用
     * 注:按钮使用需加open-type="share"
     * @param object _params
     * @param func   _callback
     */
    share(_params, _callback)
    {
        let self = this;

        if (typeof _params.title == 'undefined') {
            self.logError('Interact->share::wx.onShareAppMessage undefined title', _params);
            return false;
        }

        if (typeof _params.path == 'undefined') {
            self.logError('Interact->share::wx.onShareAppMessage undefined path', _params);
            return false;
        }

        if (typeof _params.img == 'undefined') {
            _params.img = '';
        }

        self.logInfo('Interact->share', _params);

        return {
            title: _params.title,
            path: _params.path,
            imageUrl: _params.img,
            success: function(result)
            {
                _callback(true);
            },
            fail: function(result)
            {
                _callback(false);
                self.logInfo('Interact->share::Page.onShareAppMessage', result);
            },
            complete: function (result) {
                // code
            }
        };
    }
}
