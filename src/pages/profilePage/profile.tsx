import  { useState }  from 'react';


import profileStyles from './profile.module.css';

import { Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../services/types/types';

import AsideMenu from '../../components/asideMenu/asideMenu';
import { changeUserData, getCookie } from '../../services/actions/user';

const ProfilePage = () => {

    const { user }  = useSelector(state => state.user);

    const [form, setValue] = useState({ name: user ? user.name : "", email: user ? user.email : "", password: "" }) ;

    const [actionButtonsActive, setActionButtonsActive] = useState(false)

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setActionButtonsActive(true)
    };

    const dispatch = useDispatch();

    const returnValue = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        setValue({ name: user ? user.name : "", email: user ? user.email : "", password: "" });
    }

    const onChangeUserData = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        const token = 'Bearer ' + getCookie('token');

        dispatch(changeUserData(token, form))

        console.log('ss')
    }

    const actionsButtonActive = (isActive: boolean) => isActive ? 
        <div className={`${profileStyles.profile__formActions}`}>
            <Button onClick={returnValue} type="secondary" size="medium">
                Отмена
            </Button>

            <Button type="primary" size="medium">
                Сохранить
            </Button>
        </div>
     : null;


    const actionsButtonRender = actionsButtonActive(actionButtonsActive);
    return (
        <div className={profileStyles.profile}>
            <div className={profileStyles.profile__menu}>
                <AsideMenu />

                <div className={`mt-20 pl-5 ${profileStyles.profile__info}`}>
                    <span className={`text text_type_main-default text_color_inactive ${profileStyles.profile__infoItem}`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </span>
                </div>
            </div>
            
            <form onSubmit={onChangeUserData} action="#" className={`${profileStyles.profile__form}`}>
                <div className={`mb-6 ${profileStyles.profile__input}`}>
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

                <div className={`mb-6 ${profileStyles.profile__input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={`mb-6 ${profileStyles.profile__input}`}>
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>

                { actionsButtonRender }
            </form>
        </div>
    )
}
  
export default ProfilePage;

