import s from "./Dialogs.module.css"
import * as React from "react"
import DialogsItem from "./DialogsItem/DialogsItem";
 import Message  from "./Message/Message";
import {DialogsType, MessageType} from "../../redux/state";
import {FC} from "react";



function Dialogs (props:any)   {
    debugger
   let dialogsElement = props.dialogs.map((dialog: DialogsType) => <DialogsItem  id={dialog.id} name={dialog.name}  />)


    let messagesElement = props.messages?.map((m: MessageType) => <Message message={m.message}  />)

    let  newMessageRef = React.createRef<HTMLTextAreaElement>()

    let addPostSms = () => {

        props.pushMessage();

    }
    let   onMessageChange = () => {
        if (newMessageRef.current) {
            let textsms = newMessageRef.current.value;
            props.updateNewMessageText(textsms)

        }
    }
    return (
        <div className={s.wrapper}>

            <div className={s.items}>

                <div className={s.item}>
                    {dialogsElement}
                </div>


            </div>
            <div className={s.flex}>
            <textarea ref={newMessageRef}
                      onChange={onMessageChange}
                      value={props.newMessageText}
                      className={s.text} ></textarea>
            <button role="button"
                    className={s.button}
                    onClick={addPostSms}>
                AddPost</button>
            </div>
            <div className={s.message}>
                {messagesElement}
            </div>




        </div>
    );
};

export default Dialogs;
