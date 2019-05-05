<template>
    <q-layout id="main">
        <q-layout-drawer
                side="left"
                v-model="drawer"
        >
                <q-list highlight link dark style="background: #41b883;">
                    <q-item>
                        <q-item-side>
                            <q-item-tile >
                                <q-icon name="home" size="30px" color="white" />
                            </q-item-tile>
                        </q-item-side>
                        <q-item-main label="首页" />
                    </q-item>
                    <q-item-separator />
                    <q-list-header>用户管理</q-list-header>
                    <q-item>
                        <q-item-side>
                            <q-item-tile >
                                <q-icon name="work" size="30px" color="white" />
                            </q-item-tile>
                        </q-item-side>
                        <q-item-main label="John Doe" />
                    </q-item>
                    <q-item>
                        <q-item-side>
                            <q-item-tile >
                                <q-icon name="work" size="30px" color="white" />
                            </q-item-tile>
                        </q-item-side>
                        <q-item-main label="Jim Doe" />
                    </q-item>
                    <q-item-separator />
                    <q-list-header>Previous chats</q-list-header>
                    <q-item>
                        <q-item-side>
                            <q-item-tile >
                                <q-icon name="work" size="30px" color="white" />
                            </q-item-tile>
                        </q-item-side>
                        <q-item-main label="Jack Doe" />
                    </q-item>
                </q-list>
        </q-layout-drawer>



        <q-layout-header style="background: #fff;">
            <q-toolbar style="height: 64px; ">
                <!-- showLeft是附加到下面的左侧侧滑面板的模型-->
                <q-btn
                        flat round
                        style="font-size: 20px"
                        icon="menu"
                />

                <q-toolbar-title>
                    <strong>万千城市网络课程后台管理</strong>
                </q-toolbar-title>

                <!-- showRight是附加到下面的右侧侧滑面板的模型 -->
                <q-btn
                        flat round dense
                        @click="Login"
                        icon="fab fa-github"
                        style="font-size: 20px"
                />
                <q-btn
                        flat round dense
                        icon="room"
                        style="font-size: 20px"
                />
                <q-btn
                        flat round dense
                        @click="fullScreen"
                        style="font-size: 20px"
                        icon="zoom_out_map"
                />
            </q-toolbar>


            <q-card style="padding: 5px 0; ">
                <q-breadcrumbs style="margin-top: 5px;  margin-bottom: 10px; margin-left: 2px">
                    <q-breadcrumbs-el  label="首页" icon="home" />
                    <q-breadcrumbs-el  label="学生管理" icon="widgets" />
                    <q-breadcrumbs-el label="添加学生" icon="navigation" />
                </q-breadcrumbs>
            </q-card>


        </q-layout-header>
        <!-- 必需的 -->
        <q-page-container>
            <div class="row justify-around" style="padding-top: 40px;" >
                <div class="col-5">
                    <q-card>
                        <div id="ech"  style="height: 300px;">
                        </div>
                    </q-card>
                </div>
                <div class="col-5">
                    <q-card>
                        <div id="ech2"  style="height: 300px;">
                        </div>
                    </q-card>
                </div>
            </div>
        </q-page-container>

    </q-layout>

</template>

<script>
    import QLayout from "quasar-framework/src/components/layout/QLayout";
    import QLayoutHeader from "quasar-framework/src/components/layout/QLayoutHeader";
    import QCard from "quasar-framework/src/components/card/QCard";
    import macarons from '../../theme/macarons.js'

    export default {
        name: 'LayoutDefault',
        components: {
            QCard,
            QLayoutHeader,
            QLayout,
        },
        mounted(){
        },
        data () {
            return {
                drawer:true,
                miniState: false,
                showLeft : false,
                leftDrawerOpen: this.$q.platform.is.desktop,
                columns: [
                    { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
                    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
                    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
                    { name: 'protein', label: 'Protein (g)', field: 'protein' },
                    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
                    { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
                    { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }],
                tableData: []
            }
        },
        methods: {

            dataFormatter(obj) {
        let pList = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
                let temp;
        for (let year = 2002; year <= 2011; year++) {
            let max = 0;
            let sum = 0;
            temp = obj[year];
            for (let i = 0, l = temp.length; i < l; i++) {
                max = Math.max(max, temp[i]);
                sum += temp[i];
                obj[year][i] = {
                    name : pList[i],
                    value : temp[i]
                }
            }
            obj[year + 'max'] = Math.floor(max / 100) * 100;
            obj[year + 'sum'] = sum;
        }
        return obj;
            },
            fullScreen(){
                this.$q.fullscreen.toggle()
            },
            alert () {
                this.$q.dialog({
                    title: 'FAB',
                    message: 'Good job! Keep it going.'
                })
            },
            notify (icon) {
                this.$q.notify({
                    icon,
                    message: 'So you want your ' + icon + 's, huh?'
                })
            },
            drawChart(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('ech'),'macarons');
                let myChart2 = this.$echarts.init(document.getElementById('ech2'),'macarons');
                // 绘制图表
                myChart.setOption({
                    angleAxis: {
                    },
                    radiusAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四'],
                        z: 10
                    },
                    polar: {
                    },
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 8],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['A', 'B', 'C']
                    }
                });

                myChart2.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['蒸发量','降水量','平均温度']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '水量',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} ml'
                            }
                        },
                        {
                            type: 'value',
                            name: '温度',
                            min: 0,
                            max: 25,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'蒸发量',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name:'降水量',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'平均温度',
                            type:'line',
                            yAxisIndex: 1,
                            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        }
                    ]
                });
            }
        },

        mounted() {
            this.drawChart();
        }

    }
</script>

<style>
    .custom-caption {
        text-align: center;
        padding: 12px;
        color: grey;
        background: rgba(0, 0, 0, 0.5);
    }
    #main .q-layout-header{
        box-shadow: none;
    }

    #main .q-list{
        position: absolute;
        height: 100%;
        width: 300px;
        border:none;
    }

    #main .q-breadcrumbs-separator{
        color:#333 !important;
    }
</style>
