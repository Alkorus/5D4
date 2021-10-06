
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Todo.vue') },
      { path: '/index', component: () => import('pages/Index.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/planets', component: () => import('pages/Planets.vue') },
      { name: 'detailPlanet', path: '/detail-planet', component: () => import('pages/DetailsPlanet.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
