'use client'
import Image from 'next/image'
import NavbarSimple from '../../components/NavbarSimple.jsx'
import { useUser } from '../../context/Context.js'
import { WithoutAuth } from '../../../HOCs/WithoutAuth.jsx'
import Button from '../../components/Button.jsx'
import Success from '../../components/Success.jsx'
import TemplateNota from '../../components/TemplateNota.jsx'
import Layout from '../../layout/Layout.jsx'
import TextEditor from '../../components/TextEditor.jsx'
import { handleSignOut, writeUserData, getSpecificData, onAuth, getIndexData } from '../../firebase/utils.js'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import Banner from '../../components/Banner.jsx'
import BannerNotas from '../../components/BannerNotas.jsx'
import Modal from '../../components/Modal.jsx'
import Temporizador from '../../components/Temporizador.jsx'
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import Head from 'next/head'




// import { useSpeechSynthesis } from 'react-speech-kit';
// import {SpeechSynthesis} from '../../components/SpeechSynthesis'
const SpeechSynthesis = dynamic(() => import("../../components/SpeechSynthesis.jsx"), {
  ssr: false,
});
const SpeechToText = dynamic(() => import("../../components/SpeechToText.jsx"), {
  ssr: false,
});
// import useSpeechToText from 'react-hook-speech-to-text';

// import Form from './Form'

import styles from '../../styles/Temporal.module.css'

import 'react-quill/dist/quill.core.css';

import dynamic from 'next/dynamic'


const ReactQuill = dynamic(() => import('../../components/content.jsx'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})





// export async function getServerSideProps(context) {
//   function validate() {

//     switch (context.params.temporal.slice(0, 2)) {
//       case '11':
//         return "Inicio"
//         break;
//       case '12':
//         return "Sociedad"
//         break;
//       case '13':
//         return "Salud"
//         break;
//       case '14':
//         return "Seguridad"
//         break;
//       case '15':
//         return "Politica"
//         break;
//       case '16':
//         return "Economia"
//         break;
//       case '17':
//         return "Deportes"
//         break;
//       case '18':
//         return "GestionDeGobierno"
//         break;
//       case '19':
//         return "Cultura"
//         break;
//       case '20':
//         return "Internacional"
//         break;
//       case '21':
//         return "Deportes"
//         break;
//       case '22':
//         return "Empresarial"
//         break;
//       default:
//         return 'anything'
//     }
//   }
//   const res = await fetch(`https://hoy.bo/api?seccion=${validate()}&id=${context.params.temporal.slice(2)}`)
//   if (!res.ok) {
//     throw new Error('Error en la respuesta de la API');
//   }
//   const dataServer = await res.json()
//   console.log(dataServer)
//   return {
//     props: {
//       dataServer: {
//         "title": dataServer.title ? dataServer.title: `Hoy: ${validate()}`,
//         "descripcion": dataServer.description,
//         "url": dataServer.url?  dataServer.url: '/hoy.png'
//       }

//     },
//   };
// }






function TemplateOne({ dataServer }) {
  const [textArea, setTextArea] = useState("");
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, specificData, setUserSpecificData, setUserProfile, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear } = useUser()
  const { load, play, } = useGlobalAudioPlayer();

  const path = usePathname()
  const pathname = path.replaceAll('/', '')
