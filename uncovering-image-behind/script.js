document.querySelector('.teste');

let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
 
setInterval(() => {
    let random = null;
    let randomInd = null;
    if(numbersArray.length>0){
        random = Math.floor(Math.random() * (numbersArray.length - 1))
        randomInd = numbersArray[random];
        let block = document.querySelector('#b'+randomInd);
        block.style.animation = 'anim 2s 2s forwards';
        numbersArray.splice(random, 1);
    }
    else{
        return ;
    }
}, 500);


