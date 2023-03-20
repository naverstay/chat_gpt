import {defaultAPIEndpoint, pictureAPIEndpoint} from '@constants/auth';
import {StoreSlice} from './store';

export interface AuthSlice {
    apiKey?: string;
    apiFree: boolean;
    apiPicture: boolean;
    apiEndpoint: string;
    apiRequestCount: number;
    setApiRequestCount: (apiRequestCount: number) => void;
    setApiKey: (apiKey: string) => void;
    setApiFree: (apiFree: boolean) => void;
    setApiEndpoint: (apiEndpoint: string) => void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = (set, get) => ({
    apiFree: true,
    apiPicture: true,
    apiRequestCount: 0,
    // apiEndpoint: defaultAPIEndpoint,
    apiEndpoint: pictureAPIEndpoint,
    setApiRequestCount: (apiRequestCount: number) => {
        set((prev: AuthSlice) => ({
            ...prev,
            apiRequestCount: apiRequestCount,
        }));
    },
    setApiKey: (apiKey: string) => {
        set((prev: AuthSlice) => ({
            ...prev,
            apiKey: apiKey,
        }));
    },
    setApiFree: (apiFree: boolean) => {
        set((prev: AuthSlice) => ({
            ...prev,
            apiFree: apiFree,
        }));
    },
    setApiEndpoint: (apiEndpoint: string) => {
        set((prev: AuthSlice) => ({
            ...prev,
            apiEndpoint: apiEndpoint,
        }));
    },
});
