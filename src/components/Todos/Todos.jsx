import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { CardNew } from "./CardNew";
import { Spinner } from "../Spinner/Spinner";

import { update, fetchTodos } from "./../../slices/todosSlice";
import { fetchCategories } from "../../slices/categoriesSlice";

export const Todos = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos.data);
    const statusTodos = useSelector((state) => state.todos.status);

    const categories = useSelector((state) => state.categories.data);
    const statusCategories = useSelector((state) => state.todos.status);

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

    React.useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTodos());
    }, []);

    if (statusCategories !== "successful" || statusTodos !== "successful") {
        return (
            <div className='d-flex justify-content-center py-3'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 mt-5'>
            {categories
                .map((category, index) => {
                    const todosInCategory = todos.filter(
                        (item) => item.category == category.id
                    );

                    return (
                        <div className='col' key={index}>
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
                })
                .concat(<CardNew key={categories.length + 1} />)}
        </div>
    );
};
