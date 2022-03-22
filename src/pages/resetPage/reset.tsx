import  { ChangeEvent, useState, useRef }  from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import resetStyles from './reset.module.css';

import { Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'



import { resetPassword } from '../../services/actions/state';

import { useSelector, useDispatch } from '../../services/types/types';
// import { getAllIngridients } from '../../services/actions/state';

// import { 
//     OPEN_INGRIDIENT_DATA, 
//     CLOSE_INGRIDIENT_DATA, 
//     OPEN_ORDER_DATA, 
//     CLOSE_ORDER_DATA, 
//     CLEAR_CONSTRUCTOR
// } from '../../services/actions/state';

// import { useSelector, useDispatch } from '../../services/types/types';


const ResetPasswordPage = () => {

    const location = useLocation();
    const state: any = location.state;

    const { user }  = useSelector(state => state.ingridients);

    const [passwordValue, setPasswordValue] = useState('')
    const [codeValue, setCodeValue] = useState('')

    // const inputRef = useRef(null)

    const dispatch = useDispatch();

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPasswordValue(e.target.value)
    }

    const onCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCodeValue(e.target.value)
    }

    const onClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        const data = {
            "password": passwordValue,
            "token": codeValue
        }
        
        dispatch(resetPassword(data))

        setPasswordValue('')
        setCodeValue('')
    }

    if (user) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
    }

    if (state?.from.pathname !== '/forgot-password') {
        return (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        );
    }

    return (
        <div className={resetStyles.reset}>
            <h1 className={`text text_type_main-medium mb-6 ${resetStyles.reset__title}`}>
                Восстановление пароля
            </h1>
            <form action="#" className={`mb-20 ${resetStyles.reset__form}`}>

                <div className={`mb-6 ${resetStyles.reset__input}`}>
                    <PasswordInput onChange={onPasswordChange} value={passwordValue} name={'password'} />
                </div>

                <div className={`mb-6 ${resetStyles.reset__input}`}>
                <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onCodeChange}
                        // icon={'CurrencyIcon'}
                        value={codeValue}
                        name={'code'}
                        error={false}
                        // ref={inputRef}
                        // onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <Button onClick={onClick} type="primary" size="medium">
                    Сохранить
                </Button>
            </form>

            <div className={`${resetStyles.reset__wrapper}`}>
                <span className={`mr-2 text text_type_main-default text_color_inactive`}>
                    Вспомнили пароль?
                </span>
                <Link to='/login' className={`text text_type_main-default ${resetStyles.reset__link}`} >Войти</Link>
            </div>
        </div>
    )
}
  
export default ResetPasswordPage;


