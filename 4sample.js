var createUser = function(user) {
    if (!user) {
        return;
    }
    var name = humanname.parse(user.name.toLocaleLowerCase().replace(/\"/g,''));

    var intercom_user = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    if (!_.isEmpty(name.firstName) && !_.isEmpty(name.lastName)) {
        intercom_user.name = capitaliseFirstLetter(name.firstName) + ' ' + capitaliseFirstLetter(name.lastName);
    } else if (!_.isEmpty(name.firstName)) {
        intercom_user.name = capitaliseFirstLetter(name.firstName);
    } else if (!_.isEmpty(name.lastName)) {
        intercom_user.name = capitaliseFirstLetter(name.lastName);
    }

    if (user.custom_attributes) {
        intercom_user.custom_attributes = {};

        if (!_.isNull(user.custom_attributes.phone) && !_.isEmpty(user.custom_attributes.phone)) {
            var phone = getPhoneNumber(user.custom_attributes.phone);
            intercom_user.custom_attributes.phone = phone;
        } else {
            intercom_user.custom_attributes.phone = null;
        }

        if (!_.isNull(user.custom_attributes.company) && !_.isEmpty(user.custom_attributes.company)) {
            intercom_user.custom_attributes.company = user.custom_attributes.company;
        } else {
            intercom_user.custom_attributes.company = null;
        }

        if (!_.isNull(user.custom_attributes.title) && !_.isEmpty(user.custom_attributes.title)) {
            intercom_user.custom_attributes.title = user.custom_attributes.title;
        } else {
            intercom_user.custom_attributes.title = null;
        }

        if (!_.isEmpty(user.custom_attributes.sdr)) {
            intercom_user.custom_attributes.sdr = user.custom_attributes.sdr;
        }

        if (!_.isEmpty(user.custom_attributes.source)) {
            intercom_user.custom_attributes.source = user.custom_attributes.source.toLowerCase();

            if (user.custom_attributes.source.toLowerCase() == 'unknown') {
                delete intercom_user.custom_attributes.source;
            }
        }

        if (user.custom_attributes.followup_date && _.isNumber(user.custom_attributes.followup_date)) {
            intercom_user.custom_attributes.followup_date = user.custom_attributes.followup_date;
        } else {
            intercom_user.custom_attributes.followup_date = null;
        }
    }

    intercom.createUser(intercom_user, function (err, data) {
        if (data) {
            console.log('//Intercom lead created');
            updateLeads(intercom_user.email);
        }
        else {
            console.log('//Intercom lead creation failed');
            console.log(JSON.stringify(err, null, 4));
        }
    });
};
