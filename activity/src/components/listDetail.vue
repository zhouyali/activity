<template>
    <div class="container listDetail">
        <div id="content" class="content pd-botom" ref='content' v-html="detail">
         </div>
         <footer class="bottom">
            <span class="btn back" @click="goToBack"></span>
         </footer>
    </div>
</template>
<script>
import {Trim} from '@/assets/js/tools'
    export default {
        data() {
            return {
                detail:'',
                showFlag:false
            }
        },
        mounted() {
            this.detail = localStorage.getItem('detail')
            setTimeout(()=>{
                this.showImgs();
                //统一字体
                this.showText();
                this.showTitle()
            },0)
        },
        methods: {
            goToBack() {
                this.$router.go(-1)
            },
            showImgs() {
                let content = document.getElementById('content');
                let resImgs = document.querySelectorAll('.content img');
                let imgs;
                imgs = Array.prototype.slice.call(resImgs,0);
                let cssText = "display:block;width:100%";
                for(var i=0;i<resImgs.length;i++) {
                    resImgs[i].style.display = 'block';
                    resImgs[i].style.width = '100%';
                }      
            },
            showText() {
                let content = document.getElementById('content');
                let resTexts = document.querySelectorAll('font[size="6"]');
                let texts;
                texts = Array.prototype.slice.call(resTexts,0);
                for(var i=0;i<resTexts.length;i++) {
                    resTexts[i].style.size = '';
                    resTexts[i].className = 'selfStyle';
                }                      
            },
            showTitle() {
                let content = document.getElementById('content');
                let resTitles = document.querySelectorAll('font[size="8"]');
                let titles;
                titles = Array.prototype.slice.call(resTitles,0);
                for(var i=0;i<resTitles.length;i++) {
                    resTitles[i].style.size = '';
                    resTitles[i].className = 'largeStyle';
                }                 
            }            
        },
        destroyed() {
           localStorage.removeItem('detail')
        }
    }
</script>
<style lang="scss">
.listDetail {
    .selfStyle {
        font-size: px2rem(30px) !important;
    }
    .largeStyle {
        font-size: px2rem(36px) !important;
    }
    &.container{
        -webkit-overflow-scrolling: touch;
    }
    .content {
        font-size: px2rem(30px);
        color: #333;
        padding:0 px2rem(80px);
        padding-top: px2rem(200px);
        min-height:100%;
        background:url('../assets/image/bg-top.gif') no-repeat top center;
        background-size:100%;
        overflow:hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        width:100%;
    }
    .bottom {
        position: relative;
        width:100%;
        height:px2rem(186px);
        background: url('../assets/image/bg-btm.gif') no-repeat top center;
        background-size:100%;
    }
    .btn {
        display:block;
        width: px2rem(224px);
        height:px2rem(56px);
        position: absolute;
        bottom: px2rem(40px);
        background:url('../assets/image/back.jpg') no-repeat center center;
        background-size: 100%;
        background-size: 100%;
        left:50%;
        margin-left:px2rem(-112px);
    }
}
</style>
