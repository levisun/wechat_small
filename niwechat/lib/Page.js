/**
 *
 */

import Cache from './Cache';
import Log from './Log';

export default class
{
    // 缓存类
    cache = null;
    // 日志类
    log = null;

    constructor(cache = false, debug = false)
    {
        this.cache = new Cache(cache);
        this.log = new Log(debug);
    }

    /**
     * 隐藏消息提示框
     * @param object   params
     * @param function callback
     */
    showToast(params, callback)
    {
        var self = this;

        if (typeof params.title == 'undefined') {
            self.log.error('Page->showToast::wx.showToast undefined title', params);
            return false;
        }

        if (typeof params.icon == 'undefined') {
            params.icon = '';
        }

        if (typeof params.image == 'undefined') {
            params.image = '';
        }

        if (typeof params.duration == 'undefined') {
            params.duration = 1500;
        }

        if (typeof params.mask == 'undefined') {
            params.mask = true;
        }

        wx.showToast({
            title: params.title,
            icon: params.icon,
            image: params.image,
            duration: params.duration,
            mask: params.mask,
            success: function(result)
            {
                callback(result);
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
     * @param string   title
     * @param function callback
     */
    showLoading(title, callback)
    {
        wx.showLoading({
            title: title,
            mask: true,
            success: function(result)
            {
                callback(result);
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
     * @param object   params
     * @param function callback
     */
    showModal(params, callback)
    {
        var self = this;

        if (typeof params.title == 'undefined') {
            self.log.error('Page->showModal::wx.showModal undefined title', params);
            return false;
        }

        if (typeof params.content == 'undefined') {
            self.log.error('Page->showModal::wx.showModal undefined content', params);
            return false;
        }

        if (typeof params.showCancel == 'undefined') {
            params.showCancel = true;
        }

        if (typeof params.cancelText == 'undefined') {
            params.cancelText = '取消';
        }

        if (typeof params.cancelColor == 'undefined') {
            params.cancelColor = '#000000';
        }

        if (typeof params.confirmText == 'undefined') {
            params.confirmText = '确定';
        }

        if (typeof params.confirmColor == 'undefined') {
            params.confirmColor = '#3CC51F';
        }

        wx.showModal({
            title: params.title,
            content: params.content,
            showCancel: params.showCancel,
            cancelText: params.cancelText,
            cancelColor: params.cancelColor,
            confirmText: params.confirmText,
            confirmColor: params.confirmColor,
            success: function(result)
            {
                var status = false;
                if (result.confirm == true) {
                    status = true;
                }
                callback(status);
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
     * @param object   params
     * @param function callback
     */
    menu(params, callback)
    {
        var self = this;

        if (typeof params.itemList == 'undefined') {
            self.log.error('Page->showModal::wx.showModal undefined itemList', params);
            return false;
        }

        if (typeof params.itemColor == 'undefined') {
            params.itemColor = '#000000';
        }

        wx.showActionSheet({
            itemList: params.itemList,
            itemColor: params.itemColor,
            success: function(result)
            {
                callback(result);
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
     * @param string text
     */
    setTopBar(text)
    {
        var self = this;

        wx.setTopBarText({
            text: text,
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
     * @param string title
     */
    setBarTitle(title)
    {
        var self = this;

        wx.setNavigationBarTitle({
            title: title,
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
     * @param string status back|to
     * @param string url_delta
     */
    navigate(status, url_delta = 1)
    {
        var self = this;

        if (status == 'back') {
            wx.navigateBack({
                delta: url_delta,
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
                url: url_delta,
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
     * @param string url
     */
    switchTab(url)
    {
        var self = this;

        wx.switchTab({
            url: url,
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
     * @param string url
     * @param string type redirectTo关闭当前页面,跳转页面  reLaunch关闭所有页面,打开页面
     */
    redirect(url, type = 'redirectTo')
    {
        var self = this;

        if (type == 'redirectTo') {
            wx.redirectTo({
                url: url,
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
                url: url,
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
     * 提示信息
     * @param string title
     * @param string status
     */
    alert(params, callback)
    {
        if (typeof params == 'object' && params.title) {

            var that = getCurrentPages()[getCurrentPages().length - 1];

            if (!params.duration || typeof params.duration != 'number') {
                params.duration = 1500;
            }

            params.isShow = true;

            if (params.duration < 10000) {
                setTimeout(function (){
                    params.isShow = false;
                    callback();
                    that.setData({
                        'showToast.isShow': params.isShow
                    });
                }, params.duration);
            }

            that.setData({
                showToast: params
            });
        } else {
            self.log.error('Api->showMsg:: undefined title', params);
        }
    }
}
