/**
 * Created by jipei on 8/20/15.
 */

window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
    var scoreLeft = 0;
    var scoreRight = 0;

    var playerLeft;
    var playerRight;
    var ball;


    function preload () {
        game.load.image('ball', 'ball.png');
        game.load.image('bar','bar.png');
    }

    function create () {
        game.stage.backgroundColor = '#666';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        playerLeft = game.add.sprite(20, game.world.centerY, 'bar');
        playerLeft.anchor.setTo(0.5, 0.5);
        playerLeft.scale.setTo(2,3);
        game.physics.arcade.enable(playerLeft);
        playerLeft.body.collideWorldBounds = true;
        playerLeft.body.immovable = true;

        playerRight = game.add.sprite(game.world.width - 20, game.world.centerY, 'bar');
        playerRight.anchor.setTo(0.5, 0.5);
        playerRight.scale.setTo(2,3);
        game.physics.arcade.enable(playerRight);
        playerRight.body.collideWorldBounds = true;
        playerRight.body.immovable = true;

        ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
        ball.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable(ball);
        var speed = 600;
        ball.body.velocity.y = Math.random()*500;
        ball.body.velocity.x = speed - ball.body.velocity.y;
        ball.body.collideWorldBounds = true;
        ball.body.bounce.x = 1;
        ball.body.bounce.y = 1;
        ball.body.friction = 100;




        // score and pause
        left_score_label = game.add.text(20, 20, 'Score', { font: '24px Arial', fill: '#fff'});
        right_score_label = game.add.text(game.world.width - 20, 20, 'Score', { font: '24px Arial', fill: '#fff'});
        right_score_label.anchor.setTo(1,0);

        // Create a label to use as a button
        pause_label = game.add.text(game.world.centerX-50, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
        pause_label.inputEnabled = true;
        pause_label.anchor.setTo(0.5,0);
        pause_label.events.onInputUp.add(function () {
            // When the paus button is pressed, we pause the game
            game.paused = true;
            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = game.add.text(game.world.width/2, game.world.height-150, 'Click anywhere to continue', { font: '30px Arial', fill: '#fff' });
            choiseLabel.anchor.setTo(0.5, 0.5);
        });

        // Create a label to use as a button
        restart_label = game.add.text(game.world.centerX+50, 20, 'Restart', { font: '24px Arial', fill: '#fff' });
        restart_label.inputEnabled = true;
        restart_label.anchor.setTo(0.5,0);
        restart_label.events.onInputUp.add(restart);

    }
    function restart () {
        playerLeft.y = game.world.centerY;
        playerRight.y = game.world.centerY;
        ball.x = game.world.centerX;
        ball.y = game.world.centerY;

        ball.body.velocity.y = 0;
        ball.body.velocity.x = 0;

        game.time.events.add(Phaser.Timer.SECOND*1, startGame, this);
    }

    function startGame () {

        var speed = 600;
        ball.body.velocity.y = Math.random()*500;
        ball.body.velocity.x = speed - ball.body.velocity.y;
    }
    function update () {
        left_score_label.text = 'score  ' + scoreLeft ;
        right_score_label.text = 'score  ' + scoreRight ;
        var cursors = game.input.keyboard.createCursorKeys();
        var wasd = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        playerRight.body.velocity.y = 0;
        playerLeft.body.velocity.y = 0;

        if(cursors.up.isDown){
            playerRight.body.velocity.y = -300;
        }else if(cursors.down.isDown){
            playerRight.body.velocity.y = 300;
        }

        if(wasd.up.isDown){
            playerLeft.body.velocity.y = -300;
        }else if(wasd.down.isDown){
            playerLeft.body.velocity.y = 300;
        }

        game.physics.arcade.collide(ball, playerLeft);
        game.physics.arcade.collide(ball, playerRight);

        if(ball.x > game.world.width - 20){
            scoreLeft++;
            restart();
        }else if(ball.x < 20){
            scoreRight++;
            restart();
        }
    }

    function render() {

        // Display
        //game.debug.spriteBounds(playerRight);

    }
};