var app = app || {};

(function ($) {
    'use strict';

    // Homan Item View
    // --------------
    var modal = $('#editmodal'),
        modalBody = modal.find('.modal-body');

    app.HumanViewDetails = Backbone.View.extend({
        tagName: 'form',
        
        events: {
            'click button' : 'updateModel',
        },

        initialize: function () {
            this.template = _.template( $('#stats-template').html() );

            //this.listenTo(this.model, 'change', this.render);
        },


        render: function () {

            this.$el.html( this.template(this.model.toJSON()) );

            this.showModal();

            return this;
        },

        showModal: function(){

            modalBody.html( this.$el );

            modal.modal('show');

            modal.on('hidden.bs.modal', function (event) {
                modalBody.html('');
                window.location.hash = '/';
            });
        },


        beforeSave: function (change) {

            this.model.set(change);

            if ( this.model.get('rank') === -1 ) {
                this.pushModel(this.model);
            }
            modal.modal('hide');
        },

        pushModel: function (model) {
            var coll = app.humans;

            model.set('rank', coll.length);
            model.set('guid', guid());

            coll.add(model);
        },
        updateModel: function(model) {
            var $input = this.$el.find('input');
            var change = {};

            change.name = {};

            _.each($input, function(el) {
                change[el.name] = el.value;
            });

            change.name.last = change.last;
            change.name.first = change.first;
            delete  change.last;
            delete  change.first;

            this.validInput(change);
        },

        validInput: function(change) {
            this.displayErrorsClear();

            var check = this.model.validateAll(change);

            if ( !check.isValid ) {
                this.displayErrors(check.messages);
            } else {
                this.beforeSave(change);
            }
        },

        displayErrors: function(messages) {
            var errors = this.$el.find('.errors');

            if ( typeof messages === 'string' ) {

                errors.append($('<li>' + messages + '</li>'));

                return;
            }

            _.each(messages, function(msg, key){ 

                var error = $('<li>' + msg + '</li>');
                errors.append(error);
            });
        },
        displayErrorsClear: function() {
            var errors = this.$el.find('.errors');

            errors.html('');
        }

    });

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }


})(jQuery);
