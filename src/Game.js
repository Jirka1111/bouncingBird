// Creates a new 'main' state that wil contain the game
Bird.Game = function(game) {
    this.bird = null;
    this.spikes = null;
    this.spikes2 = null;

    Bird.score = 0;
    Bird.scoreText = null;
};


Bird.Game.prototype = {
    preload: function() {

    },

    create: function() {
        // Function called after 'preload' to setup the game
        this.add.sprite(100, 245, 'bird');

        this.add.sprite(0, 0, "spikes");
        this.add.sprite(0, this.height-40, "spikes2");

        this.add.button(Bird.GAME_WIDTH-70, 70, "pause", this.managePause, this);

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable(this.bird, Phaser.Physics.ARCADE);
        this.bird.body.gravity.y = 1000;
        this.bird.body.velocity.x = 200;

        this.bird.body.collideWorldBounds = true;
        this.bird.body.bounce.setTo(1,1);

        Bird.scoreText = this.add.text(32, 50, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });

//        var space_key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//        space_key.onDown.add(this.jump, this);

    },

    update: function() {
        this.physics.overlap(this.bird, this.spikes, this.restart_game, null, this);
        this.physics.overlap(this.bird, this.spikes2, this.restart_game, null, this);

        if(game.input.activePointer.isDown){
            this.jump();
        }

//        if(this.bird.body.velocity.x > 0){
//            score += 1;
//            this.scoreText.setText(score);
//        }

        if(this.bird.body.x < 0){
            score += 1;
            this.scoreText.setText("score: " + score);
        }

        if(this.bird.body.x > game.width - 50){
            score += 1;
            this.scoreText.setText("score: " + score);
        }

    },

    jump: function(){
        this.bird.body.velocity.y = -350;
    },

    restart_game: function(){
        this.state.start('main');
        score = 0;
    },

    managePause: function(){
        this.pause = true;
        var pausedText = this.add.text(this.width/2, this.height/2, "Game paused.\nTap anywhere to continue.", { font: "15px Arial", fill: "#ffffff", align: "center" });
        this.input.onDown.add(function(){
            pausedText.destroy();
            this.pause = false;
        }, this);
    }

};
