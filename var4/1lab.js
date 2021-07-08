//////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 1 по дисциплине МРЗвИС
// Выполнена студентом группы 921704 - Мурашко И.А.
// Доработанно для варианта 4 : Морощук Ю.Д.
// Основной скрипт
// 03.04.21
// Алгоритм вычисления произведения пары 4-разрядных чисел
// умножением со старших разрядов со сдвигом множимого (частичного произведения) вправо

var firstElemArrayString = [];
var secondElemArrayString = [];
var secondElemArray = [];
var firstElemArray = [];
var currentRow = 1, currentCell = 1;
var arrayA = [];
var arrayB = [];
var resultArray = [];
var timeInt;

function main() {
    readInput();
    // Обработка исключений

    if (firstElemArrayString.length == 0 || secondElemArrayString.length == 0)
        alert("Ошибка! Введите данные.");
    else if (firstElemArray.length != secondElemArray.length)
        alert("Ошибка! Количество элементов первого и второго вектора должно совпадать.");
    else {
        var flag = false;

        for (var indexFirstElemArr = 0; indexFirstElemArr < firstElemArray.length; indexFirstElemArr++)
            if (firstElemArray[indexFirstElemArr] > 15)
                flag = true;

        for (var indexSecondElemArr = 0; indexSecondElemArr < secondElemArray.length; indexSecondElemArr++)
            if (secondElemArray[indexSecondElemArr] > 15)
                flag = true;
        if (flag)
            alert("Ошибка! Поля могут содержать только числа от 1 до 15.");
        else {
            flag = false;

            for (indexFirstElemArr = 0; indexFirstElemArr < firstElemArray.length; indexFirstElemArr++)
                if (firstElemArray[indexFirstElemArr].match(/^\d+$/)) // если содержит цифры
                    firstElemArray[indexFirstElemArr] = +firstElemArray[indexFirstElemArr];
                else
                    flag = true;

            for (indexSecArrElem = 0; indexSecArrElem < secondElemArray.length; indexSecArrElem++)
                if (secondElemArray[indexSecArrElem].match(/^\d+$/))
                    secondElemArray[indexSecArrElem] = +secondElemArray[indexSecArrElem];
                else
                    flag = true;

            if (flag)
                alert("Ошибка! Поля могут содержать только целые числа.");
            else {
                flag = false;

                for (indexFirstElemArr = 0; indexFirstElemArr < firstElemArray.length; indexFirstElemArr++)
                    if (firstElemArray[indexFirstElemArr] <= 0)
                        flag = true;

                for (indexSecondElemArr = 0; indexSecondElemArr < secondElemArray.length; indexSecondElemArr++)
                    if (secondElemArray[indexSecondElemArr] <= 0)
                        flag = true;

                if (flag)
                    alert("Ошибка! Поля могут содержать только положительные числа.");
                else {

                    // Создание таблицы


                    var counter = 1;
                    var i = 1;
                    document.getElementById('Table').insertRow(-1);

                    document.getElementById('Table').rows[0].insertCell(-1);
                    document.getElementById('Table').rows[0].cells[0].innerText = "Пара чисел";

                    for (var cellCounter = 1; cellCounter < 9; cellCounter++) {

                        document.getElementById('Table').rows[0].insertCell(-1);
                        if (counter % 2 == 0) {
                            document.all.Table.rows[0].cells[cellCounter].innerText = "Этап " + counter + "\nСумма";
                        } else {
                            document.all.Table.rows[0].cells[cellCounter].innerText = "Этап " + counter + "\nМножимое";
                        }
                        counter++;
                    }
                    for (var row = 1; row < firstElemArray.length + 8; row++) {
                        document.getElementById('Table').insertRow(-1);
                        for (var column = 0; column < 9; column++) {
                            document.getElementById('Table').rows[row].insertCell(-1);
                        }
                    }

                    findSumArray();

                    document.getElementById('ResultMassage').innerHTML = "Результат: " + resultArray;
                }
            }
        }
    }

}

function readInput() {

    // Функция считывания введенных данных
    document.getElementById('ResultMassage').innerHTML = "";
    firstElemArrayString = document.getElementById('InputPairFirstElem').value.replace(/\s+/g, ''); // соединяет строки(заменяет пробелы)
    secondElemArrayString = document.getElementById('InputPairSecondElem').value.replace(/\s+/g, '');
    timeString = document.getElementById('Time').value.replace(/\s+/g, '');

    firstElemArrayString = firstElemArrayString.replace(/,+$/g, '');
    secondElemArrayString = secondElemArrayString.replace(/,+$/g, '');

    firstElemArray = firstElemArrayString.split(','); // преобразование в массив строк
    secondElemArray = secondElemArrayString.split(',');
    timeInt = timeString;


    console.log(firstElemArrayString);
    console.log(secondElemArrayString);
    console.log(firstElemArray);
    console.log(secondElemArray);


}

function findSumArray() {

    // Функция подготовки элементов векторов к вычислениям
    // (перевод чисел из 10-й системы в 2-ю)


    var vectorA = [], vectorB = [], tempNumber = [];

    for (var count = 0; count < firstElemArray.length; count++) {
        firstElemArray[count] = +firstElemArray[count];
        secondElemArray[count] = +secondElemArray[count];
        vectorA[count] = firstElemArray[count].toString(2);
        vectorB[count] = secondElemArray[count].toString(2);
        tempNumber = vectorA[count].split("");
        vectorA.splice(count, 1, tempNumber); // Удаляет по индексу, кол-во, что вставляет
        tempNumber = vectorB[count].split("");
        vectorB.splice(count, 1, tempNumber);

        // Тут еще массивы строк
        arrayB = vectorB[count];
        arrayA = vectorA[count];

        for (var indexArrB = 0; indexArrB < arrayB.length; indexArrB++) {
            arrayB[indexArrB] = +arrayB[indexArrB];
        }

        for (var indexArrA = 0; indexArrA < arrayA.length; indexArrA++) {
            arrayA[indexArrA] = +arrayA[indexArrA];
        }
        // После циклов уже масивы чисел 

        arrayA = addZeros(arrayA, 4);
        arrayB = addZeros(arrayB, 4);

        console.log("----------");
        console.log(arrayA);
        console.log("----------");

        calcResultSum(arrayA, arrayB);


        document.getElementById('Table').rows[count + 1].cells[0].innerHTML = "A: " + arrayB.join("") + "<br>B: " + arrayA.join("");
        currentRow = count + 2;
        currentCell = 1;
        resultArray[count] = parseInt(sumArray.join(''), 2).toString(10);
    }

}

function addZeros(array, length) {
    //Функция добавления нулей в элемент вектора

    var kolZeros = length - array.length;
    for (var i = 0; i < kolZeros; i++)
        array.unshift(0);
    return array;
}

function calcResultSum(arrayA, arrayB) {

    // Функция вычисления суммы частичных произведений (результата произведения пары 4-разрядных чисел)

    console.log(arrayA);
    console.log("////////////////");
    console.log(arrayB);

    var buffer = 0, tempSumArray = [0, 0, 0, 0, 0, 0, 0, 0];
    sumArray = [0, 0, 0, 0, 0, 0, 0, 0], newArrayA =  [0, 0, 0, 0, 0, 0, 0, 0];
var suka = 0;
    for(var gopa = 4;gopa<8;gopa++){
        newArrayA[gopa]=arrayA[suka];
        suka++;
    }
    console.log("SOSOSOSOSOSOSOSOSOS");
    console.log(newArrayA);
    console.log("SOSOSOSOSOSOSOSOSOS");

    for (var countB = 0; countB < arrayB.length ; countB++) {

        for (var i = 0; i < 8 - 1 ; i++) {
            tempSumArray[i] = sumArray[i + 1];
        }

        tempSumArray[8-1] = 0;

       sumArray = [0, 0, 0, 0, 0, 0, 0, 0];

        if (arrayB[countB] == 1) {

            console.log("////////////////");
            // Вычисление промежуточной суммы частичных произведений
            console.log(arrayA);
            for (var j = sumArray.length - 1; j >= 0; j--) {
                switch (tempSumArray[j]+ newArrayA[j] + buffer) {
                    case 0:
                        tempSumArray[j] = 0;
                        buffer = 0;
                        break;
                    case 1:
                        tempSumArray[j] = 1;
                        buffer = 0;
                        break;
                    case 2:
                        tempSumArray[j] = 0;
                        buffer = 1;
                        break;
                    case 3:
                        tempSumArray[j] = 1;
                        buffer = 1;
                        break;
                }



                console.log("--------------");
                console.log(tempSumArray);
                console.log("_____________");
                console.log(sumArray);
                console.log("-----------");
                console.log(timeInt * currentRow);
                console.log("////////////////");
            }



        }
    for (var o = 0; o < 8 ; o++) {
        sumArray[o] = tempSumArray[o];
    }
        document.getElementById('Table').rows[currentRow].cells[currentCell].innerHTML = "A:" + arrayB.join("") + "<br>" + "B:" + arrayA.join("") + "<br>>>>" + tempSumArray.join("") + "<br>Время:" + timeInt * currentRow;
        currentRow++;
        currentCell++;
        document.getElementById('Table').rows[currentRow].cells[currentCell].innerHTML = sumArray.join("") + "<br>Время:" + timeInt * currentRow;
        currentRow++;
        currentCell++;
        tempSumArray = [0, 0, 0, 0, 0, 0, 0, 0];
    }

}

