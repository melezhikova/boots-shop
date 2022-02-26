import { 
    CHANGE_ACTIVE_CATEGORY,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    categories: [],
    activeCategory: null,
    loading: false,
    error: null,
}

export default function categoriesListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FETCH_CATEGORIES_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error: error,
            };
        case FETCH_CATEGORIES_SUCCESS:
            const {items} = action.payload;
            return {
                ...state,
                categories: [{"id": 0, "title": "Все"}, ...items],
                activeCategory: {"id": 0, "title": "Все"},
                loading: false,
                error: null,
            };
        case CHANGE_ACTIVE_CATEGORY:
            const {id} = action.payload;
            return {
                ...state,
                activeCategory: state.categories.find((item) => item.id === id),
            }
        default:
            return state;
    }
}