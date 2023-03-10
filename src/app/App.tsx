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

    const [touchmoveStart, setTouchmoveStart] = useState(0)


    const onScroll = (e: any) => {
        if (e > 0) {
            console.log('down')

            setStart((prevState) => {
                if (prevState < components.length - 1) {
                    return prevState + 1
                } else {
                    return components.length - 1
                }
            })
        } else if (e < 0) {
            console.log('up')

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

    const onDesktop = (e: any) => {
        onScroll(e.deltaY)
    }

    const touchstart = (e: any) => {
        setTouchmoveStart(e.changedTouches[0].clientY)
    }

    const touchmove = (e: any) => {
        console.log(touchmoveStart - e.changedTouches[0].clientY)
        console.log('start', touchmoveStart)
        console.log('finish', e.changedTouches[0].clientY)
        onScroll(touchmoveStart - e.changedTouches[0].clientY)

    }

    useEffect(() => {
        if (!isListener) {
            setIsListener(true)
            setTimeout(() => {
                console.log('add listener')
                rootRef?.current?.addEventListener('wheel', onDesktop, {once: true})
            }, 1500)
            setTimeout(() => {
                console.log('add listener')
                rootRef?.current?.addEventListener('touchend', touchmove, {once: true})
                rootRef?.current?.addEventListener('touchstart', touchstart, {once: true})
            }, 100)
        }


        //     rootRef?.current?.addEventListener('mousewheel', onScroll, {once: true})
        return () => {
            rootRef?.current?.removeEventListener('wheel', onDesktop)
            rootRef?.current?.removeEventListener('touchmove', touchmove)
            rootRef?.current?.removeEventListener('touchstart', touchstart)
        }
    })

    return (
        <div className="App" ref={rootRef}>
            {components[start]}
        </div>
    );
}

export default App;
