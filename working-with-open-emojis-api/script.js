let showArea = document.querySelector('.show-area');

let arrEmoji = [];
let arrEmojiTemp = [];

//removerItems();
verificarDadosExistentes();
teste();

function montarArray(item, indice) {
    if(indice < 30){
        arrEmojiTemp[indice] = item;
    }
}

function armazenarDados(data) {
    localStorage.setItem('arrEmoji', JSON.stringify(data));
}

function buscarEmojis() {
    fetch('https://emoji-api.com/emojis?access_key=15c4485b1dc1618bff37567d3bf8e3175d6e4402')
    .then(res => res.json())
    .then(data => {
        data.forEach(
            montarArray
        );

        armazenarDados(arrEmojiTemp);
        
    });
}

function verificarDadosExistentes() {
    console.log(localStorage);
    
    if(localStorage.getItem('arrEmoji')){
        arrEmoji = JSON.parse(localStorage.getItem('arrEmoji'));
    }
    
    if(arrEmoji.length == 0){
        console.log('funçao verificar dados existentes');
        buscarEmojis();
    }
    teste();
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
        showArea.innerHTML += `
            <div class='emoji-test'>
                &#x${arrEmoji[index].codePoint}
            </div>
        `        
    }
}
