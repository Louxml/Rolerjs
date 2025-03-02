
import { EventEmitter } from '@roler/event-emitter';
import { Runner } from '@roler/runner';

const defaultRunners = [
    'init',
    'destroy',
    'contextChange',
    'resolutionChange',
    'reset',
    'renderEnd',
    'renderStart',
    'render',
    'update',
    'postrender',
    'prerender'
]

/**
 * AbstractRenderer
 * 渲染器抽象基类
 * @param {Object} config 渲染器配置
 * @param {Number} config.type 渲染器类型
 * @param {String} config.name 渲染器名称
 * @param {String[]}  config.runners 渲染器运行器
 * @param {{name:String, value:Object}[]}  config.systems 渲染器子系统
 * @param {{name:String, value:Object}[]}  config.renderPipes 渲染器渲染管道
 * @param {{name:String, value:Any}[]}  config.renderPipeAdaptors 渲染器渲染管道适配器
 */
export class AbstractRenderer extends EventEmitter {
    
    static defaultOptions = {
        resolution: 1,
        
        roundPixels: false,
    }

    #type;

    #name;

    #config;

    // 是否四舍五入像素
    #roundPixels;

    #systemHash = Object.create(null);

    #initOptions;

    constructor(config){
        super();
        this.#type = config.type;
        this.#name = config.name;

        this.#config = config;
        const combinedRunners = [ ...defaultRunners, ...(config.runners ?? []) ];

        this._addRunners(combinedRunners);

        this._checkUnsafeEval();
    }

    /**
     * 初始化渲染器
     * @param {Object} options 配置
     */
    async init(options){
        
        // 加载子系统
        this._addSystems(this.#config.systems);
        // 加载渲染管道
        this._addPipes(this.#config.renderPipes, this.#config.renderPipeAdaptors);

        for (const name in this.#systemHash){
            const system = this.#systemHash[name];

            // 获取子系统默认配置
            const defaultOptions = system.constructor.defaultOptions;
            // 合并配置
            options = { ...defaultOptions, ...options };
        }

        options = { ...AbstractRenderer.defaultOptions, ...options };

        this.#roundPixels = !!options.roundPixels;

        // 初始化子系统
        for (let i = 0; i < this.runners.init.items.length; i++){
            await this.runners.init.items[i].init(options);
        }

        // 保存初始化参数
        this.#initOptions = options;
    }

    // TODO
    render(){

    }

    // TODO
    resize(){

    }

    // TODO
    clear(){

    }

    /**
     * 添加运行器
     * @private
     * @param  {...any} runners 运行器
     */
    _addRunners(runners){
        runners.forEach(runnerId => {
            this.runners[runnerId] = new Runner(runnerId);
        })
    }

    /**
     * 添加子系统列表
     * @param {Array} systems 子系统列表
     */
    _addSystems(systems){
        systems?.forEach(system => {
            this._addSystem(system.name, system.value)
        })
    }

    /**
     * 添加子系统
     * @param {String} name 子系统命名
     * @param {Object} ClassRef 子系统类
     */
    _addSystem(name, ClassRef){
        if (this[name]){
            throw new Error(`The name "${name}" is already in use.`)
        }

        const system = new ClassRef(this);

        this[name] = system;

        // system添加hash映射
        this.#systemHash[name] = system;

        for (const runner of this.runners){
            runner.add(system);
        }
    }
    
    _addPipes(pipes, pipeAdaptors){
        const adaptors = pipeAdaptors.reduce((acc, adapter) => {
            acc[adapter.name] = adapter.value;
            return acc;
        }, {})

        pipes?.forEach(pipe => {
            const PipeClass = pipe.value;
            const name = pipe.name;

            const Adapter = adaptors[name];

            this.renderPipes[name] = new PipeClass(this, Adapter ? new Adapter() : null);
        })
    }

    destroy(){
        this.runners.destroy.reverseEmit();

        for (const runner of this.runners){
            runner.destroy();
        }

        this.runners = null;

        this.#systemHash = null;

        this.renderPipes = null;
    }

    reset(){
        this.runners.reset.emit();
    }

    // TODO
    generateTexture(){
    }

    /**
     * 检测是否支持 unsafe-eval，不支持则报错异常
     * 比如Function、eval等
     */
    _checkUnsafeEval(){

    }


    get type(){
        return this.#type;
    }

    get name(){
        return this.#name;
    }

    get roundPixels(){
        return this.#roundPixels;
    }
}