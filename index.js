const fuzz = require('./scripts/fuzzy_number_creation.js');
const deffas = require('./scripts/deffasification.js');
const bt = require('./scripts/binary_tree.js');
const prompt = require("prompt-sync")({ sigint: true });

let exit = false;
while (!exit) {
    console.log(
        "Выберите режим:\n",
        "   1: Ввод нечётких чисел\n",
        "   2: Чтение нечётких чисел из JSON\n",
        "   3: Чтение дерева из JSON\n",
        "   q: Выход\n"
    )
    switch (prompt("Выберите нужный режим: ")) {
        case "1":
            fuzzyInput();
            break;
        case "2":
            readTree();
            break;
        case "q":
            exit = true;
            break;
        default:
            console.log("\nТакого варианта нет, повторите ввод\n");
            break;
    }
}
console.log('\nВыход');

function isNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}

function fuzzyInput() {
    let exit = false;
    let numsCount = 0;

    let params = {
        a: [],
        b: []
    }

    while (!exit){
        if (numsCount == 0) {
            console.log(
                "\nТекущий режим - ввод нечётких чисел. Прекратить ввод - 'q'\n",
                "Основное условие ввода a > 0\n"
            );
        } else {
            console.log(
                "\nРанее введённые числа:"
            );
            console.table(params);
            console.log("Прекратить ввод - 'q'\n");
        }

        let a, b;
        while (true) {
            a = prompt("a: ");
            if (a == 'q') {
                exit = true;
                break;
            } else if (isNumber(a)) {
                a = parseInt(a);
                if (a <= 0) {
                    console.log("\nЧисло должно быть положительным\n");
                    continue;
                }
                console.log(a);
                break;
            } else {
                console.log("\nНекорректное значение a\n");
                continue;
            }
        }
        console.log();

        if (exit) break;

        while (true) {
            b = prompt("b: ");
            if (b == 'q') {
                exit = true;
                break;
            } else if (isNumber(b)) {
                b = parseInt(b);
                break;
            } else {
                console.log("\nНекорректное значение b\n");
                continue;
            }
        }
        console.log();

        numsCount++;
        params.a.push(a);
        params.b.push(b);
    }

    if (params) {
        // TODO добавить дефазификацию и дальнейшую работу с деревом
    }
}