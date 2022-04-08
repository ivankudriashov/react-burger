import st from './feed.module.css';
import Order from '../../components/order/order';

const FeedPage = () => {


    return (
        <div className={`ml-5 ${st.feed}`}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>Лента заказов</h1>
            <div className={`${st.feed__container}`}>
                <ul className={`mr-15 ${st.feed__orders}`}>
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                    <Order />
                </ul>

                <div className={`${st.feed__info}`}>
                    <div className={`mb-15 ${st.feed__status}`}>
                        <div className={`mr-9 ${st.feed__statusContainer}`}>
                            <span className={`text text_type_main-medium mb-6 ${st.feed__statusTitle}`}>
                                Готовы:
                            </span>
                            <ul className={`${st.feed__statusList}`}>
                                <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`}>
                                    034533
                                </li>
                            </ul>
                        </div>

                        <div className={`${st.feed__statusContainer}`}>
                            <span className={`text text_type_main-medium mb-6 ${st.feed__statusTitle}`}>
                                В работе:
                            </span>
                            <ul className={`${st.feed__statusList}`}>
                                <li className={`text text_type_digits-default ${st.feed__statusItem}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem}`}>
                                    034533
                                </li>
                                <li className={`text text_type_digits-default ${st.feed__statusItem}`}>
                                    034533
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={`mb-15 ${st.feed__statistics}`}>
                        <span className={`text text_type_main-medium ${st.feed__statisticsTitle}`}>
                            Выполнено за все время:
                        </span>

                        <span className={`text text_type_digits-large ${st.feed__statisticsInfo}`}>
                            28 752
                        </span>
                    </div>

                    <div className={`${st.feed__statistics}`}>
                        <span className={`text text_type_main-medium ${st.feed__statisticsTitle}`}>
                            Выполнено за сегодня:
                        </span>

                        <span className={`text text_type_digits-large ${st.feed__statisticsInfo}`}>
                            138
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedPage;