/**
 *
 * 重定向
 *
 * @package   wechat
 * @category  library
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @version   CVS: $Id: Redirect.js v1.0.1 $
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
     * 跳转到应用内的某个非tabBar的页面
     * @param string _status back|to
     * @param string _url_delta
     */
    navigate(_status, _url_delta = 1)
    {
        let self = this;

        self.logInfo('Redirect->navigate', _status+':'+_url_delta);

        if (_status == 'back') {
            wx.navigateBack({
                delta: _url_delta,
                success: function(result)
                {
                    // code...
                },
                fail: function(result) {
                    self.logError('Page->navigate::wx.navigateBack', result);
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
                    self.logError('Page->navigate::wx.navigateTo', result);
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

        self.logInfo('Redirect->switchTab', _url);

        wx.switchTab({
            url: _url,
            success: function(result)
            {
                // code...
            },
            fail: function(result) {
                self.logError('Page->switchTab::wx.switchTab', result);
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
    redirect(_url, _type = 'reLaunch')
    {
        let self = this;

        self.logInfo('Redirect->redirect', _url+':'+_type);

        if (_type == 'redirectTo') {
            wx.redirectTo({
                url: _url,
                success: function(result)
                {
                    // code...
                },
                fail: function(result) {
                    self.logError('Page->redirect::wx.redirectTo', result);
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
                    self.logError('Page->redirect::wx.reLaunch', result);
                },
                complete: function(result) {
                    // code...
                }
            });
        }
    }
}
