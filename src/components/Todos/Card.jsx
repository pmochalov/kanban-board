import React from "react";

import { TodosNotFounded } from "./TodosNotFounded";
import { Todo } from "./Todo";

import { useDispatch } from "react-redux";
import { add } from "../../slices/todosSlice";

export const Card = ({
    todos,
    category,
    handleDragOver,
    handleDragLeave,
    handleDragStart,
    handleDragEnd,
}) => {
    const dispatch = useDispatch();

    const [todo, setTodo] = React.useState("");
    const [isNewAdded, setIsNewAdded] = React.useState(false);

    const handleAddTodo = () => {
        setIsNewAdded(true);
    };

    const handleCancel = () => {
        setTodo("");
        setIsNewAdded(false);
    };

    const handleAdd = () => {
        dispatch(
            add({
                id: Date.now(),
                done: false,
                todo,
                category: category.id,
                date: Date.now(),
            })
        );
        setTodo("");
        setIsNewAdded(false);
    };

    const cardClass = `card mb-3 bg-${category.theme} bg-opacity-25 border-${category.theme} border-opacity-25`;
    const headerClass = `card-header bg-${category.theme} bg-opacity-25 border-0 d-flex justify-content-between align-items-center`;

    return (
        <div
            className={cardClass}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            data-card-id={category.id}
        >
            <div className={headerClass}>
                <div className='fw-bold'>
                    <span>{category.title}</span>&nbsp;
                    <small className='fw-normal text-muted'>
                        &middot;&nbsp;{todos.length}
                    </small>
                </div>
                <div className='text-muted fw-normal align-self-start fw-bold'>
                    <button
                        onClick={handleAddTodo}
                        className='btn btn-sm fw-bold bg-dark bg-opacity-10'
                    >
                        ➕
                    </button>
                </div>
            </div>
            <ul className='list-group list-group-flush'>
                {isNewAdded && (
                    <li className='list-group-item d-flex flex-column px-2'>
                        <div>
                            <textarea
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                className='form-control'
                            ></textarea>
                        </div>
                        <div className='d-flex justify-content-end mt-1'>
                            <button
                                onClick={handleCancel}
                                className='btn btn-sm btn-light me-1'
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleAdd}
                                disabled={todo.trim().length === 0}
                                className='btn btn-sm btn-success'
                            >
                                Добавить
                            </button>
                        </div>
                    </li>
                )}

                {todos.length === 0 && (
                    <TodosNotFounded theme={category.theme} />
                )}

                {todos.map((item) => (
                    <Todo
                        key={item.id}
                        item={item}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                    />
                ))}
            </ul>
        </div>
    );
};
