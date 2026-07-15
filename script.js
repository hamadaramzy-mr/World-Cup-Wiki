let current=0;
const images = document.querySelectorAll('.slide');
setInterval(()=>{
images[current].classList.remove('active');
current++;
if(current>= images.length){
    current=0;
}
images[current].classList.add('active')
},2000)

const btn = document.getElementById('btn');
const groups = document.getElementById('groups');
const matches = document.getElementById('matches');
const match = document.getElementById('match');
const hero =document.getElementById('hero')
let dark=0;
btn.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    groups.classList.toggle('dark');
    matches.classList.toggle('dark');
    match.classList.toggle('dark');
    hero.classList.toggle('dark')
    if(dark == 0){
        btn.textContent='☀️';
        dark=1;
    }else{
        dark=0;
        btn.textContent='🌙';
    }
})