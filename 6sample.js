var fs = require('fs');
var path = require('path');

var replaceAll = (function(find, replace, string) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
});

var escapeRegExp = (function(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
});

var g = function(intercom_lead) {
  //Create Intercom.io user note
  var note_profile = fs.readFileSync(path.join(
    path.dirname(__filename), '..', 'intercom_tmpls', 'intercomio_note_profile.txt')
                                    ).toString();

  if (!_.isEmpty(intercom_lead.first_name)) {
    note_profile = replaceAll('[lead.first_name]', intercom_lead.first_name, note_profile);
  }
  else {
    note_profile = replaceAll('[lead.first_name]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.last_name)) {
    note_profile = replaceAll('[lead.last_name]', intercom_lead.last_name, note_profile);
  }
  else {
    note_profile = replaceAll('[lead.last_name]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.headline)) {
    note_profile = replaceAll('[lead.headline]', intercom_lead.headline, note_profile);
  }
  else {
    note_profile = replaceAll('[lead.headline]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.location)) {
    note_profile = replaceAll('[lead.location]', intercom_lead.location, note_profile);
  }
  else {
    note_profile = replaceAll('[lead.location]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.industry)) {
    note_profile = replaceAll('[lead.industry]', intercom_lead.industry, note_profile);
  }
  else {
    note_profile = replaceAll('[lead.industry]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.picture)) {
    note_profile = replaceAll('[lead.picture]', intercom_lead.picture, note_profile);
  }
  else {
    if (!_.isEmpty(intercom_lead.first_name) && !_.isEmpty(intercom_lead.last_name)) {
      var nameLetters = intercom_lead.first_name.charAt(0).toLocaleUpperCase() + intercom_lead.last_name.charAt(0).toLocaleUpperCase();
    } else if (!_.isEmpty(intercom_lead.first_name)) {
      var nameLetters = intercom_lead.first_name.charAt(0).toLocaleUpperCase();
    } else if (!_.isEmpty(intercom_lead.last_name)) {
      var nameLetters = intercom_lead.last_name.charAt(0).toLocaleUpperCase();
    }
    note_profile = replaceAll('[lead.picture]', 'http://dummyimage.com/73x73/0073b0/FFFFFF&text=' + nameLetters, note_profile);
  }

  if (!_.isEmpty(intercom_lead.linkedin_profile)) {
    note_profile = replaceAll('[lead.linkedin_profile]', intercom_lead.linkedin_profile, note_profile);
  }
  else {
    note_profile = replaceAll('[lead.linkedin_profile]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.positions) && intercom_lead.positions.length > 0) {
    var note_profile_positions = '';
    _.each(intercom_lead.positions, function (position) {
      var note_profile_position = fs.readFileSync(path.join(
        path.dirname(__filename), '..', 'intercom_tmpls', 'intercomio_note_profile_position.txt')
                                                 ).toString();

      if (!_.isEmpty(position.company)) {
        note_profile_position = replaceAll('[position.company]', position.company, note_profile_position);
      }
      else {
        note_profile_position = replaceAll('[position.company]', '', note_profile_position);
      }

      if (!_.isEmpty(position.title)) {
        note_profile_position = replaceAll('[position.title]', position.title, note_profile_position);
      }
      else {
        note_profile_position = replaceAll('[position.title]', '', note_profile_position);
      }

      if (note_profile_position) {
        note_profile_positions += note_profile_position;
      }
    });

    if (!_.isEmpty(note_profile_positions)) {
      var note_profile_position_wrapper = fs.readFileSync(path.join(
        path.dirname(__filename), '..', 'intercom_tmpls', 'intercomio_note_profile_position_wrapper.txt')
                                                         ).toString();
      note_profile_position_wrapper = replaceAll('[lead.positions]', note_profile_positions, note_profile_position_wrapper);
      note_profile = replaceAll('[profile_position_wrapper]', note_profile_position_wrapper, note_profile);
    }
    else {
      note_profile = replaceAll('[profile_position_wrapper]', '', note_profile);
    }
  }
  else {
    note_profile = replaceAll('[profile_position_wrapper]', '', note_profile);
  }

  if (!_.isEmpty(intercom_lead.connections) && intercom_lead.connections.length > 0) {
    var note_profile_connections = '';

    _.each(intercom_lead.connections, function (connection) {
      var note_profile_connection = fs.readFileSync(path.join(
        path.dirname(__filename), '..', 'intercom_tmpls', 'intercomio_note_profile_connection.txt')
                                                   ).toString();

      if (!_.isEmpty(connection.first_name)) {
        note_profile_connection = replaceAll('[connection.first_name]', connection.first_name, note_profile_connection);
      }
      else {
        note_profile_connection = replaceAll('[connection.first_name]', '', note_profile_connection);
      }

      if (!_.isEmpty(connection.last_name)) {
        note_profile_connection = replaceAll('[connection.last_name]', connection.last_name, note_profile_connection);
      }
      else {
        note_profile_connection = replaceAll('[connection.last_name]', '', note_profile_connection);
      }

      if (!_.isEmpty(connection.headline)) {
        note_profile_connection = replaceAll('[connection.headline]', connection.headline, note_profile_connection);
      }
      else {
        note_profile_connection = replaceAll('[connection.headline]', '', note_profile_connection);
      }

      if (!_.isEmpty(connection.picture)) {
        note_profile_connection = replaceAll('[connection.picture]', connection.picture, note_profile_connection);
      }
      else {
        note_profile_connection = replaceAll('[connection.picture]', 'http://dummyimage.com/73x73/0073b0/FFFFFF&text=' + connection.first_name.charAt(0).toLocaleUpperCase() + connection.last_name.charAt(0).toLocaleUpperCase(), note_profile_connection);
      }

      if (!_.isEmpty(connection.profile_url)) {
        note_profile_connection = replaceAll('[connection.profile_url]', connection.profile_url, note_profile_connection);
      }
      else {
        note_profile_connection = replaceAll('[connection.profile_url]', '', note_profile_connection);
      }

      if (note_profile_connection) {
        note_profile_connections += note_profile_connection;
      }
    });

    if (!_.isEmpty(note_profile_connections)) {
      var profile_connection_wrapper = fs.readFileSync(path.join(
        path.dirname(__filename), '..', 'intercom_tmpls', 'intercomio_note_profile_connection_wrapper.txt')
                                                      ).toString();
      profile_connection_wrapper = replaceAll('[lead.connections]', note_profile_connections, profile_connection_wrapper);
      note_profile = replaceAll('[profile_connection_wrapper]', profile_connection_wrapper, note_profile);
    }
    else {
      note_profile = replaceAll('[profile_connection_wrapper]', '', note_profile);
    }
  }
  else {
    note_profile = replaceAll('[profile_connection_wrapper]', '', note_profile);
  }


  return [
    note_profile,
    note_profile_position_wrapper,
    note_profile_connections,
    profile_connection_wrapper
  ];
};
