<template>
  <div class="sample-model">
    <div></div>
    <div class="nav-container">
      <div class="choose-title">
        <svg
          t="1740361109380"
          class="information-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3249"
          width="30"
          height="30"
        >
          <path
            d="M927.886633 64.00473H559.931589c-8.798925 0-15.998045-7.19912-15.998046-15.998045V32.708554C543.933543 15.310679 530.235217 0.512487 512.837343 0.012548 494.739554-0.48739 479.941362 14.010838 479.941362 32.008639v15.998046c0 8.798925-7.19912 15.998045-15.998046 15.998045H95.988272c-52.993525 0-95.988272 42.994747-95.988272 95.988272v559.931589c0 52.993525 42.994747 95.988272 95.988272 95.988273h297.663633c10.498717 0 18.197777 9.998778 15.498106 20.097544l-39.495175 147.581969c-4.599438 17.097911 5.599316 34.595773 22.59724 39.195211 2.799658 0.799902 5.599316 1.099866 8.298986 1.099866 14.098278 0 27.096689-9.398852 30.896225-23.697105L479.941362 819.012485v172.278951c0 17.397874 13.698326 32.196066 31.096201 32.696006 18.097789 0.499939 32.895981-13.99829 32.89598-31.996091V815.912864h0.699915l49.393965 184.277485c3.799536 14.298253 16.797948 23.697105 30.896225 23.697105 2.69967 0 5.499328-0.399951 8.298986-1.099866 17.097911-4.599438 27.196677-22.0973 22.597239-39.195211l-39.495174-147.581969c-2.69967-10.198754 4.899401-20.097545 15.498106-20.097544H927.886633c52.993525 0 95.988272-42.994747 95.988272-95.988273V159.993002c0-52.993525-42.994747-95.988272-95.988272-95.988272zM127.984363 447.95782c0-123.684888 100.287747-223.972636 223.972636-223.972636 22.197288 0 43.694661 3.199609 63.992181 9.298864 72.291168 21.497373 129.184217 78.49041 150.68159 150.68159 5.999267 20.29752 9.298864 41.794894 9.298864 63.992182 0 123.684888-100.287747 223.972636-223.972635 223.972635S127.984363 571.642708 127.984363 447.95782z m703.913998 95.988272c17.697838 0 31.996091 14.298253 31.99609 31.996091 0 8.798925-3.59956 16.797948-9.398851 22.597239-5.799291 5.799291-13.798314 9.398852-22.597239 9.398851H687.915952c-17.697838 0-31.996091-14.298253-31.996091-31.99609 0-8.798925 3.59956-16.797948 9.398852-22.597239 5.799291-5.799291 13.798314-9.398852 22.597239-9.398852h143.982409z m-143.982409-95.988272c0-8.798925 3.59956-16.797948 9.398852-22.59724 5.799291-5.799291 13.798314-9.398852 22.597239-9.398851h111.986318c17.697838 0 31.996091 14.298253 31.99609 31.996091 0 8.798925-3.59956 16.797948-9.398851 22.597239-5.799291 5.799291-13.798314 9.398852-22.597239 9.398851H719.912043c-17.697838 0-31.996091-14.298253-31.996091-31.99609z m166.579648-105.387125c-5.799291 5.799291-13.798314 9.398852-22.597239 9.398852H687.915952c-17.697838 0-31.996091-14.298253-31.996091-31.996091 0-8.798925 3.59956-16.797948 9.398852-22.597239 5.799291-5.799291 13.798314-9.398852 22.597239-9.398851h143.982409c17.697838 0 31.996091 14.298253 31.99609 31.99609 0 8.798925-3.59956 16.797948-9.398851 22.597239z"
            p-id="3250"
            fill="#ffffff"
          ></path>
          <path
            d="M492.439835 383.965638H423.948203c-4.399462 0-7.999023-3.59956-7.999023-7.999023v-68.491632c0-2.899646 3.099621-4.899401 5.699304-3.59956 15.898058 7.699059 30.596262 18.097789 43.394698 30.996213s23.297154 27.496641 30.996213 43.394698c1.299841 2.599682-0.699914 5.699304-3.59956 5.699304z"
            p-id="3251"
            fill="#ffffff"
          ></path>
          <path
            d="M510.937575 465.555669c-3.899524 36.09559-19.897569 69.49151-45.894393 95.588322-30.196311 30.196311-70.291412 46.794283-112.986196 46.89427-41.994869 0-82.08997-16.298009-112.086305-45.694417-30.596262-29.996335-47.594185-69.991449-47.994136-112.686232-0.399951-42.894759 16.497984-84.389689 46.794283-114.685988 25.996824-25.996824 59.292756-41.894881 95.288357-45.894393 9.498839-0.999878 17.797826 6.399218 17.797826 15.898058v94.988394c0 26.496763 21.497373 47.994136 47.994136 47.994137H494.939529c9.598827 0 17.097911 8.198998 15.998046 17.597849z"
            p-id="3252"
            fill="#ffffff"
          ></path>
        </svg>
        <svg
          @click="toggleTimeSettings"
          t="1740361384513"
          class="settings-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4307"
          width="30"
          height="30"
        >
          <path
            d="M919.6 405.6l-57.2-8c-12.7-1.8-23-10.4-28-22.1-11.3-26.7-25.7-51.7-42.9-74.5-7.7-10.2-10-23.5-5.2-35.3l21.7-53.5c6.7-16.4 0.2-35.3-15.2-44.1L669.1 96.6c-15.4-8.9-34.9-5.1-45.8 8.9l-35.4 45.3c-7.9 10.2-20.7 14.9-33.5 13.3-14-1.8-28.3-2.8-42.8-2.8-14.5 0-28.8 1-42.8 2.8-12.8 1.6-25.6-3.1-33.5-13.3l-35.4-45.3c-10.9-14-30.4-17.8-45.8-8.9L230.4 168c-15.4 8.9-21.8 27.7-15.2 44.1l21.7 53.5c4.8 11.9 2.5 25.1-5.2 35.3-17.2 22.8-31.7 47.8-42.9 74.5-5 11.8-15.3 20.4-28 22.1l-57.2 8C86 408 72.9 423 72.9 440.8v142.9c0 17.7 13.1 32.7 30.6 35.2l57.2 8c12.7 1.8 23 10.4 28 22.1 11.3 26.7 25.7 51.7 42.9 74.5 7.7 10.2 10 23.5 5.2 35.3l-21.7 53.5c-6.7 16.4-0.2 35.3 15.2 44.1L354 927.8c15.4 8.9 34.9 5.1 45.8-8.9l35.4-45.3c7.9-10.2 20.7-14.9 33.5-13.3 14 1.8 28.3 2.8 42.8 2.8 14.5 0 28.8-1 42.8-2.8 12.8-1.6 25.6 3.1 33.5 13.3l35.4 45.3c10.9 14 30.4 17.8 45.8 8.9l123.7-71.4c15.4-8.9 21.8-27.7 15.2-44.1l-21.7-53.5c-4.8-11.8-2.5-25.1 5.2-35.3 17.2-22.8 31.7-47.8 42.9-74.5 5-11.8 15.3-20.4 28-22.1l57.2-8c17.6-2.5 30.6-17.5 30.6-35.2V440.8c0.2-17.8-12.9-32.8-30.5-35.2z m-408 245.5c-76.7 0-138.9-62.2-138.9-138.9s62.2-138.9 138.9-138.9 138.9 62.2 138.9 138.9-62.2 138.9-138.9 138.9z"
            fill="#ffffff"
            p-id="4308"
          ></path>
        </svg>
        <div class="model-selector">
          <svg
            @click="toggleModelSelect"
            t="1740361448610"
            class="choose-icon"
            viewBox="0 0 1069 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5400"
            width="30"
            height="30"
          >
            <path
              d="M0.002763 173.176631C1.156583 255.164091 102.72775 327.209617 155.654932 337.035326 155.654932 294.769922 155.423157 277.59307 155.383198 277.59307 155.343238 277.59307 58.445402 250.790106 58.01328 176.159267 57.620441 108.133618 69.389894 46.251969 159.102507 46.251969 237.670283 46.251969 264.366025 95.987421 288.07778 156.000856L351.434835 155.98913C318.605288 71.99768 274.333935 0 152.553883 0 33.394067 0-0.352144 91.189169 0.002763 173.176631Z"
              fill="#ffffff"
              p-id="5401"
            ></path>
            <path
              d="M537.799182 155.826087 289.394067 155.826087 345.402415 305.413864 333.915807 333.405801C333.915804 350.184548 336.704962 355.073955 333.915807 363.129159 341.39153 389.585099 365.28399 405.101434 391.136717 405.101434 421.463878 405.101434 447.348031 383.015083 447.32839 348.883053 447.316605 333.38626 430.110262 301.372581 403.7822 296.061068L383.71599 243.17655C461.592369 254.690687 496.716093 302.771785 495.682928 350.18455 494.327633 412.328061 456.355827 455.969222 390.264614 455.660457 332.053749 455.386871 289.64564 419.755435 289.39407 356.173913 289.32462 338.621471 288.12258 325.553831 295.064042 304.174901 300.74842 285.348152 266.748216 203.963603 266.748216 203.963603L247.825168 155.826087 200.212002 155.826087 200.212002 482.546321C199.214192 509.881649 237.91777 543.345343 237.91777 543.345343L716.159816 1017.965434 1065.055736 664.959023C1065.051807 664.966841 639.733015 241.359144 592.678772 194.270779 559.354251 160.936061 537.799182 155.826087 537.799182 155.826087Z"
              fill="#ffffff"
              p-id="5402"
            ></path>
            <path
              d="M155.82885 489.73913 155.82885 378.434783 89.046241 378.434783 89.046241 575.567934C89.046241 616.961768 133.371561 645.354505 133.371561 645.354505L509.047305 1021.901192 569.94126 960.441649C569.94126 960.43774 245.106722 634.883909 196.092216 586.861434 147.907654 541.432066 155.82885 489.73913 155.82885 489.73913Z"
              fill="#ffffff"
              p-id="5403"
            ></path>
          </svg>

          <div class="model-dropdown" v-if="showModelSelect">
            <div class="dropdown-header">
              <span>选择模型类型</span>
              <span class="close-btn" @click="toggleModelSelect">×</span>
            </div>
            <div class="model-options">
              <div
                v-for="model in modelTypes"
                :key="model.value"
                class="model-option"
                :class="{ selected: selectedModel === model.value }"
                @click="selectModel(model)"
              >
                <span class="model-icon">{{ model.icon }}</span>
                <span class="model-name">{{ model.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="choose-module">
        <div class="left-button">
          <ul class="ul-left">
            <li class="li-left" style="--i: 4">
              <p class="p-left">样本管理</p>
            </li>
            <li class="li-left" style="--i: 3" @click="toggleSampleInput">
              <p class="p-left">样本录入</p>
            </li>
            <li class="li-left" style="--i: 2" @click="showSampleList = true">
              <p class="p-left">样本列表展示</p>
            </li>
            <li class="li-left" style="--i: 1">
              <p class="p-left">样本详情查看</p>
            </li>
          </ul>
        </div>
        <div class="middle-module">
          <div class="middle-round">
            <div class="progress-ring">
              <svg class="progress-circle">
                <circle
                  class="progress-circle-bg"
                  cx="225"
                  cy="225"
                  r="215"
                  fill="none"
                  stroke-width="5"
                />
                <circle
                  class="progress-circle-value"
                  cx="225"
                  cy="225"
                  r="215"
                  fill="none"
                  stroke-width="5"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="dashOffset"
                />
              </svg>
            </div>
            <component
              v-if="selectedModel"
              :is="currentModelComponent"
              class="model-component"
            />
            <div v-else class="placeholder-text">请选择模型类型</div>

            <!-- 实验流程悬浮窗 -->
            <div v-if="experimentProcess.length" class="process-float">
              <h4>实验流程</h4>
              <ol>
                <li v-for="(step, index) in experimentProcess" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>

            <!-- 实验参数悬浮窗 -->
            <div v-if="experimentParams" class="params-float">
              <h4>实验参数</h4>
              <div class="param-content">{{ experimentParams }}</div>
            </div>
          </div>
        </div>
        <div class="right-button">
          <ul class="ul-right">
            <li class="li-right" style="--i: 4" @click="toggleProcessModal">
              <p class="p-right">实验流程</p>
            </li>
            <li class="li-right" style="--i: 3" @click="toggleParamsModal">
              <p class="p-right">实验参数配置</p>
            </li>
            <li
              class="li-right"
              style="--i: 2"
              @click="toggleExperimentRecords"
            >
              <p class="p-right">实验记录</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-module" v-if="showSampleList">
        <div class="sample-list">
          <h3 style="color: white">样本列表</h3>
          <table>
            <thead>
              <tr>
                <th>样本类型</th>
                <th>样本来源</th>
                <th>处理方式</th>
                <th>样本类别</th>
                <th>数据文件</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sample, index) in sampleList" :key="index">
                <td>{{ sample.type }}</td>
                <td>{{ sample.source }}</td>
                <td>{{ sample.process }}</td>
                <td>{{ getCategoryName(sample.category) }}</td>
                <td>{{ sample.fileName || "无" }}</td>
                <td>
                  <button
                    style="background-color: black"
                    @click="deleteSample(index)"
                  >
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 添加时间设置弹窗 -->
    <div
      class="time-settings-modal"
      v-if="showTimeSettings"
      @click.self="toggleTimeSettings"
    >
      <div class="settings-content">
        <h3>时间设置</h3>
        <div class="time-inputs">
          <div class="input-group">
            <label>开始时间</label>
            <input type="date" v-model="startDate" />
          </div>
          <div class="input-group">
            <label>结束时间</label>
            <input type="date" v-model="endDate" />
          </div>
        </div>
        <div class="settings-buttons">
          <button @click="saveTimeSettings">确定</button>
          <button @click="toggleTimeSettings">取消</button>
        </div>
      </div>
    </div>

    <!-- 样本录入弹窗 -->
    <div
      class="sample-input-modal"
      v-if="showSampleInput"
      @click.self="toggleSampleInput"
    >
      <div class="input-content">
        <h3 style="color: white">样本录入</h3>
        <div class="sample-form">
          <div class="form-group">
            <label>样本类型</label>
            <input type="text" v-model="currentSample.type" disabled />
          </div>
          <div class="form-group">
            <label>样本来源</label>
            <input
              type="text"
              v-model="currentSample.source"
              placeholder="请输入样本来源"
            />
          </div>
          <div class="form-group">
            <label>处理方式</label>
            <input
              type="text"
              v-model="currentSample.process"
              placeholder="请输入处理方式"
            />
          </div>
          <div class="form-group">
            <label>样本类别</label>
            <select v-model="currentSample.category">
              <option value="experimental">实验组</option>
              <option value="control">对照组</option>
              <option value="negative">阴性对照</option>
              <option value="positive">阳性对照</option>
            </select>
          </div>
          <div class="form-group">
            <label>实验数据</label>
            <input type="file" @change="handleFileUpload" />
          </div>
        </div>
        <div class="form-buttons">
          <button @click="saveSample">保存</button>
          <button @click="toggleSampleInput">取消</button>
        </div>
      </div>
    </div>

    <!-- 实验流程弹窗 -->
    <div
      class="process-modal"
      v-if="showProcessModal"
      @click.self="toggleProcessModal"
    >
      <div class="modal-content">
        <h3>实验流程设置</h3>
        <div class="process-steps">
          <div
            v-for="(step, index) in tempProcess"
            :key="index"
            class="step-input"
          >
            <input
              type="text"
              v-model="tempProcess[index]"
              :placeholder="`步骤 ${index + 1}`"
            />
            <button @click="removeStep(index)">×</button>
          </div>
          <button class="add-step" @click="addStep">添加步骤</button>
        </div>
        <div class="modal-buttons">
          <button @click="saveProcess">保存</button>
          <button @click="toggleProcessModal">取消</button>
        </div>
      </div>
    </div>

    <!-- 实验参数弹窗 -->
    <div
      class="params-modal"
      v-if="showParamsModal"
      @click.self="toggleParamsModal"
    >
      <div class="modal-content">
        <h3>实验参数配置</h3>
        <div class="params-form">
          <textarea
            v-model="tempParams"
            placeholder="请输入实验参数..."
            class="params-textarea"
          ></textarea>
        </div>
        <div class="modal-buttons">
          <button @click="saveParams">保存</button>
          <button @click="toggleParamsModal">取消</button>
        </div>
      </div>
    </div>

    <!-- 修改实验记录列表，让整行可点击进入详情，但删除按钮只删除 -->
    <div
      class="bottom-module experiment-records"
      v-if="showExperimentRecords && !showRecordDetail"
    >
      <div class="records-list">
        <div class="records-header">
          <h3 style="color: white">实验记录</h3>
          <button class="add-record-btn" @click="showAddRecordModal = true">
            新增记录
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>描述</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in experimentRecords"
              :key="index"
              @click="openRecordDetail(index)"
              class="record-row"
            >
              <td>{{ record.name }}</td>
              <td>{{ record.description }}</td>
              <td>{{ record.createdAt }}</td>
              <td>
                <button @click.stop="deleteRecord(index)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 新增实验记录详情编辑界面 -->
    <div class="record-detail" v-if="showRecordDetail">
      <div class="record-detail-header">
        <button class="back-btn" @click="closeRecordDetail">
          <span>←</span> 返回列表
        </button>
        <h2>{{ currentRecord.name }}</h2>
        <div class="record-actions">
          <button class="save-btn" @click="saveRecordDetail">保存</button>
        </div>
      </div>

      <div class="record-detail-content">
        <div class="record-info">
          <div class="info-item">
            <label>实验记录名称</label>
            <input type="text" v-model="currentRecord.name" />
          </div>
          <div class="info-item">
            <label>创建时间</label>
            <div class="info-value">{{ currentRecord.createdAt }}</div>
          </div>
        </div>

        <div class="record-editor">
          <div class="editor-header">
            <h3>实验记录内容</h3>
          </div>
          <div class="editor-toolbar">
            <button class="toolbar-btn">正文</button>
            <button class="toolbar-btn">B</button>
            <button class="toolbar-btn">I</button>
            <button class="toolbar-btn">U</button>
            <button class="toolbar-btn">从模板库选择 ></button>
          </div>
          <div class="editor-content">
            <textarea
              v-model="currentRecord.content"
              placeholder="请输入实验记录内容..."
              class="content-textarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增实验记录模态框 -->
    <div
      class="record-modal"
      v-if="showAddRecordModal"
      @click.self="showAddRecordModal = false"
    >
      <div class="modal-content">
        <h3>{{ isEditingRecord ? "编辑实验记录" : "新增实验记录" }}</h3>
        <div class="record-form">
          <div class="form-group">
            <label>名称</label>
            <input
              type="text"
              v-model="currentRecord.name"
              placeholder="请输入实验记录名称"
            />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea
              v-model="currentRecord.description"
              placeholder="请输入实验记录描述..."
              class="record-textarea"
            ></textarea>
          </div>
        </div>
        <div class="modal-buttons">
          <button @click="saveRecord">保存</button>
          <button @click="showAddRecordModal = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MouseModel from "../mouse.vue";
import CellModel from "../cell.vue";
import TissueModel from "../tissue.vue";
import MonkeyModel from "../monkey.vue";
import DogModel from "../dog.vue";
import RabbitModel from "../rabbit.vue";

export default {
  components: {
    MouseModel,
    CellModel,
    TissueModel,
    MonkeyModel,
    DogModel,
    RabbitModel,
  },
  data() {
    return {
      showModelSelect: false,
      selectedModel: null,
      modelTypes: [
        { label: "小鼠", value: "mouse", icon: "🐭" },
        { label: "细胞", value: "cell", icon: "🔬" },
        { label: "组织", value: "tissue", icon: "🧬" },
        { label: "猴子", value: "monkey", icon: "🐒" },
        { label: "狗", value: "dog", icon: "🐕" },
        { label: "兔子", value: "rabbit", icon: "🐰" },
      ],
      showTimeSettings: false,
      startDate: null,
      endDate: null,
      circumference: 2 * Math.PI * 215, // 更新圆周长计算
      showSampleInput: false,
      showSampleList: false,
      currentSample: {
        type: "",
        source: "",
        process: "",
        category: "experimental",
        file: null,
        fileName: "",
      },
      sampleList: [],
      showProcessModal: false,
      showParamsModal: false,
      experimentProcess: [],
      experimentParams: null,
      tempProcess: [""],
      tempParams: "",
      showExperimentRecords: false,
      showAddRecordModal: false,
      isEditingRecord: false,
      currentRecordIndex: -1,
      currentRecord: {
        name: "",
        description: "",
        createdAt: "",
        content: "", // 新增内容字段
      },
      showRecordDetail: false,
      experimentRecords: [
        {
          name: "小鼠肿瘤模型实验",
          description: "使用BALB/c小鼠建立肿瘤模型，观察药物抑制效果",
          createdAt: "2023-10-15 14:30",
          content:
            "# 实验目的\n\n建立小鼠肿瘤模型，评估新型抗肿瘤药物的疗效。\n\n# 实验材料\n\n- BALB/c小鼠，6-8周龄，雌性\n- 肿瘤细胞系：4T1\n- 实验药物：化合物A，10mg/kg\n\n# 实验方法\n\n1. 小鼠适应性饲养7天\n2. 皮下注射4T1细胞(1×10^6个/只)\n3. 肿瘤体积达到100mm³时分组给药\n4. 每3天测量一次肿瘤体积\n5. 实验结束后处死小鼠，取肿瘤组织进行病理学分析",
        },
        {
          name: "细胞毒性测试",
          description: "使用MTT法测定药物对HepG2细胞的毒性",
          createdAt: "2023-10-10 09:15",
          content:
            "# 实验目的\n\n评估新型化合物对HepG2肝癌细胞的细胞毒性作用。\n\n# 实验材料\n\n- HepG2细胞\n- DMEM培养基\n- MTT试剂\n- 96孔板\n\n# 实验方法\n\n1. 细胞以5×10^3个/孔的密度接种于96孔板\n2. 培养24小时后加入不同浓度的药物\n3. 继续培养48小时\n4. 加入MTT溶液，孵育4小时\n5. 加入DMSO溶解甲臒\n6. 酶标仪测定490nm吸光度",
        },
      ],
    };
  },
  computed: {
    currentModelComponent() {
      const componentMap = {
        mouse: "MouseModel",
        cell: "CellModel",
        tissue: "TissueModel",
        monkey: "MonkeyModel",
        dog: "DogModel",
        rabbit: "RabbitModel",
      };
      return componentMap[this.selectedModel];
    },
    progress() {
      if (!this.startDate || !this.endDate) return 0;

      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const today = new Date();

      const totalDays = (end - start) / (1000 * 60 * 60 * 24);
      const passedDays = (today - start) / (1000 * 60 * 60 * 24);

      return Math.min(Math.max(passedDays / totalDays, 0), 1);
    },
    dashOffset() {
      return this.circumference * (1 - this.progress);
    },
  },
  methods: {
    toggleModelSelect() {
      this.showModelSelect = !this.showModelSelect;
    },
    selectModel(model) {
      this.selectedModel = model.value;
      this.showModelSelect = false;
      this.$emit("model-change", model.value);
    },
    toggleTimeSettings() {
      this.showTimeSettings = !this.showTimeSettings;
    },
    saveTimeSettings() {
      if (!this.startDate || !this.endDate) {
        alert("请设置开始和结束时间");
        return;
      }
      if (new Date(this.endDate) <= new Date(this.startDate)) {
        alert("结束时间必须晚于开始时间");
        return;
      }
      this.showTimeSettings = false;
    },
    toggleSampleInput() {
      this.showSampleInput = !this.showSampleInput;
      if (this.showSampleInput) {
        this.currentSample.type = this.selectedModel || "";
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.currentSample.file = file;
      this.currentSample.fileName = file.name;
    },
    saveSample() {
      if (!this.currentSample.source || !this.currentSample.process) {
        alert("请填写完整信息");
        return;
      }
      this.sampleList.push({ ...this.currentSample });
      this.showSampleInput = false;
      this.resetSampleForm();
    },
    resetSampleForm() {
      this.currentSample = {
        type: "",
        source: "",
        process: "",
        category: "experimental",
        file: null,
        fileName: "",
      };
    },
    deleteSample(index) {
      this.sampleList.splice(index, 1);
    },
    getCategoryName(category) {
      const categoryMap = {
        experimental: "实验组",
        control: "对照组",
        negative: "阴性对照",
        positive: "阳性对照",
      };
      return categoryMap[category] || category;
    },
    toggleProcessModal() {
      this.showProcessModal = !this.showProcessModal;
      if (this.showProcessModal) {
        this.tempProcess = this.experimentProcess.length
          ? [...this.experimentProcess]
          : [""];
      }
    },
    toggleParamsModal() {
      this.showParamsModal = !this.showParamsModal;
      if (this.showParamsModal && this.experimentParams) {
        this.tempParams = this.experimentParams;
      }
    },
    addStep() {
      this.tempProcess.push("");
    },
    removeStep(index) {
      this.tempProcess.splice(index, 1);
    },
    saveProcess() {
      this.experimentProcess = this.tempProcess.filter((step) => step.trim());
      this.showProcessModal = false;
    },
    saveParams() {
      if (!this.tempParams.trim()) {
        alert("请输入实验参数");
        return;
      }
      this.experimentParams = this.tempParams;
      this.showParamsModal = false;
    },
    toggleExperimentRecords() {
      this.showExperimentRecords = !this.showExperimentRecords;
      // 关闭其他可能打开的列表和详情页
      if (this.showExperimentRecords) {
        this.showSampleList = false;
        this.showRecordDetail = false;
      }
    },
    openRecordDetail(index) {
      this.currentRecordIndex = index;
      this.currentRecord = JSON.parse(
        JSON.stringify(this.experimentRecords[index])
      );
      this.showRecordDetail = true;
    },
    closeRecordDetail() {
      if (this.hasUnsavedChanges()) {
        if (confirm("您有未保存的更改，确定要离开吗？")) {
          this.showRecordDetail = false;
        }
      } else {
        this.showRecordDetail = false;
      }
    },
    hasUnsavedChanges() {
      const original = this.experimentRecords[this.currentRecordIndex];
      return (
        original.name !== this.currentRecord.name ||
        original.content !== this.currentRecord.content
      );
    },
    saveRecordDetail() {
      if (!this.currentRecord.name.trim()) {
        alert("请输入实验记录名称");
        return;
      }

      this.experimentRecords[this.currentRecordIndex] = {
        ...this.currentRecord,
      };

      alert("保存成功");
    },
    deleteRecord(index) {
      if (confirm("确定要删除这条实验记录吗？")) {
        this.experimentRecords.splice(index, 1);
      }
    },
    saveRecord() {
      if (!this.currentRecord.name) {
        alert("请输入实验记录名称");
        return;
      }

      if (this.isEditingRecord) {
        // 更新现有记录
        this.experimentRecords[this.currentRecordIndex] = {
          ...this.currentRecord,
        };
      } else {
        // 添加新记录
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
          now.getHours()
        ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

        this.experimentRecords.push({
          ...this.currentRecord,
          createdAt: formattedDate,
        });
      }

      // 重置表单并关闭模态框
      this.resetRecordForm();
      this.showAddRecordModal = false;
    },
    resetRecordForm() {
      this.currentRecord = {
        name: "",
        description: "",
        createdAt: "",
        content: "",
      };
      this.isEditingRecord = false;
      this.currentRecordIndex = -1;
    },
  },
};
</script>

<style scoped>
.nav-container {
  display: flex;
  flex-direction: column;
}
.choose-module {
  display: flex;
}
.choose-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
.information-icon,
.settings-icon,
.choose-icon {
  cursor: pointer;
}
.left-button,
.right-button {
  width: 20%;
  height: 500px;
  display: flex;
  justify-items: center;
  align-items: center;
}
.middle-module {
  width: 60%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.ul-left {
  position: relative;
  transform: skewY(-10deg);
  transition: 0.5s;
}
.ul-left .li-left {
  position: relative;
  list-style: none;
  width: 110px;
  background-color: white;
  padding: 5px;
  z-index: var(--i);
  transition: 0.5s;
}
.ul-left .li-left::before {
  content: "";
  position: absolute;
  top: 0;
  background: rgb(255, 255, 255);
  width: 6px;
  left: -6px;
  height: 100%;
  transform-origin: right;
  transform: skewY(60deg);
  transition: 0.5s;
}
.ul-left .li-left:hover::before {
  background: rgb(23, 23, 23);
}
.ul-left .li-left::after {
  content: "";
  position: absolute;
  width: 100%;
  background: rgb(255, 255, 255);
  height: 10px;
  top: -10px;
  left: -3px;
  transform-origin: buttom;
  transform: skewX(30deg);
  transition: 0.5s;
}
.ul-left .li-left:hover::after {
  background: rgb(35, 35, 35);
}
.ul-left .li-left:hover {
  background: black;
  transform: translateX(50px);
}
.ul-left .li-left .p-left {
  text-decoration: none;
  cursor: pointer;
  color: #999;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: 0.5s;
  font-family: "SourceHan";
  font-weight: bold;
}
.ul-left .li-left:hover .p-left {
  color: rgb(255, 255, 255);
}
.ul-right {
  position: relative;
  transform: skewY(10deg);
  transition: 0.5s;
}
.ul-right .li-right {
  position: relative;
  list-style: none;
  width: 110px;
  background-color: white;
  padding: 5px;
  z-index: var(--i);
  transition: 0.5s;
}
.ul-right .li-right::before {
  content: "";
  position: absolute;
  top: -10px;
  background: rgb(255, 255, 255);
  width: 6px;
  right: -6px;
  height: 100%;
  transform-origin: right;
  transform: skewY(-60deg);
  transition: 0.5s;
}
.ul-right .li-right:hover::before {
  background: rgb(23, 23, 23);
}
.ul-right .li-right::after {
  content: "";
  position: absolute;
  width: 100%;
  background: rgb(255, 255, 255);
  height: 10px;
  top: -10px;
  right: -3px;
  transform-origin: buttom;
  transform: skewX(-30deg);
  transition: 0.5s;
}
.ul-right .li-right:hover::after {
  background: rgb(35, 35, 35);
}
.ul-right .li-right:hover {
  background: black;
  transform: translateX(-50px);
}
.ul-right .li-right .p-right {
  text-decoration: none;
  cursor: pointer;
  color: #999;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: 0.5s;
  font-family: "SourceHan";
  font-weight: bold;
}
.ul-right .li-right:hover .p-right {
  color: rgb(255, 255, 255);
}

.model-selector {
  position: relative;
}

.model-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  margin-top: 10px;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #333333;
  color: white;
  border-bottom: 1px solid #444444;
}

.close-btn {
  cursor: pointer;
  font-size: 18px;
  padding: 0 5px;
}

.close-btn:hover {
  color: #cccccc;
}

.model-options {
  max-height: 300px;
  overflow-y: auto;
}

.model-option {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;
}

.model-option:hover {
  background-color: #444444;
}

.model-option.selected {
  background-color: #535353;
}

.model-icon {
  margin-right: 10px;
  font-size: 18px;
}

.model-name {
  font-size: 14px;
}

.model-options::-webkit-scrollbar {
  width: 6px;
}

.model-options::-webkit-scrollbar-track {
  background: #2c2c2c;
}

.model-options::-webkit-scrollbar-thumb {
  background: #444444;
  border-radius: 3px;
}

.model-options::-webkit-scrollbar-thumb:hover {
  background: #555555;
}

.middle-round {
  width: 450px;
  height: 450px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.model-component {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  text-align: center;
}

.model-component {
  transition: all 0.3s ease;
}

.model-component-enter-active,
.model-component-leave-active {
  transition: opacity 0.3s ease;
}

.model-component-enter-from,
.model-component-leave-to {
  opacity: 0;
}

.time-settings-modal {
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

.settings-content {
  background-color: #333333;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.time-inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  color: white;
  font-size: 14px;
}

.input-group input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444444;
  background-color: #2c2c2c;
  color: white;
}

.settings-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.settings-buttons button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #444444;
  color: white;
  cursor: pointer;
}

.settings-buttons button:hover {
  background-color: #555555;
}

.progress-ring {
  position: absolute;
  width: 450px;
  height: 450px;
  top: 0;
  left: 0;
}

.progress-circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle-bg,
.progress-circle-value {
  cx: 225;
  cy: 225;
  r: 215;
  stroke-width: 5;
}

.progress-circle-bg {
  stroke: rgba(255, 255, 255, 0.1);
}

.progress-circle-value {
  stroke: white;
  transition: stroke-dashoffset 0.3s;
}

.sample-input-modal {
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

.input-content {
  background-color: #333333;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.sample-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  color: white;
  font-size: 14px;
}

.form-group input,
.form-group select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444444;
  background-color: #2c2c2c;
  color: white;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-buttons button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #444444;
  color: white;
  cursor: pointer;
}

.bottom-module {
  padding: 20px;
}

.sample-list {
  background-color: #333333;
  border-radius: 8px;
  padding: 20px;
}

.sample-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.sample-list th,
.sample-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #444444;
  color: white;
}

.sample-list th {
  background-color: #2c2c2c;
}

.sample-list tr:hover {
  background-color: #3c3c3c;
}

.sample-list button {
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  background-color: #ff4444;
  color: white;
  cursor: pointer;
}

.sample-list button:hover {
  background-color: #ff6666;
}

.process-float {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 8px;
  max-width: 200px;
  color: white;
  z-index: 2;
}

.params-float {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 8px;
  max-width: 200px;
  color: white;
  z-index: 2;
}

.process-float h4,
.params-float h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

.process-float ol {
  margin: 0;
  padding-left: 20px;
}

.process-float li {
  font-size: 12px;
  margin-bottom: 5px;
}

.param-content {
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
}

.process-modal,
.params-modal {
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

.modal-content {
  background-color: #333333;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  color: white;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}

.step-input {
  display: flex;
  gap: 10px;
}

.step-input input {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444444;
  background-color: #2c2c2c;
  color: white;
}

.add-step {
  padding: 8px;
  background-color: #444444;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.params-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.params-textarea {
  width: auto;
  height: 200px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #444444;
  background-color: #2c2c2c;
  color: white;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

.params-textarea::placeholder {
  color: #666666;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-buttons button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #444444;
  color: white;
  cursor: pointer;
}

.modal-buttons button:hover {
  background-color: #555555;
}

.experiment-records {
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.records-list {
  background-color: #333333;
  border-radius: 8px;
  padding: 20px;
}

.records-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.add-record-btn {
  padding: 6px 12px;
  background-color: #444444;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.add-record-btn:hover {
  background-color: #555555;
}

.records-list table {
  width: 100%;
  border-collapse: collapse;
}

.records-list th,
.records-list td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #444444;
  color: white;
}

.records-list th {
  background-color: #2c2c2c;
}

.records-list tbody tr {
  cursor: pointer;
  transition: background-color 0.2s;
}

.records-list tr:hover {
  background-color: #3c3c3c;
}

.record-modal {
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

.record-textarea {
  width: auto;
  height: 120px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #444444;
  background-color: #2c2c2c;
  color: white;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

.record-row {
  cursor: pointer;
}

.record-detail {
  background-color: #333333;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  color: white;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.record-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #444444;
  padding-bottom: 15px;
}

.back-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #cccccc;
  cursor: pointer;
  font-size: 14px;
}

.back-btn span {
  margin-right: 5px;
  font-size: 18px;
}

.back-btn:hover {
  color: white;
}

.record-actions {
  display: flex;
  gap: 10px;
}

.save-btn {
  padding: 8px 16px;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #45a049;
}

.record-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item label {
  font-size: 12px;
  color: #cccccc;
}

.info-item input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444444;
  background-color: #2c2c2c;
  color: white;
}

.info-value {
  padding: 8px;
  color: #cccccc;
}

.record-editor {
  border: 1px solid #444444;
  border-radius: 4px;
  overflow: hidden;
}

.editor-header {
  background-color: #2c2c2c;
  padding: 10px 15px;
  border-bottom: 1px solid #444444;
}

.editor-header h3 {
  margin: 0;
  font-size: 16px;
}

.editor-toolbar {
  display: flex;
  padding: 10px;
  background-color: #2c2c2c;
  border-bottom: 1px solid #444444;
  gap: 5px;
}

.toolbar-btn {
  padding: 5px 10px;
  background-color: #333333;
  border: 1px solid #444444;
  border-radius: 3px;
  color: white;
  cursor: pointer;
}

.toolbar-btn:hover {
  background-color: #444444;
}

.editor-content {
  padding: 15px;
  min-height: 400px;
}

.content-textarea {
  width: 100%;
  min-height: 400px;
  padding: 10px;
  border: none;
  background-color: #333333;
  color: white;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
}

.content-textarea:focus {
  outline: none;
}
</style>
