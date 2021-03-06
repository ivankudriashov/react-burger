import  { ChangeEvent, useState }  from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import loginStyles from './login.module.css';

import { Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector, useDispatch } from '../../services/types/types';

import { logIn } from '../../services/actions/user';


const LoginPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const state: any = location.state

    const { user }  = useSelector(state => state.user);

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
        dispatch(logIn(data));
    }

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
            <form onSubmit={authorization} action="#" className={`mb-20 ${loginStyles.login__form}`}>
                <div className={`mb-6 ${loginStyles.login__input}`}>
                    <EmailInput onChange={onEmailChange} value={email} name={'email'} />
                </div>

                <div className={`mb-6 ${loginStyles.login__input}`}>
                    <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
                </div>

                <Button type="primary" size="medium">
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


