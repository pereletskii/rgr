function genX(a, b) {
    let l = b - a;
    let r = b + a;

    let x = [];

    for (let i = l; i <= r; i++) {
        x.push(i);
    }
    // console.log(`a: ${a}, b: ${b}`);
    return x
}

function mu(a, b) {
    let muArr = [];
    let x = genX(a, b);

    for (let i = 0; i < x.length; i++) {
        if (b - a <= x[i] && x[i] < b + a) {
            muArr.push(
                parseFloat(
                    (0.5 * (1 + Math.cos(Math.PI * (x[i] - b) / a))).toPrecision(3)
                )
            );
        } else {
            muArr.push(0);
        }
    }
    // console.log(`a: ${a}, b: ${b}`);
    // console.table();

    return { mu: muArr, x: x }
}

module.exports.mu = mu; 