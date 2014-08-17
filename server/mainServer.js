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

        removeItems: function(id){
            if(id == null){
                return Events.remove({});
            } else {
                Events.remove(id);
            }
        },

        updateEvent: function(item){
            console.log(item);
            if(item){
                switch (item.token){
                    case 'start':
                        Events.update(item.id, {$set: {start: item.newStart}});
                        break;
                    case 'end':
                        Events.update(item.id, {$set: {end: item.end}});
                        break;
                    case 'title':
                        var a = Events.find({timer: item.timer}).fetch();
                        Events.update(a[0]._id,  {$set: {title: item.title}});
                        break;
                    default:
                        console.log('Default case for updateEvent method');
                }
            }
        }
    })
});


