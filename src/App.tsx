import React, {useEffect} from 'react';
import useStore from '@store/store';

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import {ChatInterface} from '@type/chat';
import {Theme} from '@type/theme';
import {API_KEY} from "@constants/chat";
import {availableEndpoints} from "@constants/auth";

function App() {
    const initialiseNewChat = useInitialiseNewChat();
    const apiPicture = useStore((state) => state.apiPicture);
    const setChats = useStore((state) => state.setChats);
    const setTheme = useStore((state) => state.setTheme);
    const setApiKey = useStore((state) => state.setApiKey);
    const setApiEndpoint = useStore((state) => state.setApiEndpoint);
    const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

    useEffect(() => {
        // legacy local storage
        const oldChats = localStorage.getItem('chats');
        const apiKey = localStorage.getItem('apiKey');
        const theme = localStorage.getItem('theme');

        if (apiKey) {
            // legacy local storage
            setApiKey(apiKey);
            localStorage.removeItem('apiKey');
        }

        setApiKey(API_KEY);

        if (apiPicture) {
            setApiEndpoint(availableEndpoints[2]);
        }

        if (theme) {
            // legacy local storage
            setTheme(theme as Theme);
            localStorage.removeItem('theme');
        }

        if (oldChats) {
            // legacy local storage
            try {
                const chats: ChatInterface[] = JSON.parse(oldChats);
                if (chats.length > 0) {
                    setChats(chats);
                    setCurrentChatIndex(0);
                } else {
                    initialiseNewChat();
                }
            } catch (e: unknown) {
                console.log(e);
                initialiseNewChat();
            }
            localStorage.removeItem('chats');
        } else {
            // existing local storage
            const chats = useStore.getState().chats;
            const currentChatIndex = useStore.getState().currentChatIndex;
            if (!chats || chats.length === 0) {
                initialiseNewChat();
            }
            if (
                chats &&
                !(currentChatIndex >= 0 && currentChatIndex < chats.length)
            ) {
                setCurrentChatIndex(0);
            }
        }
    }, []);

    return (
        <div className='overflow-hidden w-full h-full relative'>
            <Menu/>
            <Chat/>
        </div>
    );
}

export default App;
