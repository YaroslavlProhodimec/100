import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Simulate} from "react-dom/test-utils";
import {Input} from "../Components/common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../utils/validators/validators";
import s from "../Components/common/FormsControls/FormsControls.module.css";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";

// делаем импорт redux-form потом делаем отдельную компоненту LoginForm
// её помещаем другую константу в метод reduxForm
// потом заменяем все инпуты на Field и прописываем инпутыы в компонентах смотреть ниже
// В этих Field  за сеттаны onchange
// Обязательно надо дать обьектам name
let maxLength50 = maxLengthCreator(50)
export const LoginForm = (props:any) => {
    debugger
    return(
        <div>

            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field className={s.text}

                           placeholder={'email'} name={"email"} component={Input}
                           validate={[required, maxLength50]} />
                </div>
                <div>
                    <Field className={s.text} type={"password"} placeholder={'Password'} name={"password"} component={Input}

                           validate={[required, maxLength50]}/>
                </div>
                <div>
                    <Field className={s.text} type={"checkbox"} name={"rememberMe"} component={Input}

                            validate={[required, maxLength50]}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
                { props.error && <div className={s.error}>
                    {props.error} </div>}
            </form>
        </div>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
 const Login =(props:any) => {
    const onSubmit = (formData:any) => {
        props.login(formData.email,formData.password,formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state:any) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)