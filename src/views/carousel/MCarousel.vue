<template>
    <div class="row justify-center">
        <div class="col-10">
            <q-card class="shadow-12" style="border-radius: 10px">
                <q-carousel
                        color="white"
                        arrows
                        autoplay
                        :easing="overshoot"
                        infinite
                        no-swipe
                        quick-nav
                        height="400px"
                        style="margin-top: 80px; margin-bottom: 60px"
                >
                    <slot v-for="(item,index) in HeadLineList " :msg="item">

                    </slot>
                </q-carousel>
            </q-card>

        </div>
    </div>
</template>

<script>
    import { easing } from 'quasar'

    export default {
        name: "MCarousel",
        props:{
            HeadLineList:Array
        },
        data(){
            return{
                overshoot: easing.overshoot,
            }
        },
    }
</script>

<style scoped>

</style>
