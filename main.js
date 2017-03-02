var AM = new AssetManager();

var SCREEN_WIDTH = 1280;
var SCREEN_HEIGHT = 720;

// Begin download queue.
AM.queueDownload("./img/tiles/dungeon1.png");
AM.queueDownload("./img/barbarian_spritesheet.png");
AM.queueDownload("./img/skeleton_spritesheet.png");
AM.queueDownload("./img/skeleton_gorganthor_spritesheet.png");
AM.queueDownload("./img/villager1_spritesheet.png");
AM.queueDownload("./img/zombie.png");
AM.queueDownload("./img/healthpot.png");
AM.queueDownload("./img/gui/objective.png");
AM.queueDownload("./img/gui/overlay.png");

AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var musicDungeon = document.getElementById("dungeon_music");
	musicDungeon.loop = true;
    musicDungeon.play();

    var gameEngine = new GameEngine(AM.getAsset("./img/gui/objective.png"), AM.getAsset("./img/gui/overlay.png"));
    gameEngine.init(ctx);	
	var level = new Level(gameEngine, AM.getAsset("./img/tiles/dungeon1.png"), level_dungeon1, tile_logic_dungeon1);
	//var level = new Level(gameEngine, AM.getAsset("./img/tiles/dungeon1.png"), level_test0, tile_logic_dungeon1);
    gameEngine.setLevel(level);
	
    gameEngine.start();

    var sheetWidth = 120 * 15 * 5;
    var sheetHeight = 120 * 5;

    //Draw and add Barbarian
  	var barbarian_spritesheet = AM.getAsset("./img/barbarian_spritesheet.png");
  	var barbarian_canvas = document.createElement('canvas');
    barbarian_canvas.width = sheetWidth;
    barbarian_canvas.height = sheetHeight;
    var barbarian_ctx = barbarian_canvas.getContext('2d');
    barbarian_ctx.save();
	barbarian_ctx.scale(-1, 1);
    barbarian_ctx.drawImage(barbarian_spritesheet, 0 - sheetWidth, 0);
    barbarian_ctx.restore();
    var randomCoords = level.getRandomLocation();
	var barbarianPC = new CharacterPC(gameEngine, barbarian_spritesheet, barbarian_canvas, randomCoords.x, randomCoords.y, 175, 1);
    gameEngine.addEntity(barbarianPC);


    //Draw and add Gorganthor
  	var gorganthor_spritesheet = AM.getAsset("./img/skeleton_gorganthor_spritesheet.png");
  	var gorganthor_canvas = document.createElement('canvas');
    gorganthor_canvas.width = sheetWidth;
    gorganthor_canvas.height = sheetHeight;
    var gorganthor_ctx = gorganthor_canvas.getContext('2d');
    gorganthor_ctx.save();
	gorganthor_ctx.scale(-1, 1);
    gorganthor_ctx.drawImage(gorganthor_spritesheet, 0 - sheetWidth, 0);
    gorganthor_ctx.restore();
	randomCoords = level.getRandomLocation();
	var gorganthorTheDefiler = new GORGANTHOR(gameEngine, gorganthor_spritesheet, gorganthor_canvas, randomCoords.x, randomCoords.y, 110, 2);
	gameEngine.addEntity(gorganthorTheDefiler);	
	//apply_AI_Wander(gorganthorTheDefiler);

	
	// randomCoords = level.getRandomLocation();
	// var missDemeanor = new Ally_Villager(gameEngine, AM.getAsset("./img/villager1_spritesheet.png"), randomCoords.x, randomCoords.y, 110, 1);
    // gameEngine.addEntity(missDemeanor);
	// apply_AI_Wander(missDemeanor);
	

	for(var i = 0; i < 15; i++) {	
		randomCoords = level.getRandomLocation();
		var zombie = new Zombie(gameEngine, AM.getAsset("./img/zombie.png"), randomCoords.x, randomCoords.y);
		gameEngine.addEntity(zombie);
		//apply_AI_Wander(zombie);
	}
  
  	//Draw and add Skeleton
  	var skeleton_spritesheet = AM.getAsset("./img/skeleton_spritesheet.png");
  	var skeleton_canvas = document.createElement('canvas');
    skeleton_canvas.width = sheetWidth;
    skeleton_canvas.height = sheetHeight;
    var skeleton_ctx = skeleton_canvas.getContext('2d');
    skeleton_ctx.save();
	skeleton_ctx.scale(-1, 1);
    skeleton_ctx.drawImage(skeleton_spritesheet, 0 - sheetWidth, 0);
    skeleton_ctx.restore();
	for(var i = 0; i < 15; i++) {
		randomCoords = level.getRandomLocation();
		var swordyMcSwordface = new Enemy_Skeleton_Melee(gameEngine, skeleton_spritesheet, skeleton_canvas, randomCoords.x, randomCoords.y, 110, 1);
	    gameEngine.addEntity(swordyMcSwordface);

		//apply_AI_Wander(swordyMcSwordface);

	}
	
	for(var i = 0; i < 30; i++) {
		randomCoords = level.getRandomLocation();
		var healthPot = new HealthPotion(gameEngine, AM.getAsset("./img/healthpot.png"), randomCoords.x, randomCoords.y, barbarianPC);
	    gameEngine.addEntity(healthPot);

	}

	// for(var i = 0; i < 2; i++) {
		// randomCoords = level.getRandomLocation();
		// var largeMcSwordface = new Large_Skeleton_Melee(gameEngine, AM.getAsset("./img/skeleton_spritesheet.png"), randomCoords.x, randomCoords.y, 25, 2);
	    // gameEngine.addEntity(largeMcSwordface);
	    // apply_AI_Wander(largeMcSwordface);
	// }

	
	// Add objectives
	gameEngine.objectives.add(objective_killgorganthor);
	gameEngine.objectives.add(objective_findexit);
	
    console.log("All Done!");	
});
