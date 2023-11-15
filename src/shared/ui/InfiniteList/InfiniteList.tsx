import React, {memo, MutableRefObject, ReactNode, useRef} from 'react'
import classNames from 'shared/lib/classNames/classNames'
import {useIntersectionObserver} from 'shared/lib/hooks/useIntersectionObserver/useIntersectionObserver'

import styles from './InfiniteList.module.scss'

interface InfiniteListProps<ValueType> {
    className?: string,
    data: ValueType[],
    renderElement: (itemProps: ValueType) => ReactNode,
    hasMore: boolean,
    onScrollEnd: () => void,
    renderSkeleton?: () => ReactNode,
    skeletonLength?: number,
    isOnce?: boolean
}

const InfiniteListWithoutMemo = <ValueType,>(props: InfiniteListProps<ValueType>) => {
    const {
        className,
        data,
        renderElement,
        hasMore,
        onScrollEnd,
        renderSkeleton,
        skeletonLength = 5,
        isOnce = false
    } = props
    const targetElement = useRef() as MutableRefObject<HTMLDivElement>
    const rootElement = useRef() as MutableRefObject<HTMLDivElement>
    useIntersectionObserver({
        targetElement,
        rootElement,
        callback: onScrollEnd,
        isOnce
    })
    return (
        <div
            className={classNames(styles.InfiniteList, {}, [className])}
            ref={rootElement}
        >
            {data.map(renderElement)}
            <div ref={targetElement} style={{height: '1px'}}/>
            {hasMore && renderSkeleton && Array.from({length: skeletonLength}, () => renderSkeleton())}
        </div>
    )
}
export const InfiniteList = memo(InfiniteListWithoutMemo) as typeof InfiniteListWithoutMemo