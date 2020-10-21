var socket = io(); // Establish a connection

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblDesktop1');
var lblDesktop2 = $('#lblDesktop2');
var lblDesktop3 = $('#lblDesktop3');
var lblDesktop4 = $('#lblDesktop4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('currentStatus', function(data) {
    updateHTML(data.lastFour);
});

socket.on('lastFour', function(data) {
    var audio = new Audio('../../audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.lastFour);
});

function updateHTML(lastFour) {

    for (var i = 0; i <= lastFour.length - 1; i++) {

        lblTickets[i].text('Ticket ' + lastFour[i].number);
        lblDesktops[i].text('Desktop ' + lastFour[i].desktop);

    }

}