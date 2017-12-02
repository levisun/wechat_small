/**
 *
 * Ui互动
 *
 * @package   wechat
 * @category  library
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: Ui.js v1.0.1 $
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
     * Modal 弹出框
     */
    showModal()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];
        that.setData({'ui.modal.show': true});
    }

    btnModal(_result)
    {
        let type = _result['currentTarget']['dataset']['type'];
        if (type == 'cancel') {
            this.clearModal();
            return false;
        } else {
            return true;
        }
    }

    clearModal()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];
        that.setData({'ui.modal.show': false});
    }

    /**
     * Popup 弹出层
     */
    showPopup(_type)
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        if (_type == 'left') {
            that.setData({'ui.popupLeft': true});
        } else {
            that.setData({'ui.popupRight': true});
        }
    }

    clearPopup()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({
            'ui.popupLeft': false,
            'ui.popupRight': false
        });
    }

    /**
     * Toast 轻提示
     */
    showToast(_title, _timeout = 1500)
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        let toast = {
            show: true,
            title: _title,
            timeout: _timeout
        };

        that.setData({'ui.toast': toast});

        setTimeout(function (){
            that.setData({
                'ui.toast.show': false
            });
        }, _timeout);
    }

    clearToast()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({'ui.toast.show': false});
    }

    showDialog(_content = '')
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({'ui.dialog.show': true, 'ui.dialog.content': _content});
    }

    clearDialog()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({'ui.dialog.show': false});
    }
}
