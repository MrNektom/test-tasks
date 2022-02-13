class SideBar extends HTMLElement {
    constructor(){
        super()
        this.addEventListener("click", e => {
            if (e.target.classList.contains("side-bar__close-btn")) {
                this.classList.toggle("open")
            }
            if (e.target.closest(".side-bar__item") != null) {
            console.log(e.target.closest(".side-bar__item"));
                this.querySelector(".selected")?.classList.remove("selected");
                e.target.closest(".side-bar__item").classList.add("selected")
            }
        })
    }
}

customElements.define("side-bar",SideBar)