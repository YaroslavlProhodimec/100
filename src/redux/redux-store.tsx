import {combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer";
import dialogsReduser from "./dialogs-reduser";
import {StoreType} from "./store";


let redusers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReduser
});

type PropsType ={
    state: any;
    dispatch: any;
    subscriber: (store: (store: StoreType) => void) => void
    getState(): void;
value:null
}

let store = createStore(redusers);
export default store