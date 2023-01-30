import React from 'react'
import s from './FormsControls.module.css'
// Достаём деструктуризацией инпут и мета
// @ts-ignore
// мета данные приходят к нам в пропсах
export const FormControl = ({input,meta,child,...props}) => {

    const showError = meta.touched && meta.error
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>

                {props.children}
            </div>
            { showError && <span>{meta.error}</span>}
        </div>
    )
}
// @ts-ignore
export const Textarea = (props:any) => {
const {input,meta,child,...restProps} = props
    return  <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>

}// @ts-ignore
export const Input = (props:any) => {
    const {input,meta,child,...restProps} = props
    return  <FormControl {...props}><input {...input} {...restProps} /></FormControl>

}
// @ts-ignore
