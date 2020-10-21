const fs = require('fs');

class Ticket {

    constructor(number, desktop) {

        this.number = number;
        this.desktop = desktop;

    }

}

class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.rebootCounting();
        }

    }

    rebootCounting() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        console.log('System inicialized');
        this.saveIntoJsonFile();
    }

    nextTicket() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveIntoJsonFile();
        return `Ticket ${this.last}`;

    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No tickets to work'
        }

        let ticketNumber = this.tickets[0].number; // Get first ticket of the array
        this.tickets.shift(); // Delete fisrt number in an array

        let attendTicket = new Ticket(ticketNumber, desktop);

        this.lastFour.unshift(attendTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Delete last one
        }

        console.log('Last Four');
        console.log(this.lastFour);

        this.saveIntoJsonFile();

        return attendTicket;
    }

    saveIntoJsonFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour,
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl,
}