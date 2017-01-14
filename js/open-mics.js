// Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '474937019011-ck824t8cts8ls81hovh552nn10oovlgd.apps.googleusercontent.com';

    var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

    var eventsArray = [];



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
      'calendarId': 'jim6kbma2850sds9mcohvbmgbo@group.calendar.google.com',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 20,
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
            $('.display').append('<h3>' + description + '</h3><br><hr><br>');
          }

        }
      }
    });

    }
