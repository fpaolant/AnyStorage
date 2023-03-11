import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { 
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  PERSIST,
  persistReducer, 
  persistStore 
} from 'redux-persist';
import AppReducer from '../reducers/AppReducer';
import SearchPlaceReducer from '../reducers/SearchPlaceReducer';
import LoginRegisterReducer from '../reducers/LoginRegisterReducer';
import UserReducer from '../reducers/UserReducer';


const reducers = combineReducers({
  app: AppReducer,
  loginRegister: LoginRegisterReducer,
  user: UserReducer,
  searchPlace: SearchPlaceReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loginRegister'], // <<<<<< reset 'app'
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  
});

export const persistor = persistStore(store);


