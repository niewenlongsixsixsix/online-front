<template>
    <q-layout>
        <div style="margin-top: 60px; margin-bottom: 150px;" class="courseInfo">
            <div class="row justify-center">
                <div class="col-8 shadow-2">
                    <q-card>
                        <q-card-media overlay-position="full" style="text-align: center">
                            <!-- Notice the slot="overlay" -->

                            <q-parallax :src="'/api/upload' + catalog.course.imgUrl" :height="300">
                                <div slot="loading">Loading...</div>
                            </q-parallax>
                            <q-card-title slot="overlay" >
                                <h3>{{catalog.course.title}}</h3>
                                <h5 slot="subtitle">宋一峰</h5>
                            </q-card-title>
                        </q-card-media>

                        <q-tabs inverted no-pane-border  color="warning" v-model="tab" >
                            <!-- 选项卡 - 注意slot="title" -->
                            <q-tab default slot="title" name="1" icon="notes" label="课程目录" />
                            <!--<q-tab  slot="title" name="2" icon="message" label="评论" />-->

                            <!-- 目标 -->
                            <q-tab-pane name="1">
                                <q-list highlight sparse inset-separator link v-for="item in catalog.chapterInfo" :key="catalog.id">
                                    <q-list-header>{{item.bigChapterName}}</q-list-header>
                                    <ChapterList :smallChapters="item.smallChapters">
                                        <template slot-scope="props">
                                            <q-list highlight sparse inset-separator link>
                                                <q-item  @click.native="jumpToVideoPlay(props.msg.id)">
                                                    <q-item-side >
                                                        <q-item-tile color="warning"  icon="play_circle_filled" />
                                                    </q-item-side>
                                                    <q-item-main>
                                                        <q-item-tile label>{{props.msg.title}}</q-item-tile>
                                                    </q-item-main>
                                                </q-item>
                                            </q-list>
                                        </template>
                                    </ChapterList>

                                </q-list>

                            </q-tab-pane>
                            <!--<q-tab-pane name="2">-->
                                <!--<div>-->

                                    <!--<q-list inset-separator sparse>-->
                                        <!--<q-list-header style="margin-bottom: 10px">最新评论<q-btn @click="opened = true" flat style="float: right;"  color="warning" label="我要评论"  /></q-list-header>-->
                                        <!--<q-item>-->
                                            <!--<q-item-side>-->
                                                <!--<q-item-tile avatar>-->
                                                    <!--<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2060761043,284284863&fm=27&gp=0.jpg">-->
                                                <!--</q-item-tile>-->
                                            <!--</q-item-side>-->
                                            <!--<q-item-main>-->
                                                <!--<q-item-tile label >#250</q-item-tile>-->
                                                <!--<q-item-tile sublabel>不开</q-item-tile>-->
                                            <!--</q-item-main>-->
                                            <!--<q-item-side right>-->
                                                <!--1分钟前-->
                                            <!--</q-item-side>-->
                                        <!--</q-item>-->
                                        <!--<q-item>-->
                                            <!--<q-item-side avatar="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3914027674,1618528395&fm=27&gp=0.jpg" />-->
                                            <!--<q-item-main>-->
                                                <!--<q-item-tile label >#251</q-item-tile>-->
                                                <!--<q-item-tile sublabel>有人吗，开黑，我亚索贼6</q-item-tile>-->
                                            <!--</q-item-main>-->
                                            <!--<q-item-side right>-->
                                                <!--3分钟前-->
                                            <!--</q-item-side>-->
                                        <!--</q-item>-->

                                        <!--<q-item>-->
                                            <!--<q-item-side>-->
                                                <!--<q-item-tile avatar>-->
                                                    <!--<img src="http://b-ssl.duitang.com/uploads/item/201606/23/20160623160926_fxMCc.jpeg">-->
                                                <!--</q-item-tile>-->
                                            <!--</q-item-side>-->
                                            <!--<q-item-main>-->
                                                <!--<q-item-tile label >#1</q-item-tile>-->
                                                <!--<q-item-tile sublabel>抢楼成功，哈哈</q-item-tile>-->
                                            <!--</q-item-main>-->
                                            <!--<q-item-side right>-->
                                                <!--1小时前-->
                                            <!--</q-item-side>-->
                                        <!--</q-item>-->
                                        <!--<q-item>-->
                                            <!--<q-item-side avatar="http://img4.duitang.com/uploads/item/201404/19/20140419213843_CYkKk.thumb.700_0.jpeg" />-->
                                            <!--<q-item-main>-->
                                                <!--<q-item-tile label >#2</q-item-tile>-->
                                                <!--<q-item-tile sublabel>抢楼失败，/(ㄒoㄒ)/~~</q-item-tile>-->
                                            <!--</q-item-main>-->
                                            <!--<q-item-side right>-->
                                                <!--10分钟前-->
                                            <!--</q-item-side>-->
                                        <!--</q-item>-->
                                        <!--<q-item>-->
                                            <!--<q-item-side avatar="http://img5.duitang.com/uploads/item/201407/30/20140730211047_EyXEr.thumb.700_0.jpeg" />-->
                                            <!--<q-item-main>-->
                                                <!--<q-item-tile label >#3</q-item-tile>-->
                                                <!--<q-item-tile sublabel>长治学院北校区6号宿舍楼420的李奇俊。</q-item-tile>-->
                                            <!--</q-item-main>-->
                                            <!--<q-item-side right>-->
                                                <!--3分钟前-->
                                            <!--</q-item-side>-->
                                        <!--</q-item>-->
                                        <!--<q-item>-->
                                            <!--<q-item-side avatar="http://b-ssl.duitang.com/uploads/item/201710/01/20171001172944_m8i3w.thumb.700_0.jpeg" />-->
                                            <!--<q-item-main>-->
                                                <!--<q-item-tile label >#4</q-item-tile>-->
                                                <!--<q-item-tile sublabel>楼上，我已经给他生过狒狒了。</q-item-tile>-->
                                            <!--</q-item-main>-->
                                            <!--<q-item-side right>-->
                                                <!--刚刚-->
                                            <!--</q-item-side>-->
                                        <!--</q-item>-->
                                    <!--</q-list>-->

                                <!--</div>-->
                            <!--</q-tab-pane>-->
                        </q-tabs>

                    </q-card>


                </div>
                <!--<q-modal v-model="opened" >-->
                    <!--<q-modal-layout style="width: 600px; border-radius:10px;  height: 230px;">-->
                        <!--<q-toolbar color="warning" slot="header">-->
                            <!--<q-btn flat round  icon="clear" @click="opened = false"  size="18px" />-->
                            <!--<q-toolbar-title>-->
                                <!--发表评价-->
                            <!--</q-toolbar-title>-->
                            <!--<q-btn flat round  icon="send"   size="18px" />-->
                        <!--</q-toolbar>-->
                        <!--<q-input-->
                                <!--type="textarea"-->
                                <!--float-label="请发表你的评价"-->
                                <!--:max-height="50"-->
                                <!--rows="5"-->
                                <!--v-model="commentContent"-->
                                <!--color="warning"-->
                        <!--/>-->
                    <!--</q-modal-layout>-->

                <!--</q-modal>-->
            </div>
        </div>

        <q-page-sticky v-if="loveVisible"  position="right" :offset="[30, 30]">
            <q-btn round color="negative" @click="addLove" icon="favorite_border" />
        </q-page-sticky>
        <q-page-sticky v-else position="right" :offset="[30, 30]">
            <q-btn round color="negative" @click="deleteLove" icon="favorite" />
        </q-page-sticky>
    </q-layout>

