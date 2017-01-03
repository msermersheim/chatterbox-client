// YOUR CODE HERE:
var app = {};
// var message = {
//   username: 'coolguy42',
//   text: 'trolalalala',
//   roomname: 'livejournal'
// };
app.server = 'https://api.parse.com/1/classes/messages';
app.init = function () {
};
app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: message received from server');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};


app.renderMessage = function (message) {
  $('#chats').prepend('<div class="username"> <a href="#' + message.username + '">' + message.username + '</a>' + '<br>' + message.text + '</div>');
};

app.renderRoom = function(roomname) {
  $('#roomSelect').prepend('<option value="' + roomname + '">' + roomname + '</option>');
};

app.handleUsernameClick = function (username) {
  $('.username').on('click', function (username) {

  });
};