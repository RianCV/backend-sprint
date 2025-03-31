const express = require('express');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const app = express();
const PORT = 3000;
import { validaFilme, valideReview } from './util';

app.get('/', (req, res) => {
    res.send('API de Movies rodando....');
})

app.use(express.json());
 

// ################# PARA FILMES ###################

app.post('/create_movie', validaFilme, async (req, res) => {
    const {titulo, descricao, anoLancamento, genero} = req.body;
    const filme = await prisma.filme.create({
        data: {titulo, descricao, anoLancamento, genero},
    });
    res.json(filme);
});

app.put('/correct_movie/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, diretor, anoLancamento, genero } = req.body;
    const filme = await prisma.filme.update({
      where: { id: Number(id) },
      data: { titulo, descricao, diretor, anoLancamento, genero },
    });
    res.json(filme);
});

app.get('/see_all_movies', async (req, res) => {
    const filmes = await prisma.filme.findMany();
    res.json(filmes);
});

app.get('/see_movie/:id', async (req, res) => {
    const {id} = req.params;
    const filme = await prisma.filme.findUnique({
        where: {id: Number(id)}
    });
    res.json(filme);
});

app.delete('/delete_movie/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.filme.delete({ where: { id: Number(id) } });
    res.json({ message: 'Filme deletado com sucesso' });
});


// ################# PARA REVIEWS ###################

app.post('/create_review', valideReview, async (req, res) => {
    const {nota, comentario, filmeId} = req.body;
    const review = await prisma.review.create({
        data: {nota, comentario, filmeId},
    });
    res.json(review);
});

app.get('/see_movie_review/:movie_id', async (req, res) => {
    const {movie_id} = req.params;
    const movie_reviews = await prisma.review.findMany({
        where: {filmeId: Number(movie_id)}
    });
    res.json(movie_reviews);
})

app.get('/see_review/:id', async (req, res) =>{
    const {id} = req.params;
    const review = await prisma.review.findUnique({
        where: {id: Number(id)}
    })
    res.json(review)
});

app.get('/see_all_reviews', async (req, res) =>{
    const review = await prisma.review.findMany();
    res.json(review)
});

app.patch('/correct_review/:id', async (req, res) => {
    const {comentario} = req.body;
    const {id} = req.params;
    const review = await prisma.review.update({
        where: {id: Number(id)},
        data: {comentario},
        });
    res.json(review);
});

app.delete('/delete_review/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.review.delete({ where: { id: Number(id) } });
    res.json({ message: 'Review deletada com sucesso' });
  });

app.listen(PORT, () => {
    console.log(`App de exemplo esta rodando na porta ${PORT}`)
})