<template>
  <div class="maintab" style="z-index: 1000">
    <maintab />
  </div>
  <div class="main-container">
    <div class="Welcome">
      <img alt="LOGO_black" src="../assets/img/afbalbatross_black.svg" />
      <h1>{{ $t("messages.main_welcome") }}</h1>
    </div>
    <div class="functionmap">
      <div class="left-column">
        <div class="team-section">
          <h2 class="block-title">{{ $t("messages.main_team") }}</h2>
          <div class="team">
            <div class="team_icon">
              <svg
                t="1739783199168"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2496"
                width="30"
                height="30"
              >
                <path
                  d="M774.4 742.4c0-44.8-12.8-89.6-38.4-121.6C691.2 569.6 640 544 576 544c-38.4 0-76.8 0-115.2 0-44.8 0-83.2 12.8-121.6 38.4-44.8 32-70.4 76.8-76.8 128-6.4 57.6 0 121.6-6.4 185.6 6.4 0 19.2 6.4 25.6 6.4 76.8 19.2 147.2 38.4 224 38.4 44.8 0 96 0 140.8-6.4 38.4-6.4 76.8-19.2 115.2-32 6.4 0 6.4-6.4 6.4-12.8C774.4 838.4 774.4 787.2 774.4 742.4z"
                  p-id="2497"
                  fill="#ffffff"
                ></path>
                <path
                  d="M358.4 531.2c12.8-6.4 19.2-6.4 32-12.8-38.4-38.4-57.6-76.8-57.6-128-44.8 0-89.6 0-134.4 0C172.8 390.4 147.2 396.8 128 403.2 57.6 428.8 0 499.2 0 576c0 51.2 0 102.4 0 160 0 6.4 0 6.4 6.4 12.8 51.2 12.8 102.4 25.6 153.6 32 19.2 0 44.8 6.4 64 6.4 0-12.8 0-25.6 0-38.4 0-19.2 0-38.4 6.4-57.6C249.6 614.4 294.4 563.2 358.4 531.2z"
                  p-id="2498"
                  fill="#ffffff"
                ></path>
                <path
                  d="M1024 588.8c0-25.6-6.4-57.6-19.2-83.2-38.4-76.8-96-115.2-179.2-115.2-121.6 0 0 0-121.6 0 0 51.2-19.2 96-57.6 128 6.4 0 12.8 6.4 12.8 6.4 32 12.8 64 32 89.6 57.6 38.4 44.8 57.6 96 57.6 153.6 0 12.8 0 32 0 44.8 32-6.4 57.6-6.4 89.6-12.8 38.4-6.4 83.2-19.2 121.6-38.4 6.4 0 6.4-6.4 6.4-12.8C1024 684.8 1024 633.6 1024 588.8z"
                  p-id="2499"
                  fill="#ffffff"
                ></path>
                <path
                  d="M518.4 537.6c83.2 0 153.6-70.4 147.2-153.6 0-83.2-70.4-147.2-147.2-147.2-83.2 0-153.6 64-153.6 147.2C371.2 467.2 435.2 537.6 518.4 537.6z"
                  p-id="2500"
                  fill="#ffffff"
                ></path>
                <path
                  d="M704 371.2C723.2 377.6 742.4 384 768 384c83.2 0 153.6-70.4 147.2-153.6 0-83.2-70.4-147.2-147.2-147.2-83.2 0-153.6 64-153.6 147.2C665.6 256 697.6 307.2 704 371.2z"
                  p-id="2501"
                  fill="#ffffff"
                ></path>
                <path
                  d="M256 384c25.6 0 57.6-6.4 76.8-19.2 6.4-51.2 32-96 70.4-121.6 0 0 0-6.4 0-6.4 0-83.2-70.4-147.2-147.2-147.2-83.2 0-153.6 64-153.6 147.2C102.4 313.6 172.8 384 256 384z"
                  p-id="2502"
                  fill="#ffffff"
                ></path>
              </svg>
              <h2 class="team_name" style="cursor: pointer" @click="goToTeam">
                User的团队<br />ID:MTE0NTE0
              </h2>
            </div>
            <div class="teamsinformation">
              <team_information />
            </div>
            <div class="line"></div>
            <div class="inviteteam">
              <p class="teammate">团队成员</p>
              <button class="invite_button">邀请成员</button>
            </div>
            <div class="member-list">
              <div class="member-item">
                <div class="member-info">
                  <div class="member-email">user@example.com</div>
                  <div class="member-role">管理员</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 实验方法模块 -->
        <div class="method-section">
          <h2 class="block-title">实验方法速递</h2>
          <div class="method-container">
            <div class="method-item">
              <div class="method-header">
                <div class="method-title">
                  Quick and simple removal of endotoxins from purified protein
                  solutions with magnetic beads
                </div>
                <div class="method-tags">
                  <span class="tag">Magnetic Beads</span>
                  <span class="tag">Endotoxin removal</span>
                </div>
              </div>
              <div class="method-actions">
                <button class="action-btn">AI 解读</button>
                <button class="action-btn">查看详情</button>
              </div>
              <div class="method-pagination">
                <span>1 / 5</span>
                <button class="nav-btn">></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar-section">
        <h2 class="block-title">{{ $t("messages.main_calendar") }}</h2>
        <div class="calender">
          <calendar />
        </div>
      </div>
      <div class="task-section">
        <h2 class="block-title">{{ $t("messages.main_task") }}</h2>
        <div class="task">
          <task_list @stats-update="updateTaskStats" />
        </div>
        <h2 class="block-title">{{ $t("messages.main_progress") }}</h2>
        <div class="progress">
          <div class="progress-stats">
            <div class="stat-item">
              <div class="stat-number">{{ taskStats.total }}</div>
              <div class="stat-label">总任务</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ taskStats.completed }}</div>
              <div class="stat-label">已完成</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ taskStats.percentage }}%</div>
              <div class="stat-label">完成率</div>
            </div>
          </div>
          <div class="progress-bar-container">
            <div
              class="progress-bar"
              :style="{ width: taskStats.percentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import maintab from "../components/maintab.vue";
