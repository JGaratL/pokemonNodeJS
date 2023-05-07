const http = require('http'); 
const fs = require('fs');


const fetchPokemonData = async () => {
   return new Promise((resolve, reject) => {
       fs.readFile('./pokedex.json', 'utf-8', (err, data) => { 
           if (err) {
               reject(err); 
           } else {
               resolve(JSON.parse(data)); 
           }
       });
   });
};

const findByName = (name) => {
   return data.find(element => element.name.english == name
       || element.name.japanese == name
       || element.name.chinese == name
       || element.name.french == name
   );
}
const findById = (id) => {
   return data.find(element => element.id == id);
}

const transformToPlainObject = (pokemon) => {
   return {
       "type": pokemon.type,
       "HP": pokemon.base.HP,
       "Attack": pokemon.base.Attack,
       "Defense": pokemon.base.Defense,
       "Sp. Attack": pokemon.base["Sp. Attack"],
       "Sp. Defense": pokemon.base["Sp. Defense"],
       "Speed": pokemon.base.Speed
   };
}

const findPokemon = (param) => {
   let paramIsName = isNaN(param); 
   if (paramIsName)
       return findByName(param);
   else
       return findById(param);
}
const handleRequest = async (req, res) => {
   
   const param = decodeURI(req.url.substring(1)); 
   const pokemon = findPokemon(param);

   if (pokemon) {
       res.writeHead(200, { 'Content-Type': 'application/json' }); 
       res.end(JSON.stringify(transformToPlainObject(pokemon), null, 7));
   } else {
       res.writeHead(404, { 'Content-Type': 'text/plain' }); 
       res.end('Pokemon no encontrado');
   }
};

let data = null;

fetchPokemonData() 
   .then( (dataParam) => { 
       data = dataParam; 
       const server = http.createServer(handleRequest);

       server.listen(3000, () => {
           console.log('Servidor escuchando en el puerto 3000');
       });
   })
   .catch((error) => { 
       console.log("no se han podido leer los datos por lo que no tiene sentido seguir. Error code: "+ error.code);
   });
