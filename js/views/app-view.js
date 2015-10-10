var app = app || {};

(function ($) {
    'use strict';

    // The Application
    // ---------------

    app.AppView = Backbone.View.extend({
        humanRowViews: [],
         el: '.humans',

        sortUpIcon: 'glyphicon-menu-up',
        sortDnIcon: 'glyphicon-menu-down',

         events: {
            "click th":   "headerClick"
        },

        initialize: function(){
            var that = this;
            var load = false;
            this.$list = this.$el.find('.human-list');

            this.listenTo(app.humans, "remove", this.updateTable);
            this.listenTo(app.humans, "sort", this.updateTable);

            this.render();
        },

        render: function(){

            // Sort indicators
            this.$('th')
                .append($('<span>'))
                .closest('thead')
                .find('span')
                    .addClass('glyphicon icon-none')
                    .end()
                .find('[column="' + app.humans.sortAttribute + '"] span')
                    .removeClass('icon-none').addClass(this.sortUpIcon);

            this.updateTable();
                    
            return this;
        },

        headerClick: function( e ) {
            var $el = $(e.currentTarget),
                ns = $el.attr('column'),
                cs = app.humans.sortAttribute;
    
            if ( !ns ) return;

            if (ns == cs) {
                app.humans.sortDirection *= -1;
            } else {
                app.humans.sortDirection = 1;
            }

            $el.closest('thead').find('span').attr('class', 'glyphicon icon-none');

            if (app.humans.sortDirection == 1) {
                $el.find('span').removeClass('icon-none').addClass(this.sortUpIcon);
            } else {
                $el.find('span').removeClass('icon-none').addClass(this.sortDnIcon);
            }

            app.humans.sortHumans(ns);
        },

        updateTable: function() {
            var that = this,
                ref = app.humans;

            _.invoke(this.humanRowViews, 'remove');

            this.humanRowViews = app.humans.map(function(homan){
                var view = new app.HumanView({ model: ref.get(homan) });
                that.$list.append(view.render().el);

                return view;
            });

        },
        destroy: function(guid) {
            var human = app.humans.get(guid);
            app.humans.remove(human);
            window.location.hash = '/';
        }

    });

})(jQuery);
