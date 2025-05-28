<template>
  <nav
    class="sidebar"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
      transform: 'none', // 移除原有的 transform
    }"
    ref="sidebar"
    @mousedown="startDrag"
  >
    <div class="email-container">
      <span class="greeting" @click="returnToMain">{{
        $t("messages.maintab_greeting")
      }}</span>
      <span class="email">user@example.com</span>
    </div>
    <ul>
      <li>
        <i class="fas fa-project-diagram">
          <svg
            t="1748427132274"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2510"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="20"
            height="20"
          >
            <path d="M512 243.2" p-id="2511" fill="#ffffff"></path>
            <path
              d="M983.04 778.24c0 89.6-74.24 163.84-163.84 163.84-46.08 0-87.04-17.92-117.76-48.64-56.32 30.72-120.32 48.64-189.44 48.64s-133.12-17.92-189.44-48.64c-30.72 30.72-71.68 48.64-117.76 48.64-89.6 0-163.84-74.24-163.84-163.84 0-64 35.84-117.76 89.6-145.92-5.12-25.6-7.68-51.2-7.68-79.36 0-163.84 102.4-304.64 245.76-360.96 7.68-84.48 76.8-151.04 161.28-151.04 89.6 0 163.84 74.24 163.84 163.84 0 2.56 0 2.56 0 5.12 122.88 66.56 204.8 194.56 204.8 343.04 0 28.16-2.56 53.76-7.68 79.36C944.64 660.48 983.04 714.24 983.04 778.24zM122.88 778.24c0 46.08 35.84 81.92 81.92 81.92s81.92-35.84 81.92-81.92c0-46.08-35.84-81.92-81.92-81.92S122.88 734.72 122.88 778.24zM532.48 125.44c-46.08 0-81.92 35.84-81.92 81.92s35.84 81.92 81.92 81.92c46.08 0 81.92-35.84 81.92-81.92S578.56 125.44 532.48 125.44zM670.72 291.84c-28.16 46.08-79.36 76.8-138.24 76.8-66.56 0-122.88-38.4-148.48-94.72-104.96 48.64-179.2 156.16-179.2 279.04 0 20.48 2.56 40.96 5.12 61.44 87.04 2.56 156.16 74.24 156.16 163.84 0 15.36-2.56 28.16-5.12 43.52 43.52 25.6 94.72 38.4 148.48 38.4s104.96-15.36 148.48-38.4c-2.56-12.8-5.12-28.16-5.12-43.52 0-87.04 69.12-158.72 156.16-163.84 5.12-20.48 5.12-40.96 5.12-61.44C819.2 442.88 760.32 345.6 670.72 291.84zM819.2 696.32c-46.08 0-81.92 35.84-81.92 81.92 0 46.08 35.84 81.92 81.92 81.92 46.08 0 81.92-35.84 81.92-81.92C901.12 734.72 862.72 696.32 819.2 696.32z"
              p-id="2512"
              fill="#ffffff"
            ></path></svg
        ></i>
        <span @click="goToTeam" class="nav-text">{{
          $t("messages.maintab_team")
        }}</span>
      </li>
      <li>
        <i class="fas fa-project-diagram">
          <svg
            t="1739687252166"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2348"
            width="20"
            height="20"
          >
            <path
              d="M98.3 540.2l2.3 2.1 345.3 189.1c17.6 14.7 40.5 22.8 64.6 22.8 24.1 0 47-8.1 64.6-22.8l344.8-188.8 0.5-0.3 2.3-2.1c34.8-31.3 39-82 9.8-118-1.7-2.1-4.9-2.5-7-0.7l-33.7 27.4c-2.1 1.7-2.5 4.9-0.7 7 10.6 13 9.7 30.5-2.1 42.7L544.7 687.1l-0.5 0.3-2.3 2.1c-17 15.3-45.8 15.3-62.8 0l-2.3-2.1-344.7-188.8c-11.8-12.2-12.7-29.7-2.1-42.7 1.7-2.1 1.4-5.3-0.7-7l-33.7-27.4c-2.1-1.7-5.3-1.4-7 0.7-29.4 35.9-25.1 86.7 9.7 118z"
              fill="#ffffff"
              p-id="2349"
            ></path>
            <path
              d="M925.5 608.3l-33.7 27.4c-2.1 1.7-2.5 4.9-0.7 7 10.6 13 9.7 30.5-2.1 42.7L544.7 873.9l-0.5 0.3-2.3 2.1c-17 15.3-45.8 15.3-62.8 0l-2.3-2.1-344.7-188.8c-11.8-12.2-12.7-29.7-2.1-42.7 1.7-2.1 1.4-5.3-0.7-7l-33.7-27.4c-2.1-1.7-5.3-1.4-7 0.7-29.2 35.9-25 86.7 9.8 118l2.3 2.1L446 918.2c17.6 14.7 40.5 22.8 64.6 22.8 24.1 0 47-8.1 64.6-22.8L920 729.4l0.5-0.3 2.3-2.1c34.8-31.3 39-82 9.8-118-1.8-2.1-4.9-2.5-7.1-0.7zM116.1 372.6l54.5 29.8 290.6 159.1c27.2 24.5 71.4 24.5 98.6 0l290.6-159.1 54.5-29.8c2.6-2.3 4.9-4.8 7-7.4 19.9-24.5 17.7-59.1-7-81.3L559.8 99.3c-27.2-24.5-71.4-24.5-98.6 0L116.1 283.9c-24.6 22.2-26.9 56.7-7 81.3 2.2 2.6 4.4 5.1 7 7.4z"
              fill="#ffffff"
              p-id="2350"
            ></path></svg
        ></i>
        <span @click="goToProject" class="nav-text">{{
          $t("messages.maintab_projects")
        }}</span>
      </li>
      <li>
        <i class="fas fa-comment-dots"
          ><img alt="protocol" src="../assets/img/icon/protocol.svg"
        /></i>
        <span class="nav-text" @click="goToProtocol">{{
          $t("messages.maintab_protocol")
        }}</span>
      </li>
      <li>
        <i class="fas fa-comment-dots"
          ><img alt="knowledgeGraphTool" src="../assets/img/icon/tool.svg"
        /></i>
        <span class="nav-text" @click="goToKnowledgeTool">{{
          $t("messages.maintab_knowledgeGraphTool")
        }}</span>
      </li>
      <li>
        <i class="fas fa-cog"
          ><svg
            t="1739687547339"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3581"
            width="20"
            height="20"
          >
            <path
              d="M372.134088 1004.846981a509.94041 509.94041 0 0 1-159.298198-76.821527l2.164315-103.514738a93.088793 93.088793 0 0 0-74.238313-93.088794l-101.536602-20.991523A509.428422 509.428422 0 0 1 0.011636 537.983409l82.243949-62.834935a93.088793 93.088793 0 0 0 26.507034-116.104998l-46.89348-92.390627A514.152678 514.152678 0 0 1 172.225904 128.415991l100.419536 25.133974a93.088793 93.088793 0 0 0 107.284834-51.664281l43.007023-94.252403a515.246472 515.246472 0 0 1 88.434354-7.610009c30.137497 0 59.669917 2.606486 88.411081 7.610009l43.007023 94.252403a93.088793 93.088793 0 0 0 107.284834 51.664281l100.396264-25.133974a514.152678 514.152678 0 0 1 110.356765 138.236858l-46.870208 92.390627a93.088793 93.088793 0 0 0 26.483762 116.104998l82.243949 62.834935a509.428422 509.428422 0 0 1-39.213654 172.44699l-101.51333 20.968251a93.088793 93.088793 0 0 0-74.238312 93.088793l2.141042 103.538011a509.94041 509.94041 0 0 1-159.298198 76.798255l-79.684007-66.279221a93.088793 93.088793 0 0 0-119.060567 0l-79.684007 66.302493zM511.348378 721.461421a209.449785 209.449785 0 1 0 0-418.89957 209.449785 209.449785 0 0 0 0 418.89957z"
              fill="#ffffff"
              p-id="3582"
            ></path></svg
        ></i>
        <span class="nav-text">{{ $t("messages.maintab_settings") }}</span>
      </li>
      <li>
        <i class="fas fa-comments"
          ><svg
            t="1742737475164"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2384"
            width="20"
            height="20"
          >
            <path
              d="M84.5824 0C52.0704 0 25.6 24.9344 25.6 55.808v912.384C25.6 998.912 51.968 1024 84.5824 1024c32.512 0 59.0336-24.9344 59.0336-55.808V55.808C143.5136 25.088 117.0944 0 84.5824 0z m819.6608 0H277.4528c-41.1648 0-74.3936 33.9456-74.3936 75.776v872.3456c0 41.8304 33.3824 75.776 74.3936 75.776h626.7904c41.1648 0 74.4448-33.9456 74.4448-75.776V75.776C978.688 33.9456 945.3056 0 904.192 0z m-364.9536 492.544L418.3552 371.6608 297.2672 492.5952V101.6832h242.0224v390.912z"
              p-id="2385"
              fill="#ffffff"
            ></path></svg
        ></i>
        <span class="nav-text">{{ $t("messages.maintab_literatures") }}</span>
      </li>
      <li>
        <i class="fas fa-comment-dots"
          ><svg
            t="1739687658287"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6238"
            width="18"
            height="18"
          >
            <path
              d="M870.534 64.223H153.022c-49.329 0-89.241 40.36-89.241 89.689l-0.448 807.201 179.378-179.378h627.823c49.329 0 89.689-40.36 89.689-89.689V153.912c0-49.329-40.36-89.689-89.689-89.689z m-313.911 403.6h-89.689V198.757h89.689v269.066z m0 179.378h-89.689v-89.689h89.689v89.689z"
              p-id="6239"
              fill="#ffffff"
            ></path></svg
        ></i>
        <span class="nav-text">{{ $t("messages.maintab_feedback") }}</span>
      </li>
      <li>
        <i class="fas fa-comment-dots"
          ><svg
            t="1742739066941"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4271"
            width="20"
            height="20"
          >
            <path
              d="M887.001194 583.347865 886.692295 583.347865 883.673738 580.474379 883.673738 495.309801 474.870904 495.309801 474.870904 432.15206 883.673738 432.15206 883.673738 344.303852 1004.630382 459.446922 1004.630382 459.779935 887.001194 583.347865ZM670.468514 60.478322 168.062845 60.478322 360.76209 155.919238C386.375425 168.605141 407.18035 199.711668 407.18035 225.37706L410.201204 791.604967C412.409429 791.091666 414.707222 790.811476 417.072001 790.811476L671.234063 790.811476 671.234063 591.386123 731.712385 591.386123 731.712385 821.050637C731.712385 837.751075 718.173662 851.289798 701.473224 851.289798L417.072001 851.289798C414.819375 851.289798 412.62761 851.036018 410.515845 850.568651L411.390866 1014.611889C411.390866 1023.22048 404.42897 1026.503535 395.846789 1021.947756L57.030771 833.985725C36.204792 822.930058 19.37536 796.835576 19.407513 775.687302L20.522917 38.505552C19.777273 35.877042 19.369618 33.106522 19.369618 30.239161 19.369618 26.969887 19.894784 23.825014 20.854399 20.876122 22.351046 9.644761 29.313709 2.853964 39.134546 1.865259 42.398462 0.659903 45.926109 0 49.608779 0L700.707675 0C717.408113 0 730.946836 13.53834 730.946836 30.239161 730.946836 32.337529 730.732483 34.385754 730.325594 36.363548 730.732483 38.341342 730.946836 40.389567 730.946836 42.487935L730.946836 332.247997 670.468514 332.247997 670.468514 60.478322Z"
              p-id="4272"
              fill="#ffffff"
            ></path></svg
        ></i>
        <span class="nav-text" @click="logout">{{
          $t("messages.maintab_logout")
        }}</span>
      </li>
    </ul>
  </nav>
