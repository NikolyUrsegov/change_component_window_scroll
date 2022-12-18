import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {OneComponent} from "../components/oneComponent";
import {TwoComponent} from "../components/twoComponent";
import {ThreeComponent} from "../components/threeComponent";

// const debounce = (fn: Function, ms = 100) => {
//     console.log('debounce')
//     let timeoutId: ReturnType<typeof setTimeout>;
//     return function (this: any, ...args: any[]) {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => fn.apply(this, args), ms);
//     };
// };


function App() {
    const rootRef = useRef<HTMLDivElement>(null)
    const [start, setStart] = useState(0)
    const [isListener, setIsListener] = useState(false)

    const components: React.ReactNode[] = [<OneComponent/>, <TwoComponent/>, <ThreeComponent/>]


    const onScroll = (e: any) => {
        console.log(e.deltaY)
        if (e.deltaY > 0) {
            setStart((prevState) => {
                if (prevState < components.length - 1) {
                    return prevState + 1
                } else {
                    return components.length - 1
                }
            })
        } else if (e.deltaY < 0) {
            setStart((prevState) => {
                if (prevState !== 0) {
                    return prevState - 1
                } else {
                    return 0
                }
            })
        }
        setIsListener(false)
    }


    useEffect(() => {
        if (!isListener) {
            setIsListener(true)
            setTimeout(() => {
                console.log('setTimeout')
                console.log('add listener')
                rootRef?.current?.addEventListener('mousewheel', onScroll, {once: true})

            }, 1500)
        }


        //     rootRef?.current?.addEventListener('mousewheel', onScroll, {once: true})
        // return () => {
        //     rootRef?.current?.removeEventListener('mousewheel', onScroll)
        // }
    })

    return (
        <div className="App" ref={rootRef}>
            {components[start]}
        </div>
    );
}

export default App;
