import  { ChangeEvent, useState, useRef }  from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import profileStyles from './profile.module.css';

import { Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'

import { changeUserData, getCookie } from '../../services/actions/state';

import { useSelector, useDispatch } from '../../services/types/types';

import AsideMenu from '../../components/asideMenu/asideMenu';

// import { getAllIngridients } from '../../services/actions/state';

// import { 
//     OPEN_INGRIDIENT_DATA, 
//     CLOSE_INGRIDIENT_DATA, 
//     OPEN_ORDER_DATA, 
//     CLOSE_ORDER_DATA, 
//     CLEAR_CONSTRUCTOR
// } from '../../services/actions/state';

// import { useSelector, useDispatch } from '../../services/types/types';


const ProfilePage = () => {

    const { user }  = useSelector(state => state.ingridients);

    const [form, setValue] = useState({ name: user ? user.name : "", email: user ? user.email : "", password: "" }) ;

    const [actionButtonsActive, setActionButtonsActive] = useState(false)

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setActionButtonsActive(true)
    };

    const dispatch = useDispatch();

    // const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setNameValue(e.target.value)
    //     setActionButtonsActive(true)
    // }

    // const onLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setCodeValue(e.target.value)
    //     setActionButtonsActive(true)
    // }

    // const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //     setPasswordValue(e.target.value)
    //     setActionButtonsActive(true)
    // }

    const returnValue = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        setValue({ name: user ? user.name : "", email: user ? user.email : "", password: "" });
    }

    const onChangeUserData = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        // const data = {
        //     "password": passwordValue,
        //     "token": codeValue
        // }
        const token = 'Bearer ' + getCookie('token');

        dispatch(changeUserData(token, form))
    }

    // const nameInput = useRef(null);

    console.log(form)

    const actionsButtonActive = (isActive: boolean) => isActive ? 
        <div className={`${profileStyles.profile__formActions}`}>
            <Button onClick={returnValue} type="secondary" size="medium">
                Отмена
            </Button>

            <Button onClick={onChangeUserData} type="primary" size="medium">
                Сохранить
            </Button>
        </div>
     : null;


    const actionsButtonRender = actionsButtonActive(actionButtonsActive);
    return (
        <div className={profileStyles.profile}>
            <AsideMenu />
            
            <form action="#" className={`${profileStyles.profile__form}`}>
                <div className={`mb-6 ${profileStyles.profile__input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        // icon={'CurrencyIcon'}
                        value={form.name}
                        name={'name'}
                        error={false}
                        // ref={nameInput}
                        // onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={`mb-6 ${profileStyles.profile__input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        // icon={'CurrencyIcon'}
                        value={form.email}
                        name={'email'}
                        error={false}
                        // ref={inputRef}
                        // onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={`mb-6 ${profileStyles.profile__input}`}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>

                { actionsButtonRender }
            </form>

            <div className={`mt-8 pl-5 ${profileStyles.profile__info}`}>
                <span className={`text text_type_main-default text_color_inactive ${profileStyles.profile__infoItem}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </div>
        </div>
    )
}
  
export default ProfilePage;

