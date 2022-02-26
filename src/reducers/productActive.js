import { 
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST, 
    FETCH_PRODUCT_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    item: {},
    loading: false,
    error: null,
};

export default function productActiveReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCT_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error,
            };
        case FETCH_PRODUCT_SUCCESS:
            const {item} = action.payload;
            console.log(item);
            return {
                ...state,
                item,
                loading: false,
                error: null,
            };
        default:
            return state;
            
    }
}