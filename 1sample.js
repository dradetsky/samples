var rest = require('restler');
var settings = require('./settings');
var apiKey = settings.linkedIn.apiKey;
var getLinkedInProfile = require('./get_linkedin_profile');

var rapportiveLinkedIn = function(next) {
    var cookie = settings.linkedIn.cookies['agassan@whalepath.com'];
    rest.request('https://www.linkedin.com/uas/js/userspace', {
        method: 'get',
        query: {
            apiKey: apiKey,
            authorize: true
        },
        headers: {
            Referer: 'http://rapportive.com',
            Cookie: [
                cookie
            ]
        }
    }).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            next(null, result);
        }
    });
};

var updateLinkedInProfile = function(intercom_lead, intercom_user, conversation) {
    var cookie = settings.linkedIn.cookies['agassan@whalepath.com'];
    rest.request('https://www.linkedin.com/uas/js/userspace', {
        method: 'get',
        query: {
            apiKey: apiKey,
            authorize: true
        },
        headers: {
            Referer: 'http://rapportive.com',
            Cookie: [
                cookie
            ]
        }
    }).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            var oauth_token = result.match(/l\.oauth_token = "(.*?)"/)[1];
            console.log(oauth_token);

            getLinkedInProfile(oauth_token, intercom_lead, intercom_user, conversation);
        }
    });
};
