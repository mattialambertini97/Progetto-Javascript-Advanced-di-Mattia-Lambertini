let form = document.getElementById('form');
let libro = document.getElementById("libro");

// creo funzione quando clicco il bottone Search
form.addEventListener("submit",(e) => {
  event.preventDefault();
  // faccio una fetch in base al genere scelto dall'utente
  let promise = fetch(`https://openlibrary.org/subjects/${libro.value}.json`)
  .then(res =>{
     return res.json();
   })
   .then(id => {
     for(i=0;i<=id.works.length;i++){

       // inizializzo una variabile il cui valore è la key del libro
       let key = id.works[i].key;
       // creo elementi HTML che corrispondono al titolo del libro
       let titolo = document.createElement("p");
       titolo.id = "titolo";
       let nodo = document.createTextNode(id.works[i].title);
       titolo.appendChild(nodo);
       let element = document.getElementById("testo");
       element.appendChild(titolo);


       // creo elementi HTML che corrispondono all' autore del libro
       let autore = document.createElement("p");
       autore.id = "autore";
       let nodo3 = document.createTextNode("by ");
       let nodo2 = document.createTextNode(id.works[i].authors[0].name);
       autore.appendChild(nodo3);
       autore.appendChild(nodo2);
       element.appendChild(autore);

       // creo elementi HTML che corrispondono alla descrizione del libro
       let botton = document.createElement("button");
       botton.id = "bottoneDescrizione";
       let nodo4 = document.createTextNode("Description");
       let parag = document.createElement("p");
       parag.id = "paragrafo";
       let descr="";
       botton.appendChild(nodo4);
       element.appendChild(botton);
       element.appendChild(parag);

       // evento che si innesca quando clicco il tasto description
       botton.addEventListener("click",(f) => {
         event.preventDefault();

         // contattp api del sito per ricevere la descrizione
         let promise2 = fetch(`https://openlibrary.org${key}.json`)
         .then(res2 =>{
            return res2.json();
          })
          .then(id2 => {

            if(descr=="")
            {
              // assegno la descrizione del libro all'elemento HTML
              // funziona se l'elemento risulta vuoto
                descr = document.createTextNode(id2.description);
                parag.appendChild(descr);
            }
            else{
              // se l'elemento è pieno(cioè si visualizza la descrizione), per "chiuderla" la svuoto
              $("#testo #paragrafo").empty();
              descr= "";
            }
          })
          .catch(error => console.log("ERROR2"))
       });
     }
   })
  .catch(error => console.log("ERROR"))
});


//funzione che quando clicco Refresh ricarica la pagina
function ricarica(){
  window.location.reload();
}
