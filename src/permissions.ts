import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { store } from "./store";
import { ActionTypes } from "./store/modules/auth/actions";


export async function salesStaff(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  const allowedRoles = ['SALES_STAFF','ADMIN','SUPER_ADMIN'];
  if ('token' in localStorage) {
    await store.dispatch(ActionTypes.USER_DATA);
    const role = store.getters.getUser? store.getters.getUser.user_type:'';
    if(role!=null && role!='' && allowedRoles.includes(role)){
      next();
    }else{
      next('/404');
    }
  } else {
    next('/login');
  }
}
  
export async function admin(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext){
  if ('token' in localStorage) {
    const allowedRoles = ['ADMIN','SUPER_ADMIN'];
    await store.dispatch(ActionTypes.USER_DATA);
    const role = store.getters.getUser? store.getters.getUser.user_type:'';
    if(role!=null && role!='' && allowedRoles.includes(role)){
      next();
    }else{
      next('/404');
    }
  } else {
    next('/login');
  }
}

export async function superAdmin(from: RouteLocationNormalized,to: RouteLocationNormalized,next: NavigationGuardNext) {
  if ('token' in localStorage) {
    const allowedRoles = ['SUPER_ADMIN'];
    await store.dispatch(ActionTypes.USER_DATA);
    const role = store.getters.getUser? store.getters.getUser.user_type:'';
    if(role!=null && role!='' && allowedRoles.includes(role)){
      next();
    }else{
      next('/404');
    }
  } else {
    next('/login');
  }
}

export async function redirectToAdmin(from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext) {
  if ('token' in localStorage) {
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    const allowedCompanies = ['PARENT', 'STORE']
    await store.dispatch(ActionTypes.USER_DATA);
    const role = store.getters.getUser ? store.getters.getUser.user_type : '';
    const company_type = store.getters.getUser && store.getters.getUser.company ? store.getters.getUser.company.company_type : '';
    if (role != null &&
      company_type != null &&
      company_type != '' &&
      role != '' &&
      allowedCompanies.includes(company_type) &&
      allowedRoles.includes(role)) {
      next('/admin/order');
    } else {
      next();
    }
  } else {
    next('/');
  } 
}

export async function storeAdmin(from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext){
  if ('token' in localStorage) {
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    const allowedCompanies = ['PARENT', 'STORE']
    await store.dispatch(ActionTypes.USER_DATA);
    const role = store.getters.getUser ? store.getters.getUser.user_type : '';
    const company_type = store.getters.getUser && store.getters.getUser.company ? store.getters.getUser.company.company_type : '';
    if (role != null &&
      company_type != null &&
      company_type != '' &&
      role != '' &&
      allowedCompanies.includes(company_type) &&
      allowedRoles.includes(role)){
      next();
    }
    else
        next('/404')
  } else {
    next('/login');
  }
}

export async function manager(from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext){
  if ('token' in localStorage) {
    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    const allowedCompanies = ['PARENT', 'STORE', 'RETIAL']
    await store.dispatch(ActionTypes.USER_DATA);
    const role = store.getters.getUser ? store.getters.getUser.user_type : '';
    const company_type = store.getters.getUser && store.getters.getUser.company ? store.getters.getUser.company.company_type : '';
    if (role != null &&
      company_type != null &&
      company_type != '' &&
      role != '' &&
      allowedCompanies.includes(company_type) &&
      allowedRoles.includes(role)){
      next();
    } else {
      next('/404')
    }
  } else {
    next('/login')
  }
}