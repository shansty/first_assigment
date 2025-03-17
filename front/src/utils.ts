import { useEffect, useState } from "react";

// export function debounce<T extends any[]>(func: (...args: T) => void, timeout: number = 1000): (...args: T) => void {
//     let timer: NodeJS.Timeout;
//     return (...args: T) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func(...args);
//         }, timeout);
//     };
// }

// export function useDebounce(cb: any, delay: number) {
//     const [debounceValue, setDebounceValue] = useState(cb);
//     useEffect(() => {
//       const handler = setTimeout(() => {
//         setDebounceValue(cb);
//       }, delay);
  
//       return () => {
//         clearTimeout(handler);
//       };
//     }, [cb, delay]);
//     return debounceValue;
//   }

export function throttle<T extends any[]>(callback: (...args: T) => void, delay: number = 1000): (...args: T) => void {
    let isWaiting = false;

    return (...args: T) => {
        if (isWaiting) {
            return;
        }

        callback(...args);
        isWaiting = true;

        setTimeout(() => {
            isWaiting = false;
        }, delay);
    };
}