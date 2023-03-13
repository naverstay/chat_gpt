import React from 'react';
import {useTranslation} from 'react-i18next';

import {Role} from '@type/chat';

const RoleInfo = React.memo(
    ({
         role,
     }: {
        role: Role;
    }) => {
        const {t} = useTranslation();

        return (
            <div className='prose dark:prose-invert relative'>
                {t(role)}
            </div>
        );
    }
);
export default RoleInfo;
