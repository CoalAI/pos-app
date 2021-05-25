import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import Report from "./components/sales/Report.vue";
import Order from "./components/sales/Order.vue";
import OrdersList from "./components/sales/OrdersList.vue";
import EditOrder from "./components/sales/EditOrder.vue";
import Product from "./components/sales/Product.vue";
import Batch from "./components/sales/Batch.vue";
import User from "./components/sales/User.vue";
import AddEditProduct from "./components/sales/AddEditProduct.vue";
import AddEditBatch from "./components/sales/AddEditBatch.vue";
import AddEditUser from "./components/sales/AddEditUser.vue";
import Department from "./components/admin/Department.vue";
import DepartmentAddEdit from "./components/admin/DepartmentAddEdit.vue";
import Vendor from "./components/admin/Vendor.vue";
import VendorAddEdit from "./components/admin/VendorAddEdit.vue";
import NotFound from "./components/common-components/NotFound.vue";
import Settings from "./components/common-components/Settings.vue";
import Request from "./components/sales/Request.vue";
import RequestDetail from "./components/sales/RequestDetail.vue";
import ZeroOrder from "./components/admin/ZeroOrder.vue";
import Inventory from "./components/admin/Inventory.vue";
import { store } from "./store";
import { ActionTypes } from '@/store/modules/auth/actions';

async function salesStaff(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['SALES_STAFF','ADMIN','SUPER_ADMIN','VENDOR'];
  await store.dispatch(ActionTypes.USER_DATA);
  const role = store.getters.getUser? store.getters.getUser.user_type:'';
  if(role!=null && role!='' && allowedRoles.includes(role)){
    next();
  }else{
    next('/404');
  }
}


async function admin(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['ADMIN','SUPER_ADMIN','VENDOR'];
  await store.dispatch(ActionTypes.USER_DATA);
  const role = store.getters.getUser? store.getters.getUser.user_type:'';
  if(role!=null && role!='' && allowedRoles.includes(role)){
    next();
  }else{
    next('/404');
  }
}

async function superAdmin(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['SUPER_ADMIN'];
  await store.dispatch(ActionTypes.USER_DATA);
  const role = store.getters.getUser? store.getters.getUser.user_type:'';
  if(role!=null && role!='' && allowedRoles.includes(role)){
    next();
  }else{
    next('/404');
  }
}

async function redirectToAdmin(from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext){
  const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
  await store.dispatch(ActionTypes.USER_DATA);
  const role = store.getters.getUser? store.getters.getUser.user_type:'';
  if (role!=null && role!='' && allowedRoles.includes(role)){
    next('/admin/order');
  } else {
    next()
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Order",
    component: Order,
    beforeEnter: redirectToAdmin,
  },
  {
    path: "/admin/order",
    name: "AdminOrder",
    component: ZeroOrder,
    beforeEnter: admin,
  },
  {
    path: "/orders",
    name: "OrdersList",
    component: OrdersList,
    beforeEnter: salesStaff
  },
  {
    path: "/orders/:orderId",
    name: "OrderDetails",
    component: EditOrder,
    props: true,
    beforeEnter: salesStaff
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
    beforeEnter: superAdmin,
  },
  {
    path: "/editorder",
    name: "EditOrder",
    component: EditOrder,
    beforeEnter: salesStaff,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
    beforeEnter: salesStaff,

  },
  {
    path: "/product/edit/:productId",
    name: "EditProduct",
    component: AddEditProduct,
    props: true,
    beforeEnter: admin,
  },
  {
    path: "/batchs",
    name: "Batch",
    component: Batch,
    beforeEnter: admin,
  },
  {
    path: "/users",
    name: "User",
    component: User,
    beforeEnter: admin,
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: AddEditProduct,
    beforeEnter: admin,
  },
  {
    path: "/batch/create",
    name: "",
    component: AddEditBatch,
    beforeEnter: admin,
  },
  {
    path: "/batch/edit/:productId/:productVariantId/:batchId",
    name: "EditBatch",
    component: AddEditBatch,
    props: true,
    beforeEnter: admin,
  },
  {
    path: "/user/create",
    name: "",
    component: AddEditUser,
    beforeEnter: admin,
  },
  {
    path: "/user/edit/:userId",
    name: "EditUser",
    component: AddEditUser,
    props: true,
    beforeEnter: admin,
  },
  {
    path: "/departments",
    name: "department",
    component: Department,
    beforeEnter: admin,
  },
  {
    path: "/department/create",
    name: "CreateDepartment",
    component: DepartmentAddEdit,
    beforeEnter: admin,
  },
  {
    path: "/department/edit/:companyId",
    name: "EditDepartment",
    component: DepartmentAddEdit,
    props: true,
    beforeEnter: admin,
  },
  {
    path: "/vendors",
    name: "Vendor",
    component: Vendor,
    beforeEnter: admin,
  },
  {
    path: "/vendor/create",
    name: "CreateVendor",
    component: VendorAddEdit,
    beforeEnter: admin,
  },
  {
    path: "/vendor/edit/:vendorId",
    name: "EditVendor",
    component: VendorAddEdit,
    props: true,
    beforeEnter: admin,
  },
  {
    path: '/settings',
    name: "Settings",
    component: Settings,
    beforeEnter: admin,
  },
  { path: '/404', name: 'notFound', component: NotFound },  
  { path: '/:catchAll(.*)', redirect: '/404' },
  {
    path: '/request',
    name: "Request",
    component: Request
  },
  {
    path: '/requests/:id',
    name: "RequestDetail",
    component: RequestDetail,
    beforeEnter: admin,

  },
  {
    path: '/inventory',
    name: "Inventory",
    component: Inventory
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;