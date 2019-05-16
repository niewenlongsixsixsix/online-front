<template>
    <div class="row justify-center myCourse animated fadeIn" style="padding-top: 30px; padding-bottom: 50px">
        <div class="col-10">
            <q-list>
                <q-list-header>我的课程</q-list-header>
                <q-item>
                    <q-item-side image="http://photo.tuchong.com/4067228/f/508035880.jpg" />
                    <q-item-main label="Mountains Documentary" />
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline label="继续观看" />
                    </q-item-side>
                </q-item>
                <q-item-separator />
                <q-item>
                    <q-item-side image="http://b-ssl.duitang.com/uploads/item/201705/29/20170529123626_f32Tv.jpeg" />
                    <q-item-main>
                        <q-item-tile label>Quasar</q-item-tile>
                        <q-item-tile sublabel>Empower your development skills</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline label="继续观看" />
                    </q-item-side>
                </q-item>

                <q-item-separator />
                <q-item>
                    <q-item-side image="http://img1.imgtn.bdimg.com/it/u=647274116,1756187255&fm=26&gp=0.jpg" />
                    <q-item-main>
                        <q-item-tile label style="font-size:25px">2019版SpringBoot</q-item-tile>
                        <q-item-tile sublabel>Empower your development skills</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline label="继续观看" />
                    </q-item-side>
                </q-item>
                <q-item-separator />
                <q-item>
                    <q-item-side image="http://b-ssl.duitang.com/uploads/item/201706/22/20170622131955_h4eZS.thumb.700_0.jpeg" />
                    <q-item-main>
                        <q-item-tile label>Quasar</q-item-tile>
                        <q-item-tile sublabel>Empower your development skills</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline label="继续观看" />
                    </q-item-side>
                </q-item>
                <q-item-separator />
                <q-item>
                    <q-item-side image="http://hbimg.b0.upaiyun.com/9cdf526564eb5b7299f45ab8460d5aadbdaee29c12d1c-eoxEAN_fw658" />
                    <q-item-main>
                        <q-item-tile label>Quasar</q-item-tile>
                        <q-item-tile sublabel>Empower your development skills</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline label="继续观看" />
                    </q-item-side>
                </q-item>
                <q-item-separator />
                <q-item>
                    <q-item-side image="http://img1.imgtn.bdimg.com/it/u=647274116,1756187255&fm=26&gp=0.jpg" />
                    <q-item-main>
                        <q-item-tile label>Quasar</q-item-tile>
                        <q-item-tile sublabel>Empower your development skills</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                        <q-btn  color="warning" size="small" outline label="继续观看" />
                    </q-item-side>
                </q-item>
            </q-list>
                <q-pagination
                        style="margin: 30px auto; width: 300px;"
                        v-model="page4"
                        color="warning"
                        :min="1"
                        :max="5"
                        :max-pages="8"
                        boundary-links
                        direction-links
                />
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyCourse",
        data(){
            return{
                page4: 1
            }
        }
    }
</script>

<style>

    .myCourse .q-btn{
        font-size: 16px;
    }
</style>
