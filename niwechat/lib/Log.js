/**
 * 日志
 */
export default class
{

    debug = false;

    constructor(debug)
    {
        this.debug = debug;
    }

    /**
     * 调试
     * @param mixed data 调试输出数据
     */
    bug(data)
    {
        console.log('调试', data);
    }

    /**
     * 日志
     * @param string msg  日志信息
     * @param mixed  data 日志输出数据
     */
    error(msg, data)
    {
        if (this.debug) {
            console.log('Error::' + msg, data);
        }
        // 缺少日志记录
    }
}
