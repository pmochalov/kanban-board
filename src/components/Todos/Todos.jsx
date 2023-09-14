import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { update } from "../../todosSlice";

export const Todos = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos);
    const categories = useSelector((state) => state.categories);

    const [targetCardId, setTargetTaskId] = React.useState(null);
    const [draggableTaskId, setDraggableTaskId] = React.useState(null);

    const handleDragOver = (e) => {
        const currentTarget = e.currentTarget;
        currentTarget.classList.add("border-opacity-100");
        setTargetTaskId(+currentTarget.dataset.cardId);
    };

    const handleDragLeave = (e) => {
        const currentTarget = e.currentTarget;
        currentTarget.classList.remove("border-opacity-100");
    };

    const handleDragStart = (e) => {
        setDraggableTaskId(+e.target.dataset.id);
    };

    const handleDragEnd = () => {
        dispatch(
            update({ id: draggableTaskId, obj: { category: targetCardId } })
        );
        setTargetTaskId(null);
        setDraggableTaskId(null);
    };

    return (
        <div className='container mt-5'>
            <div className='row row-cols-4'>
                {categories.map((category) => {
                    const todosInCategory = todos.filter(
                        (item) => item.category == category.id
                    );

                    return (
                        <div className='col' key={category.id}>
                            <Card
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                handleDragLeave={handleDragLeave}
                                handleDragOver={handleDragOver}
                                todos={todosInCategory}
                                category={category}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
