/*
 * Configuration file for easy deployment.
 */

var config = {
    'development' :
    {
        'appConfig' : {
            'port' : '3000'
        },
        'dbConfig' : {
            'dbUrl' : '',
            'dbType' : ''
        }
    },
    'testing' :
    {

    },
    'production' :
    {

    },

};


var env = process.env.NODE_ENV || "development";
module.exports = config[env];