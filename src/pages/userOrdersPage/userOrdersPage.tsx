import AsideMenu from '../../components/asideMenu/asideMenu';
import Order from '../../components/order/order';
import st from './userOrdersPage.module.css';

// import { NavLink } from 'react-router-dom';
// import { useDispatch } from '../../services/types/types';

// import { getCookie, logOut } from '../../services/actions/user';


const UserOrdersPage = () => {

    // const dispatch = useDispatch();

    // const out = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();

    //     const refreshToken = getCookie('refreshToken');
        
    //     dispatch(logOut(refreshToken))
    // }
    return (
        <div className={`${st.container}`}>
            <div className={`mt-30 ${st.menuContainer}`}>
                <AsideMenu />
                <span className={`text text_type_main-default text_color_inactive mt-20 pl-5 ${st.menuInfo}`}>
                    В этом разделе вы можете просмотреть свою историю заказов
                </span>
            </div>

            <ul className={`mt-10 ${st.orders}`}>
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
            </ul>
        </div>
        


    )
}

export default UserOrdersPage;