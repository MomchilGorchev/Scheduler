/**
 * Created by momchillgorchev on 07/08/2014.
 */

function loadSchedule(){
    var a = Events.find().fetch();
    console.log(a);
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2014-08-12',
        editable: true,
        // TBD: Remove hard coded data and hook up a collection
        events: a
    });
}