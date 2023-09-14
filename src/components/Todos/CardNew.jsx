import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../../categoriesSlice";

const themes = ["success", "primary", "danger", "warning"];

export const CardNew = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = React.useState("");
    const [theme, setTheme] = React.useState(themes[0]);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAddCategory = () => {
        dispatch(
            add({
                id: Date.now(),
                title,
                theme,
            })
        );
    };

    return (
        <div className='col'>
            <div className='card bg-light border-light'>
                <div className='card-body'>
                    <div className='form-row'>
                        <input
                            onChange={handleChange}
                            value={title}
                            type='text'
                            className='form-control'
                            placeholder='Новая категория'
                        />
                    </div>
                    <div className='form-row mt-2'>
                        <div className='btn-group btn-group-sm'>
                            {themes.map((t, index) => {
                                const btnClass =
                                    t === theme
                                        ? `btn btn-light text-${t} active`
                                        : `btn btn-light text-${t}`;
                                return (
                                    <button
                                        onClick={() => setTheme(t)}
                                        key={index}
                                        type='button'
                                        className={btnClass}
                                    >
                                        &#9679;
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className='d-grid mt-3'>
                        <button
                            onClick={handleAddCategory}
                            disabled={title.trim().length === 0}
                            className='btn btn-outline-success'
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