import team_information from "../components/team_information.vue";
import calendar from "../components/calendar.vue";
import task_list from "../components/task_list.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    maintab,
    team_information,
    calendar,
    task_list,
  },
  data() {
    return {
      taskStats: {
        total: 0,
        completed: 0,
        percentage: 0,
      },
    };
  },
  methods: {
    updateTaskStats(stats) {
      this.taskStats = stats;
    },
    goToTeam() {
      this.$router.push("/main/team");
    },
  },
};
</script>
<style scoped>
.main-container {
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  background-size: 20px 20px;
  background-position: center center;
  background-image: linear-gradient(to right, #cbd5e1 1px, transparent 1px),
    linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
}

.Welcome {
  width: 90%;
  height: 10%;
  margin-left: 100px;
  font-family: "MyriadPro";
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
}
.line {
  width: auto;
  height: 3px;
  margin-top: 1px;
}
.functionmap {
  display: flex;
  justify-content: flex-start;
  padding: 0 100px;
  margin-top: 20px;
  width: calc(100% - 200px);
  gap: 15px;
}

.left-column {
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.team-section,
.calendar-section,
.task-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.team-section {
  margin-bottom: 0;
}

.calendar-section {
  width: 60%;
  margin: 0 15px;
}

.task-section {
  width: 20%;
}

.block-title {
  font-size: 25px;
  font-weight: bold;
  color: #232323;
  margin: 0;
  padding-left: 5px;
  font-family: "MyriadPro";
}

.team {
  width: 100%;
  height: 400px;
  background-color: #232323;
  border-radius: 8px;
  padding: 5px;
  color: white;
  box-shadow: 7px 7px 7px #332f2c;
}
.calender {
  width: 100%;

  background-color: #232323;
  border-radius: 8px;

  display: flex;
  color: white;
  box-shadow: 7px 7px 7px #332f2c;
}
.task {
  width: 100%;
  height: 45%;
  background-color: #232323;
  border-radius: 8px;
  box-shadow: 7px 7px 7px #332f2c;
  color: white;
}
.team_icon {
  display: flex;
  justify-content: center;
  gap: 25px;
  align-items: center;
}
.team_name {
  font-size: medium;
  font-family: "MyriadPro";
  color: white;
}
.teamsinformation {
  position: relative;
  z-index: 6;
}
.inviteteam {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.teammate {
  font-family: "MyriadPro";
  font-size: 14px;
  color: white;
}
.invite_button {
  font-family: "MyriadPro";
  font-size: 14px;
  height: 22px;
  color: #ffffff;
  background-color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.member-list {
  margin-top: 10px;
  padding: 0 15px;
}

.member-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #333333;
}

.member-info {
  flex: 1;
}

.member-email {
  font-size: 14px;
  color: white;
  margin-bottom: 2px;
}

.member-role {
  font-size: 12px;
  color: #cccccc;
}

.progress {
  width: 100%;
  height: 15%;
  background-color: #232323;
  border-radius: 8px;
  box-shadow: 7px 7px 7px #332f2c;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.progress-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #cccccc;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #333333;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #535353;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.method-section {
  width: 100%;
}

.method-container {
  width: 93%;
  background-color: #232323;
  border-radius: 8px;
  box-shadow: 7px 7px 7px #332f2c;
  padding: 15px;
  color: white;
}

.method-item {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.method-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.method-title {
  font-size: 14px;
  line-height: 1.4;
  color: white;
}

.method-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background-color: #333333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #cccccc;
}

.method-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 6px 12px;
  background-color: black;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.method-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cccccc;
  font-size: 12px;
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}
</style>
