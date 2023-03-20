import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import useStore from '@store/store';

import SettingIcon from '@icon/SettingIcon';
import ConfigMenu from "@components/ConfigMenu";
import {shallow} from "zustand/shallow";
import {ChatInterface, ConfigInterface} from "@type/chat";
import {defaultChatConfig} from "@constants/chat";

const SettingsMenu = () => {
    const {t} = useTranslation(['main', 'model']);
    const config = useStore(
        (state) =>
            state.chats &&
            state.chats.length > 0 &&
            state.currentChatIndex >= 0 &&
            state.currentChatIndex < state.chats.length
                ? state.chats[state.currentChatIndex].config
                : undefined,
        shallow
    );
    const setChats = useStore((state) => state.setChats);
    const currentChatIndex = useStore((state) => state.currentChatIndex);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const setConfig = (config: ConfigInterface) => {
        const updatedChats: ChatInterface[] = JSON.parse(
            JSON.stringify(useStore.getState().chats)
        );
        updatedChats[currentChatIndex].config = config;
        setChats(updatedChats);
    };

    // for migrating from old ChatInterface to new ChatInterface (with config)
    useEffect(() => {
        const chats = useStore.getState().chats;
        if (chats && chats.length > 0 && currentChatIndex !== -1 && !config) {
            const updatedChats: ChatInterface[] = JSON.parse(JSON.stringify(chats));
            updatedChats[currentChatIndex].config = {...defaultChatConfig};
            setChats(updatedChats);
        }
    }, [currentChatIndex]);

    return (
        <>
            <a
                className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <SettingIcon className='w-4 h-4'/>
                <span>{t('setting') as string}</span>
            </a>
            {(isModalOpen && config) ? (
                <ConfigMenu
                    setIsModalOpen={setIsModalOpen}
                    config={config}
                    setConfig={setConfig}
                />
            ) : null}
        </>
    );
};

export default SettingsMenu;
