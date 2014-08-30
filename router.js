/**
 * Created by momchillgorchev on 06/08/2014.
 */
Router.configure({
    layoutTemplate: 'appLayout',
    loadingTemplate: 'loading'
});

Router.map(function(){
    this.route('app', {
        path: '/',
        waitOn: function(){
            return Meteor.subscribe('events');
        }
    });

    this.route('newEvent', {
        path: '/new'
    });
});