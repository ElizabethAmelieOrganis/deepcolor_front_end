<template>
  <div class="project-container">
    <div class="maintab">
      <maintab />
    </div>
    <div class="project-header">
      <div class="header-left">
        <div class="tab-group">
          <button class="tab active">全部项目</button>
          <button class="tab">进入我的个人项目 ></button>
        </div>
      </div>
      <div class="header-right">
        <input type="text" class="search-input" placeholder="搜索项目名称" />
        <button class="new-project-btn" @click="showNewProjectDialog = true">
          + 新建
        </button>
        <button class="icon-btn refresh">
          <span>⟳</span>
        </button>
        <button class="icon-btn settings">
          <span>⚙</span>
        </button>
      </div>
    </div>

    <!-- 项目弹窗 -->
    <div
      class="dialog-overlay"
      v-if="showNewProjectDialog"
      @click.self="closeDialog"
    >
      <div class="dialog">
        <div class="dialog-header">
          <h2>新增项目</h2>
          <button class="close-btn" @click="closeDialog">×</button>
        </div>
        <div class="dialog-content">
          <div class="form-group">
            <label>
              项目名称
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                v-model="newProject.name"
                type="text"
                placeholder="请输入项目名称"
                maxlength="255"
              />
              <span class="char-count">{{ newProject.name.length }} / 255</span>
            </div>
          </div>

          <div class="form-group">
            <label>
              项目负责人
              <span class="required">*</span>
              <span class="info-icon" title="项目的主要负责人">?</span>
            </label>
            <select v-model="newProject.owner">
              <option value="user@example.com">user@example.com</option>
            </select>
          </div>

          <div class="form-group">
            <label>项目描述</label>
            <div class="input-wrapper">
              <textarea
                v-model="newProject.description"
                placeholder="请输入项目描述"
                maxlength="255"
              ></textarea>
              <span class="char-count"
                >{{ newProject.description.length }} / 255</span
              >
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="cancel-btn" @click="closeDialog">取消</button>
          <button
            class="confirm-btn"
            @click="createProject"
            :disabled="!isFormValid"
          >
            确定
          </button>
        </div>
      </div>
    </div>

    <div class="project-table">
      <div class="table-header">
        <div class="th project-name">项目名称</div>
        <div class="th project-desc">项目描述</div>
        <div class="th owner">负责人</div>
        <div class="th create-time">创建时间</div>
        <div class="th actions">操作</div>
      </div>

      <div class="empty-state" v-if="projects.length === 0">
        <div class="empty-icon">
          <svg
            t="1739721104977"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2460"
            width="100"
            height="100"
          >
            <path
              d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m214.592 318.677334a32 32 0 0 0-45.248 0.064L544.736 541.066667l-81.792-89.109334a32 32 0 0 0-46.613333-0.576l-119.36 123.733334a32 32 0 1 0 46.058666 44.437333l95.754667-99.264 81.418667 88.704a32 32 0 0 0 46.24 0.96l160.213333-160.693333a32 32 0 0 0-0.064-45.248z"
              fill="#2c2c2c"
              p-id="2461"
            ></path>
          </svg>
        </div>
        <div class="empty-text">暂无数据</div>
      </div>

      <div class="table-body" v-else>
        <div class="table-row" v-for="project in projects" :key="project.id">
          <div class="td project-name">{{ project.name }}</div>
          <div class="td project-desc">{{ project.description }}</div>
          <div class="td owner">{{ project.owner }}</div>
          <div class="td create-time">{{ project.createTime }}</div>
          <div class="td actions">
            <button class="action-btn" @click="editProject(project.id)">
              编辑
            </button>
            <button class="action-btn" @click="showDeleteConfirm(project)">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div
      class="dialog-overlay"
      v-if="showDeleteDialog"
      @click.self="closeDeleteDialog"
    >
      <div class="dialog">
        <div class="dialog-header">
          <h2>删除项目</h2>
          <button class="close-btn" @click="closeDeleteDialog">×</button>
        </div>
        <div class="dialog-content">
          <p>确定要删除项目 "{{ projectToDelete?.name }}" 吗？</p>
          <p class="warning-text">此操作不可撤销！</p>
        </div>
        <div class="dialog-footer">
          <button class="cancel-btn" @click="closeDeleteDialog">取消</button>
          <button class="delete-btn" @click="confirmDelete">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import maintab from "../components/maintab.vue";
