import React from 'react';

import Account from './Account';
import ClearConversation from './ClearConversation';
import Api from './Api';

import ImportExportChat from '@components/ImportExportChat';
import SettingsMenu from '@components/SettingsMenu';
import LanguageSelector from "@components/LanguageSelector";
import ThemeSwitcher from "@components/Menu/MenuOptions/ThemeSwitcher";
import AboutMenu from "@components/AboutMenu";

const MenuOptions = () => {
    return (
        <>
            <ClearConversation/>
            <SettingsMenu/>
            <ThemeSwitcher/>
            <LanguageSelector/>
            {/*<ImportExportChat/>*/}
            {/*<AboutMenu/>*/}
        </>
    );
};

export default MenuOptions;
