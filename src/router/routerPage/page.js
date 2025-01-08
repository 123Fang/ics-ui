
export default [
  {
    path: '/',
    name: '主页',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/fx',
    name: '组件页面',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '',
        name: '贡献指南',
        component: () => import('@/md/participation.md')
      },
      {
        path: 'updatelog',
        name: '更新日志',
        component: () => import('@/md/updatelog.md')
      },
      {
        path: 'install',
        name: '安装使用',
        component: () => import('@/md/install.md')
      },
      {
        path: 'input',
        name: 'Input 输入框',
        component: () => import('/packages/input/doc/doc.md')
      },
      {
        path: 'inputs',
        name: 'Input 双输入框',
        component: () => import('/packages/inputs/doc/doc.md')
      },
      {
        path: 'select',
        name: 'Select 下拉选择器',
        component: () => import('/packages/select/doc/doc.md')
      },
    ]
  }
]
