
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/nanosystem/src/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/nanosystem/src"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9479, hash: 'e0a937e77209d9b31ea0c1d517180dcff8d80801a385f52746237fb77f8a0f41', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2862, hash: '3e1ea5a816a5e093a1a61838bdffaea0e0a3b615b677acb080024b89bf55bbf7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 148928, hash: '17ca30cff51b227362fa33620003ee9325e62722aa3c1d3ab299766be118a94b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-G6YZ6KIN.css': {size: 8082, hash: 'ppRRh7G4ddY', text: () => import('./assets-chunks/styles-G6YZ6KIN_css.mjs').then(m => m.default)}
  },
};
