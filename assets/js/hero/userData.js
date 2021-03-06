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
  UserData.addToTable = function(obj) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO UserData (heroID, userID, caloriesOut, distance, floors, steps) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [obj.heroID, obj.userID, obj.caloriesOut, obj.distance, obj.floors, obj.steps],
        }
      ]
    );
  };

  UserData.deleteFromTable = function(name) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM UserData WHERE heroID = ?;',
          'data': [localStorage.heroName]
        }
      ]
    );
  };

  UserData.fetchAUTH = function() {
    webDB.execute('SELECT * FROM UserData ORDER BY userID ASC', function(rows) {
      $.get('/fitbit', function(data) {
        UserData.lifetime = {};
        var userObj = eval(data);
        var lifetime = userObj.lifetime.total;
        console.log(userObj);
        console.log(lifetime);
        UserData.lifetime = lifetime;
        UserData.lifetime.heroID = localStorage.heroName;
      })
      .done(function() {
        //May need to add a record deletion function call here to prevent this
        //table from accumulating old data.
        UserData.addToTable(UserData.lifetime);
        LevelBuilder.aggregate();
      });
    });
  }

  UserData.fetchJSON = function() {
    webDB.execute('SELECT * FROM UserData ORDER BY userID ASC', function(rows) {
      $.get('/fb-profile', function(data) {
        UserData.lifetime = {};
        var userObj = eval(data);
        var lifetime = userObj.lifetime.total;
        console.log(userObj);
        console.log(lifetime);
        UserData.lifetime = lifetime;
        UserData.lifetime.heroID = localStorage.heroName;
      })
      .done(function() {
        //May need to add a record deletion function call here to prevent this
        //table from accumulating old data.
        UserData.addToTable(UserData.lifetime);
        LevelBuilder.aggregate();
      });
    });
  }

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
