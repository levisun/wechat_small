export default class
{
    constructor()
    {}

    show()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        let modal = {
            show: true
        };

        that.setData({'ui.modal': modal});
    }

    clear()
    {
        let that = getCurrentPages()[getCurrentPages().length - 1];

        that.setData({'ui.modal.show': false});
    }
}
