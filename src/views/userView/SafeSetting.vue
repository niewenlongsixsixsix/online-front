<template>
    <div class="row justify-center myCourse animated fadeIn" style="padding-top: 50px; padding-bottom: 50px">

        <div class="col-5" style="text-align: center">

            <h5>密码修改</h5>
            <q-field
                    icon="cloud"
                    label="旧密码"
            >
                <q-input type="password" v-model="oldPassword" color="warning" />
            </q-field>
            <q-field
                    icon="cloud"
                    label="新密码"
            >
                <q-input  type="password" v-model="newPassword" color="warning" />
            </q-field>
            <q-btn
                    @click="passwordChange"
                    style="margin-top: 50px; float: right;"
                    color="warning"
                    label="确认修改"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "SafeSetting",
        data(){
            return{
                oldPassword:null,
                newPassword:null,
            }
        },
        methods:{
            passwordChange(){
                this.$axios({
                    method:'post',
                    url:'/api/user/userChangePassword',
                    data:{
                        oldPassword:this.oldPassword,
                        newPassword:this.newPassword
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.$q.notify({
                            type: 'positive',
                            timeout: 2000,
                            position: 'top',
                            message:'修改成功'
                        })
                    }else{
                        this.$q.notify({
                            type: 'negative',
                            timeout: 2000,
                            position: 'top',
                            message:'旧密码错误'
                        })
                    }

                    this.oldPassword = null;
                    this.newPassword = null;
                })
            }
        }
    }
</script>

<style scoped>

</style>
