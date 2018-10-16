
Vue.use(VueRouter)

var router = new VueRouter({
    routes: [
        { name: 'home', path: '/home', component: Home },
        { name: 'master', path: '/master', component: Master },
    //    { name: 'my', path: '/my', component: My },
        { name: 'article', path: '/article', component: Article },
        { name: 'more', path: '/more', component: More },
        { name: 'comolist', path: '/comolist', component: Comolist },
        { name: 'bought', path: '/bought', component: Bought },
        { name: 'userInfo', path: '/userInfo', component: UserInfo },
         
        
    ]
})

var App = {
    template: `
    <div>
        <router-view v-on:getId="getID" :mes="getArtId"></router-view>
        <ul class="nav" :style="{display:flag}" ref="ul" @click="cActive">
            <router-link :to='{name:"home"}' data-map="index"><img :src='homeSrc' data-map="index">首页</router-link>
            <router-link :to='{name:"master"}' data-map="master"><img :src='masterSrc' data-map="master">大师推球</router-link>
            
        </ul>
    </div>
    `,
    /**
        <ul class="nav" :style="{display:flag}" ref="ul" @click="cActive"> 
            <router-link :to='{name:"my"}' :userIcon="userIcon" data-map="user"><img :src='mySrc' data-map="user" style="display:none">个人中心</router-link>
        </ul>   
    */
    data: function () {
        return {
            mySrc: './images/my.png',
            masterSrc: './images/master.png',
            homeSrc: './images/home.png',
            userIcon: './images/user.jpg',
            flag:"flex",
            getArtId:'', // 获取文章id
        }
    },
    updated() {
        this.chackBar()
    },
    methods:{
        cActive:function(e){ 
          // 修改点击样式变红 切换图实现
            var dom = e.target
            var data = dom.getAttribute("data-map") 
            data == "index" ? this.homeSrc = './images/homing.png' : this.homeSrc = './images/home.png'
            data == "master" ? this.masterSrc = './images/mastering.png' : this.masterSrc  = './images/master.png'
            data == "user" ? this.mySrc = './images/mying.png' : this.mySrc = './images/my.png'
            
        },
        getID:function(index){
            this.getArtId = index // 将获取到的文章id存到组件的getArtId里面 
        }
       
    },

}

Vue.prototype.chackBar = function(){
    // 检测路由 显示菜单
    var hrefSplit = window.location.href.split("#")[1]
    if(hrefSplit == "/master" || hrefSplit == "/home" || hrefSplit == "/my"){
        this.flag = "flex"
    }else{
    //    console.log(this.$refs)
        this.flag = "none"
    }
    
}

 new Vue({
    el: '#app',
    router: router,
    components: {
        app: App
    },
    data:{
        isShow:false
    },
    template: '<app :isShow="isShow"/>',
    mounted() {
        this.changeUrl()
    },
    methods:{
        changeUrl:function(){

            // 默认进入首页
            var hrefSplit = window.location.href.split("#")[1]
           
            if(hrefSplit == "/"){
                window.location.href = window.location.href + "home"
            }
        },
        

    }

})
