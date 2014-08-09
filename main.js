// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

var score = 0;
var scoreText = null;

// Creates a new 'main' state that wil contain the game
var main_state = {


    preload: function() {
        // Function called first to load all the assets
        this.game.stage.backgroundColor = '#565656';

        this.game.load.image('bird', 'assets/bird.png');

        this.game.load.image('pipe', 'assets/pipe.png');

        this.game.load.image("spikes", "assets/spikes.png");
        this.game.load.image("spikes2", "assets/spikes2.png");

        this.game.load.image("pause", "assets/pause.png");
    },

    create: function() {
        // Function called after 'preload' to setup the game
        this.bird = this.game.add.sprite(100, 245, 'bird');

        this.spikes = this.game.add.sprite(0, 0, "spikes");
        this.spikes2 = this.game.add.sprite(0, this.game.height-40, "spikes2");

        this.game.add.button(game.width-70, 70, "pause", this.managePause, this);

        this.bird.body.gravity.y = 1000;
        this.bird.body.velocity.x = 200;

        this.bird.body.collideWorldBounds = true;
        this.bird.body.bounce.setTo(1,1);

        this.scoreText = game.add.text(32, 50, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });

//        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//        space_key.onDown.add(this.jump, this);

    },

    update: function() {
        this.game.physics.overlap(this.bird, this.spikes, this.restart_game, null, this);
        this.game.physics.overlap(this.bird, this.spikes2, this.restart_game, null, this);

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
        this.game.state.start('main');
        score = 0;
    },

    managePause: function(){
        this.game.pause = true;
        var pausedText = this.add.text(this.game.width/2, this.game.height/2, "Game paused.\nTap anywhere to continue.", { font: "15px Arial", fill: "#ffffff", align: "center" });
        this.game.input.onDown.add(function(){
            pausedText.destroy();
            this.game.pause = false;
        }, this);
    }



};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');