</template>
<script>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const sidebar = ref(null);

    // 响应式数据
    const position = reactive({
      x: 10,
      y: window.innerHeight / 2 - 150,
    });
    const isDragging = ref(false);
    const dragOffset = reactive({ x: 0, y: 0 });
    const snapThreshold = 50;

    // 生命周期钩子
    onMounted(() => {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDrag);
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("resize", handleResize);
    });

    // 方法
    const startDrag = (e) => {
      if (e.target.tagName === "SPAN") return;
      isDragging.value = true;
      const rect = sidebar.value.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;
    };

    const onDrag = (e) => {
      if (!isDragging.value) return;

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      newY = Math.max(
        0,
        Math.min(window.innerHeight - sidebar.value.offsetHeight, newY)
      );

      if (newX < snapThreshold) {
        newX = 10;
      } else if (
        newX >
        window.innerWidth - sidebar.value.offsetWidth - snapThreshold
      ) {
        newX = window.innerWidth - sidebar.value.offsetWidth - 10;
      }

      position.x = newX;
      position.y = newY;
    };

    const stopDrag = () => {
      isDragging.value = false;
    };

    const handleResize = () => {
      position.y = Math.min(
        position.y,
        window.innerHeight - sidebar.value.offsetHeight
      );
      if (position.x > window.innerWidth - sidebar.value.offsetWidth - 10) {
        position.x = window.innerWidth - sidebar.value.offsetWidth - 10;
      }
    };

    // 路由方法
    const returnToMain = () => router.push("/main");
    const goToProject = () => router.push("/main/project");
    const goToProtocol = () => router.push("/main/protocolsimulation");
    const goToKnowledgeTool = () => router.push("/main/knowledgeGraphTool");
    const goToTeam = () => router.push("/main/team");
    const logout = () => router.push("/");

    return {
      position,
      sidebar,
      startDrag,
      returnToMain,
      goToProject,
      goToProtocol,
      goToKnowledgeTool,
      goToTeam,
      logout,
    };
  },
};
</script>
<style>
.sidebar {
  position: fixed;
  height: auto;
  width: 60px;
  background-color: #2c2c2c;
  transition: width 0.3s ease;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: move; /* 添加移动光标 */
  user-select: none; /* 防止文字被选中 */
  z-index: 10000;
}

.sidebar:hover {
  width: 200px;
}

.email-container {
  padding: 20px 0;
  text-align: center;
  color: white;
  background-color: #383838;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 12px 12px 0 0;
}

.email {
  display: none;
  font-size: 14px;
}

.sidebar:hover .email {
  display: inline-block;
}

.greeting {
  display: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.sidebar:hover .greeting {
  display: inline-block;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 15px 20px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.sidebar li:hover {
  background-color: #404040;
}

.sidebar i {
  font-size: 20px;
  min-width: 20px;
}

.nav-text {
  margin-left: 15px;
  display: none;
  cursor: pointer; /* 保持文字可点击 */
}

.sidebar:hover .nav-text {
  display: inline-block;
}

.bottom-icons {
  display: none;
}

.sidebar ul li:last-child {
  border-radius: 0 0 12px 12px;
}
</style>
