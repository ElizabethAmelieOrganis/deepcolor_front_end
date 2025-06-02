<template>
  <div class="contributer-info">
    <div
      class="contributer-info-title"
      style="
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 10px;
      "
    >
      数据贡献者
    </div>
    <div class="contributer-info-avatar">
      <el-avatar :size="55"> user </el-avatar>
      <el-avatar :size="55"> 李二狗 </el-avatar>
      <el-avatar :size="55"> 张全蛋 </el-avatar>
      <el-avatar :size="55"> 陈三毛 </el-avatar>
      <el-avatar :size="55"> 王五 </el-avatar>
    </div>
  </div>
  <div class="single-cell-sequencing">
    <el-steps
      :active="currentStep"
      align-center
      finish-status="success"
      process-status="process"
    >
      <el-step title="上传测序数据" />
      <el-step title="初步检验与分析" />
      <el-step title="分析结果" />
    </el-steps>
    <div v-if="currentStep === 0" class="step-content">
      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="100px"
        class="upload-el-form"
        size="small"
        label-position="right"
        @submit.prevent
      >
        <el-form-item
          label="测序样本"
          prop="sample"
          style="color: #e5eaf3"
          class="form-item"
        >
          <el-input
            v-model="form.sample"
            placeholder="请输入测序样本"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="测序负责人"
          prop="owner"
          style="color: #e5eaf3"
          class="form-item"
        >
          <el-input
            v-model="form.owner"
            placeholder="请输入负责人姓名"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="测序仪器"
          prop="instrument"
          style="color: #e5eaf3"
          class="form-item"
        >
          <el-input
            v-model="form.instrument"
            placeholder="请输入仪器名称"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="测序时间"
          prop="time"
          style="color: #e5eaf3"
          class="form-item"
        >
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </el-form-item>
        <el-form-item
          label="测序文件"
          prop="fileList"
          type="success"
          style="color: #e5eaf3"
          class="form-item"
          plain
        >
          <el-upload
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :file-list="form.fileList"
            :on-change="handleUploadChange"
            :on-success="handleUploadSuccess"
            :auto-upload="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="center-box">
            <el-button type="primary" @click="handleUploadSuccess"
              >提交并上传</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="currentStep === 1" class="step-content">
      <div class="custom-spin center-box">
        <span class="loader"></span>
        <span class="spin-tip">正在为您进行初步检验与分析...</span>
      </div>
    </div>
    <div v-if="currentStep === 2" class="step-content">
      <transition name="warning-fade">
        <div v-if="showWarning" class="warning-inline">
          <p class="warning-icon" style="color: #ff4d4f">
            <WarningFilled />
          </p>
          <span class="warning-text">检测到数据异常，点击查看详情</span>
          <button class="close-btn" @click="showWarning = false">
            关闭警告
          </button>
          <button class="detail-btn" @click="dialogVisible = true">
            查看详情
          </button>
        </div>
      </transition>
    </div>
    <!-- 警告弹窗 -->
    <div v-if="dialogVisible" class="custom-dialog-mask">
      <div class="custom-dialog">
        <div class="custom-dialog-title">警告详情</div>
        <div class="custom-dialog-content">
          <div class="ai-dialog-row">
            <div class="ai-avatar">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="#e6f7ff"
                  stroke="#1890ff"
                  stroke-width="2"
                />
                <rect
                  x="12"
                  y="16"
                  width="16"
                  height="8"
                  rx="4"
                  fill="#1890ff"
                />
                <circle cx="20" cy="20" r="3" fill="#fff" />
                <rect
                  x="17"
                  y="12"
                  width="6"
                  height="4"
                  rx="2"
                  fill="#91d5ff"
                />
              </svg>
            </div>
            <div class="ai-dialog-main">
              <div class="ai-dialog-name">监控代理AI：</div>
              <div class="ai-dialog-text">
                监测到成员李二狗在单细胞测序环节上传的10X数据存在大量红细胞marker基因，疑似取样环节存在血液污染（负责人：张全蛋，陈三毛）
              </div>
            </div>
          </div>
        </div>
        <div class="custom-dialog-footer">
          <button @click="dialogVisible = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { WarningFilled } from "@element-plus/icons-vue";
import {
  ElAvatar,
  ElSteps,
  ElStep,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElDatePicker,
  ElUpload,
  ElMessage,
} from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";

