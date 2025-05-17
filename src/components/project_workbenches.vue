<template>
  <div class="projectChatAgent" v-show="isInChat">
    <PCA v-model:isshow="isInChat" />
  </div>
  <div class="workbenches_container">
    <div class="navigation_container">
      <button class="button_1" @click="returnToProjectList">
        <div class="button-box_1">
          <span class="button-elem_1">
            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
              ></path>
            </svg>
          </span>
          <span class="button-elem_1">
            <svg viewBox="0 0 46 40">
              <path
                d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
              ></path>
            </svg>
          </span>
        </div>
      </button>
      <p class="project_name" style="color: black; font-weight: bold">
        Test Project
      </p>
      <div class="pma" @click="startAgentChat">
        <PMA />
      </div>
    </div>
    <div class="workbenches">
      <!-- 左侧任务栏 -->
      <div class="task-sidebar">
        <div class="sidebar-header">
          <h3>任务列表</h3>
        </div>
        <div
          class="sidebar-content task-drop-zone"
          @dragover.prevent
          @drop="onDrop"
        >
          <div
            v-for="(task, index) in taskList"
            :key="task.id"
            class="task-item"
            :class="{ active: selectedTaskIndex === index }"
            @click="selectTask(index)"
          >
            <div class="task-number">{{ index + 1 }}</div>
            <div class="task-content">
              <h4>{{ getTaskDisplayName(task) }}</h4>
              <p>{{ task.description }}</p>
            </div>
            <button class="remove-task" @click.stop="removeTask(index)">
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- 中间工作区 -->
      <div class="main-workspace">
        <div class="workspace-header">
          <h2>{{ selectedTask ? selectedTask.name : "工作区" }}</h2>
        </div>
        <div class="workspace-content">
          <div v-if="selectedTask" class="module-detail">
            <component
              :is="getModuleComponent(selectedTask.name)"
              v-if="getModuleComponent(selectedTask.name)"
            />
            <div v-else class="module-workspace">
              <p style="color: white">该模块正在开发中...</p>
            </div>
          </div>
          <div v-else class="empty-workspace">
            <p>请从左侧任务列表选择一个模块</p>
          </div>
        </div>
      </div>

      <!-- 右侧可收缩侧边栏 -->
      <div
        class="right-sidebar"
        :class="{ collapsed: isRightSidebarCollapsed }"
      >
        <button class="collapse-btn" @click="toggleRightSidebar">
          {{ isRightSidebarCollapsed ? ">" : "<" }}
        </button>
        <div class="sidebar-content" v-show="!isRightSidebarCollapsed">
          <div class="module-container">
            <div
              v-for="module in modules"
              :key="module.name"
              class="module-item"
              draggable="true"
              @dragstart="onDragStart($event, module)"
            >
              <h4>{{ module.name }}</h4>
              <p>{{ module.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import icon from "./icon.vue";
import SampleModelConstruction from "./SampleModelConstruction.vue";
import PMA from "./projectMultiAgent.vue";
import PCA from "./projectChatAgenr.vue";
export default {
  components: {
    icon,
    SampleModelConstruction,
    PMA,
    PCA,
  },
  data() {
    return {
      isRightSidebarCollapsed: false,
      isInChat: false,
      taskList: [],
      modules: [
        {
          name: "样本模型构建",
          description: "构建实验所需的样本模型",
        },
        {
          name: "文库制备",
          description: "准备测序所需的文库",
        },
        {
          name: "基因组测序",
          description: "进行基因组测序实验",
        },
        {
          name: "数据质控",
          description: "对测序数据进行质量控制",
        },
      ],
      selectedTaskIndex: null,
      taskIdCounter: 0,
    };
  },
  computed: {
    selectedTask() {
      return this.selectedTaskIndex !== null
        ? this.taskList[this.selectedTaskIndex]
        : null;
    },
  },
  methods: {
    toggleRightSidebar() {
      this.isRightSidebarCollapsed = !this.isRightSidebarCollapsed;
    },
    returnToProjectList() {
      this.$router.push("/main/project");
    },
    onDragStart(event, module) {
      event.dataTransfer.setData("moduleData", JSON.stringify(module));
    },
    onDrop(event) {
      const moduleData = JSON.parse(event.dataTransfer.getData("moduleData"));
      const newTask = {
        ...moduleData,
        id: this.taskIdCounter++,
        instanceNumber: this.getNextInstanceNumber(moduleData.name),
      };
      this.taskList.push(newTask);
    },
    getNextInstanceNumber(moduleName) {
      const existingInstances = this.taskList.filter(
        (task) => task.name === moduleName
      ).length;
      return existingInstances + 1;
    },
    getTaskDisplayName(task) {
      return `${task.name} #${task.instanceNumber}`;
    },
    removeTask(index) {
      this.taskList.splice(index, 1);
    },
    selectTask(index) {
      this.selectedTaskIndex = index;
    },
    getModuleComponent(moduleName) {
      const moduleMap = {
        样本模型构建: "SampleModelConstruction",
        // 添加其他模块的映射...
      };
      return moduleMap[moduleName];
    },
    startAgentChat() {
      this.isInChat = true;
    },
  },
};
</script>
<style scoped>
.workbenches_container {
  background-color: rgb(253, 253, 253);
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px;
  background-size: 20px 20px;
  background-position: center center;
  background-image: linear-gradient(to right, #cbd5e1 1px, transparent 1px),
    linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
}
.navigation_container {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
}
.button_1 {
  display: block;
  position: relative;
  width: 56px;
  height: 56px;
  margin: 0;
  overflow: hidden;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  border: 0;
}

.button_1:before,
.button_1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 7px;
}

.button_1:before {
  border: 4px solid #000000;
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button_1:after {
  border: 4px solid #96daf0;
  transform: scale(1.3);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.button_1:hover:before,
.button_1:focus:before {
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button_1:hover:after,
.button_1:focus:after {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-box_1 {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.button-elem_1 {
  display: block;
  width: 20px;
  height: 20px;
  margin: 17px 18px 0 18px;
  transform: rotate(180deg);
  fill: #000000;
}

.button_1:hover .button-box_1,
.button_1:focus .button-box_1 {
  transition: 0.4s;
  transform: translateX(-56px);
}
.project_name {
  color: white;
  font-size: 20px;
}

.workbenches {
  display: flex;
  height: 85%;
  width: 95%;
  margin: 20px auto;
  gap: 20px;
}

.task-sidebar {
  width: 250px;
  background-color: #2c2c2c;
  border-right: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #444444;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 16px;
  color: white;
}

.sidebar-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.main-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.workspace-header {
  padding: 20px;
  border-bottom: 1px solid #444444;
}

.workspace-header h2 {
  margin: 0;
  font-size: 18px;
  color: white;
}

.workspace-content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.right-sidebar {
  width: 300px;
  background-color: #2c2c2c;
  border-left: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: width 0.3s ease;
}

.right-sidebar.collapsed {
  width: 40px;
}

.collapse-btn {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  background-color: #2c2c2c;
  border: none;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px 0 0 4px;
}

.collapse-btn:hover {
  background-color: #333333;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2c2c2c;
}

::-webkit-scrollbar-thumb {
  background: #444444;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}

.module-container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.module-item {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.module-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.module-item h4 {
  margin: 0 0 8px 0;
  color: #232323;
  font-size: 14px;
}

.module-item p {
  margin: 0;
  color: #666666;
  font-size: 12px;
}

/* 调整右侧边栏的内容样式 */
.sidebar-content {
  height: 100%;
  overflow-y: auto;
  padding-top: 10px;
}

.task-drop-zone {
  min-height: 200px;
  border: 2px dashed #444444;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  background-color: #333333;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  gap: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.task-item:hover {
  background-color: #3a3a3a;
}

.task-item.active {
  background-color: #404040;
  border-left: 3px solid #535353;
}

.task-number {
  width: 24px;
  height: 24px;
  background-color: #444444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
}

.task-content {
  flex: 1;
}

.task-content h4 {
  margin: 0;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.task-content p {
  margin: 5px 0 0;
  color: #888888;
  font-size: 12px;
}

.remove-task {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: #888888;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-task:hover {
  color: white;
}

.module-item {
  cursor: grab;
}

.module-item:active {
  cursor: grabbing;
}

.module-detail {
  padding: 20px;
  background-color: #333333;
  border-radius: 8px;
}

.module-detail h3 {
  margin: 0 0 15px 0;
  color: white;
  font-size: 18px;
}

.description {
  color: #cccccc;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
}

.module-workspace {
  background-color: #2c2c2c;
  border-radius: 6px;
  padding: 20px;
  min-height: 300px;
}

.empty-workspace {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666666;
  font-size: 14px;
}

/* 可以添加一些实例编号的样式 */
.task-instance-number {
  font-size: 12px;
  color: #888888;
  padding: 2px 6px;
  background-color: #444444;
  border-radius: 4px;
}
.projectChatAgent {
  position: absolute;
  z-index: 999999;
}
</style>
