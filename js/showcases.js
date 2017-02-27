var mykey = 'AIzaSyChrQReeiP9GSTjUljqBwTp6A0skhdr2fY'; // typically like Gtg-rtZdsreUr_fLfhgPfgff
var calendarid = 'orf66oh318gp812qcbm45buero@group.calendar.google.com'; // will look somewhat like 3ruy234vodf6hf4sdf5sd84f@group.calendar.google.com

$.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?singleEvents=true&showDeleted=false&maxResults=20&orderBy=startTime&timeMin=' + moment().format("YYYY-MM-DDTHH:mm:ssZ") + '&key=' + mykey),
    dataType: 'json',
    success: function (response) {
        var events = response.items;

        if (events.length > 0) {
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var name = event.summary;
            $('.display').append('<h1>' + name + '</h1>');
            var when = event.start.dateTime;
            $('.display').append('<h2>' + moment(when).tz("America/Los_Angeles").format("dddd, MMMM Do YYYY, h:mm a") + '</h2>');
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
        $('.display').append('<h2>An error has occured.  Please try again later</h2>');
    }
});


