/**
 * staticRouter (静态路由)
 */
export const staticRouter = [
  {
    path: '/',
    redirect:'/home/index',
  },
  // {
  //   path: "/layout",
  //   name: "layout",
  //   component: () => import("@/layouts/index.vue"),
  //   // component: () => import("@/layouts/indexAsync.vue"),
  //   // redirect: '/home/index',
  //   children: [

      {
        path: '/home/index',
        name: "home",
        component: () => import("_p/home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/404",
        name: "404",
        component: () => import("_p/404.vue"),
        meta: {
          title: "404页面"
        }
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("_p/404.vue")
      }
  //   ]
  // },
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  // {
  //   path: "/403",
  //   name: "403",
  //   component: () => import("@/components/ErrorMessage/403.vue"),
  //   meta: {
  //     title: "403页面"
  //   }
  // },

  // {
  //   path: "/500",
  //   name: "500",
  //   component: () => import("@/components/ErrorMessage/500.vue"),
  //   meta: {
  //     title: "500页面"
  //   }
  // },
  // Resolve refresh page, route warnings

];
