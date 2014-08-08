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
            a = Meteor.subscribe('events');
            return a;
        }
    });

    this.route('newEvent', {
        path: '/new'
    });
});