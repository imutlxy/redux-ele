/**
 * 全局配置器
 *
 * Created by 梁新维 on 17-8-14.
 */

import * as AppActionRouter from './AppActionRouter';
import appReducerCreator from './AppReducerCreator';
import Store from './ConfigureStore';

let appConfig = {
    router: AppActionRouter,
    reducerCreator: appReducerCreator,
    storeConfig: Store
};

export default appConfig;

