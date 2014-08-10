/**
 * Created by momchillgorchev on 06/08/2014.
 */

Template.app.events({
    'click .fc-day': function(e, t){
        var dday = $(e.currentTarget).data('date');
        console.log(dday);
    },
    'click .fc-event-title': function(e, t){
        var click = $(e.currentTarget);
        console.log(click);
        click.attr('contenteditable', true).focus();
        // TBD: Save the new content on .blur()
    }
});

Template.newEvent.events({
   'submit #createNew': function(e, t){
       e.preventDefault();
       var data = {
           title: t.find('#event-title').value,
           start: t.find('#event-start').value
       };
       console.log(data);
       Meteor.call('addEvent', data, function(err, response){
           err ? console.log('No')
               : console.log('Yes');
                 Calendar.fullCalendar('renderEvent', data);
       })
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