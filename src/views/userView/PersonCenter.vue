<template>
    <div class="row justify-center">
        <div class="col-6" style="  text-align: center ">
            <div style="width:150px; margin: 0 auto;">
                <img style="width: 100%" src="https://admin.heyui.top/static/images/src/images/avatar.8a80923.png" />
            </div>

            <span style="color:#5e5e5e; font-size: 16px">Later equals never</span>

            <q-uploader
                    :url="url"
                    name="smallChapterImg"
                    :additional-fields="userInfo"
                    extensions=".gif, .jpg, .jpeg, .png"
                    hide-upload-button
                    ref="upload"
                    @finish="haha"
            />
            <q-btn label="上传" @click="uploadImg"/>
        </div>
    </div>
</template>

<script>
    import QBtn from "quasar-framework/src/components/btn/QBtn";
    export default {
        name: "PersonCenter",
        components: {QBtn},
        data(){
            return{
                url:'/api/chapter/addSmallerChapter',
                userInfo:[
                    {name:'id',value:3}
                ]
            }
        },
        methods:{
            haha(val){
             alert(val);
            },
            uploadImg(){
                this.$refs.upload.upload();
            }
        }
    }
</script>

<style scoped>

</style>
