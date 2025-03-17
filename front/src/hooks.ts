import { useEffect, useState } from "react";
import { useRef } from "react";


export function useThrottle<T extends any[]>(callback: (...args: T) => void, delay: number = 2000) {
    const isWaiting = useRef(false);

    return (...args: T) => {
        if (isWaiting.current) return; 

        callback(...args);
        isWaiting.current = true; 

        setTimeout(() => {
            isWaiting.current = false; 
        }, delay);
    };
}

export function useDebounce(cb: any, delay: number) {
    const [debounceValue, setDebounceValue] = useState(cb);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(cb);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [cb, delay]);
    return debounceValue;
}
