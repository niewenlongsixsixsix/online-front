<template>
   <div class="courseManager row justify-center">


       <q-modal v-model="imgUploadVisible">
           <q-card style="width: 400px; height: 210px;">

               <q-card-title>
                    封面更换
               </q-card-title>
               <q-card-separator />
               <q-card-main>
                   <q-field label="更换课程封面">
                       <q-uploader
                               :url="imageUploadUrl"
                               name="courseImg"
                               extensions=".jpg, .jpeg, .png"
                               hide-upload-button
                               @finish="finishResult"
                               ref="imgUpload"
                       />
                   </q-field>
               </q-card-main>
               <q-card-actions align="end" style="margin-right: 10px">

                   <q-btn flat label="取消"  @click="imgUploadVisible = false"/>
                   <q-btn   label="确认提交" @click="imgUpload" color="primary" />

               </q-card-actions>
           </q-card>


       </q-modal>

       <q-modal v-model="opened">

               <q-card style="width: 750px; height: 250px;">

                   <q-card-title>
                       {{modalTitle}}
                   </q-card-title>

                   <q-card-separator />

                   <q-card-main>
                       <q-field label="课程标题">
                           <q-input v-model="courseTitle"/>
                       </q-field>

                       <q-field label="分类">
                           <q-select
                                   v-model="classification"
                                   float-label="选择一个分类"
                                   :options="selectOptions"/>
                       </q-field>

                   </q-card-main>

                   <q-card-actions align="end" style="margin-right: 10px">

                           <q-btn flat label="操作取消"  @click="opened = false"/>
                           <q-btn   label="确认提交" @click="uploadCourse" color="primary" />

                   </q-card-actions>
               </q-card>

       </q-modal>
       <div class="col-10">
           <q-table
                   :loading="loading"
                   :rows-per-page-options="[3,5]"
                   :data="courseData"
                   :columns="columns"
                   row-key="name"
                   title="我的课程"
                   separator="horizontal"
                   :pagination.sync="pagination"
           >
               <q-td slot="top-right" slot-scope="props" class="row">
                   <q-btn color="primary"  @click="addCourseBtn" label="添加课程"/>
               </q-td>
               <q-tr slot="body" slot-scope="props" :props="props">
                   <q-td key="img" :props="props">
                       <img :src="'/api/upload'+ props.row.imgUrl" style="width: 200px; height: 114px;"/>
                   </q-td>
                   <q-td key="title" :props="props">
                       <strong style="font-size: 16px; color:rgb(94, 94, 94)">{{props.row.title}}</strong>
                   </q-td>
                   <q-td key="category" :props="props">
                       <strong style="font-size: 12px; color:rgb(94, 94, 94)">{{props.row.belongTo.name}}</strong>
                   </q-td>
                   <q-td key="createTime" :props="props">
                       <strong style="font-size: 12px; color:rgb(94, 94, 94)">{{new Date(props.row.createTime).toLocaleString()}}</strong>
                   </q-td>
                   <q-td key="action" :props="props">
                       <q-btn-group>
                           <q-btn   size="sm"  color="warning" @click="imgUploadBtn(props.row.id)" label="更新封面"/>
                           <q-btn   size="sm"  color="primary" label="编辑基本信息" @click="updateCourseBtn(props.row)"/>
                           <q-btn   size="sm" color="info" label="查看章节" @click="viewChapter(props.row.id)" />
                       </q-btn-group>
                   </q-td>
               </q-tr>
           </q-table>
       </div>

   </div>
</template>


<script>
    import QTd from "quasar-framework/src/components/table/QTd";
    import QCard from "quasar-framework/src/components/card/QCard";
    import QCardTitle from "quasar-framework/src/components/card/QCardTitle";
    import QField from "quasar-framework/src/components/field/QField";
    import QInput from "quasar-framework/src/components/input/QInput";
    import QCardActions from "quasar-framework/src/components/card/QCardActions";
    import {selectUtil} from "@/assets/js/SelectUtil";
    import QModal from "quasar-framework/src/components/modal/QModal";
    export default {
        components: {QModal, QCardActions, QInput, QField, QCardTitle, QCard, QTd},
        data(){
            return{
                loading:false,
                pagination: {
                    sortBy: null, // 字符串，列“name”属性值
                    descending: false,
                    page: 1,
                    rowsPerPage: 3 // 当前每页显示的行数
                },
                select:null,
                selectOptions: [],
                opened: false,
                imgUrl:null,
                imageUploadUrl:'',
                courseId:null,
                courseUploadUrl:"",
                imgUploadVisible:false,
                courseTitle:'',
                classification:null,
                modalTitle:null,
                modalType:true,//true表示添加 false表示更新
                columns: [
                    {
                        name: 'img',
                        label: '封面',
                        field: 'img',
                        align: 'left'
                    },
                    {
                        name: 'title',
                        label: '标题',
                        field: 'title',
                        align: 'left'
                    },
                    {
                        name: 'category',
                        label: '分类',
                        field: 'category',
                        align: 'left'
                    },
                    {
                        name: 'createTime',
                        label: '创建时间',
                        align: 'left',
                        field: 'createTime',
                    },
                    {
                        name: 'action',
                        label: '操作',
                        align: 'left',
                        field: 'action',
                    }
                ],
                courseData: []
            }
        },
        methods:{

            viewChapter(id){
                this.$router.push('/teacherManagerHome/teacherManagerCenter/BigChapterManager/' + id)
            },
            imgUpload(){
                this.$refs.imgUpload.upload();
                this.imgUploadVisible = false;
            },
            imgUploadBtn(courseId){
                this.imgUploadVisible = true;
                this.imageUploadUrl = '/api/course/updateImgUrl/' + courseId
            },
            finishResult(){
                this.getAllCourseByUserId();
                this.$q.notify({
                    type: 'positive',
                    timeout: 2000,
                    position: 'top',
                    message:'更新成功'
                })
            },
            uploadCourse(){
                this.$axios({
                    url:this.courseUploadUrl,
                    method:'post',
                    data:{
                        title:this.courseTitle,
                        classification:this.classification
                    }
                }).then(response=>{
                    if(response.data){
                        this.getAllCourseByUserId();
                        this.opened = false;
                        this.$q.notify({
                            type: 'positive',
                            timeout: 2000,
                            position: 'top',
                            message:'操作成功'
                        })
                    }
                })
            },
            addCourseBtn(){
              //先将标志位设置为true，标志进行添加操作
              this.modalType = true;
              this.modalTitle = '添加课程';
              this.courseTitle = null;
              this.classification = null;
              this.courseUploadUrl = '/api/course/addCourse/1';
              this.opened = true;
            },

            updateCourseBtn(row){
              this.modalType = false;
              this.modalTitle = '修改课程信息';

              this.courseTitle = row.title;
              this.classification = row.belongTo.id;
              this.imgUrl = row.imgUrl;

              this.courseUploadUrl = '/api/course/updateCourse/0/' + row.id;

              this.opened = true;
            },
            alertTitle(val){
                alert(val);
            },
            getAllClassification(){
                this.$axios({
                    method:'get',
                    url:'/api/classification/getAllClassification'
                }).then(response=>{
                    this.selectOptions = selectUtil(response.data);
                })
            },

            getAllCourseByUserId(){
                this.loading = true;
                    this.$axios({
                        method:'get',
                        url:'/api/course/getAllCourseByUserId',
                    }).then(response=>{
                        this.courseData = response.data;
                        this.loading = false;
                    })
            }
        },
        created(){
            this.getAllCourseByUserId();
            this.getAllClassification();
        }
    }
</script>


<style>

</style>
