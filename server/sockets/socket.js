const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const { on } = require('nodemon');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let next = ticketControl.nextTicket();

        console.log(next);
        callback(next);

    });

    client.emit('currentStatus', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour(),
    });

    client.on('attendTicket', (data, callback) => {

        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Desktop is necessary',
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);

        callback(attendTicket);

        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFour(),
        });

    });

});