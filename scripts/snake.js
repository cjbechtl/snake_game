const base = require('./base');
Object.getOwnPropertyNames(base).map(p => global[p] = base[p]);

// Directions
const UP = {
    x: 0,
    y: -1
};
const DOWN = {
    x: 0,
    y: 1
};
const RIGHT = {
    x: 1,
    y: 0
};
const LEFT = {
    x: -1,
    y: 0
};

// Point operations
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

// What happens to the snake
const willEat = state => pointEq(nextHead(state))(state.apple);
const willCrash = state => state.snake.find(pointEq(nextHead(state)));
const validMove = move => state =>
    state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0;

// Next Value determined from state
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves; // else repeat the final move
const nextApple = state => willEat(state) ? rndPos(state) : state.apple;
const nextHead = state => state.snake.length == 0 ?
    {
        x: 2,
        y: 2
    } //starting location
    :
    {
        x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
        y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
    };
const nextSnake = state => willCrash(state) ?
    [] :
    (willEat(state) ?
        [nextHead(state)].concat(state.snake) :
        [nextHead(state)].concat(dropLast(state.snake)));

// Randomness 
const rndPos = table => ({
    x: rnd(0)(table.cols - 1),
    y: rnd(0)(table.rows - 1)
});

// Initial States
const initialState = () => ({
    cols: 20,
    rows: 14,
    moves: [RIGHT],
    snake: [],
    apple: {
        x: 16,
        y: 2
    },
});

// Next States

const next = spec({
    rows: prop('rows'),
    cols: prop('cols'),
    moves: nextMoves,
    snake: nextSnake,
    apple: nextApple
});

const queue = (state, move) => validMove(move)(state) ?
    merge(state)({
        moves: state.moves.concat([move])
    }) :
    state;

module.exports = {
    RIGHT,
    LEFT,
    DOWN,
    UP,
    initialState,
    queue,
    next,
}