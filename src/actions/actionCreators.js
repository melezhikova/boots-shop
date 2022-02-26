import { 
    ADD_TO_CART,
    CHANGE_ACTIVE_CATEGORY,
    CHANGE_DELIVERY_FORM,
    CHANGE_SEARCH_FIELD,
    DELETE_FROM_CART,
    FETCH_CATALOG_FAILURE,
    FETCH_CATALOG_REQUEST,
    FETCH_CATALOG_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_MOREITEMS_FAILURE,
    FETCH_MOREITEMS_REQUEST,
    FETCH_MOREITEMS_SUCCESS,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_TOPSALES_FAILURE, 
    FETCH_TOPSALES_REQUEST, 
    FETCH_TOPSALES_SUCCESS,
    TOGGLE_ORDER_SUCCESS
} from "./actionTypes";


export const fetchTopSalesRequest = () => ({
    type: FETCH_TOPSALES_REQUEST,
});
  
export const fetchTopSalesFailure = error => ({
    type: FETCH_TOPSALES_FAILURE,
    payload: {
      error,
    },
});
  
export const fetchTopSalesSuccess = items => ({
    type: FETCH_TOPSALES_SUCCESS,
    payload: {
      items,
    },
});

export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
});
  
export const fetchCategoriesFailure = error => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: {
      error,
    },
});
  
export const fetchCategoriesSuccess = items => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: {
      items,
    },
});

export const changeActiveCategory = id => ({
    type: CHANGE_ACTIVE_CATEGORY,
    payload: {
        id,
    },
})

export const fetchCatalogRequest = () => ({
    type: FETCH_CATALOG_REQUEST,
});
  
export const fetchCatalogFailure = error => ({
    type: FETCH_CATALOG_FAILURE,
    payload: {
      error,
    },
});
  
export const fetchCatalogSuccess = items => ({
    type: FETCH_CATALOG_SUCCESS,
    payload: {
      items,
    },
});

export const fetchMoreItemsRequest = () => ({
    type: FETCH_MOREITEMS_REQUEST,
});
  
export const fetchMoreItemsFailure = error => ({
    type: FETCH_MOREITEMS_FAILURE,
    payload: {
      error,
    },
});
  
export const fetchMoreItemsSuccess = itemsMore => ({
    type: FETCH_MOREITEMS_SUCCESS,
    payload: {
      itemsMore,
    },
});

export const changeSearchField = search => ({
    type: CHANGE_SEARCH_FIELD,
    payload: {search},
});

export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST,
});
  
export const fetchProductFailure = error => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: {
      error,
    },
});
  
export const fetchProductSuccess = item => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: {
      item,
    },
});

export const addToCart = (product, size, quantity) => ({
    type: ADD_TO_CART,
    payload: {
        product: product,
        size: size,
        quantity: quantity,
    },
})

export const deleteFromCart = item => ({
    type: DELETE_FROM_CART,
    payload: {
      item
    },
})

export const changeDeliveryFields = (name, value) => ({
    type: CHANGE_DELIVERY_FORM,
    payload: {
        name,
        value
    }
})

export const fetchOrderRequest = () => ({
    type: FETCH_ORDER_REQUEST,
});
  
export const fetchOrderFailure = error => ({
    type: FETCH_ORDER_FAILURE,
    payload: {
      error,
    },
});
  
export const fetchOrderSuccess = () => ({
    type: FETCH_ORDER_SUCCESS,
});

export const toggleOrderSuccess = () => ({
    type: TOGGLE_ORDER_SUCCESS,
});

export const fetchTopSales = () => async (dispatch) => {
    dispatch(fetchTopSalesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/top-sales`)
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchTopSalesSuccess(data));
    } catch (e) {
        dispatch(fetchTopSalesFailure(e.message));
    }
}

export const fetchCategories = () => async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`)
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchCategoriesSuccess(data));
    } catch (e) {
        dispatch(fetchCategoriesFailure(e.message));
    }
}

export const fetchCatalog = (id, search) => async (dispatch) => {
    console.log(id, search);
    dispatch(fetchCatalogRequest());
    try {
        const params = new URLSearchParams({
            categoryId: id ? id : '',
            q: search ? search : '',
        })
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items?${params}`);
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchCatalogSuccess(data));
    } catch (e) {
        dispatch(fetchCatalogFailure(e.message));
    }
}

export const fetchMoreItems = (id, number, search) => async (dispatch) => {
    dispatch(fetchMoreItemsRequest());
    try {
        const params = new URLSearchParams({
            categoryId: id ? id : '',
            offset: number,
            q: search ? search : '',
        })
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items?${params}`);
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchMoreItemsSuccess(data));
    } catch (e) {
        dispatch(fetchMoreItemsFailure(e.message));
    }
}

export const fetchProduct = (id) => async (dispatch) => {
    dispatch(fetchProductRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`);
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchProductSuccess(data));
    } catch (e) {
        dispatch(fetchProductFailure(e.message));
    }
}

export const fetchOrder = (items, owner) => async (dispatch) => {
    console.log(items, owner);
    dispatch(fetchOrderRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items, owner }),
        });
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        dispatch(fetchOrderSuccess());
    } catch (e) {
        dispatch(fetchOrderFailure(e.message));
    }
}