import React from "react";
import './App.css';

const CellButton = ({number, clickBtn, isDisabledBtn}, ) => {
    const classNameBtn = number.isActive ? "btn btn_pressed" : "btn"


    return (
        <div>
            <button disabled={isDisabledBtn} className={classNameBtn} onClick={() => clickBtn(number.number)}>{number.number}</button>
        </div>
    )

}

export default CellButton;