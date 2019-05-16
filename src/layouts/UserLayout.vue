<template>
    <div style="margin-top: 60px;" class="userInfo">
        <div class="row justify-center  ">
            <div class="col-8">
                <div class="row">
                    <div class="col-3 shadow-2" >
                        <div style="min-height: 150px; display: flex; align-items: center; width: 100%;">
                            <img
                            src="../views/touxiang.jpg"
                            style="width: 100px;
                            margin: 0 auto; height: 100px;
                            border-radius: 50%;
                            background-size: cover "/>
                        </div>
                        <div>


                            <q-list no-border link  highlight sparse >
                                <q-item tag="li" router-link-active v-for="(item,index) in infoList"  exact :to="item.path" :key="index" @click="itemActive">
                                    <q-item-side :icon="item.icon" :color="item.color" />
                                    <q-item-main :label="item.title" />
                                </q-item>
                            </q-list>
                        </div>


                    </div>
                    <div class="col-8 shadow-2">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import QIcon from "quasar-framework/src/components/icon/QIcon";
    export default {
        name: "UserLayout",
        components: {QIcon},
        data(){
            return{
                infoList:[
                    {title:'个人中心',icon:'face',path:'/userLayout',color:'negative'},
                    {title:'我的课程',icon:'voice_chat',path:'/userLayout/MyCourse',color:'secondary'},
                    {title:'我的笔记',icon:'create',path:'/userLayout/MyNotes',color:'purple'},
                    {title:'消息中心',icon:'textsms',path:'/userLayout/MyMessage',color:'positive'},
                    {title:'安全设置',icon:'settings',path:'/userLayout/SafeSetting',color:'blue'},
                ],
                currentMenuIndex:0,
            }
        },
        methods:{
            itemActive(index){
                alert("dkfj");
                console.log(index);
            }
        }
    }
</script>

<style scoped>

    .userInfo{
        background-image: url('https://class.imooc.com//static/module/index/img/diff-bg.png')
    }
    .userInfo q-list {
        border:none
    }

    .router-link-active{
        color:#999999;
        border-right: 4px solid chocolate;
        background: rgba(204,125,132,0.1);
    }
</style>
