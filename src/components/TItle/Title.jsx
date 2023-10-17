import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { update } from "./../../slices/appSlice";

export const Title = () => {
    const app = useSelector((state) => state.app);
    const dispatch = useDispatch();

    const [title, setTitle] = React.useState(app.title);
    const [isEdit, setIsEdit] = React.useState(false);

    const handleTitleSave = () => {
        dispatch(update({ title }));
        setIsEdit(false);
    };

    if (isEdit) {
        return (
            <div className='row'>
                <div className='col'>
                    <div className='input-group'>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type='text'
                            className='form-control form-control-lg bg-light border-light text-center fw-bold'
                            placeholder='Название доски'
                        />
                        <button
                            onClick={() => setIsEdit(false)}
                            className='btn btn-light border-light'
                            type='button'
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleTitleSave}
                            disabled={title.trim().length === 0}
                            className='btn btn-primary'
                            type='button'
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <h1 className='text-center fw-bold'>
            {app.title}{" "}
            <button onClick={() => setIsEdit(true)} className='btn btn-light'>
                &#9999;
            </button>
        </h1>
    );
};
