import { useSelector } from 'react-redux';
import TopSalesList from './TopSalesList';
import Categories from './Categories';
import CatalogList from './CatalogList';

function HomePage () {

    const { nothingToShow } = useSelector(state => state.topSalesList);
    
    return (
        <div>
            {!nothingToShow &&
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <TopSalesList />
            </section>}
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <Categories />
                <CatalogList />
            </section>
        </div>
    )
}

export default HomePage;