/**
 * 界面
 */
import Log from './Log';

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
     * 隐藏消息提示框
     * @param object   _params
     * @param function _callback
     */
    showToast(_params, _callback)
    {
        let self = this;

        if (typeof _params.title == 'undefined') {
            self.log.error('Page->showToast::wx.showToast undefined title', _params);
            return false;
        }

        if (typeof _params.icon == 'undefined') {
            _params.icon = '';
        }

        if (typeof _params.image == 'undefined') {
            _params.image = '';
        }

        if (typeof _params.duration == 'undefined') {
            _params.duration = 1500;
        }

        if (typeof _params.mask == 'undefined') {
            _params.mask = true;
        }

        wx.showToast({
            title: _params.title,
            icon: _params.icon,
            image: _params.image,
            duration: _params.duration,
            mask: _params.mask,
            success: function(result)
            {
                _callback(result);
            },
            fail: function(result) {
                self.log.error('Page->showToast::wx.showToast', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 隐藏消息提示框
     */
    hideToast()
    {
        wx.hideToast();
    }

    /**
     * 显示加载提示框
     * @param string   _title
     * @param function _callback
     */
    showLoading(_title, _callback)
    {
        wx.showLoading({
            title: _title,
            mask: true,
            success: function(result)
            {
                _callback(result);
            },
            fail: function(result) {
                self.log.error('Page->showLoading::wx.showLoading', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 隐藏加载提示框
     */
    hideLoading()
    {
        wx.hideLoading();
    }

    /**
     * 弹窗
     * @param object   _params
     * @param function _callback
     */
    modal(_params, _callback)
    {
        let self = this;

        if (typeof _params.title == 'undefined') {
            self.log.error('Page->showModal::wx.showModal undefined title', _params);
            return false;
        }

        if (typeof _params.content == 'undefined') {
            self.log.error('Page->showModal::wx.showModal undefined content', _params);
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
                if (result.confirm == true) {
                    status = true;
                }
                _callback(status);
            },
            fail: function(result) {
                self.log.error('Page->showModal::wx.showModal', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 操作菜单
     * @param object   _params
     * @param function _callback
     */
    menu(_params, _callback)
    {
        let self = this;

        if (typeof _params.itemList == 'undefined') {
            self.log.error('Page->showModal::wx.showModal undefined itemList', _params);
            return false;
        }

        if (typeof _params.itemColor == 'undefined') {
            _params.itemColor = '#000000';
        }

        wx.showActionSheet({
            itemList: _params.itemList,
            itemColor: _params.itemColor,
            success: function(result)
            {
                _callback(result);
            },
            fail: function(result) {
                self.log.error('Page->menu::wx.showActionSheet', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 设置置顶栏文字内容
     * @param string _text
     */
    setTopBar(_text)
    {
        let self = this;

        wx.setTopBarText({
            text: _text,
            success: function(result)
            {
                // code...
            },
            fail: function(result) {
                self.log.error('Page->setTopBar::wx.setTopBarText', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 设置当前页面的标题
     * @param string _title
     */
    setBarTitle(_title)
    {
        let self = this;

        wx.setNavigationBarTitle({
            title: _title,
            success: function(result)
            {
                // code...
            },
            fail: function(result) {
                self.log.error('Page->setTopBar::wx.setTopBarText', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 跳转到应用内的某个非tabBar的页面
     * @param string _status back|to
     * @param string _url_delta
     */
    navigate(_status, _url_delta = 1)
    {
        let self = this;

        if (_status == 'back') {
            wx.navigateBack({
                delta: _url_delta,
                success: function(result)
                {
                    // code...
                },
                fail: function(result) {
                    self.log.error('Page->navigate::wx.navigateBack', result);
                },
                complete: function(result) {
                    // code...
                }
            });
        } else {
            wx.navigateTo({
                url: _url_delta,
                success: function(result)
                {
                    // code...
                },
                fail: function(result) {
                    self.log.error('Page->navigate::wx.navigateTo', result);
                },
                complete: function(result) {
                    // code...
                }
            });
        }
    }

    /**
     * 跳转到tabBar页面,并关闭其他所有非tabBar页面
     * @param string _url
     */
    switchTab(_url)
    {
        let self = this;

        wx.switchTab({
            url: _url,
            success: function(result)
            {
                // code...
            },
            fail: function(result) {
                self.log.error('Page->switchTab::wx.switchTab', result);
            },
            complete: function(result) {
                // code...
            }
        });
    }

    /**
     * 跳转非tabBar页面
     * @param string _url
     * @param string _type redirectTo关闭当前页面,跳转页面  reLaunch关闭所有页面,打开页面
     */
    redirect(_url, _type = 'redirectTo')
    {
        let self = this;

        if (_type == 'redirectTo') {
            wx.redirectTo({
                url: _url,
                success: function(result)
                {
                    // code...
                },
                fail: function(result) {
                    self.log.error('Page->redirect::wx.redirectTo', result);
                },
                complete: function(result) {
                    // code...
                }
            });
        } else {
            wx.reLaunch({
                url: _url,
                success: function(result)
                {
                    // code...
                },
                fail: function(result) {
                    self.log.error('Page->redirect::wx.reLaunch', result);
                },
                complete: function(result) {
                    // code...
                }
            });
        }
    }

    /**
     * 自定义提示信息
     * @param string title
     * @param string status
     */
    alert(_params, _callback)
    {
        if (typeof _params == 'object' && _params.title) {

            let that = getCurrentPages()[getCurrentPages().length - 1];

            if (!_params.duration || typeof _params.duration != 'number') {
                _params.duration = 1500;
            }

            _params.isShow = true;

            if (_params.duration < 10000) {
                setTimeout(function (){
                    _params.isShow = false;
                    _callback();
                    that.setData({
                        'showToast.isShow': _params.isShow
                    });
                }, _params.duration);
            }

            that.setData({
                showToast: _params
            });
        } else {
            self.log.error('Api->showMsg:: undefined title', _params);
        }
    }
}
