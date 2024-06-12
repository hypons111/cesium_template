<template>
  <div id="Tree" class="">

    <div id="treeHeaderContainer">
      <div>
        <p id="currentTree">{{ TreeTitle }}</p>
      </div>

      <div id="treeTabGroup">
        <button @click="switchTree('device')"><font-awesome-icon :icon="['fas', 'door-closed']" />設備清單</button>
        <button @click="switchTree('camera')"><font-awesome-icon :icon="['fas', 'door-closed']" />視角清單</button>
      </div>
    </div>

    <div id="treeContainer">
      <el-form label-width="auto">
        <el-form-item label="查詢">
          <el-input v-model="keyword" type="text" placeholder="請輸入關鍵字" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="query()">查詢</el-button>
          <el-button @click="reset">清除</el-button>
        </el-form-item>
      </el-form>

      <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
        :render-content="renderContent" />
    </div>

    <div id="treeFooterContainer">FOOTER</div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'
import { addTag, removeTagEntity } from '@/assets/javascript/cesiumUtils';
import axios from "axios"

/* 列表名稱 */
const TreeTitle = ref("設備清單")
/* 列表資料 */
const treeData = ref([])
/* el-tree 新增的節點起始 id */
let id = 1000
/* 查詢關鍵字 */
const keyword = ref('');

onMounted(() => {
  switchTree("device");
})

function switchTree(tree) {
  const treeTypes = {
    device : "設備清單",
    camera : "視角清單"
  }
  TreeTitle.value = treeTypes[tree];
  axios
    .get(`/json/fake_${tree}.json`)
    .then(response => {
      const tagData = response.data.data;
      treeData.value = tagData; // 顯示 tree 列表
      removeTagEntity();
      return tagData
    })
    .then(tagData => {
      tagDataHandler(tagData);
    })
    .then(() => {
      resetTagEntity();
    })
    .catch(error => {
      console.error("[ERROR] :", error);
    });
}

function tagDataHandler(tagData) {
  tagData.forEach(tag => {
    if (tag.billboard) {
      addTag(tag);
    }
    if (tag.children) {
      tagDataHandler(tag.children)
    }
  })
}


function query() {
  console.log(keyword.value)
};

function reset() {
  keyword.value = ''
}


// 產生 tree 內容
function renderContent(h, { node, data, store }) {
  return h('div', { class: 'custom-tree-node' },
    h('span', null, node.label),
    h('span',
      { class: 'custom-tree-row' },
      // h('a', { onClick: () => onClickEye(data) }, '眼'),
      h('a', { class: "eye", onClick: () => onClickEye(data) }, ""), // 增加節點
      h('a', { class: 'plus', onClick: () => append(data) }, '+'), // 增加節點
      h('a', { class: 'minus', onClick: () => remove(node, data) }, '-')  // 移除節點
    )
  )
}

// 點擊眼睛 icon
function onClickEye(data) {
  console.log(data)
}

// 增加 tree 節點
// 參考 renderContent() 
function append(data) {
  const newChild = { id: id++, label: 'testtest', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  treeData.value = [...treeData.value]
}

// 移除 tree 節點
// 參考 renderContent() 
function remove(node, data) {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  treeData.value = [...treeData.value]
}
</script>

<style>
#Tree {
  width: 20em;
  height: calc(100vh - 6em - 2em);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(var(--BLACK), 0.75);

  #treeHeaderContainer {
    height: 5em;
    color: white;
    border: 2px solid rgb(var(--CYAN));

    #treeTabGroup {
      border: 1px solid red;

      button {
        padding: 0.5em;
        background-color: bisque;
      }
    }
  }

  #treeContainer {
    flex-grow: 1;
    padding: 1em;

    .el-tree {
      background: none;
      color: rgb(var(--WHITE));

      .custom-tree-node {
        height: 2em;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        /* border: 1px solid red; */
      }
    }

    .custom-tree-row {
      width: 3em;
      height: 100%;
      display: flex;
      justify-content: space-between;
      /* border: 1px solid lime; */

      .eye {
        width: 1em;
        height: 100%;
        background-image: url("@/assets/image/eye-solid.svg");
        background-repeat: no-repeat;
        background-position: center 60%;
        /* border: 1px solid cyan; */
      }

      .plus {
        line-height: 2em;
        /* border: 1px solid green; */
      }

      .minus {
        line-height: 1.9em;
      }


    }


  }

  #treeFooterContainer {
    height: 3em;
    color: white;
    border-top: 2px solid rgb(var(--CYAN));
  }
}
</style>
