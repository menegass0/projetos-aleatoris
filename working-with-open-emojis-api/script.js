let showArea = document.querySelector('.show-area');

let arrEmoji = [];
let arrEmojiTemp = [];

// removerItems();
verificarDadosExistentes();
teste();

function montarArray(item, indice) {
        arrEmojiTemp[indice] = item;
}

function armazenarDados(data) {
    localStorage.setItem('arrEmoji', JSON.stringify(data));
}

function buscarEmojis() {
    fetch('https://emoji-api.com/emojis?access_key=86c4d9029d3a3d371e868b7f28bbe0bac0335f6c')
    .then(res => res.json())
    .then(data => {
        data.forEach(
            montarArray
        );
        armazenarDados(arrEmojiTemp);
        verificarDadosExistentes();
        teste();
    });
}

function verificarDadosExistentes() {
    console.log(localStorage.getItem('arrEmoji') ? true : false);
    

    if(localStorage.getItem('arrEmoji')){
        arrEmoji = JSON.parse(localStorage.getItem('arrEmoji'));
        console.log('nao era pra entra aqui');
    }
    
    if(arrEmoji.length == 0){
        console.log('funçao verificar dados existentes');
        buscarEmojis();
    }
}

function removerItems() {
    localStorage.removeItem('arrEmoji');
}





function pesquisaTodos(){
    showArea.innerHTML = '';
    arrEmoji.forEach(element => {
        let splitAr = element.codePoint.split(' ');
        showArea.innerHTML += `<div class='small-emoji'> `
        splitAr.forEach(code =>{
            showArea.innerHTML += `
                &#x${code};
            `
        });
        showArea.innerHTML += `</div>`
    });
}

// function gerarViewEmoji(indice){
//     let contador = 0;
//     let splitAr = null;
//     let tdTable = document.getElementById('grupo-emoji');
//     let trTable = '';
//     let codePoint = '';

//     while(contador < 5){
//         trTable = '<tr>';
//         splitAr = arrEmoji[indice+contador].codePoint.split(' ');
//         splitAr.forEach(code => {
//             codePoint += `
//                 &#x${code}
//             `
//         });
        
//         trTable += gerarTd(codePoint);

//         trTable += '</tr>';
       
//         contador++;
//     }
    
//     tdTable.innerHTML =  tdTable.innerHTML+trTable;

//     setTimeout(function(){
        
//     },1000);

// }

// function gerarTd(data){
//     return '<td>'+data+'</td>';
// }

function teste(){
    for (let index = 0; index < 500; index++) {
        let splitAr = arrEmoji[index].codePoint.split(' ');
        showArea.innerHTML += `<div class='small-emoji'> `
        splitAr.forEach(code =>{
            showArea.innerHTML += `
                &#x${code};
            `
        });
        showArea.innerHTML += `</div>`      
    }
}
