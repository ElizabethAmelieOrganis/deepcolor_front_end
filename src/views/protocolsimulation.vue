<template>
  <loadingMAS v-show="showLoading" />
  <div class="protocol_design_container">
    <maintab />
    <div class="protocol_IDE">
      <div class="protocol_title">
        <span
          class="agent-title"
          style="color: aliceblue; font-family: MyriadPro"
          >Protocol Agent</span
        >
      </div>
      <div class="ide-container">
        <div class="agent-panel">
          <div class="chat-history">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
              :class="{ 'message-right': message.isUser }"
            >
              {{ message.text }}
            </div>
          </div>
          <div class="input-box">
            <input
              type="text"
              v-model="newMessage"
              placeholder="输入消息..."
              @keyup.enter="sendMessage"
            />
            <img
              class="send-button"
              alt="send"
              src="../assets/img/icon/send.svg"
              @click="sendMessage"
            />
            <button class="control-button" @click="togglePause">
              {{ isPaused ? "继续" : "暂停" }}
            </button>
            <button class="control-button" @click="saveProtocol">保存</button>
          </div>
        </div>
        <div class="protocol-panel">
          <div class="protocol-card">
            <h3 style="font-family: MyriadPro">My Protocol</h3>
            <div class="content-placeholder">
              <div v-if="savedProtocols.length > 0" class="protocol-list">
                <div
                  v-for="(protocol, index) in savedProtocols"
                  :key="index"
                  class="protocol-item"
                >
                  <div class="protocol-header">
                    <h4 v-if="!isEditing">{{ protocol.title }}</h4>
                    <input
                      v-else
                      v-model="protocol.title"
                      class="edit-input"
                      type="text"
                    />
                    <div class="protocol-actions">
                      <button class="action-button" @click="toggleEdit">
                        {{ isEditing ? "保存" : "编辑" }}
                      </button>
                      <button class="action-button" @click="saveToFile">
                        保存到文件
                      </button>
                    </div>
                  </div>
                  <p v-if="!isEditing" class="protocol-description">
                    {{ protocol.description }}
                  </p>
                  <textarea
                    v-else
                    v-model="protocol.description"
                    class="edit-textarea"
                  ></textarea>
                  <ul v-if="!isEditing">
                    <li
                      v-for="(step, stepIndex) in protocol.steps"
                      :key="stepIndex"
                    >
                      {{ step }}
                    </li>
                  </ul>
                  <div v-else class="steps-editor">
                    <div
                      v-for="(step, stepIndex) in protocol.steps"
                      :key="stepIndex"
                      class="step-item"
                    >
                      <input
                        v-model="protocol.steps[stepIndex]"
                        class="edit-input"
                      />
                      <button
                        class="delete-button"
                        @click="deleteStep(index, stepIndex)"
                      >
                        删除
                      </button>
                    </div>
                    <button class="add-button" @click="addStep(index)">
                      添加步骤
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="empty-protocol">暂无保存的实验方案</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import maintab from "../components/maintab.vue";
import loadingMAS from "../components/loadingMAS.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const showLoading = ref(true);
const newMessage = ref("");
const messages = ref([]);
const isPaused = ref(false);
const isEditing = ref(false);
const savedProtocols = ref([]);
let timeoutIds = [];

const togglePause = () => {
  isPaused.value = !isPaused.value;
  if (isPaused.value) {
    // 清除所有定时器
    timeoutIds.forEach((id) => clearTimeout(id));
    timeoutIds = [];
  }
};

const toggleEdit = () => {
  if (isEditing.value) {
    // 保存编辑内容
    isEditing.value = false;
  } else {
    isEditing.value = true;
  }
};

const addStep = (protocolIndex) => {
  savedProtocols.value[protocolIndex].steps.push("");
};

const deleteStep = (protocolIndex, stepIndex) => {
  savedProtocols.value[protocolIndex].steps.splice(stepIndex, 1);
};

const saveProtocol = () => {
  // 示例：添加一个新的实验方案
  savedProtocols.value.push({
    title: "Hi-C 实验方案",
    description: "Hi-C 3.0：全基因组染色体构象捕获的改良实验方案",
    steps: [
      "Basic Protocol 1：核构象的固定",
      "Basic Protocol 2：染色体一致性捕获",
      "Basic Protocol 3：DNA 纯化",
    ],
  });
};

