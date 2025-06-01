<template>
  <div class="maintab">
    <maintab />
  </div>
  <div class="team-wrapper">
    <div class="team-container">
      <!-- 团队名称 -->
      <div class="team-header">
        <img
          class="team-avatar"
          src="../assets/img/icon/team.svg"
          alt="团队头像"
        />
        <div class="team-info">
          <h2 class="team-name">沧澜协作团队</h2>
          <div class="team-progress-bar">
            <div class="progress-label">团队任务总进度</div>
            <div class="progress-bar-bg">
              <div
                class="progress-bar-fg"
                :style="{ width: teamProgress + '%' }"
              ></div>
            </div>
            <span class="progress-text">{{ teamProgress }}%</span>
          </div>
        </div>
        <button
          v-if="isLeader"
          class="publish-btn"
          @click="showTeamTaskDialog = true"
        >
          发布团队任务
        </button>
      </div>

      <!-- 负责人信息 -->
      <div class="leader-section">
        <h3>团队负责人</h3>
        <div class="leader-info">
          <img
            class="avatar"
            src="../assets/img/icon/afbalbatross.svg"
            alt="负责人头像"
          />
          <div class="leader-details">
            <div class="leader-name">{{ leader.name }}</div>
            <div class="leader-email">{{ leader.email }}</div>
          </div>
        </div>
      </div>

      <!-- 团队成员列表 -->
      <div class="member-section">
        <h3>团队成员</h3>
        <div class="member-list">
          <div
            v-for="member in members"
            :key="member.email"
            class="member-item"
          >
            <img
              class="avatar"
              src="../assets/img/icon/afbalbatross.svg"
              alt="成员头像"
            />
            <div class="member-details">
              <div class="member-name">{{ member.name }}</div>
              <div class="member-email">{{ member.email }}</div>
              <div class="member-progress-bar">
                <div class="progress-bar-bg">
                  <div
                    class="progress-bar-fg"
                    :style="{ width: member.progress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">{{ member.progress }}%</span>
              </div>
            </div>
            <button
              v-if="isLeader"
              class="assign-btn"
              @click="openAssignTask(member)"
            >
              发布任务
            </button>
          </div>
        </div>
      </div>

      <!-- 发布团队任务弹窗 -->
      <div
        class="dialog-overlay"
        v-if="showTeamTaskDialog"
        @click.self="showTeamTaskDialog = false"
      >
        <div class="dialog">
          <div class="dialog-header">
            <h2>发布团队任务</h2>
            <button class="close-btn" @click="showTeamTaskDialog = false">
              ×
            </button>
          </div>
          <div class="dialog-content">
            <textarea
              v-model="teamTaskContent"
              placeholder="请输入团队任务内容..."
              maxlength="255"
            ></textarea>
          </div>
          <div class="dialog-footer">
            <button class="cancel-btn" @click="showTeamTaskDialog = false">
              取消
            </button>
            <button class="confirm-btn" @click="publishTeamTask">发布</button>
          </div>
        </div>
      </div>

      <!-- 发布个人任务弹窗 -->
      <div
        class="dialog-overlay"
        v-if="showAssignDialog"
        @click.self="showAssignDialog = false"
      >
        <div class="dialog">
          <div class="dialog-header">
            <h2>向 {{ selectedMember?.name }} 发布任务</h2>
            <button class="close-btn" @click="showAssignDialog = false">
              ×
            </button>
          </div>
          <div class="dialog-content">
            <textarea
              v-model="assignTaskContent"
              placeholder="请输入任务内容..."
              maxlength="255"
            ></textarea>
          </div>
          <div class="dialog-footer">
            <button class="cancel-btn" @click="showAssignDialog = false">
              取消
            </button>
            <button class="confirm-btn" @click="assignTask">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import maintab from "../components/maintab.vue";

// 模拟数据
const isLeader = true; // 当前用户是否为负责人
const leader = {
  name: "User",
  email: "user@example.com",
};
const members = ref([
  { name: "李四", email: "1234567890@qq.com", progress: 80 },
  { name: "王五", email: "1234567890@qq.com", progress: 55 },
  { name: "赵六", email: "1234567890@qq.com", progress: 45 },
]);

// 团队任务进度（可根据成员进度平均值计算）
const teamProgress = computed(() => {
  if (members.value.length === 0) return 0;
  const total = members.value.reduce((sum, m) => sum + m.progress, 0);
  return Math.round(total / members.value.length);
});

// 发布团队任务弹窗
const showTeamTaskDialog = ref(false);
const teamTaskContent = ref("");
function publishTeamTask() {
  if (!teamTaskContent.value.trim()) return;
  // 这里可以添加实际的任务分配逻辑
  alert("已向所有成员发布团队任务：" + teamTaskContent.value);
  teamTaskContent.value = "";
  showTeamTaskDialog.value = false;
}

// 发布个人任务弹窗
const showAssignDialog = ref(false);
const selectedMember = ref(null);
const assignTaskContent = ref("");
function openAssignTask(member) {
  selectedMember.value = member;
  assignTaskContent.value = "";
  showAssignDialog.value = true;
}
function assignTask() {
  if (!assignTaskContent.value.trim()) return;
  // 这里可以添加实际的任务分配逻辑
  alert(
    "已向 " +
      selectedMember.value.name +
      " 发布任务：" +
      assignTaskContent.value
  );
  assignTaskContent.value = "";
  showAssignDialog.value = false;
}
</script>
<style scoped>
body {
  background-color: #ffffff;
}
.maintab {
  position: absolute;
  z-index: 10000;
}
.team-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
}
.team-container {
  position: relative;
  width: 90%;
  height: 90%;
  background-color: #232323;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  padding: 32px 40px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.team-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}
.team-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff;
  object-fit: cover;
  border: 2px solid #444;
}
.team-info {
  flex: 1;
}
.team-name {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 8px 0;
}
.team-progress-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-label {
  font-size: 14px;
  color: #ccc;
}
.progress-bar-bg {
  width: 200px;
  height: 12px;
  background: #444;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 8px;
}
.progress-bar-fg {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #2196f3);
  border-radius: 6px;
  transition: width 0.3s;
}
.progress-text {
  font-size: 14px;
  color: #fff;
  min-width: 36px;
  text-align: right;
}
.publish-btn {
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.publish-btn:hover {
  background: #1976d2;
}
.leader-section {
  margin-bottom: 12px;
}
.leader-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  object-fit: cover;
  border: 2px solid #444;
}
.leader-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.leader-name {
  font-size: 18px;
  font-weight: bold;
}
.leader-email {
  font-size: 14px;
  color: #ccc;
}
.member-section {
  margin-top: 12px;
}
.member-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.member-item {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #292929;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
}
.member-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.member-name {
  font-size: 16px;
  font-weight: bold;
}
.member-email {
  font-size: 13px;
  color: #bbb;
}
.member-progress-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.assign-btn {
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.assign-btn:hover {
  background: #388e3c;
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
  width: 400px;
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
.dialog-content textarea {
  width: 100%;
  min-height: 80px;
  background: #333;
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  resize: vertical;
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
  background-color: #2196f3;
  color: white;
  border: none;
}
.confirm-btn:hover {
  background-color: #1976d2;
}
</style>
