Hola Sergio, 
te escribo aquí los comentarios.
Lo he estructurado/dividido en secciones de la siguiente manera:
1- Coger el nombre
2- Coger el parámetro
3- Identificar si el parámetro es un número. Es un número?
4- Sí: Buscar pokemon con la id igual al parámetro.
5- No:  Buscar pokemon con el name igual al parámetro.
6- Crear response con datos del pokemon.

Primero inportamos las librerías http y fs de lectura de ficheros.
Creamos una función asíncrona que lea el fichero y lo pase a objetos js. Si ha ido bien convierte el texto en un array de objetos mediante la funcion JSON.parse.
Después buscamos por nombre por los cuatro idiomas y comprobamos y lo mismo buscando por id.
La función findPokemon nos ayuda a identificar si es un id o un nombre. 
La función handleRequest la hacemos asíncrona por si llegase otro request no tenga q esperar, recoge el parámetro de la url que nos interesa, en esta caso solo hay uno. 
El fetchPokemonData se asegura de leer el fichero una sola vez cuando arranca el servidor. Pasa el contenido del fichero a la variable data. Cuando el promise acaba bien levanta el servidor. Si no da error. 

Mejoras: Se podría pasar el name del pokemon a minusculas y comprobar su coincidencia en minusculas ya q ahora daría problemas con mayusculas y minusculas.
