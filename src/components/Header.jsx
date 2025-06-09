import { useUser } from '../context/Context.js'
import { useRouter,usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Modal from './Modal'

import Dates from './Date'
import styles from '../styles/Header.module.css'
import { useState } from 'react'
import RelojDigital from './RelojDigital'

import FormAdds from '../components/FormAdds'
import { onAuth, getIndexData } from '../firebase/utils'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';

export default function Header(props) {
    const router = useRouter()
    const { user, userDB, setUserData, postsIMG, setUserMonthAndYear, setUserDayMonthYear, setUserSuccess, setUserPostsIMG, date, setUserDate } = useUser()
    const [dataEditor, setDataEditor] = useState(null)
    const pathname = usePathname()

    function dateEvent(e) {
        const months = ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        const format = e.target.value.split("-")
        let d = new Date(parseInt(format[0]), parseInt(format[1] - 1), format[2], 23, 59, 0).getTime()
        let md = new Date(parseInt(format[0]), parseInt(format[1] - 1), format[2], 0, 0, 0).getTime()

        // console.log(new Date(d).toLocaleDateString() == new Date().toLocaleDateString())
        new Date(d).toLocaleDateString() !== new Date().toLocaleDateString() ? getIndexData(setUserData, d, md, setUserSuccess) : getIndexData(setUserData, d)
    }
    function handlerClickEnlace(i) {
        pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
        pathname == "/Admin" && setDataEditor(i)

        console.log(i)
    }
    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    }
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }
    function handlerClickEnlace(data) {
        pathname != "/Admin" && window.open(data.href, data.target)
        pathname == "/Admin" && setDataEditor(data)
    }
    function redirect(rute) {
        rute !== '#' && window.open(rute, '_blank')
    }

    return (
        <>
      
            {pathname == "/Admin" && <FormAdds />}

            <header className={styles.header} id='Videos'>
                <div className={styles.fecha}>
                    <Dates></Dates>
                    <input className={styles.calendario} type="date" id="start" name="trip" onChange={dateEvent} />
                </div>
                <div className={styles.portada}>
                    <RelojDigital></RelojDigital>

                    <img className={styles.video} src="/1675975675928.gif" alt="navidad" />

                    <div className={styles.box} >
                        {userDB.BannerPortada && Object.keys(userDB.BannerPortada).length == 1 ? Object.keys(userDB.BannerPortada).map((i, index) =>
                            <div className="each-slide" key={index} >
                                <div>
                                    {
                                        pathname === "/Admin"
                                            ? <span onClick={() => handlerClickEnlace({ carpeta: 'BannerPortada', item: '', i })}>
                                                <img className={styles.boxImg} src={userDB[`BannerPortada`][i].url} />
                                            </span>
                                            : <span onClick={() => redirect(userDB[`BannerPortada`][i].enlace ? userDB[`BannerPortada`][i].enlace : '#')}>
                                                <img className={styles.boxImg} src={userDB[`BannerPortada`][i].url} />
                                            </span>
                                    }
                                </div>
                            </div>)
                            :
                            <Fade transitionDuration={800} duration={2000} scale={1}{...properties} indicators={true}>
                                {
                                    userDB && userDB.BannerPortada && Object.keys(userDB.BannerPortada).map((i, index) =>
                                        <div className="each-slide" key={index} >
                                            <div>
                                                {
                                                    pathname === "/Admin"
                                                        ? <span onClick={() => handlerClickEnlace({ carpeta: 'BannerPortada', item: '', i })}>
                                                            <img className={styles.boxImg} src={userDB[`BannerPortada`][i].url} />
                                                        </span>
                                                        : <span onClick={() => redirect(userDB[`BannerPortada`][i].enlace ? userDB[`BannerPortada`][i].enlace : '#')}>
                                                            <img className={styles.boxImg} src={userDB[`BannerPortada`][i].enlace} />
                                                        </span>
                                                }
                                            </div>
                                        </div>
                                    )}
                            </Fade>
                        }
                    </div>
                    {/* <img className={styles.navidad} src={postsIMG[]} alt="navidad" /> */}
                </div>
            </header>
            <Navbar />
            {/* {dataEditor && <Modal post={dataEditor.key} topic={'/'} i={dataEditor.i} close={handlerClickEnlace}></Modal>} */}
            {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

        </>
    )
}





