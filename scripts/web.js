const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Mutable State
let state = initialState();

// Posiiton Helpers
const x = c => Math.round(c * canvas.width / state.cols);
const y = r => Math.round(r * canvas.height / state.rows);

// Game draw
const draw = () => {
    // clear the board
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the snake
    ctx.fillStyle = '#28ea08';
    state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

    // draw apple
    ctx.fillStyle = '#ea0808';
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

    // game crash
    if (state.snake.length == 0) {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Game Update
const step = t1 => t2 => {
    if (t2 - t1 > 100){
        state = next(state);
        draw();
        window.requestAnimationFrame(step(t2));
    } else { 
        window.requestAnimationFrame(step(t1));
    }
}

// Key events
window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'w': case 'h': case 'ArrowUp':    state = queue(state, UP); break
      case 'a': case 'j': case 'ArrowLeft':  state = queue(state, LEFT);  break
      case 's': case 'k': case 'ArrowDown':  state = queue(state, DOWN); break
      case 'd': case 'l': case 'ArrowRight': state = queue(state, RIGHT);  break
    }
  })
  
  // Main
  draw(); window.requestAnimationFrame(step(0));