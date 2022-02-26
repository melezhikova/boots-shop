import { 
    CHANGE_SEARCH_FIELD,
    FETCH_CATALOG_FAILURE,
    FETCH_CATALOG_REQUEST, 
    FETCH_CATALOG_SUCCESS,
    FETCH_MOREITEMS_FAILURE,
    FETCH_MOREITEMS_REQUEST,
    FETCH_MOREITEMS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    loading: false,
    error: null,
    extraItems: true,
    loadingMore: false,
    errorMore: null,
    search: '',
}

export default function catalogListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATALOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FETCH_CATALOG_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error: error,
            };
        case FETCH_CATALOG_SUCCESS:
            const {items} = action.payload;
            return {
                ...state,
                items,
                loading: false,
                error: null,
                extraItems: (items.length < 6) ? false : true,
            };
        case FETCH_MOREITEMS_REQUEST:
            return {
                ...state,
                loadingMore: true,
                errorMore: null,
            }
        case FETCH_MOREITEMS_FAILURE:
            const {err} = action.payload;
            return {
                ...state,
                loadingMore: false,
                errorMore: err,
            };
        case FETCH_MOREITEMS_SUCCESS:
            const {itemsMore} = action.payload;
            return {
                ...state,
                items: [...state.items, ...itemsMore],
                loadingMore: false,
                errorMore: null,
                extraItems: itemsMore.length < 6 ? false : true,
            };
        case CHANGE_SEARCH_FIELD:
            const {search} = action.payload;
            return {
                ...state,
                search
            };
        default:
            return state;
    }
}