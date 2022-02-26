import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleOrderSuccess } from "../actions/actionCreators";

function ShowMessage (props) {

    const { message } = props;
    const [ close, setClose ] = useState(false);
    const dispatch = useDispatch();

    const toggleVisible = () => {
        setClose(prevState => !prevState);
        dispatch(toggleOrderSuccess());
    }
 
    return (
        <div className={close ? "popup invisible" : "popup"}>
            <div className="message-body">
                <div className="message-text">{message}</div>
                <button onClick={toggleVisible} className="btn btn-outline-secondary">Ok</button>
            </div>
        </div>
    )
}

export default ShowMessage;