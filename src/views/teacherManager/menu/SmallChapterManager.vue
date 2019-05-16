<template>
    <div class="courseManager row justify-center">

        <q-modal v-model="opened">
            <q-card style="width: 500px; height: 400px;">
                <q-card-title>
                    课程信息编辑
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-field
                            label="视频"
                    >
                        <video
                                id="my-player1"
                                class="video-js vjs-big-play-centered"
                                controls
                                width="250"
                                height="150"
                                preload="false"
                                poster="//vjs.zencdn.net/v/oceans.png"
                                data-setup='{}'>
                            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
                            <p class="vjs-no-js">
                                请开启Javascript脚本以便
                                <a href="http://videojs.com/html5-video-support/" target="_blank">
                                    支持HTML5 video播放器
                                </a>
                            </p>
                        </video>
                    </q-field>
                    <q-field
                            label="上传视频"
                    >
                        <q-uploader :url="url" />
                    </q-field>

                    <q-field
                            label="课程标题"
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
                    :data="tableData"
                    :columns="columns"
                    row-key="name"
                    separator="horizontal"
            >
                <div slot="top-right" slot-scope="props" class="row">
                    <q-btn color="primary"  label="添加章节"/>
                </div>
                <div slot="top-left" >
                    <q-btn color="primary" flat icon="reply"/>
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
                                preload="false"
                                poster="//vjs.zencdn.net/v/oceans.png"
                                data-setup='{}'>
                            <source :src="props.row.videoUrl" type="video/mp4"/>
                            <p class="vjs-no-js">
                                请开启Javascript脚本以便
                                <a href="http://videojs.com/html5-video-support/" target="_blank">
                                    支持HTML5 video播放器
                                </a>
                            </p>
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
                tableData: [
                    {
                        id:'1',
                        title:'第1章 课程简介【学前须知】',
                        videoUrl:'http://vjs.zencdn.net/v/oceans.mp4',
                        createTime:'2019-02-20 21:39:41'
                    },
                    {
                        id:'2',
                        title:'第2章 kubernetes快速入门【k8s必知必会】',
                        videoUrl:'http://vjs.zencdn.net/v/oceans.mp4',
                        createTime:'2019-02-20 21:39:41'
                    }
                ]
            }
        },
        methods:{
            alertTitle(val){
                alert(val);
            },
        }
    }
</script>


<style>

</style>

