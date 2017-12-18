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

    showDialog(_params)
    {
        this.thatPage({
            uiDialog: {
                show: true,
                title: _params.title,
                content: _params.content,
                buttonsShowVertical: _params.buttonsShow,
                buttons: _params.buttons
            }
        });
    }




}
