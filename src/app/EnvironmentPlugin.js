
import { Extension, ExtensionType } from '@roler/extensions'

// Application类型插件一般不实例化，作为一个静态类操作Application，赋予Application属性和功能
export class EnvironmentPlugin{

    /** @ignore */
    static extension = ExtensionType.Application;

    /**
     * 环境列表
     * @static
     * @Array
     */
    static _environments = [];

    /**
     * 初始化插件
     * @static
     * @public
     * @param {Object} options 插件配置
     * @param {Boolean} skipExtensionImports 是否跳过扩展导入
}
     */
    static async init(options){
        await EnvironmentPlugin.autoDetectEnvironmentExtensions(options.skipExtensionImports);
    }

    /**
     * 销毁插件
     * @static
     * @public
     */
    static destroy(){
        
    }

    /**
     * 自动创建渲染器
     * @static
     * @param {Object} options 选项配置
     * @returns 渲染器实例
     */
    static async autoDetectEnvironmentExtensions(skip){
        if (skip) return;

        for (const env of this._environments){
            if (env.value.test()){
                await env.value.init();
                return env;
            }
        }
    }
}

Extension.handleByNamedList(ExtensionType.Environment, EnvironmentPlugin._environments);
Extension.add(EnvironmentPlugin);