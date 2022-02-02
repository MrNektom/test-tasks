import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js";

function timeout(time) {
    return new Promise((res,rej)=>setTimeout(()=>res(),time))
}

function wait(et, type) {
    return new Promise((res, rej)=>{
        let h = e => {
            res(e)
            et.removeEventListener(type, h);
        }
        et.addEventListener(type,h);
    })
}
let sounds = [
    new Audio("/1/assets/1.mp3"),
    new Audio("/1/assets/2.mp3"),
    new Audio("/1/assets/3.mp3"),
    new Audio("/1/assets/4.mp3"),
]

let app = new Vue({
    data:{
        round:0,
        seq:[Math.round(Math.random()*3+1)],
        recivied:[],
        difficulty:0,
        isRunning:false
    },
    methods:{
        async start(){
            this.play()
        },
        async play(){
            if (this.isRunning) {
                return
            }
            this.isRunning = 0
            this.isRunning = true
            let success = true;
            while (success) {
                await this.playSeq()
                await this.req()
                if(success = this.eq()){
                    this.recivied.length = 0;
                    this.seq.push(Math.round(Math.random()*3+1))
                }
                this.round++
            }
            this.isRunning = false
        },
        recivie(num){
            if (document.querySelector("#pad").classList.contains("played") || !this.isRunning) {
                return
            }
            this.recivied.push(num)
            if (this.recivied.length < this.seq.length) {
                sounds[num-1].play()
            }
            if (this.recivied.length == this.seq.length) {
                this.$emit("recivied")
            }
        },
        req(){
            return new Promise((resolve, reject)=>{
                this.$once("recivied",()=>resolve())
            })
        },
        eq(){
            if(this.seq.length != this.recivied.length) {
                return false
            }
            for (let i = 0; i < this.recivied.length; i++) {
                if (this.seq[i] != this.recivied[i]) {
                    return false
                }
            }
            return true
        },
        async playSeq(){
            let pad = document.querySelector("#pad");
            pad.classList.add("played")
            for (const num of this.seq) {
                await this.fire(num)
            }
            pad.classList.remove("played")
        },
        async fire(num){
            let selector
            switch (num) {
                case 1:
                    selector = "one"
                    break;
                case 2:
                    selector = "two"
                    break;
                case 3:
                    selector = "three"
                    break;
                case 4:
                    selector = "four"
                    break;
                                    
            }
            selector = `#pad #${selector}`
            let button = document.querySelector(selector)
            sounds[num-1].play()
            let anim = button.animate([
                {
                    transform:"scale(1)"
                },{
                    transform:"scale(0.95)"
                }
            ],{
                duration:200,
                fill:"forwards"
            })
            await wait(anim, "finish")
            button.classList.add("fire")
            switch (this.difficulty) {
                case 0:
                    await timeout(1500)
                    break;
                case 1:
                    await timeout(1000)
                    break;
                case 2:
                    await timeout(400)
                    break;
                default:
                    break;
            }
            anim.cancel()
            button.classList.remove("fire")
            anim = button.animate([
                {
                    transform:"scale(0.95)"
                },{
                    transform:"scale(1)"
                }
            ],{
                duration:200
            })
            await wait(anim, "finish")
        }
    }
});

app.$mount("#app")
export {app}