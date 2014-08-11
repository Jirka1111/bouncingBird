Bird.Preloader = function(game){
    // define width and height of the game
    Bird.GAME_WIDTH = 400;
    Bird.GAME_HEIGHT = 490;
};
Bird.Preloader.prototype = {
    preload: function(){
        // set background color and preload image
        this.stage.backgroundColor = '#B4D9E7';
        this.preloadBar = this.add.sprite((Bird.GAME_WIDTH-311)/2, (Bird.GAME_HEIGHT-27)/2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load images
        this.load.image('bird', 'img/bird.png');

        this.load.image('pipe', 'img/pipe.png');

        this.load.image("spikes", "img/spikes.png");
        this.load.image("spikes2", "img/spikes2.png");

        this.load.image("pause", "img/pause.png");
        this.load.spritesheet('button-start',
            'img/button-start.png', 401, 143);

    },
    create: function(){
        // start the MainMenu state
        this.state.start('MainMenu');
    }
};