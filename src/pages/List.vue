<template>
    <div>
      <ul>
        <li @click="onUpload">上传图片，现在用点击模拟上传图片功能</li>
        <li
          @click="onSelectPicker(index)"
          v-for="(item,index) in list" :key="index">{{item.title}}</li>
      </ul>

      <vue-pickers
        @cancel="onClose"
        @confirm="onConfirm"
        :columns="columns"
        :show="show"
        :defaultData="defaultData"
        :selectData="selectData"></vue-pickers>
    </div>
</template>

<script>
  import vuePickers from 'vue-pickers';
  export default {
    name: "List",
    components: {
      vuePickers
    },
    methods: {
      onSelectPicker(curIndex){
        this.curIndex = curIndex;
        this.show = true;
      },
      onUpload() {
        this.list.push({
          title: this.list.length
        });
      },
      onClose(){
        this.show = false;
      },
      onConfirm(selectData){
        let val = selectData.select1;
        console.log(val);
        this.list[this.curIndex].title = val.text;
        this.curIndex = null;
        this.show = false;
      }
    },
    data(){
      return {
        msg: 'h1',
        list: [],
        curIndex: null,

        show: false,
        columns:1,
        selectData: {
          data1: [
            {
              text: '周一',
              value: 1
            },
            {
              text: '周二',
              value: 2
            },
            {
              text: '周三',
              value: 3
            },
            {
              text: '周四',
              value: 4
            },
            {
              text: '周五',
              value: 5
            },
            {
              text: '周六',
              value: 6
            },
            {
              text: '周日',
              value: 7
            }
          ]
        },
        defaultData: [
          {
            text: '周一',
            value: 1
          },
        ]
      }
    }
  }
</script>

<style scoped>
  ul li{
    height: 60px;
    line-height: 60px;
    margin-bottom: 10px;
    background: #ccc;
    color: red;
  }
</style>
