(function(module) {

  var heroView = {};
  var checkToken = false;

  heroView.renderHero = function() {
    setTimeout(function() {
      Hero.all.forEach(function(hero) {
        localStorage.heroName = hero.charName;

        $('#bearhead').html('<img src="/images/' + hero.stamina + '-head.png" />');
        $('#torso').html('<img src="/images/' + hero.strength + '-torso.png" />');
        $('#weapon').html('<img src="/images/' + hero.speed + '-weapon.png" />');

      });
    },500);

    console.log("heroView.renderHero called...");
  }

  heroView.renderStats = function() {
    setTimeout(function() {
      Hero.all.forEach(function(hero) {
        $('.stamina').html(hero.stamina);
        $('.strength').html(hero.strength);
        $('.speed').html(hero.speed);
      })
    },500);
    console.log("heroView.renderStats called...");
  }

  heroView.renderAchievements = function() {
    $('.achievement-list').html('');
    $('#hero-achievements ul').html('');
    setTimeout(function() {
      Hero.all.forEach(function(hero) {
        hero.achievements.forEach(function(a) {
          $('#hero-achievements ul').append('<li><img src="/images/' + a.achId + '-achievements.png" class="achievement" title="' + a.achText + '"/></li>');
          $('.achievement-list').append(a.achName + ', ');
        });
      })
    },500);
    //Reset Hero.achievements
    console.log("heroView.renderAchievements called...");
  }

  heroView.populateHeroList = function() {
    console.log(Hero.menu);
    $('#saved-heros').html('');

    Hero.menu.forEach(function(hero) {
      var appStr = '<li style="white-space: nowrap;"><a href="#" class="hero-menu">' + hero.charName + '</a></li>';
      $('#saved-heros').append(appStr);

      // console.log(appStr);
    });

    console.log("heroView.populateHeroList called...");
    heroView.heroSelect();
  }

  heroView.wipeHero = function() {
    $('#head').html('');
    $('#torso').html('');
    $('#weapon').html('');

    console.log("heroView.wipeHero called...");
  }

  heroView.wipeAchievements = function() {
    $('#achievements').html('');
    $('.achievement-list').html('');

    console.log("heroView.wipeAchievements called...");
  }

  heroView.wipeStats = function() {
    $('.stats li').text('');

    console.log("heroView.wipeStats called...");
  }

  heroView.wipe = function() {
    heroView.wipeHero();
    heroView.wipeStats();
    heroView.wipeAchievements();

    console.log("heroView.wipe called...");
  }

  heroView.hideAllHeroItems = function() {
    $('#create-btn').hide();
    $('#hero-instructions').hide();
    $('#hero-list').hide();
    $('#hero-stats').hide();
    $('#player-nav').hide();
    $('#fitbit-nav').hide();
    $('.herocontainer img').hide();

    console.log("heroView.hideAllHeroItems called...");
  }


  /**  Button Handlers **/

  heroView.initArenaLeftButton = function() {
    $('#arenaLeft-btn').on('click', function(e) {
      e.preventDefault();

      // Add current hero name to left of area
      arenaView.setArenaLeft();
      arenaView.initBattle();

      // TODO: jump to area on click
      //location.href="/arena#arena";

      console.log("arenaLeft-btn clicked...");
    });
  }

  heroView.initArenaRightButton = function() {
    $('#arenaRight-btn').on('click', function(e) {
      e.preventDefault();
      // Add current hero name to left of area
      arenaView.setArenaRight();
      arenaView.initCloseArena();

      // TODO: jump to area on click
      //location.href="/arena#arena";

      console.log("arenaRight-btn clicked...");
    });
  }

  heroView.initHeroCreateButton = function() {
    $('#create-btn').off('click');
    $('#create-btn').one('click', function(e) {
      e.preventDefault();

      // TODO: refactor prompt for hero name create hero generic
      localStorage.heroName = $('#heroCreate').val();
      Hero.createHero(localStorage.heroName);
      heroController.index();
      $('#heroCreate').val('');
      console.log("create-btn clicked...");
    });
  }

  heroView.initFitbitNavCreateButton = function() {
    $('#ch-btn').off('click');
    $('#ch-btn').one('click', function(e) {
      e.preventDefault();

      localStorage.removeItem('heroName');

      heroController.index();
      console.log("ch-btn clicked...");
    });
  }

  heroView.initFitbitNavSync = function() {
    $('#fb-data-btn').one('click', function(e) {
      e.preventDefault();

      UserData.fetchJSON();

      // Update button states
      $('#fb-btn').show();
      $('#fb-data-btn').hide();
      $('#ch-btn').show();

      console.log("fb-btn clicked...");
    });
  }

  heroView.initFitbitNavAddFitbit = function() {
    $('#fb-btn').one('click', function(e) {

      // Update button states
      $('#fb-btn').show();
      $('#fb-data-btn').show();
      $('#ch-btn').show();

      console.log("fb-btn clicked...");
    });
  }

  /**  Render Fitbit Navigation **/

  heroView.renderFitbitNav = function() {
    heroView.initFitbitNavCreateButton();
    heroView.initFitbitNavAddFitbit();
    heroView.initFitbitNavSync();

    // $('#fb-btn').show();
    $('#fb-data-btn').show();
    $('#ch-btn').show();

    console.log("heroView.renderFitbitNav called...");
  }

  heroView.renderPlayerNav = function() {
    if (checkToken === false) {
      $('#arenaLeft-btn').show();
      heroView.initArenaLeftButton();
      $('#arenaRight-btn').show();
      heroView.initArenaRightButton();
      console.log("heroView.renderPlayerNav called...");
      checkToken = true;
      console.log("Check token is true");
    }
  }
  /**  Page Views **/

  heroView.emptyPage = function() {
    Hero.all = [];
    Hero.menu = [];

    heroView.hideAllHeroItems();
    // show hero section
    $('#hero').show();

    $('#createbox').show();
    $('#crform').show();
    $('#herobox').hide();

    // show #create-btn
    $('#create-btn').show();
    // show #intro
    $('#hero-instructions').show();
    // hide #hero-achievements
    $('#hero-achievements').hide();
    // show #hero-list
    $('#hero-list').show();

    // render functions
    heroView.initHeroCreateButton();
    Hero.menuBuilder(heroView.populateHeroList);

    console.log("heroView.emptyPage called...");
  }

  heroView.heroPage = function() {
    Hero.all = [];
    Hero.menu = [];

    heroView.hideAllHeroItems();
    // Hide create form
    $('#createbox').hide();
    // show hero section
    $('#hero').show();
    $('#herobox').show();

    // show #player-nav
    $('#player-nav').show();
    // show #fitbit-nav
    $('#fitbit-nav').show();
    // show #stats
    $('#hero-stats').show();
    // show #hero-achievements
    $('#hero-achievements').show();
    // show
    $('#hero-list').show();

    // render functions
    Hero.outputHero(localStorage.heroName,heroView.renderHero);
    heroView.renderPlayerNav();
    heroView.renderFitbitNav();
    heroView.renderStats();
    heroView.renderAchievements();
    Hero.menuBuilder(heroView.populateHeroList);

    console.log("heroView.heroPage called...");
  }

  heroView.heroSelect = function() {
    $('.hero-menu').one('click', function(e) {
      e.preventDefault();
      localStorage.heroName = $(this).text();
      console.log('this is in lc' + localStorage.heroName);
      heroController.index();
    });
  }

  module.heroView = heroView;
})(window);