console.log(pathname)
  const [arr, setArr] = useState([0])

  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [copyrightIMG, setCopyrightIMG] = useState(null)

  const [textEditor, setTextEditor] = useState("")

  const [formViewer, setFormViewer] = useState(true)
  const [dataEditor, setDataEditor] = useState(null)
  const [isChecked, setIsChecked] = useState(true)

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']


  const router = useRouter()

  function handlerOnChange(e) {
    const name = e.target.name
    const value = e.target.value
    name == 'title' ? setTitle(value) : ''
    name == 'description' ? setDescription(value) : ''
    name == 'copyrightIMG' ? setCopyrightIMG(value) : ''
  }
  function handlerTextEditorOnChange(content, delta, source, editor) {
    setTextEditor(editor.getHTML())
  }

  function redirect(ruta) {
    ruta != '#' ? window.open(ruta, '_blank') : ''
  }

  function validate() {

    switch (pathname.slice(0, 2)) {
      case '11':
        return "Inicio"
        break;
      case '12':
        return "Sociedad"
        break;
      case '13':
        return "Salud"
        break;
      case '14':
        return "Seguridad"
        break;
      case '15':
        return "Politica"
        break;
      case '16':
        return "Economia"
        break;
      case '17':
        return "Deportes"
        break;
      case '18':
        return "GestionDeGobierno"
        break;
      case '19':
        return "Cultura"
        break;
      case '20':
        return "Internacional"
        break;
      case '21':
        return "Deportes"
        break;
      case '22':
        return "Empresarial"
        break;
      default:
        return 'anything'
    }
  }


  function save(e, st) {

    const ruteDB = `${validate()}/Posts/PostImage_${pathname.slice(2)}`
    const objectDB = {
      title: title ? title : '',
      description: description ? description : '',
      copyrightIMG: copyrightIMG ? copyrightIMG : '',
      state: st == 'B' ? 'Borrador' : 'Publicado',
      redactor: user.uid
    }
    const rutePost = `/Posts/PostImage_${pathname}`
    const objectPost = {
      nota: textEditor,
    }
    writeUserData(ruteDB, objectDB, setUserSuccess, 'save')
    isChecked && writeUserData(`Inicio/Posts/PostImage_${pathname.slice(2)}`, objectDB, setUserSuccess, 'save')
    writeUserData(rutePost, objectPost, setUserSuccess, 'save')

    return setUserSpecificData({
      ...specificData, [`PostImage_${pathname}`]: { ...objectDB, ...objectPost },
    })

  }


  function formViewerHandler() {
    setFormViewer(!formViewer)
  }

  function handlerClickEnlace(data) {
    setDataEditor(data)
  }

  function handlerChecked() {
    setIsChecked(!isChecked)
  }


  useEffect(() => {
    if (specificData && specificData[`PostImage_${pathname}`] && specificData[`PostImage_${pathname}`].nota) {
      setTextEditor(specificData[`PostImage_${pathname}`].nota)
    } else {
      getSpecificData(`/Posts/PostImage_${pathname}`, specificData, setUserSpecificData)
    }

    if (userDB && userDB[validate()]) {
      setTitle(userDB[validate()]?.Posts[`PostImage_${pathname.slice(2)}`]?.title)
      setDescription(userDB[validate()]?.Posts[`PostImage_${pathname.slice(2)}`]?.description)
      setCopyrightIMG(userDB[validate()]?.Posts[`PostImage_${pathname.slice(2)}`]?.copyrightIMG)
    }
  }, [userDB, specificData])

  useEffect(() => {
    let d = date ? date : new Date().getTime()
    onAuth(setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear)
    getIndexData(setUserData, d)
  }, [user]);

  return (
    <>

      {/* <Head>
        <title>{dataServer.title}</title>
        <meta name="description" content="Esta es una descripción increíble de mi página." />

        <meta property="og:title" content={`${dataServer.title}`} />
        <meta property="og:description" content={`${dataServer.descripcion}`} />
        <meta property="og:image" content={`${dataServer.url}`} />
        <meta property="og:url" content={`${dataServer.url}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bienvenido a Mi Página" />
        <meta name="twitter:description" content="/gobierno.jpg" />
        <meta name="twitter:image" content="/gobierno.jpg" />
      </Head> */}




      {pathname && userDB[validate()] && userDB[validate()].Posts && userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].url !== undefined && <Layout>

        {specificData && pathname !== undefined &&
          <main className={styles.main}>
            <NavbarSimple footer={false}></NavbarSimple>

            <div className={styles.containerBanner}>
              {userDB && userDB[validate()] && userDB[validate()]["BannerTop"] && <Banner ruta={validate()} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}
            </div>

            <div className={`${styles.viewer} ${formViewer == false && styles.hideForm}`}>

              <h2 className={styles.title}>{description}</h2>
              <p className={styles.description}>{title}</p>

              <div className={`${styles.containerButtonsPlayer} flex w-full justify-center`}>
                {specificData && router.query && specificData[`PostImage_${pathname}`] && specificData[`PostImage_${pathname}`].nota && <SpeechSynthesis text={parse(textEditor) !== 'En redacción ' && Array.isArray(parse(textEditor)) && parse(textEditor).reduce((acc, result) => {
                  return acc + result.props.children
                }, '').replaceAll('[object Object]').replaceAll('undefined')} />}
              </div>

              <div className={styles.containerIMGCenter}>
                <div className={styles.containerIMG}>
                  <img src={userDB[validate()] && userDB[validate()].Posts && userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].url !== undefined && userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].url} className={styles.image} alt="" />
                  <span className={styles.copyrightIMG}>{copyrightIMG}</span>
                </div>
              </div>



              {userDB && userDB[validate()] && userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].state == 'Publicado' || user
                ? <div className={`${styles.qlEditor} `} styles={{ padding: '0', height: '50%' }} >
                  <div className={`${styles.editor} ${styles.editorNon}`}>
                    <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'} edit={false}></TextEditor>
                  </div>

                  <br />

                  <div className={styles.redactorData}>
                    <div className={styles.perfil}>
                      <img src={userDB[validate()] && userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].redactor !== undefined && userDB.users[userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].redactor].url} className={styles.perfilIMG} alt="" />
                      {userDB.users[userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].redactor] && <p>{userDB.users[userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].redactor].name} <br /> Redactor</p>}
                    </div>
                    <span>
                      {days[new Date(userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].fecha).getDay()]} {' de '}
                      {new Date(userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].fecha).getDate()} {' de '}
                      {months[new Date(userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].fecha).getMonth()]} {' de '}
                      {new Date(userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].fecha).getFullYear()}</span>
                  </div>
                </div>


                : <div>En redacción...</div>

              }
              {user && formViewer == true && <div className='w-[90%] max-w-[350px] relative left-0 right-0 bottom-[20px] mx-auto z--50'>
                <Button style="miniButtonPrimary" click={formViewerHandler}>Editar nota</Button>
              </div>}
            </div>

            <div className={styles.adds}>

              <BannerNotas routeDB={`${validate()}`} items={[1, 2, 3, 4]} click={handlerClickEnlace} admin={formViewer}></BannerNotas>

            </div>


            {user && <div className={`${styles.viewer} ${formViewer == true && styles.hideForm}`}>
              <div className='flex w-full'>
                <label htmlFor="Title" className='w-[100px]' >Titulo</label>
                <input type="text" id="Title" name="description" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={description} />

              </div>
              <br />
              <div className='flex w-full'>
                <label htmlFor="Description" className='w-[100px]' >Descripcion</label>
                <input type="text" id="Description" name="title" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={title} />

              </div>
              <br />
              <div className='flex w-full'>
                <label htmlFor="Description" className='w-[100px]' >Autor IMG</label>
                <input type="text" id="Description" name="copyrightIMG" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={copyrightIMG} />
              </div>


              <h2 className={styles.title}>{description}</h2>
              <p className={styles.description}>{title}</p>

              <div className={styles.containerIMGCenter}>
                <div className={styles.containerIMG}>
                  <img src={userDB[validate()].Posts[`PostImage_${pathname.slice(2)}`].url} className={styles.image} alt="" />
                  <span className={styles.copyrightIMG}>{copyrightIMG}</span>
                </div>
              </div>
              <SpeechToText setValue={setTextEditor} value={textEditor ? textEditor : 'nada'} />
              <br />
              <div className={styles.editor}  >
                <TextEditor setValue={setTextEditor} value={textEditor ? textEditor : 'nada'} edit={true}></TextEditor>
              </div>

              <br />

              <input type="checkbox" onClick={handlerChecked} checked={isChecked} /> init
              <br />
              <br />


              <div className={styles.buttonsContainer}>
                <Button style="miniButtonPrimary" click={(e) => save(e, 'B')}> Guardar/Borrador</Button>
                <Button style="miniButtonPrimary" click={(e) => save(e, 'P')}> Publicar</Button>
              </div>
              {user && formViewer == false && <div className='w-[90%] max-w-[350px] relative left-0 right-0  mx-auto py-5'>
                <Button style="miniButtonPrimary" click={formViewerHandler}>Previsualizar</Button>
              </div>}
            </div>}

          </main>}
        {specificData && pathname !== undefined &&
          <TemplateNota topic={validate()} publicView={true} banner='none'></TemplateNota>
        }

        {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

        {success == "save" && <Success>Cargando...</Success>}

        {user === null && <Temporizador topic={validate()} />}
      </Layout>}
    </>
  )
}
export default TemplateOne





