<template>
    <div class="login">
        <q-card style="width: 350px; height: 550px;background: #fff; border-radius: 5px;padding:15px;text-align: center;">

            <img src="https://admin.heyui.top//static/images/src/images/avatar.8a80923.png" style="  width: 200px; height: 200px;"/>

            <p style="font-size:18px; font-weight: bold ">酸奶在线网课登录</p>
            <q-field
                    icon="person"
                    icon-color="light-blue"
            >
                <q-input float-label="用户名" v-model="form.username" color="light-blue"   @keyup.enter="simulateSubmit"/>
            </q-field>

            <q-field
                    icon-color="light-blue"
                icon="lock">
                <q-input float-label="密码"  type="password" v-model="form.password" color="light-blue"  @keyup.enter="simulateSubmit"/>
            </q-field>

            <q-field>
                <q-toggle v-model="checked"
                          style="float:left;font-size: 14px; margin-top: 15px; margin-left: 3px;"
                          icon="tag_faces"
                          color="light-blue"
                          label="记住密码" />
                <span class="forgetPassword notificeText">
                    忘记密码?
                </span>
            </q-field>
            <!--<div>-->
                <!--<q-input-->
                        <!--v-model="form.email"-->
                        <!--@blur="$v.form.email.$touch"-->
                        <!--@keyup.enter="submit"-->
                        <!--:error="$v.form.email.$error"-->
                <!--/>-->

                <!--<q-btn color="primary" @click="submit">Submit</q-btn>-->
            <!--</div>-->
            <q-field
            >
                <!--<q-btn :loading="loading" dark-percentage @click="simulateProgress" label="Button Label" color="light-blue">-->
                    <!--<span slot="loading">-->
                        <!--登陆中&nbsp;  <q-spinner-facebook slot="loading" size="20px" />-->
                    <!--</span>-->
                <!--</q-btn>-->
                    <!--
                      一个带有v-model设置来控制提交的按钮。
                      v-model范围变量必须是严格的布尔值
                    -->
                    <q-btn :loading="submitting" style="width: 250px; margin-top: 20px"  @click="simulateSubmit" label="登录" color="light-blue">
                        <q-spinner-facebook slot="loading" />
                    </q-btn>
            </q-field>
            <q-field>
                <span @click="submit" class="toRegister notificeText">
                    注册账号->
                </span>
            </q-field>
        </q-card>

    </div>
</template>

<script>
    import QCard from "quasar-framework/src/components/card/QCard";
    import QField from "quasar-framework/src/components/field/QField";
    import required from "vuelidate/src/validators/required";
    import email from "vuelidate/src/validators/email";
    export default {
        components: {QField, QCard},
        data(){
            return{
                loading: false,
                test: '',
                checked:false,
                submitting: false,
                form: {
                    username:'',
                    password:'',
                    email: ''
                }
            }
        },
        validations: {
            form: {
                email: { required, email  }
            }
        },
        methods:{
            submit(){
                this.$axios({
                    method:'get',
                    url:'/api/user/getAllUser'
                }).then(response=>{
                    console.log(response.data)
                })
            },
            simulateSubmit () {
                this.submitting = true
                if(this.form.username == '' || this.form.password == ''){
                    setTimeout(()=>{
                        this.$q.notify({
                            type: 'warning',
                            timeout: 2000,
                            position: 'top',
                            message:'请输入账号或者密码'
                        })
                        this.submitting = false
                    },1000)

                    return;
                }

                this.$axios({
                    method:'post',
                    url:'/api/login/AccountAuth/0',
                    data:{
                        username:this.form.username,
                        password:this.form.password
                    },
                    withCredentials : true
                }).then(response=>{
                    setTimeout(()=>{
                        if(response.data.success){
                            localStorage.setItem("cookie",document.cookie);
                            localStorage.setItem("type",response.data.type)
                            console.log(localStorage.getItem("cookie"))
                            localStorage.setItem("currentLoginUserId",response.data.userId);
                            localStorage.setItem("avatar",response.data.avatar);
                            this.$store.commit('changeAvatar',response.data.avatar);
                            this.$q.notify({
                                type: 'positive',
                                timeout: 2000,
                                position: 'top',
                                message:'登录成功'
                            })
                            if(response.data.type == 0){
                                this.$router.push("/")
                            }else{
                                this.$router.push("/teacherManagerHome")
                            }

                        }else{
                            this.$q.notify({
                                type: 'negative',
                                timeout: 1000,
                                position: 'top',
                                message:response.data.errMsg
                            })
                        }
                        this.submitting = false
                    },2000)

                })
                // 在这里模拟延迟。
                // 当我们完成后，我们重置“submitting”布尔值为false以恢复初始状态。
            }
        }
    }
</script>

<style scoped>
    .login{
        background:linear-gradient(to bottom right, #00CCFF , #6666FF);
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        color: #515a6e;
    }

    .q-field-icon{
        color: #515a6e;
    }


    .notificeText{
        float:right;
        font-size: 10px;
        margin-left: 3px;
        cursor:pointer;
    }
    .forgetPassword{
        margin-top: 15px;
    }


    .toRegister{
        margin-top: 20px;
    }
    .notificeText:hover{
        color: #03a9f4 !important;
    }

</style>
