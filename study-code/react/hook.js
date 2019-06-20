// https://mp.weixin.qq.com/s/fp-GNIcz5zwrikcM0648DQ
// Hook
function useEventListener(eventName, handler, element = global) {
    // 创建一个储存处理方法的ref
    const savedHandler = useRef();

    // 当处理函数改变的时候更新ref.current的方法
    // 这样可以使我们的总是获取到最新的处理函数
    // 并且不需要在它的effect依赖数组中传递
    // 并且避免有可能每次渲染重新引起effect方法
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // 确认是否支持addEventListener
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // 创建一个调用储存在ref中函数的事件监听
            const eventListener = event => savedHandler.current(event);

            // 添加事件监听
            element.addEventListener(eventName, eventListener);

            // 在cleanup的回调中，清除事件监听
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        }, [eventName, element] // 当元素或者绑定事件改变时，重新运行
    );
};


// Hook
function useWhyDidYouUpdate(name, props) {
    // 获得一个可变的kef对象，我们可以用来存储props并且在下一次hook运行的时候进行比较
    const previousProps = useRef();

    useEffect(() => {
        if (previousProps.current) {
            // 获取改变前后所有的props的key值
            const allKeys = Object.keys({...previousProps.current, ...props });
            // 使用这个对象去跟踪改变的props
            const changesObj = {};
            // 通过key值进行循环
            allKeys.forEach(key => {
                // 判断改变前的值是否和当前的一致
                if (previousProps.current[key] !== props[key]) {
                    // 将prop添加到用来追踪的对象中
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    };
                }
            });

            // 如果改变的props不为空，则输出到控制台
            if (Object.keys(changesObj).length) {
                console.log('[why-did-you-update]', name, changesObj);
            }
        }

        // 最后将当前的props值保存在previousProps中，以供下一次hook进行的时候使用
        previousProps.current = props;
    });
}

// Hook
function useDarkMode() {
    // 使用我们useLocalStorage hook即使在页面刷新后也能保存状态
    const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');

    // 查看用户是否已经为黑暗模式设置了一个浏览器或系统偏好
    // usePrefersDarkMode hook 组合了 useMedia hook （查看接下来的代码）
    const prefersDarkMode = usePrefersDarkMode();

    // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
    // 这允许用户在我们的网站上覆盖掉系统级别的设置
    const enabled = typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;

    // 改变黑暗模式
    useEffect(
        () => {
            const className = 'dark-mode';
            const element = window.document.body;
            if (enabled) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        }, [enabled] // 只要当enabled改变时调用该方法
    );

    // 返回enabled的状态和设置方法
    return [enabled, setEnabledState];
}

// Hook
function useMedia(queries, values, defaultValue) {
    // 一个包含了是否匹配每一个媒体查询的数组
    const mediaQueryLists = queries.map(q => window.matchMedia(q));

    // 根据匹配的媒体查询取值的方法
    const getValue = () => {
        // 获取第一个匹配的媒体查询的下标
        const index = mediaQueryLists.findIndex(mql => mql.matches);
        // 返回相对应的值或者默认值
        return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };

    // 匹配值的state和setter
    const [value, setValue] = useState(getValue);

    useEffect(
        () => {
            // 回调方法
            // 注意：通过在useEffect外定义getValue ...
            // ... 我们可以确定它又从hook的参数传入的最新的值（在这个hook的回调第一次在mount的时候被创建）
            const handler = () => setValue(getValue);
            // 为上面每一个媒体查询设置一个监听作为一个回调
            mediaQueryLists.forEach(mql => mql.addListener(handler));
            // 在cleanup中清除监听
            return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
        }, [] // 空数组保证了effect只会在mount和unmount时运行
    );

    return value;
}


// Hook
function useLockBodyScroll() {
    useLayoutEffect(() => {
        // 获取原始body的overflow值
        const originalStyle = window.getComputedStyle(document.body).overflow;
        //防止在mount的过程中滚动
        document.body.style.overflow = 'hidden';
        // 当组件unmount的时候解锁滚动
        return () => document.body.style.overflow = originalStyle;
    }, []); // 空数组保证了effect函数只会在mount和unmount的时候运行
}

// Hook
function useTheme(theme) {
    useLayoutEffect(() => {
            // 循环这个主题对象
            for (const key in theme) {
                // 更新文档根元素的css变量
                document.documentElement.style.setProperty(`--${key}`, theme[key]);
            }
        }, [theme] // 只要当主题对象发行改变时才会再次运行
    );
}


// Hook
function useKeyPress(targetKey) {
    // 用来储存持续追踪是否有键被按下
    const [keyPressed, setKeyPressed] = useState(false);

    // 如果按下的键值是我们的目标值，将其设置为true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    // 如果松开的键值是我们的目标值，将其设置为false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    // 添加事件监听
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // 在cleanup中清除回调
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // 空数组意味着只有在mount和unmout的时候才会运行

    return keyPressed;
}

// Hook
function useDebounce(value, delay) {
    // 存储去抖动后的值
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // 在延迟delay之后更新去抖动后的值
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // 如果值改变了取消timeout (同样在delay改变或者unmount时生效)
            // 这就是我们通过延迟间隔内值没有被改变来达到防止值去抖动 清空timeout并且重新运行
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay] // 只有当搜索值或者delay值发生改变时才会重新调用
    );

    return debouncedValue;
}

// Hook
function useOnScreen(ref, rootMargin = '0px') {
    // 储存元素是否可见的状态
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 当observer回调触发是更新状态
                setIntersecting(entry.isIntersecting);
            }, {
                rootMargin
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []); // 空数组确保只会在mount和unmount执行

    return isIntersecting;
}


// Hook
function usePrevious(value) {
    // ref对象是一个通用容器其current属性为可变的，并且可以容纳任何值，类似与一个类上的实例属性。
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // 只有当值改变时重新运行

    // 返回更新前的值 (发生在useEffect更新之前)
    return ref.current;
}

// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                // 元素内点击不做任何事
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        // 将ref和处理函数添加到effect的依赖数组中
        // 值得注意的一点是，因为在每一次render中被传入的处理方法是一个新函数，这将会导致effect的callback和cleanup每次render时被1调用。
        // 这个问题也不大，你可以将处理函数通过useCallback包裹起来然后再传入hook中。
        [ref, handler]
    );
}

// Hook
function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // 空数组保证effect只会在mount和unmount执行

    return windowSize;
}

// Hook
function useHover() {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        }, [ref.current] // 只有当ref改变时才会重新调用
    );

    return [ref, value];
}

// Hook
function useLocalStorage(key, initialValue) {
    // State to store our value
    // 将初始状态传给useState，这样逻辑只会执行一次
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // 通过key值从localstorage中获取值
            const item = window.localStorage.getItem(key);
            // 如果没有返回初始值则解析储存的json
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // 如果报错了依旧返回初始值
            console.log(error);
            return initialValue;
        }
    });

    // 返回useState的setter函数的包装版本，该函数将新的值保存到localstorage中
    const setValue = value => {
        try {
            // 允许值是一个函数，这样我们就有了和useState一样的api
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // 保存state
            setStoredValue(valueToStore);
            // 保存到localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // 更高级实现的处理将会处理错误的情况
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
