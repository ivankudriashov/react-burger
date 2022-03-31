import  { ChangeEvent, useState }  from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import forgotStyles from './forgot.module.css';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'



import { getResetPasswordCode } from '../../services/actions/user';

import { useSelector, useDispatch } from '../../services/types/types';



const RegistarationPage = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const state: any = location.state

    const { user }  = useSelector(state => state.user);

    const [emailValue, setEmailValue] = useState('');
    const [success, setSuccess] = useState(false);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmailValue(e.target.value)
    }

    const onClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const email = { 
            "email": emailValue
        };
        dispatch(getResetPasswordCode(email, setSuccess))
    }

    if(success) {
        return (
        <Redirect
            to={{
                pathname: '/reset-password',
                state: { from: location }
              }}
        />);
    }

    if (user) {
        return (
            <Redirect
                to={state?.from  || '/'}
            />
        );
    }

    return (
        <div className={forgotStyles.forgot}>
            <h1 className={`text text_type_main-medium mb-6 ${forgotStyles.forgot__title}`}>
                Восстановление пароля
            </h1>
            <form action="#" className={`mb-20 ${forgotStyles.forgot__form}`}>

                <div className={`mb-6 ${forgotStyles.forgot__input}`}>
                    <EmailInput onChange={onEmailChange} value={emailValue} name={'email'} />
                </div>

                <Button onClick={onClick} type="primary" size="medium">
                    Восстановить
                </Button>
            </form>

            <div className={`${forgotStyles.forgot__wrapper}`}>
                <span className={`mr-2 text text_type_main-default text_color_inactive`}>
                    Вспомнили пароль?
                </span>
                <Link to='/login' className={`text text_type_main-default ${forgotStyles.forgot__link}`} >Войти</Link>
            </div>
        </div>
    )
}
  
export default RegistarationPage;


