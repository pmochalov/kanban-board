import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../todosSlice";

export const FormAddTodo = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories);

    const [todo, setTodo] = React.useState("");
    const [categoryId, setCategoryId] = React.useState(categories[0].id);

    const handleTodoAdd = () => {
        dispatch(
            add({
                id: Date.now(),
                done: false,
                todo,
                category: categoryId,
                date: Date.now(),
            })
        );
        setTodo("");
    };

    const handleChangeCategory = (e) => {
        setCategoryId(e.target.value);
    };

    return (
        <div className='row justify-content-md-center'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                <div className='card mt-3 bg-warning bg-opacity-10 border-warning border-opacity-50'>
                    <div className='card-body py-3'>
                        <div>
                            <textarea
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                className='form-control'
                                type='text'
                                placeholder='Новая задача...'
                            ></textarea>
                        </div>

                        <div className='mt-2'>
                            <select
                                className='form-select'
                                onChange={handleChangeCategory}
                                defaultValue={categoryId}
                            >
                                {categories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className='mt-2 d-grid'>
                            <button
                                onClick={handleTodoAdd}
                                className='btn btn-lg btn-success'
                                disabled={todo.trim().length === 0}
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
