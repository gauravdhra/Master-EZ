import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import authReducer from './store/reducers/auth';
import staffReducer from './store/reducers/staff';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : null || compose;

const rootReducer = combineReducers({
    // auth: authReducer,
    staff: staffReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
