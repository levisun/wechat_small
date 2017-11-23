export default class
{
    constructor()
    {}

    show(_type)
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        if (_type == 'left') {
            that.setData({'ui.popupLeft': true});
        } else {
            that.setData({'ui.popupRight': true});
        }
    }

    clear()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({
            'ui.popupLeft': false,
            'ui.popupRight': false
        });

    }
}
