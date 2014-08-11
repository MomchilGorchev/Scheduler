/**
 * Created by momchillgorchev on 06/08/2014.
 */

Template.calendar.rendered = function(){
    //make the redrawing reactive
};

Template.calendar.initiateCalendar = function() {
    var arr = Events.find().fetch();
    Calendar = $('#calendar');
    if(arr != []){
        var sched = function(){
            Calendar.fullCalendar({
                events: arr,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultTimedEventDuration: '00:30:00',
                forceEventDuration: true,
                defaultDate: '2014-08-12',
                editable: true,
                eventRender: function(event, element){
                    element.find('.fc-event-title').after("<span class='timestamp'>" +
                            + event.timer + "</span>");
                },
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

                }
            });
        };
        sched();
    }
};





