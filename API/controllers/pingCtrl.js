const net = require('net');
const serviceCtrl = require('./serviceCtrl');

const servicesPingInterval = 60;

const servicesToPing = {};

module.exports.pingServices = async function() {
    const services = await serviceCtrl.getListServiceForPing();

    if (services !== null) {
        services.forEach(function(service) {
            if (servicesToPing[service.id] === undefined) {
                servicesToPing[service.id] = {
                isSocketOpen: false,
                addressip: service.addressip,
                port: service.port,
                };
            }

            if (servicesToPing[service.id].isSocketOpen === false) {
                const socket = new net.Socket();
                socket.setTimeout(5000);

                socket.on('connect', async function() {
                    await serviceCtrl.updateUptimeToday(service.id, 1);
                    servicesToPing[service.id].isSocketOpen = false;
                    socket.end();
                });
                socket.on('timeout', async function() {
                    await serviceCtrl.updateUptimeToday(service.id, 0);
                    servicesToPing[service.id].isSocketOpen = false;
                    socket.end();
                });
                socket.on('error', async function() {
                    await serviceCtrl.updateUptimeToday(service.id, 0);
                    servicesToPing[service.id].isSocketOpen = false;
                    socket.end();
                });

                socket.connect(servicesToPing[service.id].port, servicesToPing[service.id].addressip);

                servicesToPing[service.id].isSocketOpen = true;
            }
        });
    }

    setTimeout(module.exports.pingServices, servicesPingInterval * 1000);
};
