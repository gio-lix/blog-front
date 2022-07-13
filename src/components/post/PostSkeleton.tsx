import s from "./Skaleton.module.scss"
import Skeleton from 'react-loading-skeleton'

interface Props {
    image: boolean
}

export const PostSkeleton = ({image}: Props) => {
    return (
        <div className={s.root}>
            <Skeleton  height={image ? 300 : 200} />
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