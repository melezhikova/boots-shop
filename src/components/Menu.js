import { NavLink } from 'react-router-dom';

function Menu () {
    return (
        <div className="navbar-nav mr-auto">
            <NavLink to="/" className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}>Главная</NavLink>
            <NavLink to="/catalog" className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}>Каталог</NavLink>
            <NavLink to="/about" className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}>О магазине</NavLink>
            <NavLink to="/contacts"className={(navData) => (navData.isActive ? "nav-link active" : "nav-link")}>Контакты</NavLink>
        </div>
    )
}

export default Menu;