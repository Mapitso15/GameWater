var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false,
            setBounds: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var platforms;
var gameText;
var gameOver= false;
var score = 0;
var scoreText;
var groundLayer;
var rubyLayer;
var ruby;

function preload()
{
 this.load.image ('ocean', 'assets/ocean2.png');
 this.load.image('player', 'assets/scubac1.png');
 this.load.image('ground', 'assets/rock.png');
 this.load.image('obstacle1', 'assets/shipwreck1.png' );
 this.load.image('obstacle2', 'assets/chest.png');
 this.load.image('enemy1', 'assets/octup1.png');
 this.load.image('enemy2', 'assets/seahorse1.png');
 this.load.image('ruby', 'assets/ruby.png');
}

function create()
{

 //background image
this.add.sprite(0,0, 'ocean').setOrigin(0,0);
//add items
this.items = this.add.group({
	key: 'obstacle1',
	setXY: {
		x:600,
		y:500
	}
});
this.items = this.add.group({
	key: 'obstacle2',
	setXY: {
		x:40,
		y:520
	}
});

//Player

player = this.physics.add.sprite(150, 450, 'player');

player.setCollideWorldBounds(true);

/*this.anims.create({
     key: 'right',
     frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
     frameRate: 10,
     repeat: -1
 });*/

 cursors = this.input.keyboard.createCursorKeys();


//add enemy1
 this.physics.world.gravity.y = 60;

    var group = this.physics.add.group({
        defaultKey: 'enemy1',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true
    });

    group.create(200, 300).setVelocityX(180);
    group.create(300, 300).setGravity(0, 120);
  /*  group.create(400, 300).setGravity(0, -120);*/
   /* group.create(400, 300).setGravity(0, -180);*/
    group.create(500, 300, 'enemy1').body.allowGravity = true;

	//add enemy2
sprite1 = this.add.image(100, 100, 'enemy2');
    sprite2 = this.add.image(400, 100, 'enemy2');

    this.physics.world.enable([ sprite1, sprite2 ]);

    sprite1.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
    sprite2.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
this.physics.add.collider(player, group, sprite1, sprite2, null, this);
    //collider
    /*  this.physics.add.collider(player,enemy2);*/
    //ruby
/*    ruby = this.physics.add.group({
        key: 'ruby',
        repeat: 5,
        setXY: { x: 12, y: 8, stepX: 100 }
    });

    ruby.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    //platform for stars
this.physics.add.collider(ruby, platforms);
this.physics.add.overlap(player, ruby, collectStar, null, this);
platforms.create(600, 400, 'ground');*/
gameText = this.add.text(16, 16, '',{fontSize:'32', fill:'#000000'});

function endGame (group,sprite1, sprite2){
  this.physics.pause();
  gameOver = true;
}
}


function update()
{
  if (cursors.left.isDown)
{
    player.setVelocityY(-160);


    /*player.anims.play('left', true);*/
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    /*player.anims.play('right', true);*/
}
else
{
    player.setVelocityX(0);

  /*  player.anims.play('turn');*/
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityx(-330);
}

if(gameOver) {
  gameText.setText("Game Over!");
  return;
}
/*this.physics.world.collide(sprite1,sprite2);

function collectStar (player, ruby)
{
    ruby.disableBody(true, true);
}*/

}
