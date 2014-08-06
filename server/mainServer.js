/**
 * Created by momchillgorchev on 06/08/2014.
 */
Events = new Meteor.Collection('events');
Meteor.startup(function(){
    Deps.autorun(function (c) {
        Meteor.publish('events', function () {
            return Events.find();
        });
    });
});


