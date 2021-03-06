(function(module) {
    var arenaView = {};

    arenaView.heroes = [];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    arenaView.battle = function() {
      // arenaView.heroes = arenaView.heroes.slice((arenaView.heroes.length-2), (arenaView.heroes.length-1));
      console.log(arenaView.heroes);
        arenaView.heroes.forEach(function(h) {
            var s = ((h.strength + h.stamina + h.speed) / 3).toFixed(0);
            h.level = parseInt(s);

            console.log(h.charName + " is level " + h.level);
        });

        arenaView.heroes.sort(function(a,b) {
            console.log('level a: ' + a.level + ' vs. level b: ' + b.level);

            if(a.level > b.level) {
                arenaView.victor = a;
                arenaView.coronate(a.charName + ' is the victor.');
            } else if(b.level > a.level) {
                arenaView.victor = b;
                arenaView.coronate(b.charName + ' is the victor.');
            } else {
                arenaView.coronate('The battle was a draw.');
            }
        });

        //Reset the array after each battle.
        arenaView.heroes = [];

        console.log('arenaView.battle called....');
    }

    arenaView.coronate = function(string) {
        $('#contestant').hide();
        $('#victory-name').show();
        $('#victory-name').html(string);

        console.log("arenaView.coronate called...");
    }

    arenaView.setArenaLeft = function() {
        // Update view
        $("#arena").show();

        // Set data elements
        arenaView.heroes.push(Hero.all[0]);
        $('#victory-name').hide();
        $('#contestant').show();
        $('#contestant1').html(Hero.all[0].charName);


        console.log("arenaView.setArenaLeft called...");
    }

    arenaView.setArenaRight = function() {
        // Update view
        $("#arena").show();

        // Set data elements
        arenaView.heroes.push(Hero.all[0]);
        $('#victory-name').hide();
        $('#contestant').show();
        $('#contestant2').html(Hero.all[0].charName);


        console.log("arenaView.setArenaRight called...");
    }

    arenaView.displayVid = function() {
        $.getJSON('assets/data/videoList.json', function(rawData) {
            rawData.forEach(function(item) {
                var video = new Video(item);
                console.log(video);
                Video.menu.push(video);
            })
        }).done(function() {
            $('#videoWrapper').show();
            var n = getRandomInt(0, Video.menu.length);
            console.log(n);
            console.log(Video.menu[n].htmlcode);
            $('#videoWrapper').html(Video.menu[n].htmlcode);
            Video.menu = [];
        });

        console.log("arenaView.displayVid called...");
    }


    /**  Button Handlers **/

    arenaView.initBattle = function() {
        $('#battle-btn').on('click', function(e) {
            e.preventDefault();
            console.log("INIT BATTLE");

            // Start battle - arenaView.battle
            arenaView.battle();
            arenaView.displayVid();

            // Update button states
            $('#battlenames').hide();
            $('#battle-btn').hide();

            console.log("battle-btn clicked...");
        });
    }

    arenaView.initCloseArena = function() {
        $('#closeArena-btn').on('click', function(e) {
            e.preventDefault();

            // Update button states
            arenaView.resetArena();
            $('#arena').hide();

            console.log("battle-btn clicked...");
        });
    }

    arenaView.resetArena = function() {
      arenaView.victor = {};
      arenaView.heroes = [];
      $('#battlenames').show();
      $('#victory-name').hide();
      $('#videoWrapper').hide();
      $('#contestant1').html('');
      $('#contestant2').html('');
      $('#battle-btn').show();
    }



    /**  Page Views **/

    arenaView.arenaPage = function() {
        $('#arena').show();

        // render functions
        arenaView.initBattle();
        arenaView.initCloseArena();

        console.log("arenaView.arenaPage called...");
    }


    module.arenaView = arenaView;
})(window);
