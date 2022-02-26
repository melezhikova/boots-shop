import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField, fetchCatalog } from '../actions/actionCreators';
import CatalogList from "./CatalogList";
import Categories from "./Categories";

function Catalog () {
  const { activeCategory } = useSelector(state => state.categoriesList);
  const { search } = useSelector(state => state.catalogList);
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(search);
    dispatch(fetchCatalog(activeCategory.id, search));
  }

  const handleChange = evt => {
    const { value } = evt.target;
    dispatch(changeSearchField(value));
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Поиск" onChange={handleChange} value={search}/>
      </form>
      <Categories />
      <CatalogList />
    </section>
  )
}

export default Catalog;