<template>
    <Card>
        <div class="row justify-center">
            <div class="col-7">
                <h4>{{currentNote.title}}</h4>
            </div>
            <div class="col-7">
                <div v-html="currentNote.content">
                </div>

            </div>
        </div>
    </Card>

</template>

<script>
    export default {
        name: "NoteDetail",
        data(){
            return{
                currentNote:null,
            }
        },
        methods:{
            getCurrentNote(noteId){
                this.$axios({
                    method:'get',
                    url:'/api/note/getNoteByPrimaryKey/' + noteId
                }).then(response=>{
                    if(response.data.success){
                        this.currentNote = response.data.noteList
                    }
                })
            }
        },
        created(){
            this.getCurrentNote(this.$route.params.noteId)
        }
    }
</script>

<style scoped>

</style>
