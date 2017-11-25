/**
 * 日志
 */

export default class
{
    debug = false;

    constructor(_config)
    {
        this.debug = _config.debug;
    }

    /**
     * 调试
     * @param mixed _data 调试输出数据
     */
    bug(_data, _module = 'self')
    {
        console.group('Debug');
        console.warn(_module);
        // console.trace();
        if (typeof _data == 'object') {
            for (var key in _data) {
                console.log(key+': ', _data[key]);
            }
        } else {
            console.log(_data);
        }
        console.groupEnd();
    }

    /**
     * 日志
     * @param string _msg  日志信息
     * @param mixed  _data 日志输出数据
     */
    error(_msg, _data)
    {
        if (this.debug) {
            console.group('Error');
            console.error(_msg);
            for (var key in _data) {
                console.log(key+': ', _data[key]);
            }
            console.groupEnd();
        }
        // 缺少日志记录
    }
}
