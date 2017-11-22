let host = "www.youtuiyou.cn/wxxcx";

let config = {
    // 缓存
    cache: false,
    // 调试
    debug: true,

    // 服务器
    host: `https://${host}/`,
    // 用code换取openId
    open_id_url: `https://${host}/openid.php`,
    // 支付接口
    payment_url: `https://${host}/payment.php`,
    // 登录
    login_url: `https://${host}/login.php`,
    // upload

    // 小程序信息
    appid: 'wxe2ce060d72f9cc70',
    appsecret: '551e54e36c0410b9f231effe9c03b6fe',
};

module.exports = config;
