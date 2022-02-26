import { 
    ADD_TO_CART, 
    CHANGE_DELIVERY_FORM, 
    DELETE_FROM_CART, 
    FETCH_ORDER_FAILURE, 
    FETCH_ORDER_REQUEST, 
    FETCH_ORDER_SUCCESS, 
    TOGGLE_ORDER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
    phone: '',
    address: '',
    agreement: false,
    loading: false,
    error: null,
    success: null,
};

export default function cartReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const { product, size, quantity } = action.payload;
            if (state.items.length > 0) {
                const index = state.items.findIndex((o) => o.product.id === product.id && o.size === size);
                if(index !== -1) {
                    const newItems = state.items.map(o => {
                        if (o.product.id === product.id) {
                            if (o.size === size) {
                                return {
                                    number: index + 1, 
                                    product, 
                                    size, 
                                    quantity: Number(o.quantity) + Number(quantity),
                                    cost:  (Number(o.quantity) + Number(quantity)) * Number(product.price),
                                }
                            }
                        }
                        return o;
                    })
                    return {...state,
                        items: newItems,
                    }
                }
                return {...state,
                    items: [...state.items, { 
                    number: state.items.length + 1, 
                    product, 
                    size, 
                    quantity,
                    cost:  Number(quantity) * Number(product.price),
                    }],
                }

            }
            return {...state,
                items: [{ 
                    number: 1, 
                    product, 
                    size, 
                    quantity, 
                    cost:  Number(quantity) * Number(product.price), 
                }],
            }
        case DELETE_FROM_CART:
            const {item} = action.payload;
            const newState = state.items.filter(o => o.number !== item.number);
            let count = 1;
            return {...state,
                items: newState.map(o => {
                o.number = count;
                count += 1;
                return o;
                })
            }
        case CHANGE_DELIVERY_FORM:
            const { name, value } = action.payload;
            console.log(name, value);
            return {...state,
                [name]: value,
            }
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FETCH_ORDER_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error: error,
            };
        case FETCH_ORDER_SUCCESS:
            localStorage.removeItem('items');
            return {
                ...state,
                items: [],
                loading: false,
                error: null,
                success: true,
            };
        case TOGGLE_ORDER_SUCCESS:
            return {
                ...state,
                success: null,
            };
        default:
            return state;
    }
}