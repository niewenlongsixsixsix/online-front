<template>
    <div class="register">
        <q-layout>

            <!--ToolBar-->
            <q-layout-header color="secondary">

                <div class="row justify-center">
                    <div class="col-8">
                        <q-toolbar color="fontcolor"  style="height: 64px;" >

                            <i class="fab fa-phoenix-squadron" style="color: #fd7e14; font-size: 35px"></i>

                            <q-toolbar-title style="background-color: transparent !important;">
                                <strong style="color: #5e5e5e;">酸奶在线网课</strong>
                            </q-toolbar-title>
                        </q-toolbar>
                    </div>
                </div>

            </q-layout-header>


            <!--main 展示内容(轮播图，最新课程，最热课程)-->
            <q-page-container>

                <div class="row  justify-center flex items-center" style="margin-top: 50px">
                    <div class="col-8">
                        <q-stepper color="warning" ref="stepper" alternative-labels style="padding-top: 30px">

                            <!--第一步-->
                            <q-step default name="first" title="邮箱账号">

                                <q-field
                                        icon="local_library"
                                        label="注册类型"
                                        style="padding-top: 15px;padding-bottom: 15px"
                                >
                                    <div >
                                        <q-radio style="color: #979797;" color="warning" v-model="register.type" val="0" left-label label="学生" />
                                        <q-radio style="color: #979797; margin-left: 50px" color="warning" v-model="register.type"  val="1" left-label label="教师" />
                                    </div>


                                </q-field>

                                <q-field
                                        icon="person"
                                        label="用户名"
                                        helper="你的姓名"
                                >
                                    <q-input
                                            v-model="register.username"
                                            color="warning"
                                            float-label="Username"
                                    />
                                </q-field>

                                <q-field
                                        icon="email"
                                        label="邮箱"
                                        helper="我们需要你的邮箱地址发送验证码"
                                >
                                    <q-input
                                            v-model="register.email"
                                            color="warning"
                                            float-label="Email"
                                    />
                                </q-field>

                                <q-field
                                        icon="lock"
                                        label="密码"
                                        helper="登录凭证\口令"
                                >
                                    <q-input
                                            v-model="register.password"
                                            type="password"
                                            color="warning"
                                            float-label="Password"
                                    />
                                </q-field>

                                <!-- 在QStep结尾处为此步骤导航-->
                                <q-stepper-navigation style="float:right">
                                    <q-btn color="warning" @click="firstMethod" label="下一步" />
                                </q-stepper-navigation>
                                <q-inner-loading :visible="sendVerifyCodeVisible">
                                    <q-spinner-facebook size="50px" color="warning"></q-spinner-facebook>
                                </q-inner-loading>
                            </q-step>



                            <!--第二步-->
                            <q-step name="third" title="激活账号">
                                <q-field

                                >
                                    <span style="color: #979797;">验证码已经发送到您的邮箱中(5分钟有效)
                                        <span class="text-warning" style="cursor:pointer;" v-show="show" @click="getCode">重新发送</span>
                                        <span class="text-warning count" style="cursor:pointer;" v-show="!show">{{count}} s</span>
                                    </span>
                                </q-field>
                                <q-field
                                        icon="check_circle"
                                        label="请输入验证码"
                                        helper="发送到邮箱中的验证码,5分钟后失效,需要重新获取"
                                >
                                    <q-input
                                            v-model="register.verifyCode"
                                            color="warning"
                                            float-label="VerifyCode"
                                    />
                                </q-field>
                                <q-stepper-navigation style="float: right;padding-bottom: 30px">
                                    <q-btn color="warning" flat @click="$refs.stepper.previous()" label="返回" />
                                    <q-btn color="warning" @click="validationCode" label="下一步" />
                                </q-stepper-navigation>
                            </q-step>

                            <!--第三步-->
                            <q-step  name="second" title="完善个人信息"  >

                                <q-field
                                        icon="stay_current_portrait"
                                        label="手机号"
                                        helper="方便联系"
                                >
                                    <q-input
                                            v-model="register.phone"
                                            color="warning"
                                            float-label="Phone"
                                    />
                                </q-field>

                                <q-field
                                        icon="location_on"
                                        label="地址"
                                        helper="居住地"
                                >
                                    <q-input
                                            v-model="register.address"
                                            color="warning"
                                            float-label="Address"
                                    />
                                </q-field>

                                <q-stepper-navigation style="float: right;padding-bottom: 30px">
                                    <q-btn color="warning" flat @click="$refs.stepper.previous()" label="返回" />
                                    <q-btn color="warning" @click="registerFinish" label="注册完成" />

                                </q-stepper-navigation>
                            </q-step>

                        </q-stepper>
                    </div>
                </div>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script>
    import QField from "quasar-framework/src/components/field/QField";
    import QInput from "quasar-framework/src/components/input/QInput";
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import QSpinnerFacebook from "quasar-framework/src/components/spinner/QSpinnerFacebook";
    export default {
        name: "RegisterHome",
        components: {QSpinnerFacebook, QBtn, QInput, QField},
        data(){
            return{
                selectedTab:'tab-4',
                sendVerifyCodeVisible:false,
                error2: false,
                inProgress:false,
                warning2: false,
                option:'opt1',
                show: true,
                count: '',
                timer: null,
                register:{
                    type:"0",
                    username:null,
                    email:null,
                    password:null,
                    phone:null,
                    address:null,
                },
                verifyCode:null,
            }
        },

        methods:{
            back(){
                this.inProgress = false;
            },
            next(){
                this.inProgress = true;
            },
            registerFinish(){
              this.$axios({
                  method:'post',
                  url:'/api/register/addUser',
                  data:{
                      register:this.register,
                      verifyCode:this.verifyCode
                  }
              }).then(response=>{
                  if(response.data.success){
                      this.$q.notify({
                          type: 'positive',
                          timeout: 2000,
                          position: 'top',
                          message:"注册成功"
                      })
                      this.$router.push('/login')
                  }else{
                      this.$q.notify({
                          type: 'negative',
                          timeout: 2000,
                          position: 'top',
                          message:response.data.errMsg
                      })
                  }
              })
            },
            validationCode(){
              this.$axios({
                  method:'get',
                  url:'/api/register/validationCode',
                  params:{
                      email:this.register.email,
                      code:this.register.verifyCode,
                  }
              }).then(response=>{
                  if(!response.data.success){
                      this.$q.notify({
                          type: 'negative',
                          timeout: 2000,
                          position: 'top',
                          message:response.data.errMsg
                  })
                  }else{
                      this.$refs.stepper.next();
                  }
              })
            },
            getCode(){
                this.sendVerifyCodeVisible = true;
                this.$axios({
                    method:'get',
                    url:'/api/register/getVerifyCode',
                    params:{
                        email:this.register.email,
                        username:this.register.username
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.$q.notify({
                            type: 'positive',
                            timeout: 2000,
                            position: 'top',
                            message:'验证码已经发送至邮箱'
                        })
                        this.timing();
                    }else{
                        this.$q.notify({
                            type: 'negative',
                            timeout: 2000,
                            position: 'top',
                            message:response.data.errMsg
                        })
                    }
                    this.sendVerifyCodeVisible = false;
                })

            },

            timing(){
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            firstMethod(){
                this.getCode();
                this.$refs.stepper.next();

            }
        },
    }
</script>

<style scoped>
    .q-layout-header{
        box-shadow: none;
    }
</style>
