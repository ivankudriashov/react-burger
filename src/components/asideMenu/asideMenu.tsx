import menuStyles from './asideMenu.module.css';

import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/types/types';

import { getCookie, logOut } from '../../services/actions/user';


const AsideMenu = () => {

    const dispatch = useDispatch();

    const out = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const refreshToken = getCookie('refreshToken');
        
        dispatch(logOut(refreshToken))
    }

    return (
        <ul className={`mr-15 pl-5 ${menuStyles.menu}`}>
            <li className={`${menuStyles.menu__item}`}>
                <NavLink
                    exact={true}
                    to='/profile'
                    className={`text text_type_main-medium ${menuStyles.menu__link}`}
                    activeClassName={`${menuStyles.menu__linkActive}`}
                >
                    Профиль
                </NavLink>
            </li>
            <li className={`${menuStyles.menu__item}`}>
                <NavLink
                    exact={true}
                    to='/profile/order'
                    className={`text text_type_main-medium ${menuStyles.menu__link}`}
                    activeClassName={`${menuStyles.menu__linkActive}`}
                >
                    История заказов
                </NavLink>
            </li>
            <li className={`text text_type_main-medium ${menuStyles.menu__item}`}>
                <NavLink
                    to='/login'
                    className={`text text_type_main-medium ${menuStyles.menu__link}`}
                    activeClassName={`${menuStyles.menu__linkActive}`}
                    onClick={out}
                >
                    Выход
                </NavLink>
            </li>
        </ul>
    )
}

export default AsideMenu;
