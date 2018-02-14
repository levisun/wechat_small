let host = 'https://www.youtuiyou.cn/';

let Config = {
    // 调试
    debug: true,
    cache: {
        open: true,
        expire: 1140,
    },


    // 小程序信息
    appid: 'wxe2ce060d72f9cc70',
    appsecret: '551e54e36c0410b9f231effe9c03b6fe',

    host:    `${host}`,
    openid:  `${host}wxxcx/openid.php`,
    payment: `${host}wxxcx/payment.php`,

};

module.exports = Config;
