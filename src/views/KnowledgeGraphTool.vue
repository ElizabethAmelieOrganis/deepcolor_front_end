<template>
  <div class="tab"><maintab /></div>
  <div class="knowledge-graph-container">
    <div class="container">
      <div class="sidebar1">
        <h1>知识图谱可视化</h1>

        <div class="file-upload">
          <h3>选择知识图谱文件</h3>
          <p>请上传knowledge_graph.json文件：</p>
          <input type="file" @change="handleFileUpload" accept=".json" />
          <div id="file-info">{{ fileInfo }}</div>
        </div>

        <div id="controls-container" :class="{ hide: !isFileLoaded }">
          <div class="controls">
            <h3>布局选项</h3>
            <select v-model="selectedLayout" @change="changeLayout">
              <option value="hierarchical">层次布局</option>
              <option value="force" selected>力导向布局</option>
              <option value="kamada-kawai">Kamada-Kawai布局</option>
            </select>

            <h3>视图设置</h3>
            <div class="options">
              <button @click="zoomIn">放大</button>
              <button @click="zoomOut">缩小</button>
              <button @click="fit">适应屏幕</button>
            </div>

            <h3>节点过滤</h3>
            <input type="text" v-model="nodeSearch" placeholder="搜索节点..." />
            <select v-model="selectedNodeType">
              <option value="all">所有类型</option>
              <option v-for="type in nodeTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>

            <h3>边过滤</h3>
            <select v-model="selectedEdgeType">
              <option value="all">所有关系</option>
              <option v-for="type in edgeTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <div class="node-info">
            <h3>节点信息</h3>
            <p v-if="!selectedNode">请选择一个节点来查看详细信息</p>
            <div v-else>
              <div class="node-property">
                <span class="property-name">ID:</span>
                <span>{{ selectedNode.id }}</span>
              </div>
              <div class="node-property">
                <span class="property-name">类型:</span>
                <span>{{ selectedNode.type || "未知" }}</span>
              </div>
              <div class="node-property">
                <span class="property-name">描述:</span>
                <span>{{ selectedNode.description || "无描述" }}</span>
              </div>
              <div class="node-property">
                <span class="property-name">连接:</span>
                <div v-if="selectedNodeConnections.length === 0">无连接</div>
                <div v-else>
                  <div
                    v-for="conn in selectedNodeConnections"
                    :key="conn.id"
                    class="connection-item"
                  >
                    <b>{{
                      conn.source === selectedNode.id
                        ? selectedNode.id
                        : conn.target
                    }}</b>
                    <span style="color: #666">{{ conn.type }}</span>
                    <b>{{
                      conn.source === selectedNode.id
                        ? conn.target
                        : selectedNode.id
                    }}</b>
                    <div style="font-size: 0.9em; color: #777">
                      {{ conn.description || "" }}
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="network" class="graph-container">
        <div v-if="!isFileLoaded" class="initial-message">
          <h2>欢迎使用知识图谱可视化工具</h2>
          <p>请在左侧选择knowledge_graph.json文件以加载知识图谱</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vis from "vis-network/standalone/umd/vis-network.min.js";
