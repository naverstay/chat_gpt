import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import PopupModal from '@components/PopupModal';
import {ConfigInterface} from '@type/chat';

const ConfigMenu = ({
                        setIsModalOpen,
                        config,
                        setConfig,
                    }: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    config: ConfigInterface;
    setConfig: (config: ConfigInterface) => void;
}) => {
    const [_temperature, _setTemperature] = useState<number>(config.temperature);
    const [_presencePenalty, _setPresencePenalty] = useState<number>(config.presence_penalty);
    const [_topP, _setTopP] = useState<number>(config.top_p);
    const [_frequencyPenalty, _setFrequencyPenalty] = useState<number>(config.frequency_penalty);
    const [_pictureWidth, _setPictureWidth] = useState<number>(config.width);
    const [_pictureHeight, _setPictureHeight] = useState<number>(config.height);
    const [_pictureDenoisingStepsNumber, _setPictureDenoisingStepsNumber] = useState<number>(config.num_inference_steps);
    const [_pictureGuidanceScale, _setPictureGuidanceScale] = useState<number>(config.guidance_scale);
    const {t} = useTranslation('model');

    const handleConfirm = () => {
        setConfig({
            temperature: _temperature,
            presence_penalty: _presencePenalty,
            top_p: _topP,
            frequency_penalty: _frequencyPenalty,
            width: _pictureWidth,
            height: _pictureHeight,
            num_inference_steps: _pictureDenoisingStepsNumber,
            guidance_scale: _pictureGuidanceScale
        });
        setIsModalOpen(false);
    };

    return (
        <PopupModal
            title={t('configuration') as string}
            setIsModalOpen={setIsModalOpen}
            handleConfirm={handleConfirm}
        >
            <div className='p-6 border-b border-gray-200 dark:border-gray-600'>
                <div>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>
                        {t('temperature.label')}: {_temperature}
                    </label>
                    <input
                        id='default-range'
                        type='range'
                        value={_temperature}
                        onChange={(e) => {
                            _setTemperature(Number(e.target.value));
                        }}
                        min={0}
                        max={2}
                        step={0.1}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                    />
                    <div className='min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2'>
                        {t('temperature.description')}
                    </div>
                </div>
                {/*<div className='mt-5 pt-5 border-t border-gray-500'>*/}
                {/*  <label className='block text-sm font-medium text-gray-900 dark:text-white'>*/}
                {/*    {t('topP.label')}: {_topP}*/}
                {/*  </label>*/}
                {/*  <input*/}
                {/*    id='default-range'*/}
                {/*    type='range'*/}
                {/*    value={_topP}*/}
                {/*    onChange={(e) => {*/}
                {/*      _setTopP(Number(e.target.value));*/}
                {/*    }}*/}
                {/*    min={0}*/}
                {/*    max={1}*/}
                {/*    step={0.05}*/}
                {/*    className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'*/}
                {/*  />*/}
                {/*  <div className='min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2'>*/}
                {/*    {t('topP.description')}*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className='mt-5 pt-5 border-t border-gray-500'>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>
                        {t('presencePenalty.label')}: {_presencePenalty}
                    </label>
                    <input
                        id='default-range'
                        type='range'
                        value={_presencePenalty}
                        onChange={(e) => {
                            _setPresencePenalty(Number(e.target.value));
                        }}
                        min={-2}
                        max={2}
                        step={0.1}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                    />
                    <div className='min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2'>
                        {t('presencePenalty.description')}
                    </div>
                </div>
                <div className='mt-5 pt-5 border-t border-gray-500'>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>
                        {t('picture.width')}: {_pictureWidth} px
                    </label>
                    <input
                        id='default-range'
                        type='range'
                        value={_pictureWidth}
                        onChange={(e) => {
                            _setPictureWidth(Number(e.target.value));
                        }}
                        min={256}
                        max={768}
                        step={8}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                    />
                </div>
                <div className='mt-5 pt-5 border-t border-gray-500'>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>
                        {t('picture.height')}: {_pictureHeight} px
                    </label>
                    <input
                        id='default-range'
                        type='range'
                        value={_pictureHeight}
                        onChange={(e) => {
                            _setPictureHeight(Number(e.target.value));
                        }}
                        min={256}
                        max={768}
                        step={8}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                    />
                </div>
                <div className='mt-5 pt-5 border-t border-gray-500'>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>
                        {t('picture.denoisingStepsNumber')}: {_pictureDenoisingStepsNumber}
                    </label>
                    <input
                        id='default-range'
                        type='range'
                        value={_pictureDenoisingStepsNumber}
                        onChange={(e) => {
                            _setPictureDenoisingStepsNumber(Number(e.target.value));
                        }}
                        min={1}
                        max={500}
                        step={1}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                    />
                </div>
                <div className='mt-5 pt-5 border-t border-gray-500'>
                    <label className='block text-sm font-medium text-gray-900 dark:text-white'>
                        {t('picture.guidanceScale')}: {_pictureGuidanceScale}
                    </label>
                    <input
                        id='default-range'
                        type='range'
                        value={_pictureGuidanceScale}
                        onChange={(e) => {
                            _setPictureGuidanceScale(Number(e.target.value));
                        }}
                        min={1}
                        max={20}
                        step={.1}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                    />
                </div>
                {/*<div className='mt-5 pt-5 border-t border-gray-500'>*/}
                {/*  <label className='block text-sm font-medium text-gray-900 dark:text-white'>*/}
                {/*    {t('frequencyPenalty.label')}: {_frequencyPenalty}*/}
                {/*  </label>*/}
                {/*  <input*/}
                {/*    id='default-range'*/}
                {/*    type='range'*/}
                {/*    value={_frequencyPenalty}*/}
                {/*    onChange={(e) => {*/}
                {/*      _setFrequencyPenalty(Number(e.target.value));*/}
                {/*    }}*/}
                {/*    min={-2}*/}
                {/*    max={2}*/}
                {/*    step={0.1}*/}
                {/*    className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'*/}
                {/*  />*/}
                {/*  <div className='min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2'>*/}
                {/*    {t('frequencyPenalty.description')}*/}
                {/*  </div>*/}
                {/*</div>*/}
            </div>
        </PopupModal>
    );
};

export default ConfigMenu;
