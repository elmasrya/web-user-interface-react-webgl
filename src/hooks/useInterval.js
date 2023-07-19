import {useEffect, useRef} from "react";

/*
   Inspired by the useInterval Hook described
   at: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            // console.log(`${(new Date()).toLocaleString()}: Interval created with id:${id}`);
            return () => {
                // console.log(`clearing interval id:${id}`);
                clearInterval(id);
            };
        }
    }, [delay]);

}

export {useInterval};