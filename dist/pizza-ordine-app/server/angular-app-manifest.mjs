
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
    'index.csr.html': {size: 9475, hash: 'e223062eec14be46cc47ed6d5af3641abb2865e0223d23fca87f673f8df70ea9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2858, hash: 'ba653799981bd37687a776cb182a0a8c410d1005a52101547ccdbfd06d684da4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 150751, hash: 'fa395cc1d4d3762ee0d5c03945a4223a42b18180b17914ff2bad32f1e6ffcf25', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-G6YZ6KIN.css': {size: 8082, hash: 'ppRRh7G4ddY', text: () => import('./assets-chunks/styles-G6YZ6KIN_css.mjs').then(m => m.default)}
  },
};
