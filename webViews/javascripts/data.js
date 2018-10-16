var More = {
    template: ` 
    <div class='list'>
        <router-link :to='{name:"article"}' v-for="item in titleList"  >
            <div class='list-item' @click="getArtId(item.id)"  :data-id="item.id" > 
                    <div class='today' v-if="item.isNew">最新</div>
                <div class="items-box">
                    <div class='item-image'>
                        <img src='./images/sheep.png'>
                    </div>
                    <div class='item-main'>
                        <div class='item-title'>{{item.title}}</div>
                        <div class='other'>
                            <div class='price'>
                                <img src='./images/pay.png'>
                                <span>{{item.price}}</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <img class='over' src='./images/over.png' v-if="item.isEndGame">
            </div>
        </router-link>
        
    </div>`,

        data: function () {
            return {
                display: false,
                titleList: {}, // 首页文章列表 
            }
        },
        methods: {
            sendTofather: function () {
                this.display = false
                this.$emit("getHomeList", this.display)
            },
            getArtId: function (index) {
                this.$emit('getId', index)
            }
        },
        beforeMount() {
    
            // 获取首页文章列表接口
            // /webarticle/getarticle?action=getList
    
            // 获取文章内容接口
            // /webarticle/getarticle?action=articleinfo&artid=888888
    
            // 大师推球接口
            // /webkol/getKolList
    
            var that = this
            $.ajax({
                url: '/webarticle/getarticle?action=getList',
                type: "GET",
                async: false,
                dataType: 'JSON',
                success: function (res) { 
                    that.titleList = res 
                }
            });
    
    
        },
        mounted() {
            var ul = document.querySelector(".nav")
            ul.style.display = "flex"
            this.display = true
            this.$emit("getHomeList", this.display) 
        },

}

var Home = {
    template: `
        <div>
            <div class="main-view">
                <div class="wraper-main">
                    <div class='top-scroll'>
                        <span class='top-text'>推球集合仅有偿提供网络搜索各大著名足球、篮球解说推荐文章。非购彩，非合买，非跟单，仅供参考。购彩请选择中国体育彩票。</span>
                    </div>

                    <div class='list-ul'>
                        <div class='list-top'>
                            <div class='new'>最新料</div>
                            <router-link :to='{name:"more"}' >
                                <div class='more'>更多</div>
                            </router-link>
                        </div>

                        <div class='list'>
                            <router-link :to='{name:"article"}' v-for="item in titleList"  >
                                <div class='list-item' @click="getArtId(item.id)"  :data-id="item.id" > 
                                        <div class='today' v-if="item.isNew">最新</div>
                                    <div class="items-box">
                                        <div class='item-image'>
                                            <img src='./images/sheep.png'>
                                        </div>
                                        <div class='item-main'>
                                            <div class='item-title'>{{item.title}}</div>
                                            <div class='other'>
                                                <div class='price'>
                                                    <img src='./images/pay.png'>
                                                    <span>{{item.price}}</span>
                                                </div>
                                                 
                                            </div>
                                        </div>
                                    </div>
                                    <img class='over' src='./images/over.png' v-if="item.isEndGame">
                                </div>
                            </router-link>
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>`,

    data: function () {
        return {
            display: false,
            titleList: {}, // 首页文章列表 
        }
    },
    methods: {
        sendTofather: function () {
            this.display = false
            this.$emit("getHomeList", this.display)
        },
        getArtId: function (index) {
            this.$emit('getId', index)
        }
    },
    beforeMount() {

        // 获取首页文章列表接口
        // /webarticle/getarticle?action=getList

        // 获取文章内容接口
        // /webarticle/getarticle?action=articleinfo&artid=888888

        // 大师推球接口
        // /webkol/getKolList

        var that = this
        $.ajax({
            url: '/webarticle/getarticle?action=getList',
            type: "GET",
            async: false,
            dataType: 'JSON',
            success: function (res) { 
                that.titleList = res 
            }
        });


    },
    mounted() {
        var ul = document.querySelector(".nav")
        ul.style.display = "flex"
        this.display = true
        this.$emit("getHomeList", this.display) 
    },
}
var Master = {
    template: ` 
        <div class='list'>
            <router-link :to='{name:"comolist"}' v-for="item in masterList">
                <div class='list-item '> 
                    <div class="items-box">
                        <div class='item-image'>
                            <img src='./images/sheep.png' />
                        </div>
                        <div class='item-main'>
                            <div class='item-title '>{{item.author_name}}</div>
                            <div class='item-about '>这里是作者的相关介绍这 里是作者的相关介绍这里是作者的相关介绍 </div>
                        
                        </div>
                    </div>
                </div>
            </router-link> 
        </div>`,
    data: function () {
        return {
            display: false,
            masterList: [
                {
                    "id": 888,
                    "title": "杨哥贼帅",
                    "author_id": "5",
                    "author_name": "亮亮",
                    "price": "9.99",
                    "isNew": true,
                    "isEndGame": false,
                },

            ], // 首页文章列表
        }
    },
    methods: {
        sendTofather: function () {
            this.display = false
            this.$emit("getHomeList", this.display)
        }
    },
    mounted() {
        var ul = document.querySelector(".nav")
        ul.style.display = "flex"
        this.display = true
        this.$emit("getHomeList", this.display)

    },
    beforeMount: function () {

        // 获取文章内容接口
        // /webarticle/getarticle?action=articleinfo&artid=888888

        // 大师推球接口
        // /webkol/getKolList

        var that = this
        $.ajax({
            url: '/webkol/getKolList',
            type: "GET",
            async: false,
            dataType: 'JSON',
            success: function (res) {
                // var data = JSON.parse(res)
                that.masterList = res
                console.log(res)
            }
        });
    }
}
var My = {
    template: `
    <div>
    <div class="my-view">
        <div class="view-card">
            <div class="mine">
                <router-link :to="{name:'userInfo'}">
                <div class="user" >
                    <img src="./images/user.jpg" />
                    <span>这么长的名字一定不长的名字一定不  会显示全</span>
                </div>
                </router-link>

                <div class="menu">
                    <router-link :to='{name:"bought"}'>
                        <div class="items">
                            <img src="./images/history.png">
                            <span>已购买文章</span>
                        </div>
                    </router-link>
                    <div class="items">
                        <img src="./images/favoriting.png">
                        <span>我的收藏</span>
                    </div>
                    <div class="items">
                        <img src="./images/history.png">
                        <span>已购买文章</span>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    </div>`,
    data: function () {
        return {

        }
    }
}

