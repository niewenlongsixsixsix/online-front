<template>
    <div class="courseManager row justify-center">

        <q-modal v-model="opened">
            <q-card style="width: 500px; height: 250px;">
                <q-card-title>
                    课程信息编辑
                </q-card-title>
                <q-card-separator />
                <q-card-main>

                    <q-field
                            label="章节标题"
                    >
                        <q-input/>
                    </q-field>
                    <q-field
                            label="章节描述"
                    >
                        <q-input/>
                    </q-field>
                </q-card-main>
                <q-card-actions align="end" style="margin-right: 10px">

                    <q-btn flat label="操作取消"  @click=" opened = false"/>
                    <q-btn   label="确认提交" color="primary" />

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
                    <q-btn color="primary"  label="添加章节"/>
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
                            <q-btn  icon="create" size="sm"  color="primary" label="编辑" @click=""  @click="opened = !opened"/>
                            <q-btn  icon="visibility" size="sm"  color="info" label="查看具体课程" @click="alertTitle(props.row.id)" />
                            <q-btn  icon="delete" size="sm"  color="negative" label="删除" @click="alertTitle(props.row.title)" />
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
            historyBack(){
                this.$router.go(-1)
            },
            alertTitle(val){
                alert(val);
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
            this.getAllBigChapterByCourse(this.$route.params.bigChapterId)
        }
    }
</script>


<style>

</style>
