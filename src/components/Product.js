import { Link } from 'react-router-dom';

function Product (props) {
    const { item } = props;

    return (
        <div className="col-4" key={item.id}>
            <div class="card catalog-item-card">
                <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{`${item.price} руб.`}</p>
                    <Link to={`/products/${item.id}`}>
                        <button className="btn btn-outline-primary">Заказать</button>
                    </Link>
                </div>
            </div>
        </div>    
    )
}

export default Product;