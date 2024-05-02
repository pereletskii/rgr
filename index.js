const fuzz = require('./scripts/fuzzy_number_creation.js');
const deffas = require('./scripts/deffasification.js');
const bt = require('./scripts/binary_tree.js');
const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');
const info = JSON.parse(fs.readFileSync('./info.json'));


let exit = false;
while (!exit) {
    console.clear();
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
            readfuzzyNums();
            break;
        case "3":
            readTree();
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
    console.clear();

    let exit = false;
    let numsCount = 0;

    let params = {
        a: [],
        b: []
    }

    console.clear();
    while (!exit){
        if (numsCount == 0) {
            console.clear();
            console.log(
                "\nТекущий режим - ввод нечётких чисел. Прекратить ввод - 'q'\n",
                "Основное условие ввода a > 0\n"
            );
        } else {
            console.clear();
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
                    console.clear();
                    console.log("\nЧисло должно быть положительным\n");
                    continue;
                }
                break;
            } else {
                console.clear();
                console.log("\nНекорректное значение a\n");
                continue;
            }
        }
        console.log();

        if (exit) break;

        console.clear();
        while (true) {
            console.log();
            b = prompt("b: ");
            if (b == 'q') {
                exit = true;
                break;
            } else if (isNumber(b)) {
                b = parseInt(b);
                break;
            } else {
                console.clear();
                console.log("\nНекорректное значение b\n");
                continue;
            }
        }
        console.log();

        if (exit) break;

        numsCount++;
        params.a.push(a);
        params.b.push(b);
    }

    if (params.a.length > 0) {
        let fuzzTables = [];

        console.clear();
        console.log(info.affiliation);
        sleep(2000);

        for (let i = 0; i < params.a.length; i++) {
            fuzzTables.push(fuzz.mu(params.a[i], params.b[i]));
            console.log(`\nТаблица по параметрам a: ${params.a[i]}, b: ${params.b[i]}`);
            console.table(fuzzTables[i]);
            sleep(800);
        }

        let results = [];
        console.log(`\n${info.defazzification}\n`);
        sleep(2000);
        
        for (let i = 0; i < fuzzTables.length; i++) {
            results.push(deffas.gravityCenter(fuzzTables[i]));
            console.log(`Четкое число из таблицы по параметрам {a: ${params.a[i]}, b: ${params.b[i]}} - ${results[i]}`);
            sleep(800);
        }
        console.log();
    }

    prompt("Нажмите Enter чтобы начать заново");
}

function sleep(ms){
    var waitTill = new Date(new Date().getTime() + ms);
    while(waitTill > new Date()){}
}