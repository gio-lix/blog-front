import s from "./Skaleton.module.scss"
import Skeleton from 'react-loading-skeleton'



export const PostSkeleton = () => {
    return (
        <div className={s.root}>
            <Skeleton  height={300} />
            <div className={s.info}>
                <Skeleton className={s.title}/>
                <div>
                    <Skeleton width={70} height={10}/>
                    <Skeleton width={70} height={10}/>
                </div>
            </div>
            <Skeleton className={s.message}/>
        </div>
    );
};