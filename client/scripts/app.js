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

  app.fetch = function (roomname) {
    var roomnameConstraint = "'where'={\"roomname\": \"" + roomname + "\"}'";
    // console.log("fetch string", roomnameConstraint);
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: 'order=-createdAt', 
      data: roomnameConstraint,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: message received from server', data);
        $('#chats').empty();
        var roomnameArray = []; //stores unique roomnames;
        for (var i = data.results.length - 1; i >= 0; i--) {
          //console.log(data.results[i]);
          app.renderMessage(data.results[i]);
          if (roomnameArray.indexOf(data.results[i].roomname) < 0) {
            roomnameArray.push(data.results[i].roomname);
            app.renderRoom(data.results[i].roomname);
          }
        }
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
      var messageName = escapeHtml(message.username);
      var messageText = escapeHtml(message.text);
      var messageRoom = escapeHtml(message.roomname);
      $('#chats').prepend('<div class="username ' + messageRoom + '" value="dogecoin">' + '<b>' + messageName + '</b>' + '<br>' + messageText + '</div>');
      $('.username').on('click', function () {
        //console.log('These arent the droids youre looking for.');
        //console.log($('this').val());
        app.handleUsernameClick();
      });
    };

    app.renderRoom = function(roomname) {
      $('#roomSelect').append('<option value="' + roomname + '"' + 'class="' + roomname + '">' + roomname + '</option>');
    };

    app.handleUsernameClick = function () {
      //console.log('These arent the droids youre looking for.');
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

    $('#loadMessageButton').on('click', function () {
      app.fetch();
      console.log('hahahah');
    });
    
    $('#roomSelect').on('change', function () {
      var roomSelectIndex = document.getElementById('roomSelect').selectedIndex;
      var specificRoomname = document.getElementById('roomSelect').options[roomSelectIndex].value.toString();
      console.log(specificRoomname);
      $('#roomSelect ')      
    });

  });

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
  };

  var escapeHtml = function (string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  };







