import React from 'react';

import Avatar from './Avatar';
import MessageContent from './MessageContent';

import {Role} from '@type/chat';
import RoleInfo from "@components/Chat/ChatContent/Message/RoleInfo";

const backgroundStyle = ['dark:bg-gray-800', 'bg-gray-50 dark:bg-[#444654]'];

const Message = React.memo(
    ({
         role,
         content,
         saveRef,
         messageIndex,
         lastMessage = false,
         sticky = false,
     }: {
        role: Role;
        content: string;
        messageIndex: number;
        saveRef: React.RefObject<HTMLDivElement>;
        lastMessage?: boolean;
        sticky?: boolean;
    }) => {
        return (
            <div
                className={`w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group ${
                    backgroundStyle[messageIndex % 2]
                }`}
            >
                <div
                    className='text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0'>
                    <Avatar role={role}/>
                    <div className='w-[calc(100%-50px)] '>
                        <RoleInfo role={role}/>
                        <MessageContent
                            role={role}
                            content={content}
                            lastMessage={lastMessage}
                            messageIndex={messageIndex}
                            sticky={sticky}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

export default Message;
