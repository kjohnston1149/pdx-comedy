// Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '474937019011-ck824t8cts8ls81hovh552nn10oovlgd.apps.googleusercontent.com';

    var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

    $.getScript("https://apis.google.com/js/client.js?onload=checkAuth", function() {
    }).then(function handleAuthClick() {
       gapi.auth.authorize(
         {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
         handleAuthResult);
       return false;
    });

    /**
     * Check if current user has authorized this application.
     */
    function checkAuth() {
      gapi.auth.authorize(
        {
          'client_id': CLIENT_ID,
          'scope': SCOPES.join(' '),
          'immediate': true
        }, handleAuthResult);
    }
    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
      var authorizeDiv = document.getElementById('authorize-div');
      if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadCalendarApi();
      } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
      }
    }

    function loadCalendarApi() {
      gapi.client.load('calendar', 'v3', listUpcomingEvents);
    }
  function listUpcomingEvents(events) {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'orf66oh318gp812qcbm45buero@group.calendar.google.com',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;

      if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var name = event.summary;
          $('.display').append('<h1>' + name + '</h1>');
          var when = event.start.dateTime;
          $('.display').append('<h2>' + moment(when).format("dddd, MMMM Do YYYY, h:mm a") + '</h2>');
          var where = event.location;
          if (where == null) {
            $('.display').append('')
          } else {
          $('.display').append('<h2>' + where + '</h2>');
          }
          var description = event.description;
          if (description == null) {
            $('.display').append('<br><hr><br>')
          } else {
            $('.display').append('<p>' + description + '</p><br><hr><br>');
          }

        }
      }
    });

    }

var mykey = 'AIzaSyChrQReeiP9GSTjUljqBwTp6A0skhdr2fY'; // typically like Gtg-rtZdsreUr_fLfhgPfgff
var calendarid = 'orf66oh318gp812qcbm45buero@group.calendar.google.com'; // will look somewhat like 3ruy234vodf6hf4sdf5sd84f@group.calendar.google.com

$.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?singleEvents=true&showDeleted=false&maxResults=12&orderBy=startTime&timeMin=' + moment().format("YYYY-MM-DDTHH:mm:ssZ") + '&key=' + mykey),
    dataType: 'json',
    success: function (response) {
        console.log(response);
        var events = response.items;

        if (events.length > 0) {
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var name = event.summary;
            $('.display').append('<h1>' + name + '</h1>');
            var when = event.start.dateTime;
            $('.display').append('<h2>' + moment(when).format("dddd, MMMM Do YYYY, h:mm a") + '</h2>');
            var where = event.location;
            if (where == null) {
              $('.display').append('')
            } else {
            $('.display').append('<h2>' + where + '</h2>');
            }
            var description = event.description;
            if (description == null) {
              $('.display').append('<br><hr><br>')
            } else {
              $('.display').append('<p>' + description + '</p><br><hr><br>');
            }

          }
        }
    },
    error: function (response) {
        console.log("lol nope!");
    }
});
