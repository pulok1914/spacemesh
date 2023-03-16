const careersCards = document.querySelectorAll('.careers__block');
careersCards.forEach(card=>{
    if(card){
        console.log(card)
        card.addEventListener('click',e=>{
            console.log(card)
            
        })
    }
})
console.log(careersCards)

function gotoLink(event,element){
    event.stopPropagation();
    const url= element.dataset.url;
    window.location = url;
}