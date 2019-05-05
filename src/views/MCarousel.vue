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
                    <q-carousel-slide :key="1" img-src="https://images.unsplash.com/photo-1553989348-ce5dc46139e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
                    </q-carousel-slide>
                    <q-carousel-slide  :key="2" img-src="https://images.unsplash.com/photo-1550847067-93887e03cfbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80">
                    </q-carousel-slide>
                    <q-carousel-slide :key="3" img-src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
                    </q-carousel-slide>
                </q-carousel>
            </q-card>

        </div>
    </div>
</template>

<script>
    import { easing } from 'quasar'

    export default {
        name: "MCarousel",
        data(){
            return{
                overshoot: easing.overshoot
            }
        }
    }
</script>

<style scoped>

</style>