export default {
  data() {
    return {
      projects: [
        {
          id: 1,
          name: "Test Project",
          owner: "user@example.com",
          description: "这是一个用于测试的项目",
          createTime: "2024-03-20",
        },
      ], // 项目列表数据
      showNewProjectDialog: false,
      newProject: {
        name: "",
        owner: "user@example.com",
        description: "",
      },
      showDeleteDialog: false,
      projectToDelete: null,
    };
  },
  components: {
    maintab,
  },
  computed: {
    isFormValid() {
      return this.newProject.name.trim() && this.newProject.owner;
    },
  },
  methods: {
    closeDialog() {
      this.showNewProjectDialog = false;
      this.newProject = {
        name: "",
        owner: "user@example.com",
        description: "",
      };
    },
    createProject() {
      if (!this.isFormValid) return;

      const project = {
        id: Date.now(),
        ...this.newProject,
        createTime: new Date().toLocaleDateString(),
      };

      this.projects.unshift(project);
      this.closeDialog();
    },
    editProject(projectId) {
      // 跳转到工作台页面，并传递项目ID
      this.$router.push({
        name: "project-workbench",
        params: { id: projectId },
      });
    },
    showDeleteConfirm(project) {
      this.projectToDelete = project;
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
      this.projectToDelete = null;
    },
    confirmDelete() {
      if (this.projectToDelete) {
        const index = this.projects.findIndex(
          (p) => p.id === this.projectToDelete.id
        );
        if (index > -1) {
          this.projects.splice(index, 1);
        }
      }
      this.closeDeleteDialog();
    },
  },
};
</script>

<style scoped>
.project-container {
  padding: 20px;
  background-color: #232323;
  height: 100vh;
  color: white;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.tab-group {
  display: flex;
  gap: 20px;
}

.tab {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #cccccc;
}

.tab.active {
  color: white;
}

.tab.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
}

.header-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #444444;
  border-radius: 4px;
  width: 200px;
  background-color: #333333;
  color: white;
}

.search-input::placeholder {
  color: #888888;
}

.new-project-btn {
  padding: 8px 16px;
  background-color: #232323;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #444444;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.project-table {
  width: 100%;
  border: 1px solid #444444;
  border-radius: 4px;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
  background-color: #333333;
  padding: 12px;
  border-bottom: 1px solid #444444;
}

.th {
  font-weight: bold;
  color: white;
  font-size: 14px;
}

.table-body {
  max-height: 600px;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
  padding: 12px;
  border-bottom: 1px solid #444444;
  align-items: center;
  background-color: #2c2c2c;
}

.td {
  font-size: 14px;
  color: #cccccc;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 8px;
  border: 1px solid #444444;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  font-size: 12px;
  color: white;
}

.action-btn:hover {
  background-color: #444444;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #cccccc;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: #232323;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
  color: white;
}

.dialog-header {
  padding: 16px 20px;
  border-bottom: 1px solid #444444;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h2 {
  margin: 0;
  font-size: 16px;
  color: white;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #cccccc;
}

.dialog-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: white;
  font-size: 14px;
}

.required {
  color: #ff4d4f;
  margin-left: 4px;
}

.info-icon {
  color: #999;
  margin-left: 4px;
  cursor: help;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper textarea,
select {
  width: 90%;
  padding: 8px 12px;
  border: 1px solid #444444;
  border-radius: 4px;
  font-size: 14px;
  background-color: #333333;
  color: white;
}

.input-wrapper textarea {
  height: 100px;
  resize: vertical;
}

.input-wrapper input::placeholder,
.input-wrapper textarea::placeholder {
  color: #888888;
}

.char-count {
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #888888;
}

.dialog-footer {
  padding: 16px 20px;
  border-top: 1px solid #444444;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #333333;
  border: 1px solid #444444;
  color: white;
}

.cancel-btn:hover {
  background-color: #444444;
}

.confirm-btn {
  background-color: #232323;
  color: white;
  border: none;
}

.confirm-btn:disabled {
  background-color: #333333;
  color: #888888;
}

.warning-text {
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 8px;
}

.delete-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: #ff4d4f;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #ff7875;
}
</style>
