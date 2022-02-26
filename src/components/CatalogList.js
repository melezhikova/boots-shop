import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog, fetchMoreItems } from '../actions/actionCreators';
import React, { useEffect } from 'react';
import Product from './Product';
import Preloader from './Preloader';
import ErrorMessage from './ErrorMessage';

function CatalogList () {
    const { items, loading, error, extraItems, loadingMore, errorMore, search } = useSelector(state => state.catalogList);
    const { activeCategory } = useSelector(state => state.categoriesList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeCategory) {
            dispatch(fetchCatalog(activeCategory.id, search));
        } else {
            dispatch(fetchCatalog());
        }
    }, [dispatch, activeCategory])

    const moreItems = () => {
        dispatch(fetchMoreItems(activeCategory.id, items.length, search));
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <div>
            <div className="row">
                {loading && <Preloader />}
                {!loading && items?.map(o => (<Product key={o.id} item={o} />))} 
            </div>
            <div className="text-center">
                {loadingMore && <Preloader />}
                {errorMore && <ErrorMessage />}
                {extraItems && !loading && <button onClick={moreItems} disabled={loadingMore} className="btn btn-outline-primary">Загрузить ещё</button>}
            </div>
       </div>
    )
}

export default CatalogList;