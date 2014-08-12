Bird.Game = function(game) {
    this.bird = null;
    this.spikes = null;
    this.spikes2 = null;
    this.fontStyle = null;
    this.sideSpikes = null;

    Bird.score = 0;
    Bird.scoreText = null;
    var paused = true;
};


Bird.Game.prototype = {
    create: function(){

        this.bird = this.add.sprite(100, 245, 'bird');

        this.spikes = this.add.sprite(0, 0, "spikes");
        this.spikes2 = this.add.sprite(0, Bird.GAME_HEIGHT-40, "spikes2");

        this.sideSpikes = this.add.group();
        this.sideSpikes.enableBody = true;
        this.sideSpikes.physicsBodyType = Phaser.Physics.ARCADE;

        this.add.button(Bird.GAME_WIDTH-70, 70, "pause", this.managePause, this);

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable([this.bird, this.spikes, this.spikes2, this.sideSpikes], Phaser.Physics.ARCADE);
        this.bird.body.gravity.y = 1000;
        this.bird.body.velocity.x = 200;

        this.bird.body.collideWorldBounds = true;
        this.bird.body.bounce.setTo(1,1);

        this.spikes.body.immovable = true;
        this.spikes2.body.immovable = true;


        this.fontStyle =  { font: "20px Arial", fill: "#9B30FF", stroke: "#333", strokeThickness: 3, align: "center" };

        Bird.scoreText = this.add.text(32, 50, 'score: 0', { font: "20px Arial", fill: "#9B30FF", align: "left" });
    },

    update: function() {
        if(this.game.physics.arcade.collide(this.bird, this.spikes)){
            this.restart_game();
        }
        if(this.game.physics.arcade.collide(this.bird, this.spikes2)){
            this.restart_game();
        }
        if(this.game.physics.arcade.collide(this.bird, this.sideSpikes)){
            this.restart_game();
        }

        this.game.input.onDown.add(this.mouseClick, this);

        if(this.bird.body.x <= 0){
            Bird.score += 1;
            this.addRightSpikes();
            Bird.scoreText.setText("score: " + Bird.score);
        }

        if(this.bird.body.x >= Bird.GAME_WIDTH - 50){
            Bird.score += 1;
            this.addLeftSpikes();
            Bird.scoreText.setText("score: " + Bird.score);
        }
    },

    jump: function(){
        this.bird.body.velocity.y = -350;
    },

    restart_game: function(){
        this.game.state.start('MainMenu');
        Bird.score = 0;
    },

    mouseClick: function(){
        this.jump();
    },

    addLeftSpikes: function(){
        for(var i = 0; i < 5; i++){
            var group = this.sideSpikes.create(0, this.game.rnd.integerInRange(0, 400), "sideSpikes");
            group.body.immovable = true;
        }
    },

    addRightSpikes: function(){
        for(var i = 0; i < 5; i++){
            var group = this.sideSpikes.create(Bird.GAME_WIDTH-16, this.game.rnd.integerInRange(0, 400), "sideSpikes");
            group.body.immovable = true;
        }
    },

    managePause: function() {
        this.game.paused = true;
        var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this.fontStyle);
        this.input.onDown.add(function(){
            pausedText.destroy();
            this.game.paused = false;
        }, this);
    }
};
