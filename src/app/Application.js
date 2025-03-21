

import { Extension, ExtensionType } from '@roler/extensions'


export class Application{
    
    /**
     * 插件列表
     * 所有功能组件系统
     */
    static _plugins = [];

    /**
     * 默认配置
     */
    static defaultOptions = {

    }

    constructor(){
        
    }

    async init(options){
        options = {...Application.defaultOptions, ...options};

        // 插件列表
        const plugins = Application._plugins.slice(0);

        // 异步初始化插件
        for (const plugin of plugins) {
            await plugin.init.call(this, options);
        }
    }

    /**
     * 销毁
     * @public
     */
    destroy(){
        const plugins = Application._plugins.slice(0);

        // 反序
        plugins.reverse();

        // 反序销毁插件
        plugins.forEach((plugin) => {
            plugin.destroy.call(this);
        })
    }

}

Extension.handleByList(ExtensionType.Application, Application._plugins);