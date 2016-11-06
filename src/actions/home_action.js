// var ServerPage = require('../script/serverPage');
// var EsQueryPage = require('./../script/esQueryPage');
// var socketService = require('../script/socketService');
// var socketService = new SocketService();

export const LIST_DEVICES = 'LIST_DEVICES';

export function listDevices(listDevices) {
    return {
        type: LIST_DEVICES,
        listDevices
    }
}
