var f = function(intercomUser, userInDb) {
    var salesforce_user = {};

    if (intercomUser.custom_attributes) {
        if (!_.isEmpty(intercomUser.custom_attributes.sdr)) {
            salesforce_user.SDR_Owner__c = intercomUser.custom_attributes.sdr;
        }

        if (intercomUser.custom_attributes.followup_date && _.isNumber(intercomUser.custom_attributes.followup_date)) {
            salesforce_user.Follow_Up_Date__c = new Date(intercomUser.custom_attributes.followup_date * 1000);
        }
    }

    if (!_.isEmpty(userInDb.source)) {
        salesforce_user.LeadSource = userInDb.source;
    }

    if (!_.isEmpty(userInDb.type)) {
        salesforce_user.Lead_Type__c = userInDb.type;
    }

    if (!_.isEmpty(userInDb.title)) {
        salesforce_user.Title = userInDb.title;
    } else if (!_.isEmpty(userInDb.positions) && userInDb.positions.length > 0 &&
            !_.isEmpty(userInDb.positions[0].title)) {
        salesforce_user.Title = userInDb.positions[0].title;
    }

    if (!_.isEmpty(userInDb.company)) {
        salesforce_user.Company = userInDb.company;
    } else if (!_.isEmpty(userInDb.positions) && userInDb.positions.length > 0 &&
            !_.isEmpty(userInDb.positions[0].company)) {
        salesforce_user.Company = userInDb.positions[0].company;
    }

    if (!_.isEmpty(userInDb.location)) {
        salesforce_user.Location__c = userInDb.location;
    }

    if (!_.isEmpty(userInDb.industry)) {
        salesforce_user.Industry_LinkedIn__c = userInDb.industry;
    }

    if (!_.isEmpty(userInDb.linkedin_profile)) {
        salesforce_user.Linkedin_Profile__c = userInDb.linkedin_profile;
    }

    if (!_.isEmpty(userInDb.phone)) {
        salesforce_user.Phone = userInDb.phone;
    } else if (!_.isEmpty(userInDb.phone_numbers) && userInDb.phone_numbers.length > 0) {
        salesforce_user.Phone = userInDb.phone_numbers[0].number;
    }

    if (!_.isEmpty(userInDb.connections) && userInDb.connections.length > 0) {
        var firstConnection = userInDb.connections[0];
        if (!_.isEmpty(firstConnection.first_name) && !_.isEmpty(firstConnection.last_name)) {
            salesforce_user.Common_Connection__c = firstConnection.first_name + ' ' + firstConnection.last_name;
        }
    }

    return salesforce_user;
};
