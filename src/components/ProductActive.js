import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchProduct } from "../actions/actionCreators";
import Preloader from './Preloader';
import ErrorMessage from "./ErrorMessage";

function ProductActive () {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { item, loading, error } = useSelector(state => state.product);

    const [ avalibleSizes, setAvalibleSizes ] = useState([]);
    const [ choosenSize, setSize ] = useState('');
    const [ quantity, setQuantity ] = useState(1);

    useEffect(() => {
        dispatch(fetchProduct(params.id));
    }, [dispatch, params.id])

    useEffect (() => {
        setAvalibleSizes(item?.sizes?.filter(o => o.avalible === true));
    },[item])

    const chooseSize = size => {
        setSize(prevState => prevState === size ? '' : size)
    }

    const increase = () => {
        setQuantity(prevState => prevState < 10 ? prevState + 1 : prevState)
    }

    const decrease = () => {
        setQuantity(prevState => prevState > 1 ? prevState - 1 : prevState)
    }

    const addItemToCart = () => {
        dispatch(addToCart(item, choosenSize, quantity));
        navigate('/cart');
    }

    if (loading) {
        return <Preloader />
    }

    if (error) {
        return <ErrorMessage />
    }

    return (
        <section className="catalog-item">
            <h2 className="text-center">{item.title}</h2>
            <div className="row">
                <div className="col-5">
                    {item.images && <img src={item.images[0]} className="img-fluid" alt={item.title} />}
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{item.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{item.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{item.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{item.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{item.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{item.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <p>Размеры в наличии: 
                            {avalibleSizes?.map(o => <span key={o.size} onClick={() => chooseSize(o.size)} 
                            className={o.size === choosenSize ? "catalog-item-size selected" : "catalog-item-size"}>{o.size}</span>)}
                        </p>
                        {(avalibleSizes?.length > 0) &&
                        <p>Количество: 
                            <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary" onClick={decrease}>-</button>
                                <span className="btn btn-outline-primary">{quantity}</span>
                                <button className="btn btn-secondary" onClick={increase}>+</button>
                            </span>
                        </p>}
                    </div>
                        {(avalibleSizes?.length > 0) &&
                        <button className="btn btn-danger btn-block btn-lg" onClick={addItemToCart}
                        disabled={(choosenSize !== '') ? false : true}>В корзину</button>}
                </div>
            </div>
        </section>
    )
}

export default ProductActive;