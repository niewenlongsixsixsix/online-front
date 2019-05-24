<template>
    <div class="teacherManager">
        <q-layout>

            <!--ToolBar-->
            <q-layout-header color="secondary" style="box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 3px 2px rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12)">

                <div class="row justify-center">
                    <div class="col-12">
                        <q-toolbar color="fontcolor"  style="height: 64px;" >

                            <i class="fab fa-phoenix-squadron" style="color: #fd7e14; font-size: 35px"></i>

                            <q-toolbar-title style="background-color: transparent !important;">
                                <strong style="color: #5e5e5e;">酸奶网课教师管理中心</strong>
                            </q-toolbar-title>

                        </q-toolbar>
                    </div>
                </div>

                <q-btn flat color="secondary" @click="logout" label="安全退出" />
            </q-layout-header>

            <q-layout-drawer side="left" v-model="teacherManagerMenuVisible">
                    <q-list no-border link  highlight sparse  style="margin-top: 10px">
                        <q-item tag="li"  router-link-active v-for="(item,index) in infoList"  exact :to="item.path" :key="index">
                            <q-item-side :icon="item.icon" :color="item.color" />
                            <q-item-main :label="item.title" />
                        </q-item>
                    </q-list>

            </q-layout-drawer>

            <q-page-container style="padding-left: 0px; padding-top: 100px">
                <router-view/>
            </q-page-container>
        </q-layout>

    </div>
</template>

<script>
    import QPage from "quasar-framework/src/components/layout/QPage";
    import QPageContainer from "quasar-framework/src/components/layout/QPageContainer";
    import QCard from "quasar-framework/src/components/card/QCard";
    export default {
        name: "teacherManagerHome",
        components: {QCard, QPageContainer, QPage},
        data(){
            return{
                teacherManagerMenuVisible:true,
                infoList:[
                    {title:'个人中心',icon:'face',path:'/teacherManagerHome/',color:'negative'},
                    {title:'我的课程',icon:'voice_chat',path:'/teacherManagerHome/teacherManagerCenter',color:'secondary'},
                ],
            }
        },
        methods:{
            logout(){
                this.$axios({
                    method:'get',
                    url:'/api/login/logout'
                }).then(response=>{
                    if(response.data.success){
                        localStorage.removeItem("cookie");
                        this.$router.push("/login")
                        this.$q.notify({
                            type: 'positive',
                            timeout: 1000,
                            position: 'top',
                            message:"退出登录"
                        })
                    }
                })
            },
        }
    }
</script>

<style>

    .teacherManager{
        background-image: url('https://class.imooc.com//static/module/index/img/diff-bg.png')
    }
    .teacherManager .q-layout-drawer{
        width: 100px !important;
        background: transparent !important;
    }

    .teacherManager .router-link-active{
        color:#999999;
        border-right: 4px solid chocolate;
        background: rgba(204,125,132,0.1);
    }
</style>
