import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { changeActiveCategory, fetchCategories } from "../actions/actionCreators";

function Categories () {
    const { categories, activeCategory, loading, error } = useSelector(state => state.categoriesList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    const changeCategory = (id) => {
        dispatch(changeActiveCategory(id));
    }

    return (
        <ul className="catalog-categories nav justify-content-center">
            {categories.map(o => (
                <li key={o.id} onClick={() => changeCategory(o.id)}
                className={(o.id === activeCategory.id) ? "nav-link active" : "nav-link"}>{o.title}</li>
            ))}
        </ul>
    )
}

export default Categories;