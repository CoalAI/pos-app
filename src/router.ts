import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Report from "./components/sales/Report.vue";
import Order from "./components/sales/Order.vue";
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

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Order",
    component: Order
  },
  {
    path: "/report",
    name: "Report",
    component: Report
  },
  {
    path: "/editorder",
    name: "EditOrder",
    component: EditOrder
  },
  {
    path: "/products",
    name: "Product",
    component: Product
  },
  {
    path: "/product/edit/:productId",
    name: "EditProduct",
    component: AddEditProduct,
    props: true
  },
  {
    path: "/batchs",
    name: "Batch",
    component: Batch
  },
  {
    path: "/users",
    name: "User",
    component: User
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: AddEditProduct
  },
  {
    path: "/batch/create",
    name: "",
    component: AddEditBatch
  },
  {
    path: "/batch/edit/:productId/:productVariantId/:batchId",
    name: "EditBatch",
    component: AddEditBatch,
    props: true
  },
  {
    path: "/user/create",
    name: "",
    component: AddEditUser
  },
  {
    path: "/user/edit/:userId",
    name: "EditUser",
    component: AddEditUser,
    props: true
  },
  {
    path: "/admin/order",
    name: "adminOrder",
    component: Order
  },
  {
    path: "/departments",
    name: "department",
    component: Department
  },
  {
    path: "/department/create",
    name: "CreateDepartment",
    component: DepartmentAddEdit
  },
  {
    path: "/vendors",
    name: "Vendor",
    component: Vendor
  },
  {
    path: "/vendor/create",
    name: "CreateVendor",
    component: VendorAddEdit
  },
  {
    path: "/vendor/edit/:vendorId",
    name: "EditVendor",
    component: VendorAddEdit,
    props: true
  },
  {
    path: '/settings',
    name: "Settings",
    component: Settings
  },
  { path: '/404', name: 'notFound', component: NotFound },  
  { path: '/:catchAll(.*)', redirect: '/404' },
  {
    path: '/requests',
    name: "Request",
    component: Request
  },
  {
    path: '/requests/:id',
    name: "RequestDetail",
    component: RequestDetail
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;