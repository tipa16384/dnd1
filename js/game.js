var Game = function () {
	this.chrNames = 'HP/STR/DEX/CON/CHAR/WIS/INT/GOLD'.split('/');	// C$
	this.chrs = new Array();		// C
	this.store = new Array();		// I$
	this.monster = new Array();		// B
	this.cls = "NO CLASS";			// C$(0)
	this.inventory = new Array();	// W
	this.playerX = 0;				// G
	this.playerY = 0;				// H
	this.levelMod = 1;				// J4

	this.dungeonLoaded = false;

	this.store[this.store.length] = new Item("Sword", 10, "F");
	this.store[this.store.length] = new Item("2-H-Sword", 15, "F");
	this.store[this.store.length] = new Item("Dagger", 3, "FW");
	this.store[this.store.length] = new Item("Mace", 5, "FC");
	this.store[this.store.length] = new Item("Spear", 2, "F");
	this.store[this.store.length] = new Item("Bow", 25, "F");
	this.store[this.store.length] = new Item("Arrows", 2, "F");
	this.store[this.store.length] = new Item("Leather Mail", 15, "FCW");
	this.store[this.store.length] = new Item("Chain Mail", 30, "FC");
	this.store[this.store.length] = new Item("Tlte Mail", 50, "F");
	this.store[this.store.length] = new Item("Rope", 1, "FCW");
	this.store[this.store.length] = new Item("Spikes", 1, "FCW");
	this.store[this.store.length] = new Item("Flask of Oil", 2, "FCW");
	this.store[this.store.length] = new Item("Silver Cross", 25, "FCW");
	this.store[this.store.length] = new Item("Spare Food", 5, "FCW");

	this.monster[this.monster.length] = new Monster("Man", 1, 13, 26, 500);
	this.monster[this.monster.length] = new Monster("Goblin", 2, 13, 24, 600);
	this.monster[this.monster.length] = new Monster("Troll", 3, 15, 35, 1000);
	this.monster[this.monster.length] = new Monster("Skeleton", 4, 22, 12, 50);
	this.monster[this.monster.length] = new Monster("Balrog", 5, 18, 110, 5000);
	this.monster[this.monster.length] = new Monster("Ochre Jelly", 6, 11, 20, 0);
	this.monster[this.monster.length] = new Monster("Grey Ooze", 7, 11, 13, 0);
	this.monster[this.monster.length] = new Monster("Gnome", 8, 13, 30, 100);
	this.monster[this.monster.length] = new Monster("Kobold", 9, 15, 16, 500);
	this.monster[this.monster.length] = new Monster("Mummy", 10, 16, 30, 1000);

	this.dungeons = new Array();
	this.dungeons[1] = "1111111111111111111111111110000000000010000000000001121010111011111010111111011610100010100000101010000111111310111011111010101111100016100000101200103000011110111011111011011011110110100000100010114110100001101113111060101600101011111040000010001116201010000110100006100040111310111101101020001114100000100011011011111411001011111011110110000010000110000010000001111110111311101110001111111000001000100010001000000110101010111110101111111101141010100000101000100000011011101111101111101011111110001000101000000010001001101111111013111110111010011310000000002100001010400110041114110111411110111131166110110101010120101101011663000201000100100001660111111111111111111111111111";

	this.state = 0;
	this.lvl = "**********U  XR  ** ***** ** XT*   ****** ****  $*  $** *** ****  A   D**********";
	this.dungeonNumber = 0;		// D
	this.continuousReset = 0;	// J6
	this.playerName = "SHAVS";	// N$

	this.monsterDeadFlag = 0;	// K1
	this.currentMonster = null;	// K
};

Game.prototype.getGold = function () {
	if (this.chrs.length > 7) {
		return this.chrs[7];
	} else {
		return 0;
	}
}

Game.prototype.setGold = function (g) {
	if (this.chrs.length > 7) {
		this.chrs[7] = g;
	}
}

