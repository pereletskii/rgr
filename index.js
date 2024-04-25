const fuzz = require('./scripts/fuzzy_number_creation.js');
const deffas = require('./scripts/deffasification.js');
const bt = require('./scripts/binary_tree.js');

function random (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function randParams(min, max) {
    let a = random(min, max);
    let b = random(min, max);

    while (b - a >= b + a){
        a = random(min, max);
    }

    return { a: a, b: b }
}
const tree = new bt.BinaryTree();

for (let i = 0; i < 100; i++) {
    let params = randParams(-50, 50);
    // let params = { a: 6, b: 9 }
    let fuzzNum = fuzz.mu(params.a, params.b);
    let num = deffas.gravityCenter(fuzzNum);
    tree.insert(num);
}
tree.getTree();