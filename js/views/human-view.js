var app = app || {};

(function ($) {
    'use strict';

    // Homan Item View
    // --------------
    var modal = $('#editmodal'),
        modalBody = modal.find('.modal-body');

    app.HumanView = Backbone.View.extend({
        //... is a list tag.
        tagName:  'tr',

        template: _.template($('#item-template').html()),

        events: {
            //'click #destroyHuman': 'clear'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },


        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },


        clear: function () {

            this.model.destroy({
                success: function () {
                    alert('Human deleted successfully');
                    window.history.back();
                }
            });
            return false;
        }

    });


})(jQuery);
