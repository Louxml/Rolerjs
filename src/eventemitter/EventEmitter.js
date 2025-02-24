


export class EventEmitter {
    
    #listeners;
    
    constructor() {
        this.clear();
    }

    /**
     * 注册一个事件监听器
     * @param {string} event 事件名
     * @param {Function} listener 监听器
     * @param {Object} context 上下文
     */
    on(event, listener, context) {
        this.#listeners[event] ??= [];
        this.#listeners[event].push([ listener, context ]);
    }

    /**
     * 移除一个事件监听器
     * @param {string} event 事件名
     * @param {Function} listener 监听器
     * @param {Object} context 上下文
     */
    off(event, listener, context) {
        if (!this.#listeners[event]) {
            return;
        }

        this.#listeners[event] = this.#listeners[event].filter(
            ([l, c]) => l !== listener || c !== context
        )

        if (this.#listeners[event].length === 0) {
            delete this.#listeners[event]
        }
    }

    /**
     * 触发一个事件
     * @param {string} event 事件名
     * @param {...any} args 参数
     */
    emit(event, ...args) {
        if (!this.#listeners[event]) {
            return;
        }
        this.#listeners[event].forEach(([l, c]) => l.call(c, ...args));
    }

    /**
     * 注册一个一次性的事件监听器
     * @param {string} event 事件名
     * @param {Function} listener 监听器
     */
    once(event, listener, context) {
        const onceListener = (...args) => {
            this.off(event, onceListener);
            listener.call(context, ...args);
        };
        this.on(event, onceListener);
    }

    /**
     * @description 清空事件监听器列表
     */
    clear() {
        this.#listeners = Object.create(null);
    }
}
