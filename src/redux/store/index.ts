import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from '../reducers';

// Custom logger
const logger = createLogger({
  // to collapse certain type of log action e.x., DONATE
  collapsed: (getState, action) => action.type === 'DONATE',

  // to log only certain type of action
  predicate: (getState, action) => action.type === 'CREDIT',

  // to show the difference between what changed in state
  diff: true,

  // to log time
  duration: true,
  timestamp: true,

  // custom colors for each log
  colors: {
    title: () => '#0f1842',
    prevState: () => '#de6f0d',
    action: () => '#6e13ab',
    nextState: () => '#1a9134',
  },

  // instead of colors - use cosole type
  level: 'warm',

  logErrors: true,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: any = [];

if (import.meta.env.NODE_ENV !== 'prodution') {
  console.log(`in ${import.meta.env.NODE_ENV} mode`);
  middlewares.push(logger);
}

const store: any = configureStore({
  reducer: persistedReducer,
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
