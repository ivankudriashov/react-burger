import  { useState, useCallback }  from 'react';
import { Link, Redirect } from 'react-router-dom';

import registrationStyles from './registration.module.css';

import { Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../services/types/types';
import { createUser } from '../../services/actions/user';


const RegistarationPage = () => {

    const { user }  = useSelector(state => state.user);

    const dispatch = useDispatch();


    const [form, setValue] = useState({ email: "", password: "", name: "" });


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
            <form onSubmit={onRegistration} action="#" className={`mb-20 ${registrationStyles.registration__form}`}>

                <div className={`mb-6 ${registrationStyles.registration__input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        value={form.name}
                        name={'name'}
                        error={false}
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

                <Button type="primary" size="medium">
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


