$(document).ready(function () {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        events: [
        {
            title: 'event1',
            start: '2015-04-07'
        },
        {
            title: 'event2',
            start: '2015-04-15',
        },
        {
            title: 'event3',
            start: '2015-04-19T12:30:00',
            allDay: false // will make the time show
        }
        ]


    })

});