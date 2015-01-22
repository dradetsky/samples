var updateUser = function(user) {
    if (!user) {
        return;
    }

    var name = humanname.parse(user.name.toLocaleLowerCase().replace(/\"/g,''));

    var intercom_user = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    var intercom_lead = {
        email: user.email,
        date: new Date()
    };

    if (!_.isEmpty(name.firstName) && !_.isEmpty(name.lastName)) {
        intercom_user.name = capitaliseFirstLetter(name.firstName) + ' ' + capitaliseFirstLetter(name.lastName);
        intercom_lead.first_name = capitaliseFirstLetter(name.firstName);
        intercom_lead.last_name = capitaliseFirstLetter(name.lastName);
    } else if (!_.isEmpty(name.firstName)) {
        intercom_user.name = capitaliseFirstLetter(name.firstName);
        intercom_lead.first_name = capitaliseFirstLetter(name.firstName);
    } else if (!_.isEmpty(name.lastName)) {
        intercom_user.name = capitaliseFirstLetter(name.lastName);
        intercom_lead.last_name = capitaliseFirstLetter(name.lastName);
    }

    if (user.custom_attributes) {
        intercom_user.custom_attributes = {};

        if (!_.isNull(user.custom_attributes.phone) && !_.isEmpty(user.custom_attributes.phone)) {
            var phone = getPhoneNumber(user.custom_attributes.phone);
            intercom_user.custom_attributes.phone = phone;
            intercom_lead.phone = phone;
        } else {
            intercom_user.custom_attributes.phone = null;
            intercom_lead.phone = null;
        }

        if (!_.isNull(user.custom_attributes.company) && !_.isEmpty(user.custom_attributes.company)) {
            intercom_user.custom_attributes.company = user.custom_attributes.company;
            intercom_lead.company = user.custom_attributes.company;
        } else {
            intercom_user.custom_attributes.company = null;
            intercom_lead.company = null;
        }

        if (!_.isNull(user.custom_attributes.title) && !_.isEmpty(user.custom_attributes.title)) {
            intercom_user.custom_attributes.title = user.custom_attributes.title;
            intercom_lead.title = user.custom_attributes.title;
        } else {
            intercom_user.custom_attributes.title = null;
            intercom_lead.title = null;
        }

        if (!_.isEmpty(user.custom_attributes.sdr)) {
            intercom_user.custom_attributes.sdr = user.custom_attributes.sdr;
            intercom_lead.sdr = user.custom_attributes.sdr;
        }

        if (!_.isEmpty(user.custom_attributes.source)) {
            intercom_user.custom_attributes.source = user.custom_attributes.source.toLowerCase();
            intercom_lead.source = user.custom_attributes.source.toLowerCase();

            if (user.custom_attributes.source.toLowerCase() == 'unknown') {
                delete intercom_user.custom_attributes.source;
            }
        }

        if (user.custom_attributes.followup_date && _.isNumber(user.custom_attributes.followup_date)) {
            intercom_user.custom_attributes.followup_date = user.custom_attributes.followup_date;
            intercom_lead.followup_date = new Date(user.custom_attributes.followup_date * 1000);
        } else {
            intercom_user.custom_attributes.followup_date = null;
            intercom_lead.followup_date = null;
        }
    }

    intercom.viewUser({
        "id": intercom_user.id
    }).then(function(remoteIntercomUser) {
        console.log('//Update Intercom User:', JSON.stringify(remoteIntercomUser, null, 4));

        if (!remoteIntercomUser) {
            console.log('//The user to be updated does not exist in Intercom');
            return;
        }

        db.collection('intercom').update(
            {email: remoteIntercomUser.email},
            {$set: intercom_lead},
            function(err, docs) {
                if (err) {
                    console.log(JSON.stringify(err, null, 4));
                } else {
                    console.log('//DB intercom lead updated');

                    intercom.updateUser(intercom_user, function (err, data) {
                        if (data) {
                            console.log('//Intercom lead updated');

                        }
                        else {
                            console.log('//Intercom lead updating failed');
                            console.log(JSON.stringify(err, null, 4));
                        }
                    });
            }
        });
    }, function(err) {
        console.log('//Failed to get Intercom User:', JSON.stringify(err, null, 4));
    });
};
