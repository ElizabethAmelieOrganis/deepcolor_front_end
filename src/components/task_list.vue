<template>
  <div class="task-container">
    <div class="task-header">
      <div class="task-input">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          type="text"
          placeholder="添加新任务..."
        />
        <button class="add-btn" @click="addTask">添加</button>
      </div>
    </div>

    <div class="task-sections">
      <div class="section">
        <h3>未完成</h3>
        <div class="task-list">
          <div
            v-for="task in uncompletedTasks"
            :key="task.id"
            class="task-item"
          >
            <span class="task-text">{{ task.text }}</span>
            <div class="task-actions">
              <button
                class="action-btn complete"
                @click="completeTask(task.id)"
              >
                ✓
              </button>
              <button class="action-btn delete" @click="deleteTask(task.id)">
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>已完成</h3>
        <div class="task-list completed">
          <div v-for="task in completedTasks" :key="task.id" class="task-item">
            <span class="task-text completed">{{ task.text }}</span>
            <div class="task-actions">
              <button class="action-btn delete" @click="deleteTask(task.id)">
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.completed);
    },
    taskStats() {
      const total = this.tasks.length;
      const completed = this.completedTasks.length;
      const percentage =
        total === 0 ? 0 : Math.round((completed / total) * 100);

      return {
        total,
        completed,
        percentage,
      };
    },
  },
  watch: {
    taskStats: {
      handler(newStats) {
        this.$emit("stats-update", newStats);
      },
      deep: true,
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.unshift({
          id: Date.now(),
          text: this.newTask,
          completed: false,
        });
        this.newTask = "";
      }
    },
    completeTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.completed = true;
      }
    },
    deleteTask(id) {
      const index = this.tasks.findIndex((t) => t.id === id);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.task-container {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.task-header {
  margin-bottom: 20px;
}

.task-input {
  display: flex;
  gap: 8px;
}

.task-input input {
  flex: 1;
  padding: 8px 12px;
  background-color: #333333;
  color: white;
  border: 1px solid #444444;
  border-radius: 4px;
  font-size: 14px;
  width: 90%;
}

.task-input input::placeholder {
  color: #888888;
}

.add-btn {
  padding: 8px 16px;
  background-color: #535353;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.task-sections {
  flex: 1;
  overflow-y: auto;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  font-size: 14px;
  color: white;
  margin-bottom: 10px;
  padding-left: 5px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #333333;
  border-radius: 4px;
}

.task-text {
  font-size: 14px;
  color: white;
}

.task-text.completed {
  color: #888888;
  text-decoration: line-through;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: none;
  color: white;
}

.action-btn.complete {
  color: white;
}

.action-btn.complete:hover {
  background-color: #333333;
}

.action-btn.delete {
  color: white;
}

.action-btn.delete:hover {
  background-color: #333333;
}
</style>
