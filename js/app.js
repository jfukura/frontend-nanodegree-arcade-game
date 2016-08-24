// Get some information about our canvas
var canvas = document.getElementsByTagName('canvas')[0];
var cell = {'h' : 83, 'w': 101};

console.log(canvas.width, canvas.height);

/**
 * The Enemy is out there
 *
 * @param {Integer} spd - A speed multiplier for this enemy
 * @param {[type]} x    - Initial x location
 * @param {[type]} y    - Initial y location
 */
var Enemy = function(spd, x, y) {

    this.sprite = 'images/enemy-bug.png';   // what the enemy looks like
    this.speed = spd;                       // the enemy's speed
    this.x = x;                             // the enemy's initial x location
    this.y = (cell.h * y) - 30;                    // the enemy's initial y location
};

/**
 * Update the Enemy unit
 *
 * @param  {Number} dt - Timer
 */
Enemy.prototype.update = function(dt) {

    // If the position is greater than the width of the canvas, move the enemy
    // back to the starting position, otherwise, move the enemy at the speed
    // prescribed in their object.
    if (this.x > canvas.clientWidth) {
        this.x = -100;
    } else {
        this.x = Math.round(this.x + (dt * this.speed));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (img) {
    // Player class
    // Player needs to be able to select a character
    this.sprite = 'images/' + img + '.png';

    this.x = (canvas.clientWidth / 2) - 50.5 ;
    this.start = canvas.clientHeight - 221;
    this.y = this.start;
};

Player.prototype.update = function () {
    var pl = this;

    allEnemies.forEach(function(enemy) {

        if (Math.round(pl.x / 10) * 10 === Math.round(enemy.x / 10) * 10 && pl.y === enemy.y) {
            pl.y = pl.start;
        }
    });

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {

    if (e === 'up' && this.y - cell.h > 0) {
        this.y = this.y - cell.h;
    } else if (e === 'up' && this.y - cell.h <= 0) {
        window.open('http://www.hamsterdance.org/hamsterdance/', '_blank');
        this.y = this.start;
    } else if (e === 'down' && this.y + cell.h < canvas.height - (cell.h * 2)) {
        this.y = this.y + cell.h;
    } else if (e === 'left' && this.x > 0) {
        this.x = this.x - cell.w;
    } else if (e === 'right' && this.x < canvas.width - cell.w) {
        this.x = this.x + cell.w;
    }

};

// Our hero
var player = new Player('char-boy');

// Meet the bugs
var sam = new Enemy(200, 2, 1);
var elliot = new Enemy(100, -100, 2);
var iam = new Enemy(150, 2, 3);

// An array of bugs.  Probably the most terrifying thing to a developer.  Har Har
var allEnemies = [sam, elliot, iam];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
