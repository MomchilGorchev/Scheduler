/**
 * Created by momchillgorchev on 06/08/2014.
 */

Meteor.startup(function(){
    Deps.autorun(function (c) {
        Meteor.publish('events', function () {
            return Events.find();
        });
    });

    return Meteor.methods({

        /**
         *
         * @param newEvent - object holding all necessary data
         * of the new item to be added
         *
         */
        addEvent: function(newEvent){
            if(newEvent){
                Events.insert({
                    timer: newEvent.timer,
                    title: newEvent.title,
                    start: newEvent.start,
                    description: newEvent.description,
                    end: newEvent.end
                });
            }
        },

        /**
         *
         * @param id - id of the item to be removed
         * Removes all events if id is not provided
         *
         */
        removeItems: function(id){
            if(id == null){
                return Events.remove({});
            } else {
                Events.remove(id);
            }
        },

        /**
        *
        * Update multiple object's properties
        * @param eventObject
        * e.g. {
        *   ref: 'reference(timer) to the collection's item',
        *   data: 'Array of objects holding
        *          the properties in
        *          the following format:
        *          {
        *              token: 'title',
        *              value: 'Some new value'
        *          }
        * }
        *
        */
        updateEventObject: function(eventObject){

            // Cache data
            var ref = eventObject.ref,
                _this = Events.find({timer: ref}).fetch(),
                _thisId = _this[0]._id,
                data = eventObject.data;

            // Loop to update properties
            for(var i = 0; i < data.length; i++){

                // Access & update the property to update
                // on each iteration
                var item = data[i],
                    token = item.token,
                    value = item.value;
                switch (token){
                    case 'start':
                        Events.update(_thisId, {$set: {start: value}});
                        break;
                    case 'end':
                        Events.update(_thisId, {$set: {end: value}});
                        break;
                    case 'title':
                        Events.update(_thisId,  {$set: {title: value}});
                        break;
                    case 'description':
                        Events.update(_thisId,  {$set: {description: value}});
                        break;
                    default:
                        console.log('Default case for updateEventObject method');
                }
            }
        }
    })
});


