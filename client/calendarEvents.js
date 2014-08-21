/**
 * Created by momchillgorchev on 06/08/2014.
 */

Template.app.events({

    // Handle event-title updates using item's timestamp
    'click .fc-event-title': function(e, t){
        var click = $(e.currentTarget),
            timeStamp = +click.siblings('span.timestamp').html(),
            data = {};
        click.attr('contenteditable', true).focus();
        $(click).blur(function(){
            data = {
                token: 'title',
                timer: timeStamp,
                title: click.text()
            };
            console.log(data);
            Meteor.call('updateEvent', data, function(err, response){
                err ? console.log('No')
                    : console.log('Yes');
            });
        });
    },

    // Catch the click on any event
    // and pull all its info into modal
    'click .fc-event': function(e, t){
        var clicked = $(e.currentTarget),
            timeStamp = +clicked.find('span.timestamp').html(),
            data = Events.find({timer: timeStamp}).fetch();

        !data.length ?  console.log('No such event') :
            data = data[0];
            modalToggle(data);
    }
});

Template.newEvent.events({

    // New event
   'submit #createNew': function(e, t){
       e.preventDefault();

       var data = {
           title: t.find('#event-title').value,
           start: t.find('#event-start-date').value + ' ' + t.find('#event-start-time').value,
           description: t.find('#desc').value,
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