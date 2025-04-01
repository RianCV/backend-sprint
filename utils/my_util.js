export function validaFilme(req, res, next){
    const {titulo, descricao, anoLancamento, genero} = req.body;

    if(!titulo || !descricao || !anoLancamento || !genero){
        return res.status(400).json({error: 'Algum campo ficou vazio'});
    };

    const d = new Date();
    let year = d.getFullYear();
    if(anoLancamento > year){
        return res.status(400).json({error: 'Trabalhamos apenas com filmes ja lancados ou do ano corrente.'});
    };
    next();
}

export function validaReview(req, res, next) {
    const { nota, comentario } = req.body;
  
    if (nota === undefined || comentario === undefined) {
      return res.status(400).json({ error: "Nota e comentário são obrigatórios." });
    }
  
    if (typeof nota !== "number" || nota < 1 || nota > 5) {
      return res.status(400).json({ error: "A nota deve ser um número entre 1 e 5." });
    }
  
    next();
  }