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
    constructor(_config)
    {
        super(_config);
    }

    /**
     * Modal 弹出提示框
     */
    showModal(_title, _content)
    {
        this.thatPage.setData({
            'ui.modal.show': true,
            'ui.modal.title': _title,
            'ui.modal.content': _content
        });
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
        this.thatPage.setData({'ui.modal.show': false});
    }

    /**
     * Popup 弹出层
     */
    showPopup(_type)
    {
        if (_type == 'left') {
            this.thatPage.setData({'ui.popupLeft': true});
        } else {
            this.thatPage.setData({'ui.popupRight': true});
        }
    }

    clearPopup()
    {
        this.thatPage.setData({'ui.popupLeft': false, 'ui.popupRight': false});
    }

    /**
     * Toast 轻提示
     */
    showToast(_title, _timeout = 3)
    {
        let self = this;
        let toast = {show: true, title: _title, timeout: _timeout};

        this.thatPage.setData({'ui.toast': toast});

        setTimeout(function (){
            self.thatPage.setData({'ui.toast.show': false});
        }, _timeout * 1000);
    }

    clearToast()
    {
        this.thatPage.setData({'ui.toast.show': false});
    }

    /**
     * 弹出框
     */
    showDialog(_content = '')
    {
        this.thatPage.setData({'ui.dialog.show': true, 'ui.dialog.content': _content});
    }

    clearDialog()
    {
        this.thatPage.setData({'ui.dialog.show': false});
    }

    /**
     * 加载更多
     */
    showLoadmore(_type = 'loading')
    {
        this.thatPage.setData({'ui.loadmore': _type});
    }

    clearLoadmore()
    {
        this.thatPage.setData({'ui.loadmore': 'false'});
    }

    showLoading()
    {

    }
}
