import useStore from '@store/store';
import {generateDefaultChat} from '@constants/chat';
import {useTranslation} from "react-i18next";

const useInitialiseNewChat = () => {
    const {t} = useTranslation();
    const setChats = useStore((state) => state.setChats);
    const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

    return () => {
        setChats([generateDefaultChat(t('newChat'), t('start_image') || '')]);
        setCurrentChatIndex(0);
    };
};

export default useInitialiseNewChat;
