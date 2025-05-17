<template>
  <div
    class="container"
    v-show="isshow"
    :style="{
      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      width: `${baseWidth * scale}px`,
      height: `${baseHeight * scale}px`,
    }"
    @mousedown="startDrag"
  >
    <div class="nav-bar">
      <a>MultiAgent</a>
      <div class="close" @click="handleClose">
        <div class="line one"></div>
        <div class="line two"></div>
      </div>
    </div>
    <div class="messages-area">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="{ 'user-message': message.isUser }"
      >
        <div class="message-content">
          <div class="message-avatar">
            {{ message.isUser ? "👤" : "🤖" }}
          </div>
          <div class="message-text">{{ message.content }}</div>
        </div>
      </div>
    </div>
    <div class="sender-area">
      <div class="input-place">
        <input
          v-model="inputMessage"
          placeholder="Send a message."
          class="send-input"
          type="text"
          @keyup.enter="sendMessage"
        />
        <div class="send" @click="sendMessage">
          <svg
            class="send-icon"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  fill="#6B6C7B"
                  d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, nextTick } from "vue";

const props = defineProps({
  isshow: Boolean,
});

const emit = defineEmits(["update:isshow"]);

const position = ref({ x: 0, y: 0 });
const scale = ref(1);
const baseWidth = 300;
const baseHeight = 320;
const isDragging = ref(false);
const isResizing = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

const inputMessage = ref("");
const messages = ref([]);
const messagesArea = ref(null);

const handleClose = () => {
  emit("update:isshow", false);
};

const startDrag = (e) => {
  if (e.target.classList.contains("resize-handle")) return;
  isDragging.value = true;
  dragOffset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
  if (isDragging.value) {
    position.value = {
      x: e.clientX - dragOffset.value.x,
      y: e.clientY - dragOffset.value.y,
    };
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const startResize = (e) => {
  e.stopPropagation();
  isResizing.value = true;
  const startX = e.clientX;
  const startScale = scale.value;

  const onResize = (e) => {
    if (isResizing.value) {
      const deltaX = e.clientX - startX;
      const newScale = Math.max(0.5, Math.min(2, startScale + deltaX / 200));
      scale.value = newScale;
    }
  };

  const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", stopResize);
  };

  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", stopResize);
};

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  // 用户消息
  messages.value.push({
    content: inputMessage.value,
    isUser: true,
    timestamp: new Date(),
  });

  // 清空输入框
  const userMessage = inputMessage.value;
  inputMessage.value = "";

  // 滚动到底部
  await nextTick();
  scrollToBottom();

  try {
    // TODO: 调用后端API获取回复
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message: userMessage }),
    // });
    // const data = await response.json();

    // 模拟API响应
    setTimeout(() => {
      messages.value.push({
        content: `这是测试的回复`,
        isUser: false,
        timestamp: new Date(),
      });
      scrollToBottom();
    }, 1000);
  } catch (error) {
    console.error("发送消息失败:", error);
    messages.value.push({
      content: "抱歉，发送消息失败，请稍后重试。",
      isUser: false,
      timestamp: new Date(),
    });
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  const messagesArea = document.querySelector(".messages-area");
  if (messagesArea) {
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }
};
</script>
<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343541;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  cursor: move;
  user-select: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-bar {
  width: 100%;
  height: 40px;
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.nav-bar a {
  color: #6b6c7b;
  white-space: nowrap;
  margin-left: 10px;
  user-select: none;
}

.close {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.line {
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: #6b6c7b;
  border-radius: 30px;
}

.line.one {
  transform: rotate(45deg);
}

.line.two {
  transform: rotate(135deg);
}

.messages-area {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  padding: 5px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 5px;
}

.message.user-message {
  align-self: flex-end;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #2e2f3a;
}

.user-message .message-content {
  background-color: #40414f;
}

.message-avatar {
  font-size: 20px;
  line-height: 1;
}

.message-text {
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

.sender-area {
  background-color: #343541;
  width: 70%;
  padding: 10px;
  display: flex;
  border-radius: 8px;
  flex-shrink: 0;
}

.send-img {
  width: 30px;
}

.send-input {
  outline: none;
  display: flex;
  border: none;
  background: none;
  height: 40px;
  flex: 1;
  border-radius: 7px;
  background: none;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 5px;
}

.send-input::placeholder {
  color: #828e9e;
}

.input-place {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #40414f;
  border-radius: 7px;
  height: 40px;
  width: 100%;
  gap: 5px;
  border: 1px solid #2e2f3a;
}

.send {
  width: 30px;
  height: 30px;
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-icon {
  width: 17px;
}

.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
}

.resize-handle::after {
  content: "";
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 8px;
  height: 8px;
  border-right: 2px solid #6b6c7b;
  border-bottom: 2px solid #6b6c7b;
}
</style>
