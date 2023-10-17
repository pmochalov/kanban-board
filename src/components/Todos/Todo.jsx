import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { update, remove } from "./../../slices/todosSlice";

export const Todo = ({ item, handleDragStart, handleDragEnd }) => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = React.useState(false);
    const [todoEdit, setTodoEdit] = React.useState();

    const handleRemove = () => {
        dispatch(remove(item.id));
    };

    const handleTodoEdit = () => {
        setTodoEdit({ ...item });
        setIsEditing(true);
    };

    const handleTodoSave = () => {
        dispatch(
            update({
                id: +todoEdit.id,
                obj: { ...todoEdit, date: Date.now() },
            })
        );
        setTodoEdit(null);
        setIsEditing(false);
    };

    const handleTodoCancel = () => {
        setTodoEdit(null);
        setIsEditing(false);
    };

    const handleTodoDone = () => {
        dispatch(
            update({
                id: item.id,
                obj: { ...item, done: !item.done },
            })
        );
    };

    if (isEditing) {
        return (
            <li className='list-group-item d-flex flex-column px-2'>
                <div>
                    <textarea
                        value={todoEdit.todo}
                        onChange={(e) =>
                            setTodoEdit({ ...todoEdit, todo: e.target.value })
                        }
                        type='text'
                        className='form-control'
                    ></textarea>
                </div>
                <div className='d-flex justify-content-end mt-1'>
                    <button
                        onClick={handleTodoCancel}
                        className='btn btn-sm btn-light me-1'
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleTodoSave}
                        disabled={todoEdit.todo.trim().length === 0}
                        className='btn btn-sm btn-success'
                    >
                        Сохранить
                    </button>
                </div>
            </li>
        );
    }

    return (
        <li
            data-id={item.id}
            onDoubleClick={handleTodoEdit}
            className='list-group-item d-flex justify-content-between align-items-center px-2'
            draggable='true'
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className='align-self-start'>
                <input
                    type='checkbox'
                    onChange={handleTodoDone}
                    checked={item.done}
                    className='form-check-input'
                />
            </div>
            <div className='d-flex flex-column flex-grow-1 px-2'>
                <div
                    className={item.done ? "text-decoration-line-through" : ""}
                >
                    {item.todo}
                </div>
                <div className='mt-2'>
                    <small className='text-muted'>
                        {new Date(item.date).toLocaleString("ru-RU")}
                    </small>
                </div>
            </div>
            <button
                onClick={handleRemove}
                className='btn btn-light btn-sm align-self-start'
            >
                &times;
            </button>
        </li>
    );
};
