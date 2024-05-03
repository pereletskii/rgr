function isNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}

function genX(a, b) {
    let l = b - a;
    let r = b + a;

    let x = [];

    for (let i = l; i <= r; i++) {
        x.push(i);
    }
    return x
}

function mu(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
        throw new TypeError("a и b должны быть числами");
    }
    if (a <= 0) {
        throw new Error("a должно быть больше нуля");
    }

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