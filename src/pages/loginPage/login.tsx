import  { ChangeEvent, useEffect, useState }  from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import loginStyles from './login.module.css';

import { Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'



// import { getOrderNumber } from '../../services/actions/state';
// import { getAllIngridients } from '../../services/actions/state';

// import { 
//     OPEN_INGRIDIENT_DATA, 
//     CLOSE_INGRIDIENT_DATA, 
//     OPEN_ORDER_DATA, 
//     CLOSE_ORDER_DATA, 
//     CLEAR_CONSTRUCTOR
// } from '../../services/actions/state';

import { useSelector, useDispatch } from '../../services/types/types';

import { logIn } from '../../services/actions/state';


const LoginPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const state: any = location.state

    const { user }  = useSelector(state => state.ingridients);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const authorization = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const data = {
            "email": email,
            "password": password
        }
        dispatch(logIn(data))
    }

    console.log('aaa')

    if (user) {
        return (
          <Redirect
            to={state?.from  || '/'}
          />
        );
    }

    return (
        <div className={loginStyles.login}>
            <h1 className={`text text_type_main-medium mb-6 ${loginStyles.login__title}`}>
                Вход
            </h1>
            <form action="#" className={`mb-20 ${loginStyles.login__form}`}>
                <div className={`mb-6 ${loginStyles.login__input}`}>
                    <EmailInput onChange={onEmailChange} value={email} name={'email'} />
                </div>

                <div className={`mb-6 ${loginStyles.login__input}`}>
                    <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
                </div>

                <Button onClick={authorization} type="primary" size="medium">
                    Войти
                </Button>
            </form>
            
            <div className={`mb-4 ${loginStyles.login__wrapper}`}>
                <span className={`mr-2 text text_type_main-default text_color_inactive`}>
                    Вы — новый пользователь?
                </span>
                <Link to='/register' className={`text text_type_main-default ${loginStyles.login__link}`} >Зарегистрироваться</Link>
            </div>

            <div className={`${loginStyles.login__wrapper}`}>
                <span className={`mr-2 text text_type_main-default text_color_inactive`}>
                    Забыли пароль?  
                </span>
                <Link to='/forgot-password' className={`text text_type_main-default ${loginStyles.login__link}`} >Восстановить пароль</Link>
            </div>
        </div>
    )
}
  
export default LoginPage;


