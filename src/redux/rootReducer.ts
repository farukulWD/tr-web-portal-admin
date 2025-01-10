import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { baseApi } from "./api/baseApi";

import authReducer from './features/auth/authSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';


// Create a noop storage if running in SSR mode
const createNoopStorage = () => ({
    getItem() {
        return Promise.resolve(null);
    },
    setItem() {
        return Promise.resolve();
    },
    removeItem() {
        return Promise.resolve();
    },
});



// create storage
const storage =typeof window !== 'undefined'? createWebStorage('local')
: createNoopStorage();


const authPersist = {
    key: 'auth',
    storage,
};




const persistedAuthReducer = persistReducer(authPersist, authReducer);





export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    auth:persistedAuthReducer
}


export const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware(
    {
        serializableCheck: {
        
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
               
            ],
           
        },
    }
).concat(baseApi.middleware)