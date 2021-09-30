import { wrap } from "svelte-spa-router/wrap";
import Home from "../pages/Home.svelte";
import About from "../pages/About.svelte";
import Blog from "../pages/Blog.svelte";
import NotFound from "../pages/NotFound.svelte";

const routes = {
  "/": Home,
  "/about": wrap({
    component: About,
    conditions: [
      // (detail) => {
      //   console.log(detail);
      //   return false;
      // },
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
