var socket = io(); // Establish a connection

var serchParams = new URLSearchParams(window.location.search);

if (!serchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is necessary');
}

var desktop = serchParams.get('desktop');
var label = $('small');

$('h1').text('Desktop ' + desktop);

$('button').on('click', function() {

    socket.emit('attendTicket', { desktop: desktop }, function(res) {

        if (res === 'No tickets to work') {
            label.text(res);
            alert(res);
            return;
        }

        label.text('Ticket ' + res.number);

    });

});