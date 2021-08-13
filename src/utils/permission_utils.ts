import { store } from "@/store";
import { ActionTypes } from "@/store/modules/auth/actions";


export function isManager(): boolean{
    if ('token' in localStorage) {
      const allowedRoles = ['SALES_STAFF', 'ADMIN'];
      const allowedCompanies = ['RETIAL']
      const role = store.getters.getUser ? store.getters.getUser.user_type : '';
      console.log(`manager role: ${role}`)
      const company_type = store.getters.getUser && store.getters.getUser.company ? store.getters.getUser.company.company_type : '';
      if (role != null &&
        company_type != null &&
        company_type != '' &&
        role != '' &&
        allowedCompanies.includes(company_type) &&
        allowedRoles.includes(role)){
        
            return true;
      }
    } 
    return false;
}


export function isAdmin(): boolean{
    if ('token' in localStorage) {
      const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
      const allowedCompanies = ['PARENT', 'STORE']
      const role = store.getters.getUser ? store.getters.getUser.user_type : '';
      console.log(`admin role: ${role}`)
      const company_type = store.getters.getUser && store.getters.getUser.company ? store.getters.getUser.company.company_type : '';
      if (role != null &&
        company_type != null &&
        company_type != '' &&
        role != '' &&
        allowedCompanies.includes(company_type) &&
        allowedRoles.includes(role)){
            return true;
      }
    } 
    return false;
}