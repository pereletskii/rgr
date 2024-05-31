const { createRequire } = require('node:module');
require = createRequire(__filename);

const fs = require('fs');

const fuzz = require('./scripts/fuzzy_number_creation.js');
const deffas = require('./scripts/deffasification.js');
const bt = require('./scripts/binary_tree.js');

const os = require('os');
const child_process = require('child_process');
function prompt(message)
{
    process.stdout.write(message);

    let cmd;
    let args;
    if (os.platform() == "win32")
    {
        cmd = 'cmd';
        args = [ '/V:ON', '/C', 'set /p response= && echo !response!' ];
    }
    else
    {
        cmd = 'bash';
        args = [ '-c', 'read response; echo "$response"' ];
    }

    let opts = { 
        stdio: [ 'inherit', 'pipe', 'inherit' ],
        shell: false,
    };

    return child_process.spawnSync(cmd, args, opts).stdout.toString().trim();
}

let exit = false;
while (!exit) {
    console.clear();
    console.log(
        "Выберите режим:\n",
        "   1: Чтение параметров нечётких чисел из JSON\n",
        "   q: Выход\n"
    )
    switch (prompt("Выберите нужный режим: ")) {
        case "1":
            readFuzzyNums();
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

function processNumbers(params) {
    if (params.a.length != params.b.length) {
        throw new RangeError("Количество параметров a и b должны быть одинаковыми");
    }
    if (params.a.length < 7) {
        throw new RangeError("Количество параметров должно быть не меньше 7");
    }

    let fuzzTables = [];

    for (let i = 0; i < params.a.length; i++) {
        fuzzTables.push(fuzz.mu(params.a[i], params.b[i]));
        console.log(`\nТаблица по параметрам a: ${params.a[i]}, b: ${params.b[i]}`);
        console.table(fuzzTables[i]);
    }

    let results = [];
    
    for (let i = 0; i < fuzzTables.length; i++) {
        results.push(deffas.areaCenter(fuzzTables[i]));
        console.log(`Четкое число из таблицы по параметрам {a: ${params.a[i]}, b: ${params.b[i]}} - ${results[i]}`);
    }
    console.log();

    let tree = new bt.BinaryTree;
    for (let i = 0; i < results.length; i++) {
        tree.insert(results[i]);
    }
    tree.getTree();

    while (true) {
        if (prompt("\nДобавить узел? (y/n) ") == 'y') {
            console.clear();
            let a = prompt('a: ');
            let b = prompt('b: ');
    
            try {
                [a, b] = [a, b].map(x => parseInt(x));
                let table = fuzz.mu(a, b);
                console.log(`\nТаблица по параметрам a: ${a}, b: ${b} \n`)
                console.table(table);

                let result = deffas.areaCenter(table);
                console.log(`\nЧеткое число из таблицы по параметрам {a: ${a}, b: ${b}} - ${result}\n`);

                tree.insert(result);
                console.log();
                tree.getTree();
            } catch (error) {
                console.log(error);
                prompt("Нажмите любой символ чтобы повторить ввод");
            }
        } else {
            break;
        }
    }
}

function readFuzzyNums() {
    console.clear();
    let exit = false;
    while (!exit) {
        let path = prompt("Введите путь к файлу JSON: ");
        if (path == 'q') {
            exit = true;
            break;
        } else if (!fs.existsSync(path)) {
            console.clear();
            console.log("\nФайл не существует, повторите ввод\n");
            continue;
        }

        try {
            let params = JSON.parse(fs.readFileSync(path));
            processNumbers(params);

            exit = true;
            break;
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log(`\nОшибка в файле JSON: ${error.name}  ${error.message}\n`);
            } else {
                console.log(`\nДанные из файла ${path} не соотвествуют формату: ${error.name}  ${error.message}\n`);
            }
            prompt("\nНажмите любой символ чтобы повторить ввод");
            console.clear();
        }
    }

    prompt("\nНажмите любой символ чтобы начать заново");
}

function sleep(ms){
    var waitTill = new Date(new Date().getTime() + ms);
    while(waitTill > new Date()){}
}