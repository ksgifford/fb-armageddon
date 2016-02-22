(function(module) {

  Hero.all = [];

  function Hero(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
        this[e] = opts[e];
      },this);
    };

  Hero.createTable = function() {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS heroes (' +
        'id INTEGER PRIMARY KEY, ' +
        'name VARCHAR(40) NOT NULL, ' +
        'created DATETIME, ' +
        'strength INTEGER, ' +
        'speed INTEGER, ' +
        'stamina INTEGER, ' +
        'achievements ARRAY, ' +
        'users ARRAY);';
    );
  };

  Hero.prototype.saveHero = function() {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO heroes (name, created, strength, speed, stamina, achievements, users) VALUES (?, ?, ?, ?, ?, ?, ?);',
          'data': [this.name, this.created, this.strength, this.speed, this.stamina, this.achievements, this.users],
        }
      ],
    );
  }

  Hero.prototype.loadHero = function(id) {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM heroes', function(rows) {
            if (rows.length) {

            } else {
              **API CALL**
              **FUNCTION TO PARSE API DATA**
              API DATA.forEach(function(hero) {
                Hero.saveHero();
              })
            }
          }
        }
      ]
    )
  }

  Hero.prototype.updateHero = function(hero) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE heroes SET name = ?, created = ?, strength = ?, speed = ?, stamina = ?, achievements = ?, users = ? WHERE name = ?;',
          'data': [hero.name, hero.created, hero.strength, hero.speed, hero.stamina, hero.achievements, hero.users]
        }
      ],
    );
  }

  Hero.prototype.removeHero = function(hero) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM heroes WHERE name = ?;',
          'data': [this.name]
        }
      ],
    );
    heroView.wipe();
  }

  massacre = function() {
    webDB.execute(
      [
        {
          'sql': 'drop table heroes;',
        }
      ],
    );
    heroView.wipe();
  }

  Hero.prototype.attachAchievements = function() {
    if(this.strength > 0) {
      this.achievements.push(Achievement.all[0]);
    }
    if(this.strength > 4) {
      this.achievements.push(Achievement.all[1]);
    }
    if(this.strength > 9) {
      this.achievements.push(Achievement.all[2]);
    }
    if(this.strength > 14) {
      this.achievements.push(Achievement.all[3]);
    }
    if(this.strength > 19) {
      this.achievements.push(Achievement.all[4]);
    }
    if(this.speed > 0) {
      this.achievements.push(Achievement.all[5]);
    }
    if(this.speed > 4) {
      this.achievements.push(Achievement.all[6]);
    }
    if(this.speed > 9) {
      this.achievements.push(Achievement.all[7]);
    }
    if(this.speed > 14) {
      this.achievements.push(Achievement.all[8]);
    }
    if(this.speed > 19) {
      this.achievements.push(Achievement.all[9]);
    }
    if(this.stamina > 0) {
      this.achievements.push(Achievement.all[10]);
    }
    if(this.stamina > 4) {
      this.achievements.push(Achievement.all[11]);
    }
    if(this.stamina > 9) {
      this.achievements.push(Achievement.all[12]);
    }
    if(this.stamina > 14) {
      this.achievements.push(Achievement.all[13]);
    }
    if(this.stamina > 19) {
      this.achievements.push(Achievement.all[14]);
    }
  }

module.heroView = heroView;
})(window);
