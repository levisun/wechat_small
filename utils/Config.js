/**
 *
 * 微信小程序设置
 *
 * @package   NiPHPCMS
 * @category  utils
 * @author    失眠小枕头 [levisun.mail@gmail.com]
 * @copyright Copyright (c) 2013, 失眠小枕头, All rights reserved.
 * @link      www.NiPHP.com
 * @since     2017/12
 */

let Config = {
    // 小程序信息
    appid:     'wxe2ce060d72f9cc70',
    appsecret: '551e54e36c0410b9f231effe9c03b6fe',

    host:    'https://www.youtuiyou.cn/wxxcx/',
    openid:  'https://www.youtuiyou.cn/wxxcx/test_openid.php',
    payment: 'https://www.youtuiyou.cn/wxxcx/payment.php',


    // 调试
    debug: true,

    // 缓存
    cache: {
        open: false,
        expire: 1140,
    },
};

module.exports = Config;
