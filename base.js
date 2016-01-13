function DrawField (resX, resY, tileSize, id) {
	this.resX = resX;
	this.resY = resY;
	this.w = resX * tileSize;
	this.h = resY * tileSize;
	this.tileSize = tileSize;
	this.canvas = document.getElementById(id);
	this.canvas.width = this.w;
	this.canvas.height = this.h;

	this.ctx = this.canvas.getContext("2d");
	this.ctx.lineWidth = 1;
}

DrawField.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.w, this.h);
};

DrawField.prototype.drawGrid = function() {
	this.ctx.fillStyle = "#ff0000";

	this.ctx.strokeRect(1, 1, this.w - 1, this.h - 1);
	this.ctx.moveTo(0, 0);
	this.ctx.beginPath();

	for (var c = 1; c < this.resX; ++c) {
		if (c & 1 == 1) {
			this.ctx.moveTo(c * this.tileSize, 0);
			this.ctx.lineTo(c * this.tileSize, this.h);
		} else {
			this.ctx.moveTo(c * this.tileSize, this.h);
			this.ctx.lineTo(c * this.tileSize, 0);
		}
	}

	this.ctx.moveTo(0, 0);

	for (var c = 1; c < this.resY; ++c) {
		if (c & 1 == 1) {
			this.ctx.moveTo(0, c * this.tileSize);
			this.ctx.lineTo(this.w, c * this.tileSize);
		} else {
			this.ctx.moveTo(this.w, c * this.tileSize);
			this.ctx.lineTo(0, c * this.tileSize);
		}
	}
	this.ctx.closePath();
	this.ctx.stroke();
};

DrawField.prototype.clamp = function(v, min, max) {
	return Math.max(min, Math.min(v, max));
};

DrawField.prototype.fillPixel = function(x, y) {
	x = this.clamp(x, 0, this.resX);
	y = this.clamp(y, 0, this.resY);
	this.ctx.fillStyle = "#00ff00";
	this.ctx.fillRect(x * this.tileSize + 1, y * this.tileSize + 1, this.tileSize - 1, this.tileSize - 1);
};

DrawField.prototype.clearPixel = function(x, y) {
	x = this.clamp(x, 0, this.resX);
	y = this.clamp(y, 0, this.resY);
	this.ctx.clearRect(x * this.tileSize + 1, y * this.tileSize + 1, this.tileSize - 1, this.tileSize - 1);
};
