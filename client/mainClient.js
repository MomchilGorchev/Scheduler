/**
 * Created by momchillgorchev on 06/08/2014.
 */
Events = new Meteor.Collection('events');
Template.app.rendered = function(){
    console.log('1')
    loadSchedule();

};


/**
 *
 * Collection data only pblishes the first time, very strange behaviour,
 * i need to find a way to make it consistent and reactive.
 *
 * One option maybe is to create a external function and make it run first
 *
 * Other is just me find the mechanism to wait for the data before render the template
 */





