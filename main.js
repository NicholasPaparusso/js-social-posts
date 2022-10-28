const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Elementi Dom
const container = document.getElementById('container');

// global var
const userLikes = []
let likesCounter = 0;
// logic & functions
function init(){
    reset();
    posts.forEach((post)=>{
        container.innerHTML+= getPost(post)
    })
};

init();

 function getPost(post){
 const {id, content, media, likes, created, author} = post;
timeAgo(post);
FormDate(post);
fallback(post);
 return`
 <div class="post">
 <div class="post__header">
     <div class="post-meta">                    
         <div class="post-meta__icon">
         ${author.image ? getImageProfile(author) : getProfileDefault(author)}
         </div>
         <div class="post-meta__data">
             <div class="post-meta__author">${author.name}</div>
             <div class="post-meta__time">${calculatedMonth} mesi fa , data creazione: ${formattedDate}</div>
         </div>                    
     </div>
 </div>
 <div class="post__text">Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.</div>
 <div class="post__image">
     <img src="${media}" alt="">
 </div>
 <div class="post__footer">
     <div class="likes js-likes">
         <div class="likes__cta">
             <a class="like-button js-like-button"  onclick="likeFunction(this)" href="#${id}" data-postid="${id}">
                 <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                 <span class="like-button__label">Mi Piace</span>
             </a>
         </div>
         <div class="likes__counter">
             Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
         </div>
     </div> 
 </div>            
</div>

</div>
 `
 
}


function reset(){
 container.innerHTML ='';
};

function timeAgo(post){
    const{created} = post;
    const monthOfCreated = created.slice(5,7)
    const yearOfCreated = created.slice(0,4)
    const getTime = new Date;
    const year = getTime.getFullYear();
    const month = getTime.getMonth()+1;
    if(year > yearOfCreated){
         calculatedMonth =  (year - yearOfCreated)*12 +  month  - monthOfCreated; 
    }else{
         calculatedMonth = month - monthOfCreated; 
    }
};

function FormDate(post){
    const{created}= post;
    const arrayOfCreated = [...created];
    const joinArray = arrayOfCreated.join("").split("-")
    const reversedArray = joinArray.reverse()
     reversedArray.splice(-1,0, "/");
     reversedArray.splice(-3,-2, "/");
    return formattedDate = reversedArray.toString().replace(/[^0-9./]+/g,"")
};


function fallback(post){
    const {author} = post;
    const arrayOfName = author.name.split(' ');
    return fallbackName = arrayOfName[0][0] + arrayOfName[1][0];
};


function likeFunction(element){
  element.classList.toggle('clicked');
};


function getImageProfile(author){
    const {image} = author;
    return `<img class="profile-pic" src="${image}" alt="${name}">`
};

function getProfileDefault(author){
    return `<span class="profile-pic-default">${fallbackName}<span>`
};

function isPostLiked(id){
    return userLikes.includes(id);
};