var Article = {
    beforeMount() {

        // 获取文章内容接口
        // /webarticle/getarticle?action=articleinfo&artid=888888 
        var artId = this.artId 
        var that = this
        $.ajax({
            url: '/webarticle/getarticle?action=articleinfo&artid=' + artId,
            type: "GET",
            async: false,
            dataType: 'JSON',
            success: function (res) { 
                that.artArr = res 
                that.saveArticleIinner = res.free_text
            }
        });
    },
    mounted() {

        var ul = document.querySelector(".nav")
        ul.style.display = "none"
        this.chackBar()
        var articleInner = document.querySelector('.article-body')
        articleInner.innerHTML = this.saveArticleIinner

    },
    data: function () {
        return {
            artArr: null,
            isExi: true,
            isBlock: "none", // 后面如果还有需求 为block
            article: 'article',
            saveArticleIinner: "",
            artId: this.mes,
        }
    },
    methods: {
        articleShow: function () {
            this.isExi = false,
                this.isBlock = "none"
        }
    },
    props: ['mes'],
    template: `  <div class="wrapper">
        <div :class='{article, payLine: isExi}'>
        <div class='title'>{{artArr.title}}</div>
        <div class='about-me'>
            <span>{{artArr.createtime}}</span>
            <span class='blue'>{{artArr.author_name}}</span>
        </div>
        <div class='recover'   :style="{display:isBlock}"  >
            <div class='pay-btn' @click='articleShow'>支付9.99元后继续查看</div>
        </div>
        <div class='article-body'> 
        </div>
        </div>
    
        <div class='message' style='display:none'>
        <div class='top'>
            <div class='good'>
    
            <img src='./images/good.png'>
            <span>6548</span>
            </div>
    
            <div class='leave-mess'>
            <img src='./images/edit.png'>
            <span>留言</span>
            </div>
        </div>
    
        <div class='mess-list'>
            <div class='mess-item'>
            <img src='./images/user.jpg' mode='widthFix'>
            <div class='mess-body'>
                <span class='userName'>奔跑的麻辣小龙虾</span>
                <span>666，分析得不错666分析得不错666分析得不错666分析得不错666分析得不错</span>
            </div>
            </div>
    
        </div>
        </div>
    
    </div>`
}

// Comolist 商品列表
var Comolist = {
    template: ` 
    <div class='list'>
        <div class="list-nav">作者A</div>
        <router-link :to='{name:"article"}'>
        <div class='list-item '>
            <div class='today'>最新</div>
            <img class='over' src='./images/over.png' />
            <div class="items-box">
            <div class='item-image'>
                <img src='./images/sheep.png' />
            </div>
            <div class='item-main'>
                <div class='item-title '>艾弗艾弗森森 篮球 06:45</div>
                <div class='item-about '>这里是相关介绍 或是获取文章开头</div>
                <div class='other'>
                <div class='see'>
                    <img src='./images/see.png' />
                    <span>65895</span>
                </div>
                <div class='favor'>
                    <img src='./images/good.png' />
                    <span>95685</span>
                </div>
                <div class='price'>
                    <img src='./images/pay.png' />
                    <span>6.99</span>
                </div>

                </div>
            </div>
            </div>
        </div>
        </router-link>

    </div>`
}

var Bought = {
    template: ` 
    <div class='list'> 
        <router-link :to='{name:"article"}'>
        <div class='list-item '>
            <div class='today'>最新</div>
            <img class='over' src='./images/over.png' />
            <div class="items-box">
            <div class='item-image'>
                <img src='./images/sheep.png' />
            </div>
            <div class='item-main'>
                <div class='item-title '>艾弗艾弗森森 篮球 06:45</div>
                <div class='item-about '>这里是相关介绍 或是获取文章开头</div>
                <div class='other'>
                <div class='see'>
                    <img src='./images/see.png' />
                    <span>65895</span>
                </div>
                <div class='favor'>
                    <img src='./images/good.png' />
                    <span>95685</span>
                </div>
 

                </div>
            </div>
            </div>
        </div>
        </router-link>

    </div>`
}

var UserInfo = {
    template: `   
    <form class="form-list">
        <div class='form-div'>
            <div class='name-div'>
                <label>姓名</label>
                <label class='tips'>（8个汉字，16个英文字符）</label>
            </div>
            <input type='text' name="userName" />
            <label>手机号</label>
            <input type='text' name="userPhone" />
            <label>支付宝账号</label>
            <input type='text' name="aliPay" placeholder='适用于商户号未开通[企业支付到零钱]' />
            <div class='name-div'>
                <label>详细介绍下自己</label>
                <label class='tips'>（140个字以内）</label>
            </div>
            <textarea class='aboutUser'></textarea>
        </div>

        <button class="submit">提交保存</button>
    </form>`
}
