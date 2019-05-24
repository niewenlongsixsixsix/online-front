<template>
    <div style="margin-top: 30px;" class="userInfo">

        <q-modal v-model="imgUploadVisible">
            <q-card style="width: 400px; height: 210px;">

                <q-card-title>
                    用户头像更换
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <q-field label="更换用户头像">
                        <q-uploader
                                url="/api/user/changeHeadImg"
                                name="userHeadImg"
                                extensions=".jpg, .jpeg, .png"
                                hide-upload-button
                                @finish="finishResult"
                                ref="imgUpload"
                        />
                    </q-field>
                </q-card-main>
                <q-card-actions align="end" style="margin-right: 10px">

                    <q-btn flat label="取消"  @click="imgUploadVisible = false"/>
                    <q-btn   label="确认提交" @click="imgUpload" color="warning" />

                </q-card-actions>
            </q-card>


        </q-modal>

        <div class="row justify-center  ">
            <div class="col-10">
                <div class="row">
                    <div class="col-3 shadow-2" >
                        <div style="min-height: 150px; display: flex; align-items: center; width: 100%;">
                            <img
                                :src="$store.getters.getUserAvatar"
                                class="headImg"
                                style="width: 100px;
                                cursor: pointer;
                                margin: 0 auto; height: 100px;
                                border-radius: 50%;
                                background-size: cover "
                                @click="updateUserHeadImgBtn"
                            />
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
                    <div class="col-8 shadow-2" style="min-height: 500px;">
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
                    {title:'课程收藏',icon:'voice_chat',path:'/userLayout/MyCourse',color:'secondary'},
                    {title:'我的笔记',icon:'create',path:'/userLayout/MyNotes',color:'purple'},
                    // {title:'消息中心',icon:'textsms',path:'/userLayout/MyMessage',color:'positive'},
                    {title:'安全设置',icon:'settings',path:'/userLayout/SafeSetting',color:'blue'},
                ],
                currentMenuIndex:0,
                imgUploadVisible:false
            }
        },
        methods:{

            imgUpload(){
                this.$refs.imgUpload.upload();
                this.imgUploadVisible = false;
            },
            finishResult(){
                this.getCurrentAvatar();
                this.$q.notify({
                    type: 'positive',
                    timeout: 2000,
                    position: 'top',
                    message:'更新成功'
                })
            },
            updateUserHeadImgBtn(){
               this.imgUploadVisible = true;
            },
            getCurrentAvatar(){
                this.$axios({
                    method:'get',
                    url:'/api/user/getAvatar'
                }).then(response=>{
                    localStorage.setItem("avatar",response.data);
                    this.$store.commit("changeAvatar",response.data);
                })
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
    .headImg{
        transition:all 2s;
    }

    .headImg:hover{
        transform:rotate(360deg);
    }
    .router-link-active{
        color:#999999;
        border-right: 4px solid chocolate;
        background: rgba(204,125,132,0.1);
    }
</style>
