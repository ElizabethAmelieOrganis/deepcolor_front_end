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
let messageCount = 0;
let timeoutIds = [];

const responses = [
  "您好！我是Protocol Agent，很高兴为您服务。我可以帮助您设计各种实验过程，满足您的需求。请输入您需要进行的实验",
  "好的，已收到您的实验，现在请输入相关需求：",
  "已收到您的需求。\n搜索引擎智能体启动中......",
  "正在为您检索有关Hi-C的最新文献......",
  "Protocol Exchange ...",
  "Bio-protocol ...",
  "Current Protocol ...",
  "在为您在Current Protocol找到最可能符合的文献https://currentprotocols.onlinelibrary.wiley.com/doi/10.1002/cpz1.198 ",
  "Hi-C 3.0: Improved Protocol for Genome-Wide Chromosome Conformation Capture",
  "Hi-C 3.0：全基因组染色体构象捕获的改良实验方案",
  "选择检索更多或基于本文章为您设计protocol:检索or继续",
  "Basic Protocol 1核构象的固定：该protocol是在邻位连接之前用于捕获染色体构象的方法。在适当培养基中生长的细胞依次与甲醛和戊二酸二琥珀酰亚胺酯 （DSG） 交联。甲醛与蛋白质和DNA的氨基和亚氨基反应，可以在2-Å半径内有效地产生交联，使其适合捕获近端相互作用。另一方面，DSG中的NHS酯与蛋白质上的伯胺反应，可以在8 Å内捕获胺-胺相互作用（。与单独使用甲醛相比，使用 DSG 和甲醛的组合已被证明可以更好地保持染色质接触并提高各种分辨率的数据质量（。交联后，细胞通常被快速冷冻以在 −80°C 下储存。但是，文章注意到使用新固定的单元格可能会提高数据质量。这可能是由于样品的冷冻和解冻造成的。",
  "Materials 材料:\n- Cells growing in appropriate growth medium细胞在适当的生长培养基中生长\n- HBSS (Gibco, cat. no. 14025-092) HBSS（Gibco，货号 14025-092）\n- DPBS (Gibco, cat. no. 14190-144) DPBS（Gibco，货号 14190-144）\n- 37% formaldehyde (Fisher, cat. no. BP531-500)37% 甲醛（Fisher，货号。BP531-500）\n- 2.5 M glycine in Milli-Q water (Sigma, cat. no. G8898-1KG)2.5 M 甘氨酸的 Milli-Q 水溶液（Sigma，货号 G8898-1KG）\n- DSG (ThermoScientific, cat. no. 20593)DSG（ThermoScientific，货号 20593）\n- DMSO (Sigma, cat. no. D2650-5 × 10ML)DMSO（Sigma，货号 D2650-5 × 10 ML）\n- 0.05% (w/v) BSA in DPBS 0.05% （w/v） BSA 的 DPBS 溶液\n- 150 × 25-mm culture plates (Corning, cat. no. 430599; for monolayer cells) or 175-cm(2) culture flask (Falcon, cat. no. 353112; for suspension cells)150 × 25 mm 培养板（Corning，货号 430599;用于单层细胞）或 175 cm2 培养瓶（Falcon，货号 353112;用于悬浮细胞）\n- CO(2) incubator (Cell Culture) CO2 培养箱（细胞培养）\n- 50-ml conical tubes 50 毫升锥形管\n- Ice bucket 冰桶\n- Cell scraper (Falcon, cat. no. 353089)细胞刮刀（Falcon，货号 353089）\n- Tabletop centrifuge 台式离心机\n- Rotator (Argos Technologies, cat. no. EW-04397-40) or rocking platformRotator （Argos Technologies，货号。EW-04397-40） 或摇摆平台\n- Hemocytometer 血球计数器\n- 1.7-ml microcentrifuge tubes (Axygen, MCT-175-C)1.7 ml 微量离心管（Axygen，MCT-175-C）\n- Liquid nitrogen 液氮",
  "Starting from cells in monolayer 从单层细胞开始\nCross-linking with formaldehyde 与甲醛交联\n1a. The day before the experiment, seed cells in 150-mm plates in appropriate medium to have 5 × 10(6) cells per plate for harvest the next day, and incubate overnight.1a.实验前一天，将细胞接种在 150 mm 平板中的适当培养基中，使每板有 5 × 106 个细胞，以便在第二天收获，并孵育过夜。\n2a. Aspirate medium from the plate and wash twice with ∼10 ml HBSS.2a.从板中吸出培养基，并用 ∼10 ml HBSS 洗涤两次\n3a. Immediately before cross-linking, prepare a 1% formaldehyde cross-linking solution in a 50-ml tube by combining 22.5 ml HBSS and 625 µl of 37% formaldehyde. Mix well.3a.在交联之前，通过混合 22.5 ml HBSS 和 625 μl 37% 甲醛，在 50 ml 试管中制备 1% 甲醛交联溶液。搅拌均匀。\n4a. Pour the 1% formaldehyde solution (∼23.125 ml) into each 150-mm plate.4a.将 1% 甲醛溶液 （∼23.125 ml） 倒入每个 150 毫米板中。\n5a. Incubate exactly 10 min at room temperature, gently rocking the plates by hand every 2 min.5a.在室温下孵育 10 分钟，每 2 分钟用手轻轻摇动板。",
  "6a. To quench the cross-linking reaction, add 1.25 ml of 2.5 M glycine (to 128 mM final) and mix well by gently swirling the plate.6a.为了淬灭交联反应，加入 1.25 ml 2.5 M 甘氨酸（至最终浓度为 128 mM），并通过轻轻旋转板充分混合。\n7a. Incubate the plates 5 min at room temperature, and then place on ice for at least 15 min to stop the cross-linking completely.7a.将板在室温下孵育 5 分钟，然后置于冰上至少 15 分钟以完全停止交联。\n8a. Scrape the cells from the plates with a cell scraper\n9a. Using a pipet, transfer the cell suspension to a 50-ml conical tube and centrifuge 10 min at 1000 × g, room temperature.9a.使用移液管将细胞悬液转移到 50 ml 锥形管中，并在室温下以 1000 × g 离心 10 分钟。\n10a. Wash the cell pellet once with 10 ml DPBS, pipetting to resuspend, and centrifuge 10 min at 1000 × g, room temperature. Aspirate and discard the supernatant. Proceed immediately to DSG cross-linking ",
  "Basic Protocol 2: CHROMOSOME CONFORMATON CAPTURE基本方案 2：染色体一致性捕获",
  "This protocol describes the steps that follow cross-linking of cells up until DNA purification of proximity-ligated chromatin fragments. Cross-linked cells obtained in Basic Protocol 1 are first lysed and mechanically disrupted before being subjected to restriction enzyme digestion. The use of both DpnII and DdeI restriction enzymes yields a fragment length distribution that allows high-quality data analysis of genomic structures, ranging from loops to chromosome domains. The filled-in overhangs are then ligated to fragments that are in close 3D proximity. After reversal of cross-linking, DNA is purified using a protocol adapted from Moore & Dowhan (2002) and the resulting sample is treated with RNase. Quality control of the conformation capture process marks the final step of this protocol. Here, the quality of the input chromatin is assessed, as well as the extent to which chromatin is restriction-digested and ligated. Using gel electrophoresis, both controls are compared to the proximity-ligated material (Hi-C sample). Purified proximity-ligated samples can then be stored at −20°C before continuing with Basic Protocol ",
  "该方案描述了细胞交联后直到 DNA 纯化邻近连接的染色质片段的步骤。在进行限制性内切酶消化之前，首先对 Basic Protocol 1 中获得的交联细胞进行裂解和机械破碎。同时使用 DpnII 和 DdeI 限制性内切酶可产生片段长度分布，从而能够对基因组结构（从环到染色体结构域）进行高质量的数据分析。然后将填充的突出端连接到非常接近的 3D 片段上。在逆转交联后，使用改编自Moore&Dowhan （2002）的方案纯化DNA，并将所得样品用RNase处理。构象捕获过程的质量控制标志着该协议的最后一步。在这里，评估了输入染色质的质量，以及染色质被限制性消化和连接的程度。使用凝胶电泳，将两个对照与邻位连接材料（Hi-C 样品）进行比较。纯化的邻位连接样品可储存在 −20°C 下，然后继续执行基本方案 3。",
  "Biotinylation of DNA ends DNA 末端的生物素化",
  "22. After the overnight restriction enzyme digestion is complete, incubate the Hi-C samples 20 min at 65°C to deactivate the endonuclease enzymes.15. 过夜限制性内切酶消化完成后，将 Hi-C 样品在 65°C 下孵育 20 分钟，以使核酸内切酶失活。",
  "23. During the incubation, prepare the biotin fill-in master mix as described below (amount per reaction given):16. 在孵育过程中，如下所述制备生物素填充预混液（给定每个反应的量）：",
  "Ligation of proximal DNA fragments 连接近端 DNA 片段",
  "28. During the biotin fill-in incubation (step 20), prepare the ligation mix as described below (amount per reaction given):21. 在生物素填充孵育期间（步骤 20），如下所述制备连接混合物（给定每个反应的量）：",
  "29. Add 665 µl of ligation mix to each Hi-C sample (to 1200 µl total sample volume) and mix gently by pipetting.22. 向每个 Hi-C 样品中加入 665 μl 连接混合物（至总样品体积为 1200 μl），并通过移液轻轻混匀。",
  "30. Incubate the Hi-C samples 4 hr at 16°C in a Thermomixer with interval shaking (900 rpm, 30 s on, 4 min off).23. 将 Hi-C 样品在 16°C 下在热混合器中孵育 4 小时，间隔振荡（900 rpm，30 秒开启，4 分钟关闭）。",
  "Reversal of cross-linking 交联的逆转",
  "31. Bring the volumes of both the CI and DC samples (stored at 4°C in steps 9 and 18, respectively) to 50 µl each with TLE.24. 用 TLE 将 CI 和 DC 样品（分别在 4°C 下储存在步骤 9 和 18）的体积各达到 50 μl。",
  "32. To each CI and DC sample, add 10 µl of 10 mg/ml proteinase K and incubate overnight at 65°C with interval shaking (900 rpm, 30 s on, 4 min off). Then keep at room temperature.25. 向每个 CI 和 DC 样品中加入 10 μl 10 mg/ml 蛋白酶 K，并在 65°C 下孵育过夜，间隔振荡（900 rpm，30 秒开启，4 分钟关闭）。然后在室温下保存。",
  "Alternatively, as it is only necessary to reverse-cross-link control samples for 30 min, this step can be executed between incubations at the DNA purification step (see next section).或者，由于只需要反向交联对照样品 30 分钟，因此可以在 DNA 纯化步骤的孵育之间执行此步骤（参见下一节）。",
  "33. To each Hi-C sample (from step 23), add 50 µl of 10 mg/ml proteinase K and incubate 2 hr at 65°C with interval shaking (900 rpm, 30 s on, 4 min off).26. 向每个 Hi-C 样品（来自步骤 23）中加入 50 μl 10 mg/ml 蛋白酶 K，并在 65°C 下孵育 2 小时，间隔振荡（900 rpm，30 秒开启，4 分钟关闭）。",
  "34. Add another 50 µl of 10 mg/ml proteinase K to each Hi-C sample and continue incubating overnight at 65°C.27. 向每个 Hi-C 样品中再添加 50 μl 10 mg/ml 蛋白酶 K，并继续在 65°C 下孵育过夜。",
  "DNA purification DNA 纯化",
  "35. Remove the Hi-C samples from 65°C and allow tubes to reach room temperature.28. 从 65°C 中取出 Hi-C 样品，让试管达到室温。",
  "36. Transfer each sample to an individual 15-ml conical tube and add 2 vol (2.6 ml) phenol/chloroform/isoamyl alcohol to each.29. 将每个样品转移到单独的 15 mL 锥形管中，并向每个样品中加入 2 体积 （2.6 mL） 苯酚/氯仿/异戊醇。",
  "37. Vortex each Hi-C sample for 1 min and then slowly pour contents into a 15-ml phase-lock tube.30. 将每个 Hi-C 样品涡旋 1 分钟，然后缓慢倒入 15 mL 锁相管中。",
  "38. Centrifuge the Hi-C samples in 15-ml tubes for 5 min at 1500-3500 × g in a benchtop centrifuge.31. 在台式离心机中以 1500-3500 × g 离心 15 mL 试管中的 Hi-C 样品 5 分钟。",
  "Unless otherwise indicated, all centrifugation steps are performed at room temperature.除非另有说明，否则所有离心步骤均在室温下进行。",
];

