/**
 * Created by momchillgorchev on 06/08/2014.
 */

Template.calendar.rendered = function(){
    //make the redrawing reactive
};

Template.calendar.custom = function() {
    var arr = Events.find().fetch();
    console.log(arr);
    if(arr != []){
        var sched = function(){
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2014-08-12',
                editable: true,
                // TBD: Remove hard coded data and hook up a collection
                events: arr
            });
        };
        sched();
    }
};





