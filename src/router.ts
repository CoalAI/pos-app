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
    path: "/user/create",
    name: "",
    component: AddEditUser
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;