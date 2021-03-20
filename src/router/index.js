import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/customer/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Customer',
        component: () =>
          import(
            /* webpackChunkName: "customer" */ '../views/customer/appointments.vue'
          )
      },
      {
        path: 'stores',
        name: 'Stores',
        component: () =>
          import(
            /* webpackChunkName: "customer" */ '../views/customer/stores.vue'
          )
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () =>
          import(
            /* webpackChunkName: "customer" */ '../views/customer/profile.vue'
          )
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/admin/admin.vue')
      
  },

  {
    path: '/storeowner',
    name: 'StoreOwner',
    component: () =>
      import(
        /* webpackChunkName: "storeowner" */ '../views/storeowner/index.vue'
      ),
    children: [
      {
        path: '',
        name: 'Owner',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/addStore.vue'
          )
      },
      {
        path: 'addStore',
        name: 'AddStore',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/addStore.vue'
          )
      },
      {
        path: 'listStore',
        name: 'ListStore',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/listStore.vue'
          )
      },
      {
        path: 'searchStore',
        name: 'SearchStore',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/searchStore.vue'
          )
      },
      {
        path: 'check',
        name: 'Check',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/check.vue'
          )
      },
      {
        path: 'customers',
        name: 'OwnerStores',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/addCustomer.vue'
          )
      },
      {
        path: 'addCustomer',
        name: 'AddCustomer',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/addCustomer.vue'
          )
      },
      {
        path: 'listCustomer',
        name: 'ListCustomer',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/listCustomer.vue'
          )
      },
      {
        path: 'searchCustomer',
        name: 'SearchCustomer',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/searchCustomer.vue'
          )
      },
      {
        path: 'schedule',
        name: 'OwnerSchedule',
        component: () =>
          import(
            /* webpackChunkName: "storeowner" */ '../views/storeowner/schedule.vue'
          )
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () =>
          import(
            /* webpackChunkName: "customer" */ '../views/storeowner/profile.vue'
          )
      }
    ]
  },
  {
    path: '/loginpage',
    name: 'LoginPage',
    component: () =>
      import(/* webpackChunkName: "loginpage" */ '../views/login/index.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "loginpage" */ '../views/login/login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () =>
          import(
            /* webpackChunkName: "loginpage" */ '../views/login/register.vue'
          )
      },
      {
        path: 'forgot',
        name: 'ForgotPass',
        component: () =>
          import(
            /* webpackChunkName: "loginpage" */ '../views/login/forgot.vue'
          )
      },
      {
        path: 'customer-register',
        name: 'customer-register',
        component: () =>
          import(
            /* webpackChunkName: "loginpage" */ '../views/login/customer-register.vue'
          )
      },
      {
        path: 'company-register',
        name: 'company-register',
        component: () =>
          import(
            /* webpackChunkName: "loginpage" */ '../views/login/company-register.vue'
          )
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
