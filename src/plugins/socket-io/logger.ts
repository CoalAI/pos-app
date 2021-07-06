export default new class VueSocketIOLogger {
    debug: boolean;
    prefix: string;

    constructor() {
        this.debug = false;
        this.prefix = '%cVue-Socket.io: ';
    }

    info(text: string, data = '') {

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

    }

    error(...args: any[]) {

        if(this.debug) window.console.error(this.prefix, args);

    }

    warn(...args: any[]) {

        if(this.debug) window.console.warn(this.prefix, ...args);

    }

    event(text: string, data = ''){

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: blue; font-weight: 600', 'color: #333333', data);

    }

}