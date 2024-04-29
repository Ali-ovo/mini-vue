import { h } from "../../lib/guide-vue.esm.js";
import PatchChildren from "./PatchChildren.js";

export default {
  name: "App",
  setup() {},

  render() {
    return h("div", { tId: 1 }, [h("p", {}, "主页"), h(PatchChildren)]);
  },
};
