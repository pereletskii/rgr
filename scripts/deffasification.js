function areaCenter(fuzzNum) {
    for (let i = 0; i < fuzzNum.mu.length; i++) {
        let sum1 = 0,
            sum2 = 0;

        for (let j = 0; j < i; j++) {
            sum1 += fuzzNum.mu[j];
        }
        for (let j = i + 1; j < fuzzNum.mu.length; j++) {
            sum2 += fuzzNum.mu[j];
        }

        if (sum1 == sum2) {
            return fuzzNum.x[i];
        }
    }

    return null
}

module.exports.areaCenter = areaCenter;
