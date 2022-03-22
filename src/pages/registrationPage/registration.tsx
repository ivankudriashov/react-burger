import  { ChangeEvent, useState, useRef, useCallback }  from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import registrationStyles from './registration.module.css';

import { Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import { createUser } from '../../services/actions/state';

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


const RegistarationPage = () => {

    const { user }  = useSelector(state => state.ingridients);

    const dispatch = useDispatch();


    const [form, setValue] = useState({ email: "", password: "", name: "" });

  

    // const inputRef = useRef(null)

    // const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setEmail(e.target.value)
    // }

    // const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setPassword(e.target.value)
    // }

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let onRegistration = useCallback(
        e => {
          e.preventDefault();
          dispatch(createUser(form));
        },
        [dispatch, form]
      );

    // const onIconClick = () => {
    //     // setTimeout(() => inputRef.current.focus(), 0)
    //     // alert('Icon Click Callback')
    // }

    console.log(form)

    console.log(user)


    if (user) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
    }



    return (
        <div className={registrationStyles.registration}>
            <h1 className={`text text_type_main-medium mb-6 ${registrationStyles.registration__title}`}>
                Регистрация
            </h1>
            <form action="#" className={`mb-20 ${registrationStyles.registration__form}`}>

                <div className={`mb-6 ${registrationStyles.registration__input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        // icon={'CurrencyIcon'}
                        value={form.name}
                        name={'name'}
                        error={false}
                        // ref={inputRef}
                        // onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={`mb-6 ${registrationStyles.registration__input}`}>
                    <EmailInput onChange={onChange} value={form.email} name={'email'} />
                </div>

                <div className={`mb-6 ${registrationStyles.registration__input}`}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>

                <Button onClick={onRegistration} type="primary" size="medium">
                    Войти
                </Button>
            </form>

            <div className={`${registrationStyles.registration__wrapper}`}>
                <span className={`mr-2 text text_type_main-default text_color_inactive`}>
                    Уже зарегистрированы? 
                </span>
                <Link to='/login' className={`text text_type_main-default ${registrationStyles.registration__link}`} >Войти</Link>
            </div>
        </div>
    )
}
  
export default RegistarationPage;


