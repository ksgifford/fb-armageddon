(function(module) {

  function UserData(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  UserData.lifetime = {};

  UserData.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS UserData (' +
      'id INTEGER PRIMARY KEY, ' +
      'heroID VARCHAR(40) NOT NULL, ' +
      'userID VARCHAR(40) NOT NULL, ' +
      'caloriesOut INTEGER, ' +
      'distance FLOAT, ' +
      'floors INTEGER, ' +
      'steps INTEGER);',
      function(result) {
        console.log('Successfully set up UserData table.', result);
      }
    );
  };

  //Inserts new FitBit users and their data into the SQL table when we make an API call.
  UserData.addUsers = function(obj) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO UserData (heroID, userID, caloriesOut, distance, floors, steps) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [obj.heroID, obj.userID, obj.caloriesOut, obj.distance, obj.floors, obj.steps],
        }
      ]
    );
  };

  UserData.fetchJSON = function(uri) {
    webDB.execute('SELECT * FROM UserData ORDER BY userID ASC', function(rows) {
      $.get('/fb-profile', function(data) {
        UserData.lifetime = {};
        var userObj = eval(data);
        var lifetime = userObj.lifetime.total;
        console.log(userObj);
        console.log(lifetime);
        UserData.lifetime = lifetime;
      })
      .done(function() {
        UserData.addUsers(UserData.lifetime);
      });
    });
  }

  // UserData.logoutFitbit = function(cb) {
  //   var cookies = document.cookie.split(";");
  //   for (var i = 0; i < cookies.length; i++) {
  //   	var cookie = cookies[i];
  //   	var eqPos = cookie.indexOf("=");
  //   	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //   	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //   }
  // };


  UserData.dumpUsers = function() {
    webDB.execute(
      [
        {
          'sql': 'drop table UserData;',
        }
      ]
    );
  };

  module.UserData = UserData;
})(window);
