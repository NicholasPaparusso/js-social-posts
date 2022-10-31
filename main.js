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
            "name": "Luca Formicola De Formicoli",
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
const userLikes = [1,3,4]

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
 let timeDiff = "";

 return`
 <div class="post">
 <div class="post__header">
     <div class="post-meta">                    
         <div class="post-meta__icon">
         ${author.image ? getImageProfile(author) : getProfileDefault(author)}
         </div>
         <div class="post-meta__data">
             <div class="post-meta__author">${author.name}</div>
             <div class="post-meta__time">${timeAgo(created,timeDiff)} , data creazione: ${FormDate(created)}</div>
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
             <a class="like-button js-like-button ${isPostLiked(id) ? 'like-button--liked' : ' '}" href="#" data-postid="${id}">
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

function timeAgo(date, diffTime){
   const date1 = new Date(date);;
   const date2= new Date();
   const timeDifference = Math.abs(date1 - date2);
   console.log(timeDifference);
   console.log(date1);
   console.log(date2);
    if(timeDifference < 60000 ){
    diffTime = "Qualche secondo fa";
    }else if(timeDifference <= 3540000){
        diffTime = `Pubblicato ${Math.floor(timeDifference / (1000 * 60))} minuti fa`;
    }else if(timeDifference < 86400000){
        diffTime = `Pubblicato ${Math.floor(timeDifference / (1000 * 3600))} ore fa`;
    }else if(timeDifference <= 2592000000){
        diffTime = `Pubblicato ${Math.floor(timeDifference / (1000 * 3600 * 24))} giorni fa`;
    }else if(timeDifference <= 31557600000){
        diffTime = `Pubblicato ${Math.floor(timeDifference / 2629800000)} mesi fa`;
    }else if(timeDifference <= 63115200000){
        diffTime = `Pubblicato ${Math.floor(timeDifference / 31557600000)} anno e ${Math.floor((timeDifference - 31557600000)  / 2629800000)} mesi fa`;
    }else{ diffTime = `Pubblicato ${Math.floor(timeDifference / 63115200000)} anni e ${Math.floor((timeDifference - 63115200000)  / 2629800000)} mesi fa`;

    }
    return diffTime;
};


function FormDate(date){
    return date.split('-').reverse().join('/');
};


function getImageProfile(author){
    const {image, name} = author;
    return `<img class="profile-pic" src="${image}" alt="${name}">`
};

function getProfileDefault(author){
    const{name} = author;
    let initials = "";
    const nameParts = name.split(' ');
    nameParts.forEach( part => {
    initials += part[0];
    })

    
    return `
    <div class="profile-pic-default">
        <span>${initials}</span>
    </div>
    `
};



const likesButtons = document.querySelectorAll('.like-button');


likesButtons.forEach( likeButton => {
   
    likeButton.addEventListener('click', function(event){
      
        event.preventDefault();
       
        const postId = parseInt(this.getAttribute('data-postid'));

        const counterDisplay = document.getElementById('like-counter-' + postId);
        let likes = parseInt(counterDisplay.innerText);
      

        if(this.classList.contains('like-button--liked')){
            this.classList.remove('like-button--liked');
 
            counterDisplay.innerText = --likes;
        }else{
            this.classList.add('like-button--liked');

            counterDisplay.innerText = ++likes;
        }
        

        const likedPost = posts.filter( (post) => post.id === postId )
 
        likedPost[0].likes = likes;

    })

} )


function isPostLiked(id){
    return userLikes.includes(id);
};
