/**
 * Logic for moving a token through the maze
 */



// Predefined mazes
const simpleMaze = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];




function Maze({ map = simpleMaze, start = [2, 3], end = [4, 1], squareWidth = 100, squareHeight = 100 } = {}) {
  this.map = map;
  this.start = start;
  this.end = end;
  this.width = map[0].length;
  this.height  = map.length;
  this.dim = [squareWidth, squareHeight];
  this.dom = document.createElement('div');
  this.dom.className = 'maze';
  this.table = document.createElement('table');
  this.tokens = document.createElement('div');
  this.tokens.className = 'tokens';
  this.dom.appendChild(this.tokens);
  this.dom.appendChild(this.table);
  this.render();
}


Maze.prototype.render = function () {
  const tbody = document.createElement('tbody');
  this.table.innerHTML = '';
  this.table.appendChild(tbody);
  for (let y = 0; y < this.map.length; y++) {
    const row = this.map[y];
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      const td = document.createElement('td');
      td.style.width = `${this.dim[0]}px`;
      td.style.height = `${this.dim[1]}px`;
      if (x === this.start[0] && y === this.start[1]) {
        td.className = 'start';
      } else if (x === this.end[0] && y === this.end[1]) {
        td.className = 'end';
      } else {
        td.className = cell ? 'wall' : 'space';
      }
      tr.appendChild(td);
    }
  }
}


Maze.prototype.canMove = function (dir, pos) {
  const x = pos[0];
  const y = pos[1];
  const { map } = this;
  switch (dir.toLowerCase()) {
    case 'up':
    case 'north':
      return y > 0 && !map[y - 1][x];
    case 'down':
    case 'south':
      return y + 1 < this.height && !map[y + 1][x];
    case 'left':
    case 'west':
      return x > 0 && !map[y][x - 1];
    case 'right':
    case 'east':
      return x + 1 < this.width && !map[y][x + 1];
    default:
      return false;
  }
}


Maze.prototype.addToken = function (token) {
  this.tokens.appendChild(token.dom);
}







function Token(maze) {
  // Cache the maze that this token is on
  this.maze = maze;

  // Position on maze
  this.pos = maze.start.slice(0);

  // Track whether the token is in motion
  this.isMoving = false;

  // Event observers
  this.listeners = {};

  // Make token
  this.dom = document.createElement('div');
  this.dom.className = 'token';
  this.dom.style.width  = `${maze.dim[0]*0.8}px`;
  this.dom.style.height = `${maze.dim[1]*0.8}px`;
  this.dom.style['line-height'] = `${maze.dim[1]*0.8}px`;
  this.dom.style.margin = `${maze.dim[1]*0.1}px ${maze.dim[0]*0.1}px`;

  // Set token location
  this.resetLoc();

  // Add token to maze
  this.maze.addToken(this);
}

// Calculate number of frames and frame period for move animations
(function() {
  const fps = 60;
  const duration = 1.5; // seconds
  Token.prototype.frames = fps * duration;
  Token.prototype.period = 1000 / fps;
})();


Token.prototype.moveSync = function (dir) {
  // Make sure the token isn't already moving
  if (this.isMoving) {
    throw new Error('Tried to move a token that was already in motion');
  }

  // Make sure the token can move in this direction
  if (!this.maze.canMove(dir, this.pos)) {
    throw new Error('Tried to move a token into a wall or off the board');
  }

  // Start moving
  this.isMoving = true;

  // Emit start event
  this.emit('moveStart');

  // Move synchronously
  const next = new Date();
  for (let i = 0; i < this.frames; i++) {
    this.animate(dir);
    next.setTime(next.getTime() + this.period);
    while (new Date() < next) { /* intentionally empty */ }
  }

  // End moving
  this.isMoving = false;

  // Update position and location
  this.updatePos(dir);
  this.resetLoc();

  // Emit end event
  this.emit('moveEnd');

  // Check for success
  if (this.pos[0] === this.maze.end[0] && this.pos[1] === this.maze.end[1]) {
    this.emit('finish');
  }
}


Token.prototype.moveAsync = function (dir) {
  return new Promise((resolve, reject) => {
    // Make sure the token isn't already moving
    if (this.isMoving) {
      reject('Tried to move a token that was already in motion');
      return;
    }

    // Make sure the token can move in this direction
    if (!this.maze.canMove(dir, this.pos)) {
      reject('Tried to move a token into a wall or off the board');
      return;
    }

    // Start moving
    this.isMoving = true;

    // Emit start event
    this.emit('moveStart');

    // Move asynchronously
    let num = 1;
    this.animate(dir);
    const interval = setInterval(() => {
      // Animate motion
      this.animate(dir);

      if (++num === this.frames) {
        // Stop animation
        clearInterval(interval);

        // End moving
        this.isMoving = false;

        // Update position and location
        this.updatePos(dir);
        this.resetLoc();

        // Emit end event
        this.emit('moveEnd');

        // Check for success
        if (this.pos[0] === this.maze.end[0] && this.pos[1] === this.maze.end[1]) {
          this.emit('finish');
        }

        // All done
        resolve();
      }
    }, this.period);
  });
}


Token.prototype.on = function (events, callback) {
  events.split(' ').forEach(event => {
    event = event.toLowerCase();
    if (!(event in this.listeners)) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  });
}


Token.prototype.emit = function (event) {
  event = event.toLowerCase();
  if (event in this.listeners) {
    this.listeners[event].forEach(callback => {
      callback.call(this, event);
    });
  }
  const handler = `on${event}`;
  if (this[handler] instanceof Function) {
    this[handler]();
  }
}


Token.prototype.animate = function (dir) {
  const x = Number(this.dom.style.left.slice(0, -2));
  const y = Number(this.dom.style.top.slice(0, -2));
  const xOffset = this.maze.dim[0] / this.frames;
  const yOffset = this.maze.dim[1] / this.frames;
  switch (dir) {
    case 'up':
    case 'north':
      this.dom.style.top = `${y - yOffset}px`;
      break;
    case 'down':
    case 'south':
      this.dom.style.top = `${y + yOffset}px`;
      break;
    case 'left':
    case 'west':
      this.dom.style.left = `${x - xOffset}px`;
      break;
    case 'right':
    case 'east':
      this.dom.style.left = `${x + xOffset}px`;
      break;
  }
}


Token.prototype.updatePos = function (dir) {
  switch (dir) {
    case 'up':
    case 'north':
      this.pos[1]--;
      break;
    case 'down':
    case 'south':
        this.pos[1]++;
      break;
    case 'left':
    case 'west':
        this.pos[0]--;
      break;
    case 'right':
    case 'east':
        this.pos[0]++;
      break;
  }
}


Token.prototype.resetLoc = function () {
  this.dom.style.left = `${this.pos[0] * this.maze.dim[0]}px`;
  this.dom.style.top  = `${this.pos[1] * this.maze.dim[1]}px`;
}


Token.prototype.reset = function () {
  if (this.isMoving) {
    throw new Error('Tried to reset a token that is in motion');
  }
  this.pos[0] = this.maze.start[0];
  this.pos[1] = this.maze.start[1];
  this.resetLoc();
}