Game.prototype.getHealth = function () {
	if (this.chrs.length > 7) {
		return this.chrs[0];
	} else {
		return 0;
	}
}

Game.prototype.setHealth = function (g) {
	if (this.chrs.length > 0) {
		this.chrs[0] = g;
	}
}

Game.prototype.getState = function () {
	return this.state;
}

Game.prototype.setState = function (st) {
	this.state = st;
}

Game.prototype.randomizePlayerPosition = function () {
	this.playerX = randint(24) + 1;
	this.playerY = randint(24) + 1;

	this.playerX = this.playerY = 3;
}

Game.prototype.getAt = function (x, y) {
	var pos = y * 26 + x;
	if (pos >= this.lvl.length) {
		return '@';
	} else {
		return this.lvl[pos];
	}
}

Game.prototype.setAt = function (x, y, sym) {
	var pos = y * 26 + x;
	if (pos < this.lvl.length) {
		this.lvl = this.lvl.substring(0, pos) + sym + this.lvl.substring(pos + 1);
	}
}

Game.prototype.lookAround = function () {
	for (var m = -5; m <= 5; ++m) {
		var rown = '';
		for (var n = -5; n <= 5; ++n) {
			var nx = this.playerX + n;
			var ny = this.playerY + m;
			if (nx >= 0 && nx <= 25 && ny >= 0 && ny <= 25) {
				var sym = this.lvl[nx + ny * 26];
				if (m == 0 && n == 0) {
					sym = '9';		// player
				} else if (sym == '2') {
					sym = '0';
				} else if (sym == '7' || sym == '8') {
					sym = '0';
				} else if (sym == '3') {
					sym = '1';
				}
				rown = rown + sym;
			}
		}
		pri(rown);
	}
}

Game.prototype.lookEverywhere = function () {
	for (var m = 0; m <= 25; ++m) {
		pri(this.lvl.slice(m * 26, (m + 1) * 26));
	}
}

Game.prototype.monsterMove = function () {
	var addlLogic = false;

	if (this.getHealth() == 1) {
		pri("Watch it H.P.= " + this.getHealth());
	} else if (this.getHealth() == 0 && this.chrs[3] >= 9) {
		pri("H.P.=0 but const. holds");
	}

	if (this.monsterDeadFlag == -1) {
		// line 8290
		console.log("monsterMove: monsterDeadFlag == -1");
		this.monsterDeadFlag = 0;
		this.setGold(this.getGold() + this.currentMonster.gold);
		this.lvl[this.currentMonster.monsterY * 26 + this.currentMonster.monsterX] = '0';
		pri("Good work you just killed a " + this.currentMonster.name);
		pri("and get " + this.currentMonster.gold + " gold pieces");
		if (this.continuousReset != 1) {
			this.currentMonster.maxGold = 0;
		}
		pri("You have " + this.getGold() + " gold");
		this.currentMonster.gold = 0;
		if (this.continuousReset == 1) {
			this.currentMonster.gold = this.currentMonster.maxGold * this.currentMonster.level;
			this.currentMonster.health = this.currentMonster.maxHealth * this.currentMonster.level;
		}
		this.currentMonster = null;
		this.process(7000);
	} else if (this.getHealth() <= 0) {
		// line 8160
		console.log("monsterMove: this.getHealth() <= 0");
		while (this.getHealth() < 0 && this.chrs[3] >= 9) {
			this.chrs[3] -= 2;
			this.setHealth(this.getHealth() + 1);
		}
		if (this.getHealth() < 0 || (this.getHealth() == 0 && this.chrs[3] < 9)) {
			pri("Sorry your dead");
			this.process(-1);
		} else {
			this.process(7000);
		}
	} else if (this.currentMonster) {
		// line 7160
		console.log("monsterMove: this.currentMonster");
		this.process(1590);
	} else if (this.playerX == 1 && this.playerY == 12) {
		console.log("monsterMove: at store");
		// line 7050 -- store
		pri("So you have returned");
		if (this.getGold() < 100) {
			addlLogic = true;
		} else {
			this.setGold(this.getGold() - 100);
			inp("Want to buy more equipment", ['YES', 'NO']);
			this.state = 7090;
		}
	} else {
		// maybe spawn monster, line 7110
		addlLogic = true;
	}

	// line 7110
	if (addlLogic) {
		console.log("monsterMove: maybe spawn monster");
		if (randint(20) > 10) {
			this.process(7830);
		} else {
			this.process(1590);
		}
	}
}

