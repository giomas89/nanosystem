
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
    'index.csr.html': {size: 9475, hash: 'c09b530dd543ff7d284cd9a8ba74e29042ce916b2bba0b87503cfdfb811411e9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2858, hash: '6be92370834a091e6ae9489254cce3d584eda14843a175d20fbbb8ef8b18d412', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 150754, hash: '8deaf4366ecd6f899569a62e6ec9946b5e20c875ba10d9a56b6ba1877df25f63', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-G6YZ6KIN.css': {size: 8082, hash: 'ppRRh7G4ddY', text: () => import('./assets-chunks/styles-G6YZ6KIN_css.mjs').then(m => m.default)}
  },
};
