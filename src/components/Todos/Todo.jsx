import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { update, remove } from "../../todosSlice";

export const Todo = ({ item, handleDragStart, handleDragEnd }) => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = React.useState(false);
    const [todoEdit, setTodoEdit] = React.useState();

    const handleRemove = () => {
        dispatch(remove(item.id));
    };

    const handleTodoEdit = (e) => {
        if (!e.currentTarget.dataset.id) {
            return;
        }

        const todoId = +e.currentTarget.dataset.id;
        const todoById = todos.find((todo) => todo.id === todoId);

        if (!todoById) {
            return;
        }

        setTodoEdit({ ...todoById });
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

    if (isEditing) {
        return (
            <li className='list-group-item d-flex flex-column'>
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

    if (!isEditing) {
        return (
            <li
                onDoubleClick={handleTodoEdit}
                className='list-group-item d-flex justify-content-between align-items-center'
                data-id={item.id}
                draggable='true'
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className='d-flex flex-column'>
                    <div>{item.todo}</div>
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
    }
};
