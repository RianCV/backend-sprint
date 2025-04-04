async function seeAllMovies() { // FUNCAO PARA PREENCHER O DROPDOWN DINAMICAMENTE
    try {
        const response = await fetch('http://localhost:3000/see_all_movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const movies = await response.json();

        const select_field = document.getElementById('filmes');
        movies.forEach(movie => {
            const movie_option = document.createElement('option');
            movie_option.text = movie["titulo"];
            movie_option.value = movie["id"];
            select_field.appendChild(movie_option);
        });

    } catch (error) {
        console.log('Error loading movies:', error);
        if(error instanceof TypeError){
            alert('o servidor deve estar aberto para carregar os filmes no dropdown');
        }
    }
}

seeAllMovies(); //sempre chama a funcao quando entrar na pagina!




function createReview(){
    const selected_field = document.getElementById('filmes');
    const id_movie = Number(selected_field.value);                
    let score;
    if (document.getElementById('score1').checked) {
        score = 1;
    }
    else if(document.getElementById('score2').checked){
        score = 2;
    }
    else if(document.getElementById('score3').checked){
        score = 3;
    }
    else if(document.getElementById('score4').checked){
        score = 4;
    }
    else if(document.getElementById('score5').checked){
        score = 5;
    }
    const description = document.getElementById('description').value;

    const reviewData = {
        nota: score,
        comentario: description,
        filmeId: id_movie,
    };

    try{
        const response = fetch('http://localhost:3000/create_review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });   
    } catch (error){
        console.log('error to create movie -> ', error);
        alert('fail to createMovie');
    }
};