const saveToFile = () => {
  // 这里可以添加保存到文件的功能
  console.log("保存到文件");
};
//提交问题逻辑
const sendMessage = async () => {
  if (newMessage.value.trim()) {
    // 添加用户消息
    messages.value.push({
      text: newMessage.value,
      isUser: true,
    });
  }
  try {
    const inputElement = document.querySelector("input");
    inputElement.disabled = true;
    const response = await axios.post("http://127.0.0.1:5000/api/process", {
      text: newMessage.value,
    });
    console.log("sendSuccessfully:", response.data);
    const messsaged = response.data.message;
    messages.value.push({
      text: messsaged,
      isUser: false,
    });
    newMessage.value = "";
  } catch (error) {
    console.error("failToSend", error);
    messages.value.push({
      text: "发送失败，请稍后再试试吧。",
      isUser: false,
    });
  } finally {
    const inputElement = document.querySelector("input");
    inputElement.disabled = false;
  }
};

onMounted(() => {
  setTimeout(() => {
    showLoading.value = false;
  }, 1000);
});
</script>
<style scoped>
.protocol_IDE {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #2c2b30;
  width: 88%;
  height: 90%;
  background-color: #2c2b30;
  border-radius: 8px;
  box-shadow: 7px 7px 7px #3a3839;
  padding: 10px;
}

.ide-logo {
  align-self: flex-end;
  width: 60px;
  margin: 10px;
}

.ide-container {
  display: flex;
  gap: 20px;
  height: calc(100% - 80px);
}

.agent-panel {
  flex: 7;
  background-color: #8a9094;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  min-width: 350px;
}

.protocol-panel {
  flex: 3;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 15px;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 15px;
  background-color: #b5bbbe;
  border-radius: 6px;
  padding: 10px;
  min-height: 200px;
  background-color: #b5bbbe;
  padding: 15px;
}

.input-box {
  display: flex;
  gap: 10px;
}

.input-box input {
  flex: 1;
  background-color: #333;
  border: 1px solid #444;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
}

.input-box button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.content-placeholder {
  height: 90%;
  background-color: #333;
  border-radius: 4px;
  margin-top: 15px;
}
.protocol_design_container {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  background-size: 20px 20px;
  background-position: center center;
  background-image: linear-gradient(to right, #cbd5e1 1px, transparent 1px),
    linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
.protocol_IDE {
  gap: 10px;
}

.ide-container {
  flex: 1;
  gap: 15px;
}

.input-box button {
  background-color: #252525;
  transition: opacity 0.3s;
  color: #ffffff;
}

.input-box button:hover {
  opacity: 0.8;
}

.protocol-card h3 {
  color: #ffffff;
}

.content-placeholder {
  background: repeating-linear-gradient(
    -45deg,
    #2d2d2d,
    #2d2d2d 10px,
    #333 10px,
    #333 20px
  );
}
.send-button {
  cursor: pointer;
}
.send-button:hover {
  animation: rotate 0.5s infinite linear;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.message {
  background-color: #4a4a4a;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
}

.message-right {
  margin-left: auto;
  background-color: #f48231;
}

.chat-history {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-content {
  position: relative;
}

.message-preview {
  margin-bottom: 5px;
}

.message-full {
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.expand-button {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 5px;
  transition: all 0.3s ease;
}

.expand-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.control-button {
  background-color: #4a4a4a;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.control-button:hover {
  background-color: #5a5a5a;
}

.protocol-list {
  padding: 10px;
  color: white;
}

.protocol-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2a2a2a;
  border-radius: 4px;
}

.protocol-item h4 {
  margin: 0 0 10px 0;
  color: #f48231;
}

.protocol-item ul {
  margin: 0;
  padding-left: 20px;
}

.protocol-item li {
  margin-bottom: 5px;
  line-height: 1.4;
}

.empty-protocol {
  color: #666;
  text-align: center;
  padding: 20px;
}

.protocol-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.protocol-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  background-color: #4a4a4a;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.action-button:hover {
  background-color: #5a5a5a;
}

.protocol-description {
  color: #aaa;
  margin-bottom: 10px;
  font-size: 14px;
}

.edit-input {
  background-color: #333;
  color: white;
  border: 1px solid #444;
  padding: 4px 8px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
}

.edit-textarea {
  background-color: #333;
  color: white;
  border: 1px solid #444;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  resize: vertical;
}

.steps-editor {
  margin-top: 10px;
}

.step-item {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.delete-button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}
</style>
