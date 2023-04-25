import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RUNTIME_ENV } from '@utils/environment';
import { logger } from '@utils/logger';

import { rootReducer } from './reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxLoggerConfig =
  ({ getState }: any) =>
  (next: (arg0: any) => void) =>
  (action: any) => {
    logger.log('\x1b[96m action \x1b[0m', action);
    next(action);
    logger.log('\x1b[92m next state \x1b[0m', getState());
  };

const middlewares: any = [];

if (RUNTIME_ENV !== 'prodution') {
  logger.log(`in ${RUNTIME_ENV} mode`);
  middlewares.push(reduxLoggerConfig);
}

const store: any = configureStore({
  reducer: persistedReducer,
  devTools: RUNTIME_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middlewares),
});

const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
