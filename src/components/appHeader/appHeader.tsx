import headerStyles from './appHeader.module.css';

import { Link, NavLink, useLocation } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

    const location = useLocation();

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container} >
                <ul className={headerStyles.navigation}>
                    <li className="mt-4 mb-4 mr-2 pr-5 pl-5">
                        <NavLink to='/' 
                        exact={true}
                        className={headerStyles.navigationLink}
                        activeClassName={`${headerStyles.navigationLink__active}`}
                        >
                            <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
                            <p className={`text text_type_main-default text_color_inactive ml-2 ${headerStyles.linkText}`}>
                                Конструктор
                            </p>
                        </NavLink>
                    </li>
                    <li className="mt-4 mb-4 pr-5 pl-5">
                        <NavLink to='/order' 
                        exact={true}
                        className={headerStyles.navigationLink}
                        activeClassName={`${headerStyles.navigationLink__active}`}
                        
                        >
                            <ListIcon type={location.pathname === "/order" ? "primary" : "secondary"} />
                            <p className={`text text_type_main-default text_color_inactive ml-2 ${headerStyles.linkText}`}>
                                Лента заказов
                            </p>
                        </NavLink>
                    </li>
                </ul>

                <Link to='/'>
                    <Logo />
                </Link>

                <NavLink to='/profile' 
                exact={true}
                className={headerStyles.profile}
                activeClassName={`${headerStyles.navigationLink__active}`}
                >
                    <ProfileIcon type={location.pathname === "/profile" ? "primary" : "secondary"} />
                    <p className={`text text_type_main-default text_color_inactive ml-2 ${headerStyles.linkText}`}>
                        Личный кабинет
                    </p>
                </NavLink>  
            </div>
        </header>
    );
}

export default AppHeader;