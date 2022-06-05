var score = 0;

var hero = {
	x: 500,
	y: 500
}

var enemy = [{x: 150, y: 20}, {x:250, y: 40}, {x:350, y:60}, {x: 500, y:80}, {x: 650, y: 60}, {x: 750, y: 40}, {x: 850, y: 20}]
var enemy2 = [{x: 425, y: 10},  {x:500, y:5}, {x: 575, y: 10}]
var bullets = [];

function displayHero(){
	document.getElementById('hero').style['top'] = hero.y + "px";
	document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayEnemy(){
	var output = '';
	for(var i=0; i<enemy.length; i++){
		output += "<div class='enemy1' style='top:"+enemy[i].y+"px; left:"+enemy[i].x+"px;'></div>"
	}
	for(var i=0; i<enemy2.length; i++){
		output += "<div class='enemy2' style='top:"+enemy2[i].y+"px; left:"+enemy2[i].x+"px;'></div>"
	}
	document.getElementById('enemies').innerHTML = output;
}

function displayBullets(){
	var output = '';
	for (var i=0; i<bullets.length; i++){
		output += "<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>"
	}
	document.getElementById('bullets').innerHTML = output;
}

function moveBullet(){
	for(var i=0; i<bullets.length; i++){
		bullets[i].y -= 5;

		if(bullets[i].y < 0){
			bullets[i] = bullets[bullets.length-1];
			bullets.pop();
			// console.log(bullets);
		}
	}
}

function displayScore(){
	document.getElementById('score').innerHTML = score;
}

function detectCollision(){
	for(var i=0; i<bullets.length; i++){
		for(var j=0; j<enemy.length; j++){

			if(Math.abs(bullets[i].x - enemy[j].x) < 10 &&
			Math.abs(bullets[i].y - enemy[j].y) < 10) {
				console.log('bullet', i, 'and enemy', j, 'collided');
				score += 10;
				}
			}
		for(var k=0; k<enemy2.length; k++){

			if(Math.abs(bullets[i].x - enemy2[k].x) < 10 &&
			Math.abs(bullets[i].y - enemy2[k].y) < 10) {
				console.log('bullet', i, 'and enemy2', k, 'collided');
				score += 50;
			}
		}
	}
}

function heroCollision(){
	for(var j=0; j<enemy.length; j++){

		if(Math.abs(hero.x - enemy[j].x) < 10 &&
		Math.abs(hero.y - enemy[j].y) < 10) {
			console.log('hero and enemy', j, 'collided');
			score -= 500;
		}
	}
	for(var k=0; k<enemy2.length; k++){

		if(Math.abs(hero.x - enemy2[k].x) < 10 &&
		Math.abs(hero.y - enemy2[k].y) < 10) {
			console.log('hero and enemy2', k, 'collided');
			score -= 500;
  	}
  }
}

function moveEnemy(){
	for(var i=0; i<enemy.length; i++){
		enemy[i].y += 5;

		if(enemy[i].y > 540){
			enemy[i].y = 0;
			enemy[i].x = Math.random()*500;
		}
	}
	for(var j=0; j<enemy2.length; j++){
		enemy2[j].y += 5;

		if(enemy2[j].y > 540){
			enemy2[j].y = 0;
			enemy2[j].x = Math.random()*500;
		}
	}
}

function gameLoop(){
		displayEnemy();
		moveEnemy();
		displayHero();
		moveBullet();
		displayBullets();
		detectCollision();
		displayScore();
		heroCollision();
}

setInterval(gameLoop, 50);

document.onkeydown = function(a){
	if(a.keyCode == 37){
		hero.x -= 10;
	}
	else if(a.keyCode == 39){
		hero.x += 10;
	}
	if(a.keyCode == 38){
		hero.y -= 10;
	}
	else if(a.keyCode == 40){
		hero.y += 10;
	}
	if(a.keyCode == 32){
		bullets.push({x: hero.x+8 , y: hero.y-15  });
		// console.log(bullets);
		displayBullets();
	}
	displayHero();
	// console.log(hero);
}
displayEnemy();
displayHero();