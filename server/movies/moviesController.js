const moment = require('moment');
const { isEmpty } = require("lodash");
const { Op,reload } = require("sequelize");

const { Movie } = require('../../model');

const createNewMovie = async (req, res) => {
    const { title, year, length, actor } = req.body;
    

    let id = `MV-${moment().unix()}`;
    const movieRecord = {
        
        id,
        title,
        year,
        length,
        actor
    }

    const result = await Movie.create(movieRecord);
    console.log(result.toJSON());

    if (!isEmpty(result)) {
        res.send(result);
    } else {
        res.send({ error: "Movie creations Failed" });
    }
}

const listMovies = async(req, res) =>{

    const movies= await Movie.findAll();

    const formattedMovie= movies.map(r=> r.get({plain: true}));

    if(!isEmpty(formattedMovie)){
        res.send(formattedMovie);
    }
    else{
        res.send({error: "No data found"})
    }
}

const searchMovieTitle= async (req, res)=>{
    const { title }= req.params;

    const searchResult= await Movie.findAll({
        where:{

            title:{

                [Op.like]: `%${title}%`,

            }
        },
        raw: true
    });

    if(isEmpty(searchResult)){
        res.send({message: "No Records found"});
    }
    else{
        res.send(searchResult);
    }
}

const updateMovieDetails = async (req, res)=>{
    const { id }= req.params;
    const searchResult= await Movie.findOne({where:{id: id },raw:true});
    const title= searchResult.title;
    const { year, length, actor}= req.body;
    const movieRecord = {title, year, length, actor};

     const updateMovie= await Movie.update(movieRecord, {
        where: {
          id: id
        }
      });
    
    
    res.send({message:"Changes Saved Successfully"});
    

}

const deleteMovie= async (req,res) =>{
    const {id}=req.params;
    const searchResult= await Movie.findOne({where:{id:id}});
    if(searchResult){
        const deleted= await Movie.destroy({where:{id:id},});
        res.send({message:"Deleted successfully"});
    }
    else{
        res.send({message:"No records found by this ID"});
    }
}

module.exports = {
    createNewMovie, listMovies, searchMovieTitle, updateMovieDetails, deleteMovie
}