const autoResponses = [
  { delay: 2000, text: responses[3] },
  { delay: 2000, text: responses[4] },
  { delay: 2000, text: responses[5] },
  { delay: 2000, text: responses[6] },
  { delay: 2000, text: responses[7] },
  { delay: 2000, text: responses[8] },
  { delay: 2000, text: responses[9] },
  { delay: 2000, text: responses[10] },
];
const autoResponses1 = [
  { delay: 4000, text: responses[12] },
  { delay: 4000, text: responses[13] },
  { delay: 4000, text: responses[14] },
  { delay: 5000, text: responses[15] },
  { delay: 1000, text: responses[16] },
  { delay: 1000, text: responses[17] },
  { delay: 1000, text: responses[18] },
  { delay: 1000, text: responses[19] },
  { delay: 1000, text: responses[20] },
  { delay: 1000, text: responses[21] },
  { delay: 1000, text: responses[22] },
  { delay: 1000, text: responses[23] },
  { delay: 1000, text: responses[24] },
  { delay: 1000, text: responses[25] },
  { delay: 1000, text: responses[26] },
  { delay: 1000, text: responses[27] },
  { delay: 1000, text: responses[28] },
  { delay: 1000, text: responses[29] },
  { delay: 1000, text: responses[30] },
  { delay: 1000, text: responses[31] },
  { delay: 1000, text: responses[32] },
  { delay: 1000, text: responses[33] },
  { delay: 1000, text: responses[34] },
];

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

