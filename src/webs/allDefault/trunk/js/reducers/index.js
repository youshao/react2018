import { combineReducers } from 'redux'
import user from './users'

const rootReducer = combineReducers({
    user, //用户信息表
});

export default rootReducer;
