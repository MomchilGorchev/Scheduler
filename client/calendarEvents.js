/**
 * Created by momchillgorchev on 06/08/2014.
 *
 * Main events file
 */

Template.app.events({

    /**
     * Catch the click on any event
     * and pull all its info into modal
     * This way the initial load doesn't pull
     * unnecessary data
     */
    'click .fc-event': function(e, t){
        var clicked = $(e.currentTarget),
            timeStamp = +clicked.find('span.timestamp').html(),
            data = Events.find({timer: timeStamp}).fetch();

        !data.length ?  console.log('No such event') :
            data = data[0];
            modalToggle(data);
    },

    /**
     * Modal's close event, remove the 'contenteditable' attribute
     */
    'click .modal-close': function(e, t){
        var editableFields = $('#myModal').find('[contenteditable="true"]');
        $.each(editableFields, function(key, value){
            $(this).removeAttr('contenteditable');
        });
    },

    /**
     * 'Save button' event
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
            console.log(response);
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

/**
 * New event's form events
 */
Template.newEvent.events({

    /**
     * Create new event:
     * Grab the data from the form
     * and send it to the backend
     */
   'submit #createNew': function(e, t){
       e.preventDefault();

       var data = {
           title: t.find('#event-title').value,
           start: t.find('#event-start-date').value + 'T' + t.find('#event-start-time').value + ':00',
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

    /**
     * CLear all events
     * Only for debugging, delete when ready for production
     */
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