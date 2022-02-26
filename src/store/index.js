import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import cartReducer from '../reducers/cart';
import catalogListReducer from '../reducers/catalogList';
import categoriesListReducer from '../reducers/categoriesList';
import productActiveReducer from '../reducers/productActive';
import topSalesListReducer from '../reducers/topSaleList';
  
const reducer = combineReducers({
    topSalesList: topSalesListReducer,
    categoriesList: categoriesListReducer,
    catalogList: catalogListReducer,
    product: productActiveReducer,
    cart: cartReducer,
});
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)),
);
  
export default store;