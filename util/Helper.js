
import Api from './library/Api';
import Cache from './library/Cache';
// import Device from './library/Device';
import Interfaces from './library/Interfaces';
// import Location from './library/Location';
import Log from './library/Log';
// import Media from './library/Media';
import Network from './library/Network';
// import Storage from './library/Storage';

let Config = require('./Config');

let Helper = {
    Config: Config,

    Api: new Api(Config),
    Cache: new Cache(Config),
    // Device: new Device(Config),
    Interfaces: new Interfaces(Config),
    // Location: new Location(Config),
    Log: new Log(Config),
    // Media: new Media(Config),
    Network: new Network(Config)
    // Storage: new Storage(Config)
};

module.exports = Helper;
