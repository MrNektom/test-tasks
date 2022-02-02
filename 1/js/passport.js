import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js";

window.onload = e => {
    document.body.animate([
        {opacity:0},
        {opacity:1}
    ],{
        duration:500,
        fill:"forwards"
    })
}
Vue.use(window.vuelidate.default)
const { required, minLength, alpha, numeric } = window.validators;


let app = new Vue({
    el:"#app",
    data:{
        type:"",
        serial:"",
        number:"",
        issued_by: "",
        date_of_issue: ""
    },
    validations:{
        issued_by:{
            required,
        },
        date_of_issue:{
        }
    },
    methods:{
        submit(){
            this.$v.$touch();
            if (!this.$v.$anyError) {
                alert("Форма успешно отправлена.")
            }
        }
    },
    computed:{
        errors(){try{
            let arr = []
            for(let [k,v] of Object.entries(this.$v)){
                let a = []
                if (k.startsWith("$")) {
                    continue
                }
                for (const [key,val] of Object.entries(v)) {
                    if (!val && !key.startsWith("$")) {
                        a.push(key)
                    }
                }
                if (a.length) {
                    arr.push([k,a])
                }
            }
            return Object.fromEntries(arr);
        } catch (e) {
            return e
        }
        }
    }
})