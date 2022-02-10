import headerStyles from './appHeader.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container} >
                <nav>
                    <ul className={headerStyles.navigation}>
                        <li className="mt-4 mb-4 mr-2 pr-5 pl-5">
                            <a href="#" className={headerStyles.navigationLink}>
                                <BurgerIcon type="primary" />
                                <p className="text text_type_main-default ml-2">
                                    Конструктор
                                </p>
                            </a>
                        </li>
                        <li className="mt-4 mb-4 pr-5 pl-5">
                            <a href="#" className={headerStyles.navigationLink}>
                                <ListIcon type="secondary" />
                                <p className="text text_type_main-default text_color_inactive ml-2">
                                    Лента заказов
                                </p>
                            </a>                        
                        </li>
                    </ul>
                </nav>
                
                <Logo />

                <a href="#" className={headerStyles.profile}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive ml-2">
                        Личный кабинет
                    </p>
                </a>  
            </div>
        </header>
    );
}

export default AppHeader;