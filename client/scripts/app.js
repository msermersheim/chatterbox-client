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
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: message received from server', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };


  $(document).ready(function() {
    app.clearMessages = function () {
      $('#chats').empty();
    };

    app.renderMessage = function (message) {
      $('#chats').prepend('<div class="username" id="' + message.username + '">' + message.username + '</a>' + '<br>' + message.text + '</div>');
      $('.username').on('click', function () {
        //console.log('These arent the droids youre looking for.');
        app.handleUsernameClick();
      });
    };

    app.renderRoom = function(roomname) {
      $('#roomSelect').append('<option value="' + roomname + '"' + 'id="' + roomname + '">' + roomname + '</option>');
    };

    app.handleUsernameClick = function () {
      console.log('These arent the droids youre looking for.');
    };

    app.handleSubmit = function () {
      var message = {};
      message.username = window.location.search.slice(10);
      message.text = document.getElementById('messageForm').value;
      var roomSelectIndex = document.getElementById('roomSelect').selectedIndex;
      message.roomname = document.getElementById('roomSelect').options[roomSelectIndex].value;
      app.send(message);
      app.renderMessage(message);
    };

    $('.submit').on('click', function() {
      app.handleSubmit();
    });

    $('#createRoomButton').on('click', function() {
      var roomname = prompt('Enter your desired roomname');
      console.log(roomname);
      if (roomname !== null) {
        app.renderRoom(roomname);
      }
    });
    
  });


