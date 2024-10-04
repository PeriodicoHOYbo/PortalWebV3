import admin, { credential } from 'firebase-admin'

export default function handler(req, res) {
  const { seccion, id } = req.query;
  const credentialFB = {
    type: process.env.TYPE,
    projectId: process.env.PROJECT_ID,
    privateKeyId: process.env.PRIVATE_KEY_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID,
    authUri: process.env.AUTH_URI,
    tokenUri: process.env.TOKEN_URI,
    authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.CLIENT_X509_CERT_URL,
    universeDomain: process.env.UNIVERSE_DOMAIN
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(credentialFB),
      databaseURL: "https://periodico-hoy-db-default-rtdb.firebaseio.com"
    });
  }

  var database = admin.database();
  var referene = database.ref(`${seccion}/Posts/PostImage_${id}`);

  try {

    referene.once('value', async function (snapshot) {
      if (snapshot.exists()) {
        res.json(snapshot.val())
      } else {
        res.status(200).json({
          title: `Hoy Siete Dias De Informacion}`,
          description: `Ultimas noticias sobre ${seccion}`
        })
      }
    });

  } catch (err) {
    res.json({
      title: `Hoy Siete Dias De Informacion}`,
      description: `Ultimas noticias sobre ${seccion}`
    })
  }




}
