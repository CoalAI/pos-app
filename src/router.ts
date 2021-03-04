import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Report from "./components/sales/Report.vue"
import Order from "./components/sales/Order.vue"
import EditOrder from "./components/sales/EditOrder.vue"

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;