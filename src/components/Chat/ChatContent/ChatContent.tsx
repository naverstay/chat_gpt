import React, {useEffect, useRef} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import useStore from '@store/store';

import ScrollToBottomButton from './ScrollToBottomButton';
import Message from './Message';
import CrossIcon from '@icon/CrossIcon';

import useSubmit from '@hooks/useSubmit';
import {useTranslation} from "react-i18next";

const ChatContent = () => {
    const {t} = useTranslation();
    const apiRequestCount = useStore((state) => state.apiRequestCount);
    const inputRole = useStore((state) => state.inputRole);
    const setError = useStore((state) => state.setError);
    const messages = useStore((state) =>
        state.chats &&
        state.chats.length > 0 &&
        state.currentChatIndex >= 0 &&
        state.currentChatIndex < state.chats.length
            ? state.chats[state.currentChatIndex].messages
            : []
    );
    const stickyIndex = useStore((state) =>
        state.chats &&
        state.chats.length > 0 &&
        state.currentChatIndex >= 0 &&
        state.currentChatIndex < state.chats.length
            ? state.chats[state.currentChatIndex].messages.length
            : 0
    );
    const generating = useStore.getState().generating;

    const saveRef = useRef<HTMLDivElement>(null);

    // clear error at the start of generating new messages
    useEffect(() => {
        if (generating) {
            setError('');
        }
    }, [generating]);

    const {error} = useSubmit();

    return (
        <div className='flex-1 overflow-hidden'>
            <ScrollToBottom className='h-full dark:bg-gray-800' followButtonClassName='hidden'>
                <ScrollToBottomButton/>
                <div className='flex flex-col items-center text-sm dark:bg-gray-800'>
                    <div
                        className='flex flex-col items-center text-sm dark:bg-gray-800 w-full'
                        ref={saveRef}
                    >
                        {/*<AllIcons/>*/}
                        {/*<ChatTitle/>*/}
                        {messages?.map((message, index) => (
                            <React.Fragment key={index}>
                                <Message
                                    role={message.role}
                                    lastMessage={index === messages.length - 1}
                                    content={message.content}
                                    messageIndex={index}
                                    saveRef={saveRef}
                                />
                            </React.Fragment>
                        ))}
                    </div>

                    <Message
                        role={inputRole}
                        content=''
                        saveRef={saveRef}
                        messageIndex={stickyIndex}
                        sticky
                    />
                    {error !== '' && (
                        <div
                            className='relative py-2 px-3 w-3/5 mt-3 max-md:w-11/12 border rounded-md border-red-500 bg-red-500/10'>
                            <div className='text-gray-600 dark:text-gray-100 text-sm whitespace-pre-wrap'>
                                {error}
                            </div>
                            <div
                                className='text-white absolute top-1 right-1 cursor-pointer'
                                onClick={() => {
                                    setError('');
                                }}
                            >
                                <CrossIcon/>
                            </div>
                        </div>
                    )}

                    {/*<div className="text-center mt-4 text-black dark:text-white">*/}
                    {/*    {t('left')}: {API_LIMIT - apiRequestCount}*/}
                    {/*</div>*/}
                    {/*<div className='mt-4'>*/}
                    {/*    {useStore.getState().generating || (*/}
                    {/*        <DownloadChat saveRef={saveRef}/>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    <div className='w-full h-36'></div>
                </div>
            </ScrollToBottom>
        </div>
    );
};

export default ChatContent;
