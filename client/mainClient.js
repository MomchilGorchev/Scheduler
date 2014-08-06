/**
 * Created by momchillgorchev on 06/08/2014.
 */
if (Meteor.isClient) {
    Template.app.rendered = function(){
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: '2014-08-12',
            editable: true,
            // TBD: Remove hard coded data and hook up a collection
            events: [
                {
                    title: 'All Day Event',
                    start: '2014-08-01'
                },
                {
                    title: 'Long Event',
                    start: '2014-08-07',
                    end: '2014-06-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2014-08-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2014-08-16T16:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2014-08-12T10:30:00',
                    end: '2014-08-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2014-08-12T12:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2014-08-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2014-08-28'
                }
            ]
        });
    }
}






