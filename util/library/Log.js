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
        console.info(_module+'::DEBUG', _data);
    }

    /**
     * 日志
     * @param string _msg  日志信息
     * @param mixed  _data 日志输出数据
     */
    error(_msg, _data)
    {
        if (this.debug) {
            console.warn('Error::' + _msg, _data);
        }
        // 缺少日志记录
    }
}
