
class Subject<T extends Function>{
    private fns: T[];

    static create() {
        return new Subject();
    }

    private constructor() {
        this.fns = [];
    }

    getFns = () => {
        return this.fns;
    }

    subscribe = (fn: T) => {
        this.fns = [...this.getFns(), fn];
    }

    unsubscribe = (fn: T) => {
        this.fns = this.getFns().filter(item => item !== fn);
    }

    notify = <U>(value: U) => {
        const fns = this.getFns();
        for(let i = fns.length; i > 0; i--) {
            fns[i - 1](value);
        }
    }
}

export default Subject;
