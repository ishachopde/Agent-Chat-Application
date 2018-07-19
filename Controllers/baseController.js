/**
 * Base Controller
 * @author  Isha CHopde
 */
const _ = require("underscore");
module.exports = {
    name: "base",
    extend: function(child) {
        return _.extend({}, this, child);
    },
    run: function(req, res, next) {

    }
}
