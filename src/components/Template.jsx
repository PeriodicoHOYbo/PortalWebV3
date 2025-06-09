import { useUser } from '../context/Context.js'
import { useState, useEffect } from 'react'
import Banner from './Banner'
import Modal from './Modal'
import { getIndexStorage } from '../firebase/storage'
import styles from '../styles/Template.module.css'
import { useRouter, usePathname } from 'next/navigation'
import BannerLateral from './BannerLateral'
import Link from 'next/link'
// import Reveal from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";




function TemplateFour({ color, topic, grid }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerClickEnlace(i) {
        pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
        pathname == "/Admin" && setDataEditor(i)
    }
    // console.log(userDB)


    console.log(pathname)

    useEffect(() => {
        userDB[topic] && userDB[topic]["Posts"] && setDataForDate(Object.keys(userDB[topic]["Posts"]).map(i => { const newI = i.split('_'); return newI[1] }).sort((a, b) => b - a))
    }, [userDB]);
    return (
        <section className={styles.section} id={topic} style={{ backgroundColor: 'white' }}>
            {topic != "Inicio" && <div className={`${styles.containerSubtitle} h-[50px]`}>

                <h4 className={`${styles.subtitle} w-[100%]  h-[34px]`}>
                    <span className='px-2 absolute text-[#ffffffb0] text-[20px] left-0 right-0 mx-auto'>
                        {topic == 'GestionDeGobierno'
                            ? 'GESTIÓN DE GOBIERNO'
                            : (topic == 'Salud'
                                ? 'CIUDADES'
                                : topic == 'Empresarial'
                                    ? 'ESPACIO SOLICITADO'
                                    : topic.toUpperCase())}
                    </span>
                    <marquee behavior="" direction="right" className='relative w-[100%]'>
                        <p className='relativo inline-block w-[20%] text-[16px] md:text-[20px] '>
                            {topic == 'GestionDeGobierno'
                            ? 'GESTIÓN DE GOBIERNO'
                            : (topic == 'Salud'
                                ? 'CIUDADES'
                                : topic == 'Empresarial'
                                    ? 'ESPACIO SOLICITADO'
                                    : topic.toUpperCase())}
                        </p>
                    </marquee>
                    {topic != "Inicio" && <button className={`${styles.buttonSeeAll} bg-[#ffd900] h-[34px] px-5 text-[16px] rounded-full border-[2px]`} onClick={setPostsElements}>{!elements ? 'Ver todo' : 'Ver menos'} </button>}
                </h4>
            </div>}
            <Fade cascade>
                {userDB[topic]["BannerTop"] && <Banner ruta={topic} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}
            </Fade>


            <div className={`
                ${grid === 'TemplateOne' && styles.gridOne}
                ${grid === 'TemplateThreeA' && styles.gridThreeA}
                ${grid === 'TemplateThreeB' && styles.gridThreeB}
                ${grid === 'TemplateFour' && styles.gridFour}
                ${grid === 'TemplateFive' && styles.gridFive}
                ${grid === 'TemplateSix' && styles.gridSix}
                ${grid === 'TemplateSeven' && styles.gridSeven}
                ${grid === 'TemplateEight' && styles.gridEight}
                ${grid == null && styles.gridThreeB} 
                ${elements == true && styles.allVisible}`}>

                {userDB && dataForDate.length > 0 && dataForDate.map((i, index) =>
                    <Fade cascade key={index}>


                        {userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && userDB[topic]["Posts"][`PostImage_${i}`].state !== undefined && userDB[topic]["Posts"][`PostImage_${i}`].state === 'Publicado' && pathname !== "/Admin" &&
                            <div key={index} >

                                {/* {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{pathname !== "/Admin" && ''}</span>} */}
                                {pathname == "/Admin" && <span className={styles.datePost} onClick={() => pathname == "/Admin" && handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}

                                <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : ''} legacyBehavior>
                                    <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] && userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}>
                                        <img src={userDB[topic].Posts[`PostImage_${i}`].url} className='hover:scale-125 transition-all' style={{ objectPosition: `${userDB[topic]["Posts"][`PostImage_${i}`]['objectFit']}` }} loading="lazy" />
                                    </a>

                                </Link>

                                {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                            </div>
                        }
                        {
                            userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && pathname == "/Admin" &&
                            <div key={index}>

                                {/* {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{pathname !== "/Admin" && ''}</span>} */}
                                {<span className={styles.datePost} onClick={() => pathname == "/Admin" && handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}
                                <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : ''} legacyBehavior>
                                    <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] && userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}>
                                        <img src={userDB[topic].Posts[`PostImage_${i}`].url} style={{ objectPosition: `${userDB[topic]["Posts"][`PostImage_${i}`]['objectFit']}` }} loading="lazy" />

                                    </a>
                                </Link>
                                {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                            </div>
                        }
                    </Fade>

                )}

            </div>
            <Fade cascade>
                {userDB[topic]["BannerBottom"] && <Banner ruta={topic} carpeta="BannerBottom" click={handlerClickEnlace} ></Banner>}
            </Fade>
            <Fade cascade>
                <div className='md:hidden'>
                    {topic === 'Sociedad' && <BannerLateral carpeta="BannerIzquierdo" items={[1]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'Salud' && <BannerLateral carpeta="BannerDerecho" items={[1]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'Seguridad' && <BannerLateral carpeta="BannerDerecho" items={[1]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'Politica' && <BannerLateral carpeta="BannerIzquierdo" items={[2]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'Economia' && <BannerLateral carpeta="BannerDerecho" items={[2]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'Deportes' && <BannerLateral carpeta="BannerIzquierdo" items={[3]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'GestionDeGobierno' && <BannerLateral carpeta="BannerIzquierdo" items={[4]} click={handlerClickEnlace}></BannerLateral>}
                    {topic === 'Cultura' && <BannerLateral carpeta="BannerDerecho" items={[1]} click={handlerClickEnlace}></BannerLateral>}
                </div>
            </Fade>

            {dataEditor && <Modal topic={topic} carpeta={dataEditor.carpeta} i={dataEditor.i} close={handlerClickEnlace} ></Modal>}
        </section>
    )
}
export default TemplateFour






