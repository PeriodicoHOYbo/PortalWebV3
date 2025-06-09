import Loader from '../src/components/Loader'
import { useEffect } from 'react'
import { useRouter,usePathname } from 'next/navigation'
import { useUser } from '../src/context/Context.js'
import { onAuth, getIndexData } from '../src/firebase/utils'

export function WithoutAuth(Component) {
    return () => {
        const { user, userDB, setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, date, setUserMonthAndYear, setUserDayMonthYear, monthAndYear} = useUser()
        const router = useRouter()
        useEffect(() => {
            let d = date ? date : new Date().getTime()
            onAuth(setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear)
            getIndexData(setUserData, d)
        }, [date, user,]);

        return (
            <>
                {userDB == '' && <Loader />}
                {userDB !== "" && <Component {...arguments} />}
            </>
        )
    }
}
