<template>
    <div class="courseManager row justify-center">

        <q-modal v-model="videoUploadVisible">
            <q-card style="width: 400px; height: 200px;">
                <q-card-title>
                    视频上传
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-field
                            label="上传视频"
                    >
                        <q-uploader
                                :url="videoUploadUrl"
                                name="smallChapterVideo"
                                extensions=".mp4"
                                @finish="finishResult"
                                hide-upload-button
                                ref="videoUpload"
                        />
                    </q-field>
                </q-card-main>
                <q-card-actions align="end" style="margin-right: 10px">

                    <q-btn flat label="取消"  @click="videoUploadVisible = false"/>
                    <q-btn   label="确认提交"  @click="videoUpload" color="primary" />

                </q-card-actions>
            </q-card>


        </q-modal>
        <q-modal v-model="opened">
            <q-card style="width: 500px; height: 200px;">
                <q-card-title>
                    课程信息编辑
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-field
                            label="课程标题"
                    >
                        <q-input v-model="title"/>
                    </q-field>
                </q-card-main>
                <q-card-actions align="end" style="margin-right: 10px">

                    <q-btn flat label="操作取消"  @click=" opened = false"/>
                    <q-btn   label="确认提交" @click="submitSmallChapter" color="primary" />

                </q-card-actions>
            </q-card>

        </q-modal>

        <div class="col-10">
            <q-table
                    :data="tableData"
                    :columns="columns"
                    row-key="name"
                    :pagination.sync="pagination"
                    separator="horizontal"
            >
                <div slot="top-right" slot-scope="props" class="row">
                    <q-btn color="primary" @click="addSmallChapterBtn"  label="添加具体课程"/>
                </div>
                <div slot="top-left" >
                    <q-btn color="primary" @click="historyBack"  flat icon="reply"/>
                    <span style="font-size:20px; font-weight:400">课程信息</span>
                </div>
                <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="video" :props="props">
                        <video
                                id="my-player"
                                class="video-js vjs-big-play-centered"
                                controls
                                width="250"
                                height="150"
                                preload="none"
                                data-setup='{}'>
                            <source :src="'/api/upload' + props.row.videoUrl" type="video/mp4"/>
                        </video>
                    </q-td>
                    <q-td key="title" :props="props">
                        <strong style="font-size: 16px; color:rgb(94, 94, 94)">{{props.row.title}}</strong>
                    </q-td>
                    <q-td key="createTime" :props="props">
                        <strong style="font-size: 10px; color:rgb(94, 94, 94)">{{props.row.createTime}}</strong>
                    </q-td>
                    <q-td key="action" :props="props">

                        <q-btn-group>
                            <q-btn   size="sm"  color="primary" label="上传视频"  @click="uploadVideoBtn(props.row)"/>
                            <q-btn   size="sm"  color="info" label="编辑" @click="updateSmallChapterBtn(props.row)" />
                            <q-btn   size="sm"  color="negative" label="删除" @click="alertTitle(props.row.title)" />
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
    import QCardMain from "quasar-framework/src/components/card/QCardMain";
    export default {
        components: {QCardMain, QCardActions, QInput, QField, QCardTitle, QCard, QTd},
        data(){
            return{
                pagination: {
                    sortBy: null, // 字符串，列“name”属性值
                    descending: false,
                    page: 1,
                    rowsPerPage: 25 // 当前每页显示的行数
                },
                opened: false,
                videoUploadVisible:false,
                smallChapterSubmitUrl:'',
                title:'',
                videoUploadUrl:'',
                currentVideoUploadId:null,
                columns: [
                    {
                        name: 'video',
                        label: '视频',
                        field: 'video',
                        align: 'left'
                    },
                    {
                        name: 'title',
                        label: '标题',
                        field: 'title',
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
            finishResult(){
                this.getAllSmallChapterByBigChapterId(this.$route.params.bigChapterId);
                this.$q.notify({
                    type: 'positive',
                    timeout: 2000,
                    position: 'top',
                    message:'更新成功'
                })
            },
            videoUpload(){
                this.$refs.videoUpload.upload();
                this.videoUploadVisible = false
            },
            historyBack(){
                this.$router.go(-1)
            },
            uploadVideoBtn(row){
                this.videoUploadVisible = true;
              this.videoUploadUrl = '/api/smallChapter/updateSmallChapterVideo/' + row.id
            },
            addSmallChapterBtn(){
                this.opened = true;
                this.smallChapterSubmitUrl = '/api/smallChapter/addSmallChapter/' + this.$route.params.bigChapterId;
                this.title = null;
            },
            updateSmallChapterBtn(row){
                this.opened = true;
                this.smallChapterSubmitUrl = '/api/smallChapter/updateSmallChapter/' + row.id;
                this.title = row.title;
            },
            submitSmallChapter(){
              this.$axios({
                  method:'post',
                  url:this.smallChapterSubmitUrl,
                  data:{
                      title:this.title,
                  }
              }).then(response=>{
                  if(response.data){
                      this.opened = false;
                      this.getAllSmallChapterByBigChapterId(this.$route.params.bigChapterId);
                      this.$q.notify({
                          type: 'positive',
                          timeout: 2000,
                          position: 'top',
                          message:'操作成功'
                      })
                  }
              })
            },

            alertTitle(val){
                alert(val);
            },

            getAllSmallChapterByBigChapterId(bigChapterId){
                this.$axios({
                    method:'get',
                    url:'/api/smallChapter/getAllSmallChapterByBigChapterId/' + bigChapterId,
                }).then(response=>{
                    this.tableData = response.data;
                })
            }
        },
        created(){
            this.getAllSmallChapterByBigChapterId(this.$route.params.bigChapterId);
        }
    }
</script>


<style>

</style>

