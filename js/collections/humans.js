var app = app || {};

(function () {
    'use strict';

    // Human Collection
    // ---------------

    var Humans = Backbone.Collection.extend({

        model : app.Human,
        url : "mates.json",

        sortAttribute: "rank",
        sortDirection: 1,

        sortHumans: function (attr) {

            this.sortAttribute = attr;
            this.sort();

        },

        comparator: function(a, b) {
            var a = a.get(this.sortAttribute),
                b = b.get(this.sortAttribute);

            if (a == b) return 0;

            if (this.sortDirection == 1) {
                return a > b ? 1 : -1;
            } else {
                return a < b ? 1 : -1;
            }
        }

    });

    app.humans = new Humans();

})();
