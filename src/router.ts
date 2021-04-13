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
    name: "",
    component: AddEditProduct
  },
  {
    path: "/batch/create",
    name: "",
    component: AddEditBatch
  },
  {
    path: "/user/create",
    name: "",
    component: AddEditUser
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
    path: '/settings',
    name: "Settings",
    component: Settings
  },
  { path: '/404', component: NotFound },  
  { path: '/:catchAll(.*)', redirect: '/404' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;