import App from './App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

export const renderApp = (req, res) => {
  const context = {};
  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const html =
    // prettier-ignore
    `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Cat or Shark?</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
      }
  </head>
  <body>
      <div id="root">${markup}</div>
      <!-- razzle_static_js -->
      <script src="${assets.client.js}" defer crossorigin></script>
  </body>
</html>`;

  return { html, context };
};

const sharksList = [
  'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
  'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
  'https://founded.media/hiring/photos/sharks/2989909952_b59500107e_o.jpg',
  'https://founded.media/hiring/photos/sharks/4107884442_3baf8985f2_b.jpg',
  'https://founded.media/hiring/photos/sharks/3822452418_ffa66da89d_o.jpg',
  'https://founded.media/hiring/photos/sharks/3800013954_20fea3a9c9_b.jpg',
  'https://founded.media/hiring/photos/sharks/7109693941_250fc6b246_k.jpg',
  'https://founded.media/hiring/photos/sharks/8592704407_75c3c7ff53_h.jpg',
  'https://founded.media/hiring/photos/sharks/14730744390_cebc28aa86_k.jpg',
  'https://founded.media/hiring/photos/sharks/4936728723_91da549b05_b.jpg',
 ];
const catsList = [
  'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
  'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
  'https://founded.media/hiring/photos/cats/13901304865_a444cf4d34_k.jpg',
  'https://founded.media/hiring/photos/cats/8311701653_49ed80202c_k.jpg',
  'https://founded.media/hiring/photos/cats/13336301695_3c06dd41cc_k.jpg',
  'https://founded.media/hiring/photos/cats/38679744435_66279af67c_k.jpg',
  'https://founded.media/hiring/photos/cats/6393395037_9cda69da1a_b.jpg',
  'https://founded.media/hiring/photos/cats/6977309082_44102ddf51_b.jpg',
  'https://founded.media/hiring/photos/cats/11477923503_bbdf86387d_b.jpg',
  'https://founded.media/hiring/photos/cats/4481336172_7f464f180d_b.jpg'
 ];

 function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.38);
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/', (req, res) => {
    const { html, context } = renderApp(req, res);

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return res.redirect(301, context.url);
    }

    res.send(html);
  }).get('/cat', (req, res)=> {
    res.send(catsList);
  })
  .get('/shark', (req, res)=> {
    res.send(sharksList);
  })
  .get('/mix', (req, res)=> {
    const combinedImgs = [...catsList, ...sharksList];
    shuffleArray(combinedImgs);
    res.send(combinedImgs);
  });

export default server;
