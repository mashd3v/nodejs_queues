var socket = io(); // Establish a connection
var label = $('#lblNewTicket');

socket.on('connect', function() {
    console.log('Server connected');
});

socket.on('disconnect', function() {
    console.log('Server disconnected');
});

socket.on('currentStatus', function(res) {
    label.text(res.current);
})

$('button').on('click', function() {

    socket.emit('nextTicket', null, function(nextTicket) {

        label.text(nextTicket);

    });

});