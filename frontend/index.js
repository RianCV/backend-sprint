// Soh falta carregar dinamicamente os filmes!!
// Em cada box de filme, colocar todas as reviews uma em baixo da outra??!!

async function load_movies(){
    try{
        const response = await fetch('http://localhost:3000/see_all_movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const movies = await response.json();
        console.log(movies);
        const ul = document.getElementById('movies_list');
        movies.forEach(movie => {
            const new_list_item = document.createElement('li');
            const new_div = document.createElement('div');
            new_div.className = 'titulo_ano';
            const new_h2 = document.createElement('h2');
            new_h2.textContent = movie["titulo"];
            new_div.appendChild(new_h2);
            const new_h3 = document.createElement('h3');
            new_h3.textContent = movie["anoLancamento"];
            new_div.appendChild(new_h3);
            const new_p = document.createElement('p');
            new_p.textContent = movie["descricao"];
            new_list_item.appendChild(new_div);
            new_list_item.appendChild(new_p);
            ul.appendChild(new_list_item);

            // console.log(movie["titulo"]);
        });


    } catch (error){
        console.log('nao foi possivel ler filmes', error);
        alert('O server esta aberto?');
    }
}

load_movies();