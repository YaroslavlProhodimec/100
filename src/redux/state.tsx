const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MASSAGE = 'SEND_MESSAGE';

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type MessageType = {
    id?:number
    message: string
}
export type DialogsType = {
    id:number
    name:string
}

export type StateType = {

    posts: PostsType[]
    newPostsText:string | number | readonly string[] | undefined
    messages: MessageType[]
    newMessageBody:string | number | readonly string[] | undefined
    dialogs:DialogsType[]


}

export type StoreType = {

    _state: StateType
    getState:()=>void
    _callSubscriber:(props:any)=>void
    // pushPost:(postMessage:string)=>void
    // updateNewPostText:(newText:string | number | readonly string[] | undefined)=>void
    // pushMessage:(addMes:string)=>void
    // updateNewMessageBody:(newTextSMS:string | number | readonly string[] | undefined)=>void
    subscriber: (store: (store: StoreType) => void) => void
    dispatch: { bind: (arg0: StoreType) => any }
}

let store: StoreType = {

    _state: {
        posts: [
            {id: 1, message: 'Hi,how are you?', likesCount: 12},
            {id: 2, message: 'My first project?', likesCount: 11},

        ],
        newPostsText: 'kamasutra',
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
        ],
    },
     _callSubscriber ()  {
        console.log('wqfqwfwqf')
    },

    getState() {
        return this._state;
    },
    subscriber  (observer: (store: StoreType) => void) {
        this._callSubscriber = observer;

    },




    // pushMessage ()  {
    //     let newMessage = {
    //         id:6,
    //         message:store._state.newMessageText
    //     }
    //     this._state.messages.push(newMessage as MessageType)
    //     this._state.newMessageText=""
    //     this._callSubscriber(this._state)
    // },
    // updateNewMessageText  (newTextSMS:string | number | readonly string[] | undefined ) {
    //     this._state.newMessageText=newTextSMS;
    //     this._callSubscriber(this._state)
    // },


    // pushPost  ()  {
    //     let newPost = {id:5,
    //         message:this._state.newPostsText,
    //         likesCount:0
    //     }
    //     this._state.posts.push(newPost as PostsType)
    //     this._state.newPostsText=""
    //     this._callSubscriber(this._state)
    // },
    // updateNewPostText  (newText:string | number | readonly string[] | undefined ) {
    //     this._state.newPostsText=newText;
    //     this._callSubscriber(this._state)
    // },
    dispatch(action:any) {
        debugger
        if (action.type === 'UPDATE_NEW_POST_TEXT') {
            this._state.newPostsText = action.text;
            this._callSubscriber(this._state)
        }
       else if(action.type === 'ADD_POST') {
            let text = this._state.newPostsText
            this._state.newPostsText = '';
            this._state.posts.push({likesCount: 0, id: 3, message: text} as PostsType)

            this._callSubscriber(this._state)
        }
        else if(action.type === 'UPDATE_NEW_MESSAGE_BODY'){
            this._state.newMessageBody = action.body
            this._callSubscriber(this._state)
        }
        else if(action.type === 'SEND_MESSAGE'){
            let body = this._state.newMessageBody ;
            this._state.newMessageBody = '';

            
            // @ts-ignore
            this._state.messages.push({id:6, message:body});
            this._callSubscriber(this._state)
        }
}
}


export let addPostCreator = () => ({type: ADD_POST})
export let updateNewPostTextCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT ,text: text})

export let SendMessageCreator = () => ({type:SEND_MASSAGE })
export let updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY ,body: body})



export default store