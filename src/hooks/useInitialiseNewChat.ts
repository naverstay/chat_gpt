import useStore from '@store/store';
import {generateDefaultChat} from '@constants/chat';
import {useTranslation} from "react-i18next";

const useInitialiseNewChat = () => {
    const {t} = useTranslation();
    const setChats = useStore((state) => state.setChats);
    const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

    const initialiseNewChat = () => {
        setChats([generateDefaultChat('', t('start') || '')]);
        setCurrentChatIndex(0);
    };

    return initialiseNewChat;
};

export default useInitialiseNewChat;
