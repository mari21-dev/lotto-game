import './App.css';
import CellButton from "./CellButton";
import React, {useEffect, useState} from "react";
import magicWand from './magic-wand.svg'
import {sendData} from "./API";

function App() {
    const [numberField1, setNumberField1] = useState([]);
    const [numberField2, setNumberField2] = useState([]);
    const [randomNumbersField1, setRandomNumbersField1] = useState([]); //массив уникальных сгенерированых чисел для первого поля
    const [randomNumbersField2, setRandomNumbersField2] = useState([]); //массив уникальных сгенерированых чисел для второго поля
    const [btnActiveCount, setBtnActiveCount] = useState([]);    //массив объектов с активными ячеейками - поле 1
    const [numberActiveBtn, setNumberActiveBtn] = useState([]);     //массив объектов с активным ячейками - поле 2
    let isDisabledBtnField1 = false;
    let isDisabledBtnField2 = false;


    if(btnActiveCount.length === 8){
        isDisabledBtnField1 = true
    }

    if(numberActiveBtn.length === 1){
        isDisabledBtnField2 = true
    }

    const clickBtn = (cellNumber) => {
        const btnActive = [...btnActiveCount]
        let findNumber = numberField1.find(cell => cell.number === cellNumber);
        const newNumbers = numberField1[cellNumber - 1];
        newNumbers.isActive = !newNumbers.isActive;
        if (newNumbers.isActive) {
            btnActive.push(newNumbers);
            setBtnActiveCount(btnActive);
        }
    }

    const clickBtnField2 = (cellBtn) => {
        const btnActive = [...numberActiveBtn]
        let findNumber = numberField2.find(cell => cell.number === cellBtn);
        const newNumbers = numberField2[cellBtn - 1];
        newNumbers.isActive = !newNumbers.isActive;
        if (newNumbers.isActive) {
            btnActive.push(newNumbers)
            setNumberActiveBtn(btnActive)
        }
    }

    const comparisonNumbers = () => {
        let comparisonNumbersField1 = 0;
        let comparisonNumbersField2 = 0;
        let isTicketWon;

        console.log('выбранные ячейки в первом поле', btnActiveCount)
        console.log('выбранные ячейки во втором поле', numberActiveBtn)

        while (randomNumbersField1.length < 8) {
            const rand = Math.floor(Math.random() * 20);
            const isRandomNumber = randomNumbersField1.some((number) => {
                return number === rand
            });

            if (!isRandomNumber && rand !== 0) {
                randomNumbersField1[randomNumbersField1.length] = rand
            }
        }
        setRandomNumbersField1(randomNumbersField1);
        console.log('правильный ответ для превого поля', randomNumbersField1)

        while (randomNumbersField2.length < 1) {
            const rand = Math.floor(Math.random() * 3);
            const isRandomNumber = randomNumbersField2.some((number) => {
                return number === rand
            });

            if (!isRandomNumber && rand !== 0) {
                randomNumbersField2[randomNumbersField2.length] = rand
            }
        }
        setRandomNumbersField2(randomNumbersField2);
        console.log('правильный ответ для второго поля', randomNumbersField2)

        randomNumbersField1.forEach((number) => {
            const isHaveFirstArray = btnActiveCount.includes(number);
            if (isHaveFirstArray) {
                comparisonNumbersField1++
            }
        })

        randomNumbersField2.forEach((number) => {
            const isHaveSecondArray = numberActiveBtn.includes(number);
            if (isHaveSecondArray) {
                comparisonNumbersField2++
            }
        })

        if (comparisonNumbersField1 >= 4) {
            isTicketWon = true;
            alert("Вы выиграли!!!");
        } else if (comparisonNumbersField1 >= 3 && comparisonNumbersField2 === 1) {
            isTicketWon = true;
            alert('Вы 100% выиграли!!!');
        } else {
            isTicketWon = false;
            alert('Вы проиграли...')
        }

        const ticket = {
            selectedNumber:
                {firstField: [btnActiveCount], secondField: [numberActiveBtn]},
            isTicketWon: isTicketWon
        }

        sendData('URL/rock-block', ticket)

        clearActiveCells()
    }


    const clearActiveCells = () => {
        const numberField1Copy = [...numberField1]
        const numberField2Copy = [...numberField2]
        const btnActiveCountCopy = [...btnActiveCount]
        const numberActiveBtnCopy = [...numberActiveBtn]
        const randomNumbersField1Copy = [...randomNumbersField1]
        const randomNumbersField2Copy = [...randomNumbersField2]

        numberField1Copy.forEach((number) => {
            if (number.isActive === true) {
                number.isActive = false
            }
        })
        setNumberField1(numberField1Copy);

        numberField2Copy.forEach((number) => {
            if (number.isActive === true) {
                number.isActive = false
            }
        })
        setNumberField2(numberField2Copy);

        btnActiveCountCopy.length = 0;
        setBtnActiveCount(btnActiveCountCopy);

        numberActiveBtnCopy.length = 0;
        setNumberActiveBtn(numberActiveBtnCopy);

        randomNumbersField1Copy.length = 0;
        setRandomNumbersField1(randomNumbersField1Copy);

        randomNumbersField2Copy.length = 0;
        setRandomNumbersField2(randomNumbersField2Copy);
    }

    const selectionRandomNumbers = () => {
        const cellActiveCount = btnActiveCount;
        const btnActive = numberActiveBtn;
        const randomIndexArrayField1 = []
        const randomIndexArrayField2 = []
        const numberField1Copy = [...numberField1];
        const numberField2Copy = [...numberField2];

        while (randomIndexArrayField1.length < 8) {
            const randomIndex = Math.floor(Math.random() * 19);
            const isRandomNumber = randomIndexArrayField1.some((number) => {
                return number === randomIndex
            });

            if (!isRandomNumber && randomIndex !== 0) {
                randomIndexArrayField1[randomIndexArrayField1.length] = randomIndex
            }
        }

        while (randomIndexArrayField2.length < 1) {
            const randomIndex = Math.floor(Math.random() * 3);
            const isRandomNumber = randomIndexArrayField2.some((number) => {
                return number === randomIndex
            });

            if (!isRandomNumber && randomIndex !== 0) {
                randomIndexArrayField2[randomIndexArrayField2.length] = randomIndex
            }
        }

        randomIndexArrayField1.forEach((number) => {
            numberField1.forEach((cell) => {
                if (number === cell.number) {
                    numberField1Copy[number - 1].isActive = true;
                }
            })
        })
        setNumberField1(numberField1Copy);

        randomIndexArrayField2.forEach((number) => {
            numberField2.forEach((cell) => {
                if (number === cell.number) {
                    numberField2Copy[number - 1].isActive = true;
                }
            })
        })
        setNumberField2(numberField2Copy);

        numberField1.forEach((findBtn) => {
            if (findBtn.isActive === true) {
                cellActiveCount.push(findBtn.number)
                setBtnActiveCount(cellActiveCount);
            }
        })

        numberField2.forEach((findBtn) => {
            if (findBtn.isActive === true) {
                btnActive.push(findBtn.number)
                setNumberActiveBtn(btnActive);
            }
        })
    }

    useEffect(() => {
        const fieldNumbers1 = [];
        const fieldNumbers2 = [];

        for (let i = 0; i <= 18; i++) {
            const cell = {
                number: i + 1,
                isActive: false
            }
            fieldNumbers1[i] = cell;
        }
        setNumberField1(fieldNumbers1);

        for (let j = 0; j <= 1; j++) {
            const cell = {
                number: j + 1,
                isActive: false
            }
            fieldNumbers2[j] = cell;
        }
        setNumberField2(fieldNumbers2);

    }, [])

    return (
        <div className="App">
            <div>
                <div className="header">
                    <div><h3>Билет 1</h3></div>
                    <div>
                        <button onClick={selectionRandomNumbers}><img src={magicWand} alt=""/></button>
                    </div>
                </div>
                <div><span className='field-name'>Поле 1</span> <span
                    className='field-description'>Отметьте 8 чисел</span></div>
                <div className='buttons-card_1'>
                    {numberField1.map((number, i) => (
                            <CellButton key={`f1-${number.number}`} clickBtn={clickBtn} number={number} isDisabledBtn={isDisabledBtnField1}/>
                        )
                    )}
                </div>
            </div>
            <div>
                <div>
                    <span className='field-name'>Поле 2</span> <span
                    className='field-description'>Отметьте 1 число</span>
                </div>
                <div className='buttons-card_2'>
                    {numberField2.map((number) => (
                            <CellButton key={number.number} clickBtn={clickBtnField2} number={number} isDisabledBtn={isDisabledBtnField2}/>
                        )
                    )}
                </div>
            </div>
            <div className='btn-result'>
                <button onClick={comparisonNumbers}>Показать результат</button>
            </div>
        </div>
    );
}

export default App;
