<template>
  <div>
    <div class="imgsli" >
      <p class="imgsli_p">请点击下方图片修改证照类型</p>
      <ul class="limgs" id="liimgs">
        <li class="addbtns">
          <img src="../assets/img/adds.png"  @click="fileClick">
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
          <p>添加</p>
        </li>
        <li class="list" v-for="(li,index) in imgList">
          <img :src="li.file.src" v-if="li.file.imghw"   style="width:3.37rem">
          <img :src="li.file.src" v-if="!li.file.imghw"   style="height:4rem;">
          <img src="../assets/img/cha.png"  @click="fileDel(index)"/>
          <div  @click="onSelectPickers(index)">{{li.file.title}}</div>
        </li>
      </ul>
    </div>
    <div class="fter">
      <div>提交</div>
    </div>


    <vue-pickers
      @cancel="onClose"
      @confirm="onConfirm"
      :columns="pickers.columns"
      :show="pickers.show"
      :defaultData="pickers.defaultData"
      :selectData="pickers.selectData"></vue-pickers>
  </div>

</template>

<script>
  import VuePickers from 'vue-pickers'
    export default {
      name: 'Index',
      components: {
        VuePickers
      },
      data(){
        return {
          idname:"picker",
          list:[
            {
              img1:"img/bgs.jpg",
              title:"房屋照片"
            },
            {
              img1:"img/bgs.jpg",
              title:"房屋照片"
            }
          ],

          imgList: [],
          showimg:true,
          op:false,
          tode:'',
          edtorTodes:"",//记录正在编辑的数据


          curIndex: null,

          pickers: {
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
        };
      },
      methods:{
        onSelectPickers(curIndex){
          console.log(curIndex);
          this.pickers.show = true;
          this.curIndex = curIndex;
        },
        onClose(){
          this.pickers.show = false;
        },
        onConfirm(selectData){
          let val = selectData.select1;
          console.log(val);
          this.imgList[this.curIndex].file.title = val.text;
          this.pickers.show = false;
        },

        tijiao(){
          console.log(this.imgList)
        },
        fileClick() {
          document.getElementById('upload_file').click()
        },
        fileChangelist(el){
          if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
          if(el.isTrusted){
            this.showimg=false

          }else{
            alert("false")
          }
        },
        fileChange(el) {
          if (!el.target.files[0].size) return;
          this.fileList(el.target);
          el.target.value = ''
        },
        fileList(fileList) {
          let files = fileList.files;
          for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
              this.fileAdd(files[i]);
            } else {
              //文件夹处理
              this.folders(fileList.items[i]);
            }
          }
        },
        fileAdd(file) {
          //判断是否为图片文件
          if (file.type.indexOf('image') == -1) {
            file.src = 'wenjian.png';
            file.title="房屋照片";
            let width = image.width;
            let height = image.height;
            if ((height/width)>=1.17647059) {
              file.imghw=false
            }else{
              file.imghw=true
            }
            file.width=width;
            file.height=height;
            this.imgList.push({
              file
            });
          }else {
            let reader = new FileReader();
            let image = new Image();
            let _this=this;
            reader.readAsDataURL(file);
            reader.onload = function () {
              file.src = this.result;
              file.title="房屋照片";
              image.onload=function(){
                let width = image.width;
                let height = image.height;
                if ((height/width)>=1.17647059) {
                  file.imghw=false
                }else{
                  file.imghw=true
                }
                file.width=width;
                file.height=height;
                _this.imgList.push({
                  file
                });
              };
              image.src= file.src;
            }
          }
        },
        /*删除*/
        fileDel(index) {
          this.imgList.splice(index, 1);
          if (this.limit !== undefined) this.limit = this.imgList.length;
        },

        entorTode(tode){
          this.edtorTodes=tode
        },


      }
    }
</script>
<style>
  @import "../assets/css/style.css";
</style>
