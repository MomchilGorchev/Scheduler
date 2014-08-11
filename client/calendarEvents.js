/**
 * Created by momchillgorchev on 06/08/2014.
 */

Template.app.events({
    'click .fc-event-title': function(e, t){
        var click = $(e.currentTarget),
            timeStamp = click.siblings('span.timestamp').html(),
            data = {};
        click.attr('contenteditable', true).focus();
        $(click).blur(function(){
            data = {
                token: 'title',
                timer: timeStamp,
                title: click.html()
            };
            console.log(data);
            Meteor.call('updateEvent', data, function(err, response){
                err ? console.log('No')
                    : console.log('Yes');
                //Calendar.fullCalendar('renderEvent', data);
            });


        });
    }
});

Template.newEvent.events({
   'submit #createNew': function(e, t){
       e.preventDefault();
       var data = {
           title: t.find('#event-title').value,
           start: t.find('#event-start').value,
           timer: +moment()
       };
       console.log(data);
       Meteor.call('addEvent', data, function(err, response){
           err ? console.log('No')
               : console.log('Yes');
                 Calendar.fullCalendar('renderEvent', data);
       });
   },
   'click #clearAll': function(e, t){
       Meteor.call('removeItems', function(err, response){
           if(err){
               console.log(err);
           } else {
               console.log('Yes');
           }
       })
   }
});