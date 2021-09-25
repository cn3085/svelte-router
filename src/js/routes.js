import { wrap } from "svelte-spa-router/wrap";
import Login from "../pages//login/Login.svelte";
import Home from "../pages/Home.svelte";
import MemberList from "../pages/member/MemberList.svelte";
import About from "../pages/About.svelte";
import Blog from "../pages/Blog.svelte";
import NotFound from "../pages/NotFound.svelte";
import {isValidLogin} from './service/LoginService.js'

const routes = {
  "/": wrap({
    component: Login,
    conditions: [
      // () => {
      //   return isValidLogin();
      // }
    ]
  }),
  "/home": wrap({
    component: Home,
    conditions: [
    ],
  }),
  "/member": wrap({
    component: MemberList,
    conditions: [
    ],
  }),
  "/about": wrap({
    component: About,
    conditions: [
      (detail) => {
        console.log(detail);
        return false;
      },
    ],
  }),
  "/blog": wrap({
    component: Blog,
    conditions: [
      //   async (detail) => {
      // const response = await fetch('/user/profile')
      // const data = await response.json()
      // // Return true to continue loading the component, or false otherwise
      // if (data.isAdmin) {
      //     return true
      // }
      // else {
      //     return false
      // }
      // return true;
      //   },
    ],
  }),
  "*": NotFound,
};

export default routes;
