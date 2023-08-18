
let posts=[];
let users=[];
const requestUrl="https://jsonplaceholder.typicode.com/posts"
const requestUserUrl="https://jsonplaceholder.typicode.com/users"

const container = document.querySelector(".container")

async function loadData(callback){
    posts= await fetch(requestUrl).then(x=>x.json())
    users= await fetch(requestUserUrl).then(x=>x.json())
    callback.apply()
}

function renderPosts(){
    for (const post of posts) {
        const author=users.find(x=>x.id===post.userId)
        container.innerHTML +=`
        <div class="post">
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <h5>${author.username} (${author.name})</h5>
            <div class="comments">
                <button class="accordion" data-id="${post.id}">Yorumlar</button>
                <ul class="panel" data-id="${post.id}"></ul>
            </div>
        </div>
        `
        bindClickPost();
    }
}
async function commentData(id){
    const panel = document.querySelector(`.panel[data-id="${id}"] `)
    let comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(x=>x.json())
    let commentDetail= comments.map(x => `<h5>${x.body}</h5> <span>${x.email} (${x.name})</span>`)
    panel.innerHTML=`<li>${commentDetail.join('')}</li>`
}
function loadDetail(){
    commentData(this.dataset.id)
    this.classList.toggle("active")
    let panel = this.nextElementSibling;
    if(panel.style.display==="block"){
        panel.style.display="none";
    }else{
        panel.style.display="block";
    }
   
}
function bindClickPost(){
    const accordions= document.querySelectorAll(".accordion")
    accordions.forEach(accordion=>accordion.addEventListener("click", loadDetail))
    
    // for (let acc of accordions){
    //     accordions.addEventListener("click", function(e){
    //         e.target.classList.toggle("active")
    //         let panel = e.target.nextElementSibling;
    //         if(panel.style.display==="block"){
    //             panel.style.display="none";
    //         }else{
    //             panel.style.display="block";
    //         }

            
    //     });

}
loadData(function() {
    renderPosts()
});