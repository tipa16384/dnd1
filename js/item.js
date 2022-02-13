var Item = function(name,cost,canUse) {
	this.name = name;
	this.cost = cost;
	this.canUse = canUse;
	this.index = 0;
}

Item.prototype.clone = function() {
	return new Item(this.name,this.cost,this.canUse);
}

Item.prototype.allowed = function(game) {
	var code = game.cls.substr(0,1);
	return this.canUse.indexOf(code) >= 0;
}

