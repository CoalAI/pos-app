import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Report from "./components/sales/Report.vue"
import Order from "./components/sales/Order.vue"
import EditOrder from "./components/sales/EditOrder.vue"
import Product from "./components/sales/Product.vue"
import Batch from "./components/sales/Batch.vue"
import User from "./components/sales/User.vue"


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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;