const loading = ref(false);
const showWarning = ref(false);
const dialogVisible = ref(false);
const currentStep = ref(0);

const formRef = ref();
const form = ref({
  sample: "",
  owner: "",
  instrument: "",
  time: "",
  fileList: [],
});

const rules = {
  sample: [{ required: true, message: "请输入测序样本", trigger: "blur" }],
  owner: [{ required: true, message: "请输入负责人姓名", trigger: "blur" }],
  instrument: [{ required: true, message: "请输入仪器名称", trigger: "blur" }],
  time: [{ required: true, message: "请选择测序时间", trigger: "change" }],
  fileList: [{ required: true, message: "请上传测序文件", trigger: "change" }],
};

// el-upload 相关事件
const handleUploadChange = (file, fileList) => {
  form.value.fileList = fileList;
};

const handleUploadSuccess = (response, file, fileList) => {
  // 文件上传成功后，进入下一步
  loading.value = true;
  showWarning.value = false;
  currentStep.value = 1;
  setTimeout(() => {
    loading.value = false;
    showWarning.value = true;
    currentStep.value = 2;
  }, 2000);
};
// 提交表单（待启动）
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 触发 el-upload 的 submit 方法
      const uploadRef = formRef.value.$el.querySelector(".el-upload");
      if (uploadRef && uploadRef.__vueParentComponent) {
        // 兼容 el-upload 2.x/3.x
        const uploadVm = uploadRef.__vueParentComponent.ctx;
        if (uploadVm && uploadVm.submit) {
          uploadVm.submit();
        }
      }
    }
  });
};
</script>

<style scoped>
.single-cell-sequencing {
  position: relative;
  padding: 32px 0;
}
.el-steps {
  margin-bottom: 36px;
}
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
}
.step-content {
  margin-top: 32px;
}
.upload-el-form {
  max-width: 100%;
  margin: 0 auto;
  background: #232323;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  padding: 28px 32px 18px 32px;
}
.custom-spin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #409eff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spin-tip {
  color: #aaa;
  font-size: 15px;
}
.warning-inline {
  margin: 0;
  background: #fff1f0;
  border: 1px solid #ffa39e;
  color: #ff4d4f;
  padding: 14px 18px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.08);
  display: flex;
  align-items: center;
  animation: warning-blink-red 1.2s infinite alternate;
  z-index: 10;
}
.warning-icon {
  margin-right: 8px;
  font-size: 22px;
  display: flex;
  align-items: center;
}
.warning-text {
  font-weight: 500;
  margin-right: 16px;
}
.close-btn {
  margin-left: auto;
  color: #ff4d4f;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.detail-btn {
  margin-left: 8px;
  color: #409eff;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
@keyframes warning-blink-red {
  0% {
    box-shadow: 0 0 8px 2px #ffa39e;
  }
  100% {
    box-shadow: 0 0 16px 6px #ff4d4f;
  }
}
.warning-fade-enter-active,
.warning-fade-leave-active {
  transition: opacity 0.5s;
}
.warning-fade-enter-from,
.warning-fade-leave-to {
  opacity: 0;
}
.custom-dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-dialog {
  background: #232323;
  border-radius: 8px;
  width: 360px;
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  padding: 0 0 16px 0;
  animation: dialog-pop 0.3s;
}
@keyframes dialog-pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.custom-dialog-title {
  font-size: 18px;
  font-weight: 600;
  padding: 16px 24px 8px 24px;
  border-bottom: 1px solid #333;
  color: #fff;
}
.custom-dialog-content {
  padding: 16px 24px;
  color: #fff;
}
.ai-dialog-row {
  display: flex;
  align-items: flex-start;
}
.ai-avatar {
  width: 40px;
  height: 40px;
  margin-right: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.ai-dialog-main {
  flex: 1;
}
.ai-dialog-name {
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
}
.ai-dialog-text {
  color: #333;
  font-size: 15px;
  line-height: 1.7;
  background: #f6faff;
  border-radius: 6px;
  padding: 10px 14px;
  box-shadow: 0 1px 4px rgba(24, 144, 255, 0.06);
}
.custom-dialog-footer {
  text-align: right;
  padding: 0 24px;
}
.custom-dialog-footer button {
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
}
.custom-dialog-footer button:hover {
  background: #66b1ff;
}
.contributer-info-avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  gap: 20px;
}
.form-item {
  color: #e5eaf3;
}
</style>