import maintab from "../components/maintab.vue";
export default {
  name: "KnowledgeGraphTool",
  components: {
    maintab,
  },
  data() {
    return {
      network: null,
      nodes: null,
      edges: null,
      graphData: null,
      isFileLoaded: false,
      isLoading: false,
      fileInfo: "",
      selectedLayout: "force",
      nodeSearch: "",
      selectedNodeType: "all",
      selectedEdgeType: "all",
      nodeTypes: [],
      edgeTypes: [],
      selectedNode: null,
      selectedNodeConnections: [],
    };
  },
  watch: {
    nodeSearch(val) {
      this.filterNodes(val.toLowerCase());
    },
    selectedNodeType(val) {
      this.filterNodesByType(val);
    },
    selectedEdgeType(val) {
      this.filterEdgesByType(val);
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.fileInfo = `已选择: ${file.name} (${(file.size / 1024).toFixed(
        1
      )} KB)`;
      this.isLoading = true;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.graphData = data;
          this.isLoading = false;
          this.isFileLoaded = true;
          this.createVisualization(data);
        } catch (error) {
          console.error("解析JSON数据失败:", error);
          this.isLoading = false;
        }
      };
      reader.onerror = () => {
        this.isLoading = false;
      };
      reader.readAsText(file);
    },
    createVisualization(graphData) {
      // 创建节点和边的数据集
      this.nodes = new vis.DataSet(
        graphData.nodes.map((node) => ({
          id: node.id,
          label: node.id,
          title: node.description,
          group: node.type,
          data: node,
        }))
      );

      this.edges = new vis.DataSet(
        graphData.edges.map((edge, index) => ({
          id: index,
          from: edge.source,
          to: edge.target,
          label: edge.type,
          title: edge.description,
          width: edge.weight * 2,
          data: edge,
        }))
      );

      // 收集节点类型和边类型
      this.nodeTypes = [
        ...new Set(graphData.nodes.map((node) => node.type).filter(Boolean)),
      ];
      this.edgeTypes = [...new Set(graphData.edges.map((edge) => edge.type))];

      // 创建网络图选项
      const options = {
        nodes: {
          shape: "dot",
          size: 20,
          font: {
            size: 14,
            face: "Microsoft YaHei",
          },
          borderWidth: 2,
          shadow: true,
        },
        edges: {
          font: {
            size: 12,
            face: "Microsoft YaHei",
            align: "middle",
          },
          arrows: {
            to: { enabled: true, scaleFactor: 0.5 },
          },
          smooth: {
            enabled: true,
            type: "continuous",
          },
        },
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -5000,
            centralGravity: 0.3,
            springLength: 150,
            springConstant: 0.04,
            damping: 0.09,
          },
        },
        interaction: {
          hover: true,
          navigationButtons: true,
          keyboard: true,
        },
      };

      // 创建网络图
      const container = document.getElementById("network");
      this.network = new vis.Network(
        container,
        { nodes: this.nodes, edges: this.edges },
        options
      );

      // 添加节点点击事件
      this.network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = this.nodes.get(nodeId);
          this.selectedNode = node.data;
          this.selectedNodeConnections = this.graphData.edges.filter(
            (edge) => edge.source === node.id || edge.target === node.id
          );
        } else {
          this.selectedNode = null;
          this.selectedNodeConnections = [];
        }
      });
    },
    changeLayout() {
      if (this.selectedLayout === "hierarchical") {
        this.network.setOptions({
          physics: { enabled: false },
          layout: {
            hierarchical: {
              enabled: true,
              direction: "UD",
              sortMethod: "directed",
              nodeSpacing: 150,
              levelSeparation: 150,
            },
          },
        });
      } else if (this.selectedLayout === "kamada-kawai") {
        this.network.setOptions({
          physics: {
            enabled: true,
            solver: "forceAtlas2Based",
            forceAtlas2Based: {
              gravitationalConstant: -50,
              centralGravity: 0.01,
              springLength: 100,
              springConstant: 0.08,
            },
          },
          layout: { hierarchical: { enabled: false } },
        });
      } else {
        this.network.setOptions({
          physics: {
            enabled: true,
            barnesHut: {
              gravitationalConstant: -5000,
              centralGravity: 0.3,
              springLength: 150,
              springConstant: 0.04,
              damping: 0.09,
            },
          },
          layout: { hierarchical: { enabled: false } },
        });
      }
    },
    zoomIn() {
      const scale = this.network.getScale() * 1.2;
      this.network.moveTo({ scale });
    },
    zoomOut() {
      const scale = this.network.getScale() / 1.2;
      this.network.moveTo({ scale });
    },
    fit() {
      this.network.fit();
    },
    filterNodes(searchTerm) {
      if (searchTerm.trim() === "") {
        this.nodes.update(
          this.graphData.nodes.map((node) => ({
            id: node.id,
            hidden: false,
          }))
        );
      } else {
        this.graphData.nodes.forEach((node) => {
          const nodeMatches =
            node.id.toLowerCase().includes(searchTerm) ||
            (node.description &&
              node.description.toLowerCase().includes(searchTerm));

          this.nodes.update({
            id: node.id,
            hidden: !nodeMatches,
          });
        });
      }
    },
    filterNodesByType(type) {
      if (type === "all") {
        this.nodes.update(
          this.graphData.nodes.map((node) => ({
            id: node.id,
            hidden: false,
          }))
        );
      } else {
        this.graphData.nodes.forEach((node) => {
          this.nodes.update({
            id: node.id,
            hidden: node.type !== type,
          });
        });
      }
    },
    filterEdgesByType(type) {
      if (type === "all") {
        this.edges.update(
          this.graphData.edges.map((edge, index) => ({
            id: index,
            hidden: false,
          }))
        );
      } else {
        this.graphData.edges.forEach((edge, index) => {
          this.edges.update({
            id: index,
            hidden: edge.type !== type,
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.knowledge-graph-container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
  background-color: #ffffff;
}

.container {
  display: flex;
  width: 95%;
  height: 100vh;
  position: relative;
  left: 100px;
}

.sidebar1 {
  width: 300px;
  background-color: #f8f9fa;
  padding: 15px;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 99;
}

.graph-container {
  flex-grow: 1;
  height: 100%;
  background-color: #ffffff;
}
.tab {
  z-index: 100000;
  position: absolute;
}

h1 {
  margin-top: 0;
  color: #333;
  font-size: 1.8em;
}

.controls {
  margin-bottom: 20px;
}

.node-info {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
}

.node-info h3 {
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

select,
input,
button {
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.options button {
  flex: 1;
  min-width: 120px;
}

.node-property {
  margin-bottom: 8px;
}

.property-name {
  font-weight: bold;
  color: #555;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}

.file-upload {
  margin-bottom: 20px;
  background: #f0f8ff;
  padding: 15px;
  border-radius: 5px;
  border: 1px dashed #4caf50;
}

.initial-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 20px;
}

.hide {
  display: none;
}

.connection-item {
  margin-bottom: 10px;
}
</style>
