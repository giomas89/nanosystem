
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/nanosystem/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/nanosystem"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9475, hash: '5f30324b7f466f202b3d56e34f370ba0ada1dab6b2b9436a9fea1000efb39661', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2858, hash: '132bad23e484356f014c55f53a20a5f1ee09f605ad095abb88bf0359f659595e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 148924, hash: 'c98d412a0680d586bea9b87d2b171664bbe1bccca4b27e0abcd5c5d576841f7c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-G6YZ6KIN.css': {size: 8082, hash: 'ppRRh7G4ddY', text: () => import('./assets-chunks/styles-G6YZ6KIN_css.mjs').then(m => m.default)}
  },
};
