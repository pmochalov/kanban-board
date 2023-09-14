import React from "react";

export const TodosNotFounded = ({ theme }) => {
    return (
        <li className='list-group-item'>
            <span className={`text-${theme}`}>&mdash;</span>
        </li>
    );
};
