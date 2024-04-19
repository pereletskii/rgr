function mu(a, b, x) {
    let muArr = [];

    for (let i = 0; i < x.length; i++) {
        if (b - a <= x[i] && x[i] <= b + a) {
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