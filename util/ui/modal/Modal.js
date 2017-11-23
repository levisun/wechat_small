export default class
{
    constructor()
    {}

    show()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];
        that.setData({'ui.modal.show': true});
    }

    clear()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];
        that.setData({'ui.modal.show': false});
    }
}
