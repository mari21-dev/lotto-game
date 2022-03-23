import React from "react";
import './App.css';

const CellButton = ({number, clickBtn}) => {
    const classNameBtn = number.isActive ? "btn btn_pressed" : "btn"

    return (
        <div>
            <button className={classNameBtn} onClick={() => clickBtn(number.number)}>{number.number}</button>
        </div>
    )

}

export default CellButton;