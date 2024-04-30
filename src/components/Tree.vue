<template>
  <div id="Tree">

    <el-form label-width="auto" class="">
      <el-form-item label=""> <!-- label 屬性放字串可顯示 input label -->
        <el-input v-model="keyword" type="text" placeholder="請輸入關鍵字" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button @click="query()">查詢</el-button>
        <el-button @click="reset">清除</el-button>
      </el-form-item>
    </el-form>

    <el-tree :data="dataSource" 
      show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
      :render-content="renderContent" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import 'element-plus/dist/index.css'

/* el-form */
const keyword = ref('');

function query() {
  console.log(keyword.value)
};

function reset() {
  keyword.value = ''
}

/* el-tree */
 // 新增的節點起始 id;
let id = 1000
// 假節點資料
const dataSource = ref([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])

// 產生 tree 內容
function  renderContent(h, { node, data, store }) {
  return h('span', { class: 'custom-tree-node' },
    h('span', null, node.label),
    h('span',
      null,
      h('a', { onClick: () => onClickEye(data) }, '眼'),
      h('a', { style: 'margin-left: 8px', onClick: () => append(data) }, '+'), // 增加節點
      h('a', { style: 'margin-left: 8px', onClick: () => remove(node, data) }, '-')  // 移除節點
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
  console.log(data)
  const newChild = { id: id++, label: 'testtest', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  dataSource.value = [...dataSource.value]
}

// 移除 tree 節點
// 參考 renderContent() 
function remove(node, data) {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}
</script>

<style>
#Tree {
  width: 20em;
  height: calc(100vh - 6em - 2em);
  overflow-x: hidden;
  overflow-y: auto;
  background: black;

  .el-tree {
    background: none;

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>
