async function createMovie(){
    const title = document.getElementById('title').value;
    const year = Number(document.getElementById('year').value);
    let genre = '';
    if (document.getElementById('romance').checked) {
        genre = 'Romance';
    }
    else if(document.getElementById('comedia').checked){
        genre = 'Comedia';
    }
    else if(document.getElementById('aventura').checked){
        genre = 'Aventura';
    }
    else if(document.getElementById('terror').checked){
        genre = 'Terror';
    }
    const description = document.getElementById('description').value;

    const movieData = {
        titulo: title,
        descricao: description,
        anoLancamento: year,
        genero: genre
    };

    try{
        const response = fetch('http://localhost:3000/create_movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        });   
    } catch (error){
        console.log('error to create movie -> ', error);
        alert('fail to createMovie');
    }
};

