/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    // App Router
    // ----------
    var AppRouter = Backbone.Router.extend({
        routes: {
            "edit/:guid"    :  "edit",
            "add"           :  "add",
            "del/:guid"     :  "destroy",
        },

        initialize: function (page) {
            var p = page ? parseInt(page, 10) : 1;
            
            this.viewList = new app.AppView();
        },

        add: function(){
            var human = new app.Human(),
                view = new app.HumanViewDetails({model: human});
            view.render()
        },

        edit: function (guid) {
            var human = app.humans.get(guid),
                view = new app.HumanViewDetails({model: human});

            view.render()

        },
        destroy: function (guid) {
            this.viewList.destroy(guid);
        }
    });

    app.humans.fetch({
        success: function(){
            _.each(app.humans.models, function(human, lndex){
                human.set("rank", lndex);
            });

            new AppRouter();
            Backbone.history.start();
        }
    });
})();
