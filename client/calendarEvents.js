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
    },

    'click .modal-close': function(e, t){
        var editableFields = $('#myModal').find('[contenteditable="true"]');
        $.each(editableFields, function(key, value){
            $(this).removeAttr('contenteditable');
        });
    },

    /**
     * 'Save button' event
     * @param e
     * @param t
     *
     * Extract data from the DOM,
     * construct appropriate structure,
     * and call backend method
     */
    'click .modal-save': function(e, t){

        // Cache the necessary data
        var clicked = $(e.currentTarget),
            modal = clicked.closest('#myModal'),
            editableFields = modal.find('[contenteditable="true"]'),
            dataStore = [],
            buffer = {};

        // Loop to order the data into array
        $.each(editableFields, function(key, value){
            buffer = {
                token: $(this).data('token'),
                value: $(this).html()
            };
            dataStore.push(buffer);
        });
        // Create object to pass to the server method
        var eventObject = {
            ref: +modal.find('span.modal-ref').html().substring(5),
            data: dataStore
        };

        // Save the new values, close the modal and update
        // the calendar instances of the events.
        // Trigger the close button to clear the 'contenteditable' attributes.
        Meteor.call('updateEventObject', eventObject, function(err, response){
           err ? console.log('Error occurred!') :
                $('.timestamp:contains("'+ eventObject.ref +'")')
                    .siblings('.fc-event-title')
                        .html(modal.find('.modal-title').html())
                    .siblings('.fc-event-time')
                        .html(modal.find('.modal-startdate').html().substring(11));
           $('.modal-close').trigger('click');
        });
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