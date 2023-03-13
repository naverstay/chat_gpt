import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import DownChevronArrow from '@icon/DownChevronArrow';
import WorldIcon from "@icon/WorldIcon";
import PopupModal from "@components/PopupModal";

const LanguageSelector = () => {
    const [i18nLanguages, setI18nLanguages] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {i18n} = useTranslation();
    const {t} = useTranslation();

    const handleConfirm = () => {
        setIsModalOpen(false);
    };
    const getDir = async () => {
        const locales = import.meta.glob('/public/locales/**/main.json');

        return Object.keys(locales).map((m: string): string => m.replace(/\/main.json$/, '').split('/').pop() as string)
    }

    useEffect(() => {
        getDir().then(d => setI18nLanguages(d));
    }, [])

    const [dropDown, setDropDown] = useState<boolean>(false);
    return (
        <React.Fragment>
            <a
                className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <WorldIcon/>
                <span>{t('lang')}</span>
            </a>

            {isModalOpen && (
                <PopupModal
                    setIsModalOpen={setIsModalOpen}
                    title={t('langPopupTitle') as string}
                    handleConfirm={handleConfirm}
                    showControls={false}
                >
                    <div className="p-4 pb-20">
                        <div className='prose dark:prose-invert relative'>
                            <button
                                className={'btn btn-neutral btn-small flex w-full flex justify-between ' + (dropDown ? 'rounded-b-none' : '')}
                                type='button'
                                onClick={() => setDropDown((prev) => !prev)}
                            >
                                {t('lang-' + i18n.language)}
                                <DownChevronArrow/>
                            </button>
                            <div
                                id='dropdown'
                                className={`${
                                    dropDown ? '' : 'hidden'
                                } absolute top-100 bottom-100 z-10 bg-white rounded-b shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90 w-full`}
                            >
                                <ul className='text-sm text-gray-700 dark:text-gray-200 p-0 m-0 max-h-[70px] overflow-y-auto'
                                    aria-labelledby='dropdownDefaultButton'
                                >
                                    {i18nLanguages.map((lang) => (
                                        <li
                                            className='m-0 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                                            onClick={() => {
                                                i18n.changeLanguage(lang);
                                                setDropDown(false);
                                            }}
                                            key={lang}
                                        >
                                            {t('lang-' + lang)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </PopupModal>
            )}
        </React.Fragment>
    );
};

export default LanguageSelector;
