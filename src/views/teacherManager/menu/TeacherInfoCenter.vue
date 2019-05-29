<template>
    <div class="courseManager row justify-center">
        <div class="col-5">
            <div style="width:150px; margin: 0 auto;">
                <img style="width: 100%" src="https://admin.heyui.top/static/images/src/images/avatar.8a80923.png" />
            </div>
            <div class="row text-center">
                <div class="col-12 " style="font-weight: bold">
                    <span style="color:#5e5e5e; font-size: 16px">生而有涯而知也无涯</span>
                </div>

            </div>

            <div style="margin-top: 20px">
                <div class="row justify-center ">
                    <div class="col-8 userInfo">
                        <q-field
                                label="姓名"
                        >
                            <span>{{userInfo.username}}</span>
                        </q-field>
                    </div>
                    <div class="col-8 userInfo">
                        <q-field
                                label="性别"
                        >
                            <span>{{userInfo.gender == 0?'男':'女'}}</span>
                        </q-field>
                    </div>
                    <div class="col-8 userInfo">
                        <q-field
                                label="手机号"
                        >
                            <span>{{userInfo.phone}}</span>
                        </q-field>
                    </div>
                    <div class="col-8 userInfo">
                        <q-field
                                label="邮箱"
                        >
                            <span>{{userInfo.email}}</span>
                        </q-field>
                    </div>
                    <div class="col-8 userInfo">
                        <q-field
                                label="注册时间"
                        >
                            <span>{{userInfo.registerTime}}</span>
                        </q-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TeacherInfoCenter",
        data(){
            return{
                userInfo:null
            }
        },
        methods:{
            getLoginTeacherInfo(){
                const currentLoginUserId = localStorage.getItem("currentLoginUserId");
                this.$axios({
                    method:'get',
                    url:'/api/user/getUserInfoByUserId/' + currentLoginUserId
                }).then(response=>{
                    if(response.data.success){
                        console.log(response.data.userInfo)
                        this.userInfo = response.data.userInfo
                    }
                })
            }
        },
        created(){
            this.getLoginTeacherInfo();
        }
    }
</script>

<style scoped>
    .userInfo{
        margin-top: 15px;
    }
</style>
