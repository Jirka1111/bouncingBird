Bird.MainMenu = function(game){};
Bird.MainMenu.prototype = {
    create: function(){
        // display images
        this.add.text((Bird.GAME_WIDTH-200)/2, 60, 'Bouncing Bird');
        // add the button that will start the game
        this.add.button(Bird.GAME_WIDTH-401-10, Bird.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
    },
    startGame: function() {
        // start the Game state
        this.state.start('Game');
    }
};