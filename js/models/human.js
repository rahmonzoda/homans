var app = app || {};

(function () {
    'use strict';

    // Human Model
    // ----------

    app.Human = Backbone.Model.extend({

        initialize: function () {
            this.validators = {};

            this.validators.name  = function (value) {

                if ( value.first !== '' && value.last !== '' ) {

                    return {
                        isValid: true
                    }
                } else {
                    return {
                        isValid: false,
                        message: "You must enter a Firstname and Lastname"
                    }
                }


            };


            this.validators.age = function (value) {

                if ( value ) {

                    if ( parseInt(value) > 5 ) {
                        return {
                            isValid: true
                        }
                    } else {
                        return {
                            isValid: false,
                            message: "Enter valid an age"
                        }
                    }

                } else {
                    return {
                        isValid: false,
                         message: "You must enter an age"
                    }
                }

            };
            this.validators.email = function (value) {


                if ( value !== '' ) {
                    if ( validEmail(value) ) {
                        return {
                            isValid: true
                        };
                    } else {
                        return {
                            isValid: false,
                            message: "Enter valid an email"
                        }
                    }
                } else {
                    return {
                        isValid: false,
                        message: "You must enter an email"
                    }
                }

                function validEmail(e) {
                    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
                    
                    return String(e).search (filter) != -1;
                }
            }
        },

        validateItem: function (key) {

            return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
        },

        validateAll: function (attrs) {
            var messages = {};

            for (var key in this.validators) {
                if(this.validators.hasOwnProperty(key)) {

                    var check = this.validators[key](attrs[key]);
                    if (check.isValid === false) {
                        messages[key] = check.message;
                    }
                    
                }
            }

            return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
        },
        
        defaults: {
            rank: -1,
            guid: null,
            age: null,
            name: {
                first: "",
                last: ""
            },
            email: ""
        },

        idAttribute: "guid"

    });


})();
