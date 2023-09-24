import { useState } from "react";
import CalculatorRow from "./CalculatorRows";

const Calculator = (props) => {
    const [value, setValue] = useState('');
    const [firstNum, setFirstNum] = useState('');
    const [operator, setOperator] = useState('');

    function onBtnClick(e) {
        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        //If the button is an operator
        if (isNaN(Number(e.target.textContent)) && e.target.textContent !== '.') {
            // if (operator === e.target.textContent && operator !== 'Clear') {
            //     return;
            // }
            onOperatorClick(e.target.textContent);
        } else {
            //if the button is a number
            setValue((oldValue) => {
                //Clicking "." twice
                return oldValue.toString().includes('.') && e.target.textContent === '.'
                    ? oldValue
                    : `${oldValue}${e.target.textContent}`;
            });
        }
    }

    function onOperatorClick(clickedOperator) {
        if (clickedOperator === 'Clear') {
            setValue('');
        } else if (clickedOperator === '=') {
            onEqualClick();
        } else {
            //Clicking an operator if there is one chosen already
            if (operator !== 'Clear' && operator !== '=' && operator !== '') {
                return;
            }
            setFirstNum(Number(value));
            setValue('');
        }

        setOperator(clickedOperator);
    }


    return (
        <div onClick={onBtnClick} className="calculator">
            <span>{value}</span>
            <div className="controllers">
                <div className="table">
                </div>
                <div className="operators">
                    {['Clear', '*', '/', '+', '-'].map((k) => (
                        <button>{k}</button>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Calculator;