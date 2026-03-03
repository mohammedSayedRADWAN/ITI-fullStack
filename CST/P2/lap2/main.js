const img=document.getElementById('avatar')
const info=document.getElementById('info')
const closeBtn=document.getElementById('closeBtn')
img.addEventListener('click',()=>{
info.style.display='block'
})
closeBtn.addEventListener('click',()=>{
info.style.display='none'

})