const sendMessage = () => {
  if (newMessage.value.trim()) {
    // 添加用户消息
    messages.value.push({
      text: newMessage.value,
      isUser: true,
    });

    // 清空输入框
    newMessage.value = "";

    // 模拟回复延迟
    if (!isPaused.value) {
      const timeoutId = setTimeout(() => {
        if (messageCount < 3 || (messageCount >= 11 && messageCount < 12)) {
          messages.value.push({
            text: responses[messageCount],
            isUser: false,
          });
          messageCount++;
        }

        // 如果已经发送了3条消息，开始自动输出后续回复
        if (messageCount >= 3 && messageCount < 11) {
          autoResponses.forEach((response, index) => {
            const id = setTimeout(() => {
              if (!isPaused.value) {
                messages.value.push({
                  text: response.text,
                  isUser: false,
                });
                messageCount++;
                // 滚动到底部
                const chatHistory = document.querySelector(".chat-history");
                chatHistory.scrollTop = chatHistory.scrollHeight;
              }
            }, response.delay + index * 1000);
            timeoutIds.push(id);
          });
        }
        if (messageCount >= 12) {
          autoResponses1.forEach((response, index) => {
            const id = setTimeout(() => {
              if (!isPaused.value) {
                messages.value.push({
                  text: response.text,
                  isUser: false,
                });
                messageCount++;
                // 滚动到底部
                const chatHistory = document.querySelector(".chat-history");
                chatHistory.scrollTop = chatHistory.scrollHeight;
              }
            }, response.delay + index * 1000);
            timeoutIds.push(id);
          });
        }
      }, 1000);
      timeoutIds.push(timeoutId);
    }
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
