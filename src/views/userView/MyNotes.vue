<template>
    <div class="row justify-center myCourse animated fadeIn" style="padding-top: 30px; padding-bottom: 50px">

        <div class="col-10">
            <q-list v-for="(item,index) in noteList" :key="index">
                <q-item>
                    <q-item-side :image="'/api/upload/' + item.imgUrl" />
                    <q-item-main>

                        <q-item-tile label>{{item.title}}</q-item-tile>
                        <q-item-tile sublabel> {{item.createTime}}</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline @click="jumpToNote(item)" label="编辑" />
                    </q-item-side>
                </q-item>
                <q-item-separator />
            </q-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyNotes",
        data(){
            return{
                noteList:[]
            }
        },
        methods:{
            getAllNoteByUserId(){
                this.$axios({
                    method:'get',
                    url:'/api/note/getNoteByUserId'
                }).then(response=>{
                    if(response.data.success){
                        this.noteList = response.data.noteList
                    }
                })
            },
            jumpToNote(item){
                console.log(item)
                this.$router.push({
                    name: 'editor',
                    params:{
                        title:item.title,
                        content:item.content,
                        publicVisible:item.publicVisible == 1?true:false,
                        id:item.id
                    }
                });
            }
        },
        created(){
            this.getAllNoteByUserId();
        }
    }
</script>

<style scoped>

</style>
