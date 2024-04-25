function gravityCenter(fuzzNum) {
    let sum1 = 0,
        sum2 = 0;
    for (let i = 0; i < fuzzNum.mu.length; i++) {
        sum1 += fuzzNum.x[i] * fuzzNum.mu[i];
    }
    for (let i = 0; i < fuzzNum.mu.length; i++) {
        sum2 += fuzzNum.mu[i];
    }

    return Math.round(sum1 / sum2)
}

module.exports.gravityCenter = gravityCenter;
