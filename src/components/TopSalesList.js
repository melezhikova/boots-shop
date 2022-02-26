import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSales } from '../actions/actionCreators';
import React, { useEffect } from 'react';
import Product from './Product';
import Preloader from './Preloader';
import ErrorMessage from './ErrorMessage';

function TopSalesList () {

    const { items, loading, error } = useSelector(state => state.topSalesList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTopSales());
    }, [dispatch])

    if (loading) {
        return <Preloader />
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <div className="row">
            {items.map(o => (
                <Product key={o.id} item={o} />
            ))} 
        </div>
    )
}

export default TopSalesList;