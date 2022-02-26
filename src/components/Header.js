import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Menu from './Menu';
import logo from '../img/header-logo.png';
import { changeSearchField } from '../actions/actionCreators';

function Header() {
    const { items } = useSelector(state => state.cart);
    const { search } = useSelector(state => state.catalogList);
    const [ searching, setSearching ] = useState (false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemsInCart = items.length === 0 ? null : items.length;

    const searchClick = () => {
        if(search !== '') {
            navigate(`/catalog`);
        }
        setSearching(prevState => !prevState);
    }

    const handleChange = evt => {
        const { value } = evt.target;
        dispatch(changeSearchField(value));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        searchClick();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Bosa Noga" />
                        </Link>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <Menu />
                            <div className="header-controls">
                                <div className="header-controls-pics">
                                    <div onClick={searchClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                    <Link to="/cart" className="header-controls-pic header-controls-cart">
                                        <div className={itemsInCart ? "header-controls-cart-full" : "header-controls-cart-menu"}>{itemsInCart}</div>
                                    </Link>
                                </div>
                                <form data-id="search-form" onSubmit={handleSubmit}
                                    className={searching ? "header-controls-search-form form-inline" : "header-controls-search-form form-inline invisible"}>
                                    <input onChange={handleChange} className="form-control" value={search} placeholder="Поиск" />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;

