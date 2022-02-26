import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { changeDeliveryFields, deleteFromCart, fetchOrder } from "../actions/actionCreators";
import Preloader from './Preloader';
import ShowMessage from "./ShowMessage";
import ErrorMessage from "./ErrorMessage";

function Cart () {

  const { items, phone, address, agreement, loading, error, success } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ totalCost, setTotal ] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      setTotal(items.reduce((acc, item) => acc += item.cost, 0));
    }
    if (items.length === 0) {
      setTotal(0);
    }
    localStorage.setItem("items", JSON.stringify(items));
  }, [items])

  const goToProduct = (id) => {
    navigate(`/products/${id}`);
  }

  const deleteItem = item => {
    dispatch(deleteFromCart(item))
  }

  const handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    dispatch(changeDeliveryFields(name, value));
  }

  const checkDisabled = !agreement ? true : loading ? true : items.length ===0 ? true : false;

  const handleSubmit = evt => {
    evt.preventDefault();
    const owner = { phone, address };
    const itemsPost = [];
    items.forEach((item) => {
      itemsPost.push({
        id: item.product.id,
        price: item.product.price,
        count: item.quantity,
      })
    })
    dispatch(fetchOrder(itemsPost, owner));
  }

  return (

    <div>
      {success && <ShowMessage message="Заказ успешно размещен" />}
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {(items.length > 0) && items.map(o => 
              <tr key={o.number}>
                <td>{o.number}</td>
                <td className="productName" onClick={() => goToProduct(o.product.id)}>{o.product.title}</td>
                <td>{o.size}</td>
                <td>{o.quantity}</td>
                <td>{`${o.product.price} руб.`}</td>
                <td>{`${o.cost} руб.`}</td>
                <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteItem(o)}>Удалить</button></td>
              </tr>
            )}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{`${totalCost} руб.`}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        {error && <ErrorMessage />}
        <div className="card">
          {loading && <Preloader />}
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input onChange={handleChange} disabled={loading} name="phone" className="form-control" id="phone" placeholder="Ваш телефон" value={phone} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input onChange={handleChange} disabled={loading} name="address" className="form-control" id="address" placeholder="Адрес доставки" value={address} required />
            </div>
            <div className="form-group form-check">
              <input onChange={handleChange} disabled={loading} name="agreement" type="checkbox" className="form-check-input" id="agreement" checked={agreement} />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary" disabled={checkDisabled}>Оформить</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Cart;