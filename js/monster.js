var Monster = function (name, index, strength, health, gold) {
	this.name = name;			// B$(K)
	this.level = 1;				// B(K,1)
	this.strength = strength;	// B(K,2)
	this.maxHealth = health;	// B(K,4)
	this.health = health;		// B(K,3)
	this.maxGold = gold;		// B(K,5)
	this.gold = gold;			// B(K,6)
	this.monsterX = 0;			// F1
	this.monsterY = 0;			// F2
}
