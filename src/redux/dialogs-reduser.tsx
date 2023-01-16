
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MASSAGE = 'SEND_MESSAGE';

let initialState = {
    messages: [
        {id: 1, message: 'Hi bro'},
        {id: 2, message: 'Yo dirty talk?'},
        {id: 3, message: 'Yo bullshit'},
        {id: 4, message: 'Yo XAXAXAXA'},
        {id: 5, message: 'You stupid bitch!!!!'},

    ],
    newMessageBody: 'kamasutra',
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ]
}

const dialogsReduser = (state=initialState,action:any) => {



    let stateCopy = {
        ...state
}
    if(action.type === UPDATE_NEW_MESSAGE_BODY){

        stateCopy.newMessageBody = action.body

    }
    else if(action.type === SEND_MASSAGE){
        let body = stateCopy.newMessageBody ;
        stateCopy.newMessageBody = '';
        stateCopy.messages.push({id:6, message:body});

    }
    return stateCopy;
}
export let SendMessageCreator = () => ({type:SEND_MASSAGE })
export let updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY ,body: body})
export default dialogsReduser