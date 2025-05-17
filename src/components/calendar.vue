<template>
  <div class="calendar">
    <div class="calendar-wrapper">
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="month-button" @click="previousMonth">&lt;</button>
          <h2>{{ currentMonth + 1 }}月</h2>
          <button class="month-button" @click="nextMonth">&gt;</button>
          <span class="year">{{ currentYear }}</span>
        </div>
        <div class="weekdays">
          <div class="weekday" v-for="day in weekDays" :key="day">
            {{ day }}
          </div>
        </div>
        <div class="days">
          <div
            v-for="day in days"
            :key="day.date"
            class="day"
            :class="{
              'current-month': day.currentMonth,
              today: day.isToday,
              selected: isSelectedDay(day),
              'has-schedule': day.hasSchedule,
            }"
            @click="selectDay(day)"
          >
            <span class="day-number">{{ day.dayNumber }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 今日日程显示区域 -->
    <div class="today-schedule">
      <div class="schedule-header">
        <h3>TODAY</h3>
        <button
          class="add-schedule-btn"
          @click="openScheduleDialog"
          v-if="selectedDay"
        >
          添加日程
        </button>
      </div>
      <div class="time">{{ currentTime }}</div>
      <div class="date">{{ selectedDateDisplay || formattedDate }}</div>
      <div class="schedule-list" v-if="currentSchedules.length">
        <div
          v-for="(schedule, index) in currentSchedules"
          :key="index"
          class="schedule-item"
        >
          {{ schedule }}
        </div>
      </div>
      <div class="empty-schedule" v-else>暂无日程安排</div>
    </div>

    <!-- 日程对话框 -->
    <div class="schedule-dialog" v-if="showDialog" @click.self="closeDialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>{{ selectedDate }}日程安排</h3>
          <button class="close-button" @click="closeDialog">×</button>
        </div>
        <textarea
          v-model="scheduleText"
          placeholder="请输入日程内容..."
          class="schedule-input"
        ></textarea>
        <div class="dialog-footer">
          <button class="save-button" @click="saveSchedule">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      showDialog: false,
      scheduleText: "",
      selectedDay: null,
      schedules: {},
      currentTime: "",
    };
  },
  computed: {
    selectedDate() {
      if (!this.selectedDay) return "";
      return `${this.currentYear}年${this.currentMonth + 1}月${
        this.selectedDay.dayNumber
      }日`;
    },
    selectedDateDisplay() {
      if (!this.selectedDay) return "";
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${this.selectedDay.dayNumber} - ${months[this.currentMonth]} - ${
        this.currentYear
      }`;
    },
    formattedDate() {
      const date = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${date.getDate()} - ${
        months[date.getMonth()]
      } - ${date.getFullYear()}`;
    },
    currentSchedules() {
      if (!this.selectedDay) {
        const today = new Date();
        const dateKey = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
        return this.schedules[dateKey] ? [this.schedules[dateKey]] : [];
      }
      const dateKey = `${this.currentYear}-${this.currentMonth + 1}-${
        this.selectedDay.dayNumber
      }`;
      return this.schedules[dateKey] ? [this.schedules[dateKey]] : [];
    },
    days() {
      const days = [];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      );

      // 获取上个月的天数
      const prevMonthDays = new Date(
        this.currentYear,
        this.currentMonth,
        0
      ).getDate();

      // 填充上个月的日期
      for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
        days.push({
          dayNumber: prevMonthDays - i + 1,
          currentMonth: false,
          isToday: false,
        });
      }

      // 填充当前月的日期
      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const today = new Date();
        const isToday =
          i === today.getDate() &&
          this.currentMonth === today.getMonth() &&
          this.currentYear === today.getFullYear();

        const dateKey = `${this.currentYear}-${this.currentMonth + 1}-${i}`;

        days.push({
          dayNumber: i,
          currentMonth: true,
          isToday: isToday,
          hasSchedule: !!this.schedules[dateKey],
        });
      }

      // 填充下个月的日期
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          dayNumber: i,
          currentMonth: false,
          isToday: false,
        });
      }

      return days;
    },
  },
  methods: {
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.selectedDay = null;
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.selectedDay = null;
    },
    selectDay(day) {
      if (!day.currentMonth) return;
      this.selectedDay = day;
    },
    openScheduleDialog() {
      if (!this.selectedDay) return;
      const dateKey = `${this.currentYear}-${this.currentMonth + 1}-${
        this.selectedDay.dayNumber
      }`;
      this.scheduleText = this.schedules[dateKey] || "";
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.scheduleText = "";
    },
    saveSchedule() {
      if (!this.selectedDay) return;
      const dateKey = `${this.currentYear}-${this.currentMonth + 1}-${
        this.selectedDay.dayNumber
      }`;
      if (this.scheduleText.trim()) {
        this.schedules[dateKey] = this.scheduleText;
      } else {
        delete this.schedules[dateKey];
      }
      this.closeDialog();
    },
    isSelectedDay(day) {
      return (
        this.selectedDay &&
        day.dayNumber === this.selectedDay.dayNumber &&
        day.currentMonth
      );
    },
    updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timeInterval);
  },
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
}

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  color: white;
  width: 95%;
  min-height: 200px;
  padding: 20px;
}

.calendar-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 10px;
  position: relative;
}

.calendar-header h2 {
  margin: 0 15px;
  font-size: 14px;
}

.year {
  position: absolute;
  right: 20px;
  color: #999;
  font-size: 12px;
}

.month-button {
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
  padding: 5px 10px;
}

.month-button:hover {
  color: #fcfbfa;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 5px;
  padding: 5px 0;
  color: #999;
  font-size: 10px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  flex: 1;
  padding: 5px;
}

.day {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  font-size: 10px;
  height: 25px;
  width: 25px;
  margin: 2px auto;
}

.day:not(.current-month) {
  color: #666;
}

.day.today {
  background: #ffffff;
  color: #000000;
}

.day.selected {
  background: #ffffff;
  color: #000000;
}

.day.has-schedule::after {
  content: "";
  position: absolute;
  bottom: 15%;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
}

.day:hover:not(.today) {
  background: rgba(162, 155, 254, 0.1);
}

/* 今日日程显示区域样式 */
.today-schedule {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 5px;
  width: 94%;
  height: 35%;
  min-height: 100px;
  margin-top: 10px;
  margin: 20px;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.today-schedule h3 {
  color: #ffffff;
  margin: 0;
  font-size: 12px;
}

.add-schedule-btn {
  background: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.add-schedule-btn:hover {
  background: #000000;
  color: #ffffff;
}

.time {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.date {
  color: #999;
  margin-bottom: 10px;
  font-size: 12px;
}

.schedule-list {
  margin-top: 20px;
}

.schedule-item {
  background: rgba(39, 39, 39, 0.1);
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 12px;
}

.empty-schedule {
  color: #666;
  text-align: center;
  padding: 15px;
  font-size: 12px;
}

/* 对话框样式 */
.schedule-dialog {
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

.dialog-content {
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
}

.schedule-input {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #2a2a2a;
  color: #fff;
  resize: none;
  margin-bottom: 15px;
}

.save-button {
  background: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.save-button:hover {
  background: #262626;
  color: #ffffff;
}
</style>
