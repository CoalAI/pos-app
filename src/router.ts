import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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
import Response from "./components/sales/Response.vue";
import ZeroOrder from "./components/admin/ZeroOrder.vue";
import Inventory from "./components/admin/Inventory.vue";
import ExpenseSummary from "./components/admin/ExpenseSummary.vue";
import Expense from "./components/admin/Expense.vue";
import { admin, redirectToAdmin, superAdmin, salesStaff, storeAdmin, manager } from  '@/permissions';


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Order",
    component: Order,
    beforeEnter: redirectToAdmin
  },
  {
    path: "/admin/order",
    name: "AdminOrder",
    component: ZeroOrder,
    beforeEnter: storeAdmin,
  },
  {
    path: "/orders",
    name: "OrdersList",
    component: OrdersList,
    beforeEnter: manager
  },
  {
    path: "/orders/:orderId",
    name: "OrderDetails",
    component: EditOrder,
    props: true,
    beforeEnter: manager
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
    beforeEnter: storeAdmin,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
    beforeEnter: storeAdmin,

  },
  {
    path: "/product/edit/:productId",
    name: "EditProduct",
    component: AddEditProduct,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/batchs",
    name: "Batch",
    component: Batch,
    beforeEnter: storeAdmin,
  },
  {
    path: "/users",
    name: "User",
    component: User,
    beforeEnter: storeAdmin,
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: AddEditProduct,
    beforeEnter: storeAdmin,
  },
  {
    path: "/batch/create",
    name: "",
    component: AddEditBatch,
    beforeEnter: storeAdmin,
  },
  {
    path: "/batch/edit/:productId/:productVariantId/:batchId",
    name: "EditBatch",
    component: AddEditBatch,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/user/create",
    name: "",
    component: AddEditUser,
    beforeEnter: storeAdmin,
  },
  {
    path: "/user/edit/:userId",
    name: "EditUser",
    component: AddEditUser,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/departments",
    name: "department",
    component: Department,
    beforeEnter: storeAdmin,
  },
  {
    path: "/department/create",
    name: "CreateDepartment",
    component: DepartmentAddEdit,
    beforeEnter: storeAdmin,
  },
  {
    path: "/department/edit/:companyId",
    name: "EditDepartment",
    component: DepartmentAddEdit,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: "/vendors",
    name: "Vendor",
    component: Vendor,
    beforeEnter: storeAdmin,
  },
  {
    path: "/vendor/create",
    name: "CreateVendor",
    component: VendorAddEdit,
    beforeEnter: storeAdmin,
  },
  {
    path: "/vendor/edit/:vendorId",
    name: "EditVendor",
    component: VendorAddEdit,
    props: true,
    beforeEnter: storeAdmin,
  },
  {
    path: '/settings',
    name: "Settings",
    component: Settings,
    beforeEnter: superAdmin,
  },
  { path: '/404', name: 'notFound', component: NotFound },  
  { path: '/:catchAll(.*)', redirect: '/404' },
  {
    path: '/request',
    name: "Request",
    component: Request,
    beforeEnter: manager,
  },
  {
    path: '/requests/:id',
    name: "RequestDetail",
    component: RequestDetail,
    beforeEnter: manager,

  },
  {
    path: '/inventory',
    name: "Inventory",
    component: Inventory,
    beforeEnter: manager
  },
  {
    path: '/expense-summary',
    name: 'ExpenseSummary',
    component: ExpenseSummary,
    beforeEnter: manager
  },
  {
    path: '/expense',
    name: 'expense',
    component: Expense,
    beforeEnter: manager
  },
  {
    path: '/response',
    name: "Response",
    component: Response,
    beforeEnter: manager
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;