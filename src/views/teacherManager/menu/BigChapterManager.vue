<template>
    <div class="courseManager row justify-center">

        <q-modal v-model="opened">
            <q-card style="width: 500px; height: 300px;">
                <q-card-title>
                    课程信息编辑
                </q-card-title>
                <q-card-separator />
                <q-card-main>

                    <q-field
                            label="章节标题"
                    >
                        <q-input v-model="BigChapterInfo.title"/>
                    </q-field>
                    <q-field
                            label="章节描述"
                    >
                        <q-input v-model="BigChapterInfo.chapterDescribe "
                                 type="textarea"
                                 :max-height="30"
                                 rows="3"/>
                    </q-field>
                </q-card-main>
                <q-card-actions align="end" style="margin-right: 10px">

                    <q-btn flat label="操作取消"  @click=" opened = false"/>
                    <q-btn   label="确认提交" @click="addOrEditSubmit" color="primary" />

                </q-card-actions>
            </q-card>

        </q-modal>

        <div class="col-10">
            <q-table
                    :loading="loading"
                    :data="tableData"
                    :columns="columns"
                    row-key="name"
                    title="课程章节"
                    separator="horizontal"
            >
                <div slot="top-right" slot-scope="props" class="row">
                    <q-btn color="primary" @click="addChapterBtn"  label="添加章节"/>
                </div>
                <div slot="top-left" >
                    <q-btn color="primary" @click="historyBack" flat icon="reply"/>
                    <span style="font-size:20px; font-weight:400">课程章节</span>
                </div>
                <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="title" :props="props">
                        <strong style="font-size: 16px; color:rgb(94, 94, 94)">{{props.row.title}}</strong>
                    </q-td>
                    <q-td key="describe" :props="props">
                        <strong style=" color:rgb(94, 94, 94)">{{props.row.describe}}</strong>
                    </q-td>
                    <q-td key="createTime" :props="props">
                        <strong style="font-size: 10px; color:rgb(94, 94, 94)">{{props.row.createTime}}</strong>
                    </q-td>
                    <q-td key="action" :props="props">

                        <q-btn-group>
                            <q-btn  icon="create" size="sm"  color="primary" label="编辑"  @click="updateChapterBtn(props.row)"/>
                            <q-btn  icon="visibility" size="sm"  color="info" label="查看具体课程" @click="viewSmallChapter(props.row.id)" />
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
    export default {
        components: {QCardActions, QInput, QField, QCardTitle, QCard, QTd},
        data(){
            return{
                opened: false,
                loading:false,
                bigChapterId:null,
                BigChapterInfo:{
                    title:null,
                    chapterDescribe:null,
                },
                addOrEdit:null,
                addOrEditChapterUrl:'',
                columns: [
                    {
                        name: 'title',
                        label: '标题',
                        field: 'title',
                        align: 'left'
                    },
                    {
                        name: 'describe',
                        label: '描述',
                        field: 'describe',
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
                tableData: []
            }
        },
        methods:{

            addChapterBtn(){
              this.opened = true;

              this.BigChapterInfo.title = null;
              this.BigChapterInfo.chapterDescribe = null;

              this.addOrEditChapterUrl = '/api/bigChapter/addOrEditBigChapter/1'
            },

            updateChapterBtn(row){
                this.opened = true;

                console.log(row);

                this.bigChapterId = row.id
               this.BigChapterInfo.title = row.title;
               this.BigChapterInfo.chapterDescribe = row.describe;

               console.log(this.BigChapterInfo.chapterDescribe)

               this.addOrEditChapterUrl = '/api/bigChapter/addOrEditBigChapter/0'
            },

            addOrEditSubmit(){
                console.log(this.addOrEditChapterUrl)

                this.$axios({
                    method:'post',
                    url:this.addOrEditChapterUrl,
                    data:{
                        BigChapterInfo:this.BigChapterInfo,
                        bigChapterId:this.bigChapterId,
                        courseId:this.$route.params.courseId
                    }
                }).then(response=>{
                    if(response.data){
                        this.getAllBigChapterByCourse(this.$route.params.courseId)
                        this.$q.notify({
                            type: 'positive',
                            timeout: 2000,
                            position: 'top',
                            message:'操作成功'
                        })
                    }
                    this.opened = false;
                })
            },
            historyBack(){
                this.$router.go(-1)
            },
            viewSmallChapter(id){
                this.$router.push('/teacherManagerHome/teacherManagerCenter/SmallChapterManager/' + id)
            },
            getAllBigChapterByCourse(courseId){
                this.loading = true;
                setTimeout(()=>{
                    this.$axios({
                        method:'get',
                        url:'/api/bigChapter/getAllBigChapterByCourseId/' + courseId
                    }).then(response=>{
                        this.tableData = response.data;
                        this.loading = false;
                    })
                },1500)
            }
        },
        created(){
            this.getAllBigChapterByCourse(this.$route.params.courseId)
        }
    }
</script>


<style>

</style>