// LINE 1730
Game.prototype.unauthorized = function () {
	pri("WHO SAID YOU COULD PLAY?");
}

Game.prototype.loadDungeon = function () {
	// dungeon 0 is a secret blank dungeon
	if (this.dungeonNumber == 0) {
		this.lvl = '';
		for (var i = 0; i < 25 * 25; ++i) {
			this.lvl += '0';
		}
	} else {
		this.lvl = this.dungeons[1];
		for (var i = 0; i < this.lvl.length; ++i) {
			var sym = this.lvl[i];
			if (sym == '0') {
				if (randint(100) >= 97) {
					sym = '7';
				}
				if (randint(100) >= 97) {
					sym = '8';
				}
				this.lvl[i] = sym;
			}
		}
	}
	this.dungeonLoaded = true;
}

Game.prototype.rollCharacter = function () {
	for (var i = 1; i < this.chrNames.length; ++i) {
		var v = 0;
		for (var j = 0; j < 3; ++j) {
			v += randint(6);
		}
		if (this.chrNames[i] == 'GOLD') {
			v *= 15;
		}
		this.chrs[i] = v;
		pri(this.chrNames[i] + "= " + this.chrs[i]);
	}

	pri();
	pri("Classification");
	pri("Which do you want to be");
}

Game.prototype.process = function (newState) {
	if (typeof newState != 'undefined') {
		this.state = newState;
	}

	var cmd = getCommand();
	var shopPrompt = "";
	console.log('process: cmd=' + cmd + ', state=' + this.state);

	switch (this.state) {
		case -1:	// game stop
			pri("END OF LINE.");
			$('.console').hide();
			break;

		case 0:		// game start
			showTitle();
			this.process(1);
			break;
		case 1:		// ask if instructions needed
			inp('DO YOU NEED INSTUCTIONS', ["YES", "NO"]);
			this.state = 2;
			break;
		case 2:		// instructions response
			console.log('instructions response was ' + cmd);
			if (cmd == 'YES') {
				pri("Who taught YOU to play?");
				this.process(1);
			} else {					// go to old or new game.
				this.process(3);
			}
			break;
		case 3:		// old or new game
			inp("OLD OR NEW GAME", ["OLD", "NEW"]);
			this.state = 4;
			break;
		case 4:		// response to old or new game
			if (cmd == 'OLD') {
				this.process(5);	// read in the old game.
			} else {
				this.process(6);	// continue with new game
			}
			break;
		case 5:		// read in old game
			pri("OLD GAMES CANNOT YET BE READ.");
			this.process(3);		// send them back to the question for now
			break;
		case 6:		// get dungeon number
			inp("Dungeon #");
			this.state = 7;
			break;
		case 7:		// dungeon number entered.
			this.dungeonNumber = Number(cmd);
			if (this.dungeonNumber >= 0 && this.dungeonNumber <= 6) {
				this.process(8);	// continuous reset
			} else {
				this.process(6);	// bad dungeon number
			}
			break;
		case 8:		// continuous reset
			inp("Continues Reset 1=Yes,2=No");
			this.state = 9;
			break;
		case 9:		// continuous reset response
			this.continuousReset = Number(cmd);
			if (this.continuousReset >= 1 && this.continuousReset <= 2) {
				this.process(10);	// player name
			} else {
				this.process(8);	// bad response
			}
			break;
		case 10:	// get player name
			inp("Players Nme");
			this.state = 110;
			break;
		case 110:	// player name response
			if (cmd != "SHAVS") {
				this.unauthorized();
			}
			this.playerName = cmd;
			this.process(115);		// roll character
			break;
		case 115:	// roll character
			this.rollCharacter();
			this.process(120);		// get class
			break;
		case 120:	// get class
			inp("Fighter ,Cleric ,or Wizard", "NONE/FIGHTER/CLERIC/WIZARD".split('/'));
			this.state = 130;
			break;
		case 130:	// class response
			this.state = 140;		// buying weapons
			this.cls = cmd;
			if (cmd == 'NONE') {
				this.state = 115;
			} else if (cmd == 'FIGHTER') {
				this.chrs[0] = randint(8);
			} else if (cmd == 'CLERIC') {
				this.chrs[0] = randint(6);
			} else if (cmd == 'WIZARD') {
				this.chrs[0] = randint(4);
			} else {
				this.state = 120;	// ask for class again
			}
			this.process();
			break;
		case 140:		// buying gear
			pri("Buying Weapons");
			inp("Fast or Norm", ['FAST', 'NORM']);
			this.state = 150;
			break;
		case 150:		// fast or norm response
			pri("Number".pad(7) + "Item".pad(15) + "Price");
			pri("-1-Stop");
			if (cmd != "FAST") {
				this.process(155);
			} else {
				shopPrompt = "";
				this.process(160);
			}
			break;
		case 155:		// show inventory
			for (var i = 0; i < this.store.length; ++i) {
				pri(String(i + 1).pad(7) + this.store[i].name.pad(15) + this.store[i].cost);
			}
			shopPrompt = "";
			this.process(160);
			break;
		case 160:		// shop prompt
			inp(shopPrompt);
			this.state = 170;
			break;
		case 170:		// shop prompt answer
			cmd = Number(cmd);
			if (!cmd) {
				cmd = 0;
			}
			if (cmd == 0) {
				this.process(155);
			} else if (cmd < 0 || cmd > 15) {
				this.process(180);
			} else {
				var item = this.store[cmd - 1].clone();
				var gold = this.getGold();
				var cost = item.cost;
				if (cost > gold) {
					pri("Costs too much");
					shopPrompt = "Try again";
					this.process(160);
				} else if (!item.allowed(this)) {
					pri("Your a " + this.cls + " you cant use that");
					shopPrompt = "";
					this.process(160);
				} else {
					this.inventory[this.inventory.length] = item;
					item.index = this.inventory.length;
					this.setGold(gold - cost);
					pri("GP= " + this.getGold());
					shopPrompt = "";
					this.process(160);
				}
			}
			break;
		case 180:		// gold check (line 1000)
			pri("GP= " + this.getGold());
			inp("EQ List", ['YES', 'NO']);
			this.state = 190;
			break;
		case 190:		// maybe print equipment
			if (cmd != 'NO') {
				for (var i = 0; i < this.inventory.length; ++i) {
					var item = this.inventory[i];
					if (item.index != 0) {
						pri(String(item.index).pad(5) + item.name);
					}
				}
			}
			pri("Your characteristics are:");
			pri(this.cls);
			if (this.getHealth() == 1) {
				this.setHealth(2);
			}
			pri("Hit Points " + this.getHealth());
			pri();
			pri();
			this.process(this.dungeonLoaded ? 1410 : 1400);
			break;
		case 1400:		// start game
			pri("Reading Dungeon Num. " + this.dungeonNumber);
			this.loadDungeon();
			this.randomizePlayerPosition();
			pri();
			pri();
			pri();
			pri("Welcome to Dungeon #" + this.dungeonNumber);
			this.process(1410);
			break;
		case 1410:
			pri("You are at ( " + this.playerX + ", " + this.playerY + ")");
			pri();
			inp("Comands List", ['YES', 'NO']);
			this.state = 1541;
			break;
		case 1541:		// commands response
			if (cmd == 'YES') {
				pri();
				pri("1=Move  2=Open Door  3=Search for traps and secret doors");
				pri("4=Switch weapon hn hand  5=Fight");
				pri("6=Look Around  7=Save Game  8=Use Magic  9=Buy Magic");
				pri("0=Pass  11=Buy H.P.");
			}
			this.process(1590);
			break;
		case 1590:		// enter command
			inp("Command=");
			this.state = 1600;
			break;
		case 1600:		// execute command
			if (cmd == '?') {
				this.process(1410);
			} else {
				cmd = Number(cmd);
				switch (cmd) {
					case 0:				// pass
						this.process(7000);	// monster move
						break;
					case 6:				// look around
						this.process(6390);
						break;
					case 10:			// print entire map
						this.lookEverywhere();
						this.process(1590);
						break;
					default:
						inp("Come On Command=");
						this.state = 1600;
						break;
				}
			}
			break;
		case 6390:		// look around
			this.lookAround();
			this.process(7000);
			break;

		case 7000:		// monster move
			this.monsterMove();
			break;

		case 7090:		// buy gear at dungeon merchant?
			if (cmd == 'YES') {
				pri("Your H.P. are restored 2 points");
				this.setHealth(this.getHealth() + 2);
				this.process(140);		// return to the merchant menu
			} else {
				if (randint(20) > 10) {
					// perhaps spawn a monster
					this.process(7830);
				} else {
					this.process(1590);	// get command
				}
			}
			break;

		case 7830:		// see if we should spawn a monster
			{
				console.log("line 7830: spawn a monster");

				var spawn = -1;

				for (var i = 1; i <= 50 && spawn == -1; ++i) {
					for (var m = 0; m < this.monster.length; ++m) {
						if (this.monster[m].maxGold >= 1 && randint(1000) > 925) {
							spawn = m;
							break;
						}
					}
				}

				if (spawn == -1) {
					console.log("no monsters to spawn!");
					pri("All monsters dead");
					inp("Reset", ['YES', 'NO']);
					this.state = 7910;
				} else {
					var placed = false;

					this.currentMonster = this.monster[m];
					console.log("spawning " + this.currentMonster.name);

					while (!placed) {
						var range = randint(7);
						var options = new Array();
						for (var m = -range; !placed && m <= range; ++m) {
							for (var n = -range; !placed && n <= range; ++n) {
								if (Math.abs(m) > 2 && Math.abs(n) > 2) {
									var mx = this.playerX + m;
									var my = this.playerY + n;
									if (mx >= 1 && mx <= 25 && my >= 1 && my <= 25) {
										if (this.lvl[my * 25 + mx] == '0') {
											var p = new Object();
											p.x = mx;
											p.y = my;
											options[options.length] = p;
										}
									}
								}
							}
						}

						if (options.length > 0) {
							var p = options[randint(options.length) - 1];
							this.currentMonster.monsterX = p.x;
							this.currentMonster.monsterY = p.y;
							this.setAt(p.x, p.y, '5');
							this.monsterDeadFlag = 0;
							placed = true;
							console.log(this.currentMonster.name + " spawned at " + p.x + "," + p.y);
						}
					}
				}

				this.process(7000);
			}
			break;

		case 7910:	// reset monsters
			if (cmd == 'YES') {
				++this.levelMod;
				for (var m = 0; m < this.monster.length; ++m) {
					var mon = this.monster[m];
					mon.gold = mon.maxGold * this.levelMod;
					mon.health = mon.maxHealth * this.levelMod;
				}
				this.setHealth(this.getHealth() + 5);
				this.process(1590);
			} else {
				this.process(-1);
			}
			break;
	}
}

