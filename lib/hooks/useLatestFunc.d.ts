export declare function useLatestFunc<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => void;