</template>

<script>
    import QCardMain from "quasar-framework/src/components/card/QCardMain";
    import E from 'wangeditor'
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    import QModalLayout from "quasar-framework/src/components/modal/QModalLayout";
    import ChapterList from "@/views/courseDetail/ChapterList";
    import QLayout from "quasar-framework/src/components/layout/QLayout";

    export default {
        name: "CourseInfo",
        components: {QLayout, QModalLayout, QBtn, QCardMain,ChapterList},
        data(){
            return{
                editor:null,
                loveVisible:true,
                tab:'1',
                commentContent:'',
                opened:false,
                catalog:[]
            }

        },
        methods:{
            addLove(){
              this.$axios({
                  method:'get',
                  url:'/api/loveCourse/addLoveCourse/' + this.$route.params.courseId
              }).then(response=>{
                  if(response.data.success){
                      this.checkLoveCourseStatus();
                      this.$q.notify({
                          type: 'positive',
                          timeout: 2000,
                          position: 'top',
                          message:'收藏成功'
                      })
                  }
              })
            },

            deleteLove(){
                this.$axios({
                    method:'get',
                    url:'/api/loveCourse/deleteLoveCourse/' + this.$route.params.courseId
                }).then(response=>{
                    if(response.data.success){
                        this.checkLoveCourseStatus();
                        this.$q.notify({
                            type: 'negative',
                            timeout: 2000,
                            position: 'top',
                            message:'取消收藏'
                        })
                    }
                })
            },
            jumpToVideoPlay(smallChapterId){
                this.$router.push("/ChapterVideoLayout/" + smallChapterId)
            },
          getCatalogByCourseId(courseId){
              this.$axios({
                  method:'get',
                  url:'/api/smallChapter/getCatalogByCourseId/' + courseId
              }).then(response=>{
                  this.catalog = response.data
                  console.log(this.catalog);
              })
          },
            checkLoveCourseStatus(){
                this.$axios({
                    method:'get',
                    url:'/api/loveCourse/checkStatus/' + this.$route.params.courseId
                }).then(response=>{
                    if(response.data){
                        this.loveVisible = false
                    }else{
                        this.loveVisible = true
                    }
                })
            }
        },
        created(){
          this.getCatalogByCourseId(this.$route.params.courseId);
        },
        mounted(){
            this.checkLoveCourseStatus();
        }
    }
</script>

<style>

    .courseInfo .q-item-label{
        color: #555;
    }
    .courseInfo .q-item-sublabel{
        color:#000;
    }

    .courseInfo .w-e-text{
        overflow-y: auto;
    }

    .courseInfo .q-layout-footer{
        box-shadow: none;
    }
</style>
