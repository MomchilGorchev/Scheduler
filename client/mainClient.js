/**
 * Created by momchillgorchev on 06/08/2014.
 */

Template.calendar.rendered = function(){
    //make the redrawing reactive
};

Template.calendar.initiateCalendar = function() {
    var arr = Events.find().fetch();
    console.log(arr);
    Calendar = $('#calendar');
    if(arr != []){
        var sched = function(){
            Calendar.fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2014-08-12',
                editable: true,
                eventDrop: function(event, delta, revertFunc) {
                    alert(event.title + " was dropped on " + event.start.format());

                    if (!confirm("Are you sure about this change?")) {
                        revertFunc();
                    } else {
                        var item = {
                            token: 'start',
                            id: event._id,
                            newStart: event.start.format()
                        };
                        Meteor.call('updateEvent', item, function(err, response){
                            if(err){
                                console.log("Error")
                            }
                            else{
                                console.log('Success');
                            }
                        });
                    }
                },
                eventResize: function(event, delta, revertFunc) {

                    alert(event.title + " end is now " + event.end.format());

                    if (!confirm("is this okay?")) {
                        revertFunc();
                    } else {
                        var item = {
                            token: 'end',
                            id: event._id,
                            end: event.end.format()
                        };
                        Meteor.call('updateEvent', item, function(err, response){
                            if(err){
                                console.log("Error")
                            }
                            else{
                                console.log('Success');
                            }
                        });
                    }

                },
                // TBD: Remove hard coded data and hook up a collection
                events: arr
            });
        };
        sched();
    }
};





