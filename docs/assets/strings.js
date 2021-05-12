const english = {
  // bingo: 'Bingo',
  // pconf: '',
  help: 'Help',
  options: 'Options',
  language: 'Language',
  markerColor: 'Marker color',
  markerDesc: 'The color used to select squares when playing (view mode)',
  bgColor: 'Background color',
  bgDesc: 'Choose a color for the background',
  colorPalette: 'Suggested color palettes',
  colorPaletteDesc: 'Some sets of colors that can look nice with your bingo',
  bgImage: 'Background Image',
  bgImageDesc: 'Upload an image to use it as a background. The background color will be overlapped.',
  banner: 'Banner',
  bannerDesc: 'Upload an image to use it for the header section.',
  colorScheme: 'Color Scheme',
  colorSchemeDesc: 'Change the border and text colors to better match the background.',
  blurBgImage: 'Blur background image',
  blurBgImageDesc: 'Recommended for low-quality and low-readability backgrounds',
  uploadMultipleImages: 'Upload multiple images',
  uploadMultipleImagesDesc: 'Images will be overwritten. Click or tap the upload button to read more',
  dimensions: 'Dimensions',
  dimensionsDesc: 'The first buttons change the rows, the second buttons change the columns',
  extraSquares: '# Extra squares',
  extraSquaresDesc: 'If regular squares are not enough for you',
  loadSave: 'File management',
  loadSaveDesc: 'Load a bingo or save it to your device. Or reset and start over',
  separateSquares: 'Separate squares',
  separateSquaresDesc: 'Set a separation between squares',
  roundBorderSquares: 'Squares with round borders',
  roundBorderSquaresDesc: 'Set rounded borders for the squares',
  load: 'Load',
  save: 'Save',
  reset: 'Reset',
  adjust: 'Adjust',
  upload: 'Upload',
  theme: 'Theme',
  dark: 'Dark',
  light: 'Light',
  madeWith: 'Made with ❤ by',
  croppingImage: 'Cropping image',
  croppingBanner: 'Cropping banner',
  uploadMultipleImagesText: 'You can upload multiple images here. Bear in mind that square images can be overwritten. For example, if you upload 10 images, the images of the first 10 squares will be replaced',
  saveBingo: 'Save bingo',
  saveBingoText: 'Save your bingo config so you can share it with friends',
  resetBingo: 'Reset bingo',
  resetBingoText: 'Are you sure you want to reset everything?',
  helpText:
    '<p>This bingo generator allows to generate a custom made bingo with many options available. The first section contains all the options related to the bingo. The second section has the bingo itself. Here you can edit ' +
    'every square. Put some text, upload images, crop them, blur them, etc. If you wish to move squares, you can do it by using the move function and dragging the squares. You can play a game from this ' +
    'app itself. Just save your changes and you will be ready to play. Mark the squares and a marker will appear. You are the one making the rules, but usually the 2 main goals of this game is to be the first one to ' +
    'get a line among your friends and get all the squares (bingo)!</p>' +
    '<p>If you want to share your creation you can do it by choosing the share option and downloading the generated image. Then, you can share it on the social network of your choice.</p>' +
    '<p>If you wish to save your bingo configuration you can do it with the file management option. A JSON file containing all the relevant information will be saved in your device and you will be able to restore it ' +
    'from any device by loading the config file you downloaded. For example, you can create a bingo in your computer, save it in a cloud storage service and load it from a mobile phone.</p>' +
    '<p>There is no backend involved in this application. This is good because it means no private data can be stored in any server. The main drawback, though, is that' +
    'because images have to be stored somewhere, that place is the browser memory itself. This dramatically affects performance. For 5x5 bingos (the most common format) it\'s not that bad, but it\'s really noticeable ' +
    'in 10x10 bingos. Also, if you upload a big image as a background or banner, performance can be quite bad too. There is not much that can be done to improve that (already tried image compression) aside from implementing a ' +
    'backend, which I don\'t really want to for several reasons such as cost, maintenance, moderation of content, etc.</p>' +
    '<p>I really hope you enjoy using this application as much as I enjoyed making it. If you have any feedback or questions, feel free to contact me :)</p>' +
    '<p>The code is available on Github</p>' +
    '<p>This app is proudly made with ❤ by <a style="color:white" target="_blank" href="https://twitter.com/roselcost">Daniel Larrosa</p>',
  eventTitle: 'Event Title',
  extraSquaresTitle: 'Extra Squares',
  square: 'Square',
  extra: 'Extra',
  removeImage: 'Remove image',
  cropImage: 'Crop image',
  uploadImage: 'Upload individual image',
  shuffle: 'Shuffle',
  blur: 'Blur',
  edit: 'Edit',
  share: 'Share',
  clearMarkers: 'Clear markers',
  download: 'Download',
  shareText: 'You can share your bingo from here. Since there are constraints with sharing pictures on social networks, you\'ll have to download the image and then share it, but ' +
    'I can make the process a bit easier by providing you all the buttons to share and then just attach the image you downloaded :)',
  clearText: 'Are you sure you want to clear all the marks?',
  image: 'Image',
  bingoTitlePlaceholder: 'Set a title for this bingo',
  bingoExtrasPlaceholder: 'Set a title for the extra squares',
  yes: 'Yes',
  no: 'No',
  score: 'Score',
  loading: 'Loading',
  choose: 'Choose',
  move: 'Move',
  done: 'Done',
  of: 'of',
  line: 'line',
  mode: 'Mode',
  view: 'View',
  imageInstructions: 'Click or drag & drop to upload an image',
  alertNotImage: 'You uploaded a file that is not an image',
  notValidJSON: 'Not a valid JSON file!'
}
const spanish = {
  // bingo: 'Bingo',
  // pconf: '',
  help: 'Ayuda',
  options: 'Opciones',
  language: 'Idioma',
  markerColor: 'Color de marcador',
  markerDesc: 'El color que se usa para marcar casillas al jugar (modo vista)',
  bgColor: 'Color de fondo',
  bgDesc: 'Elige un color para el fondo',
  colorPalette: 'Paletas de colores sugeridas',
  colorPaletteDesc: 'Conjuntos de colores que pueden quedar bien con tu bingo',
  bgImage: 'Imagen de fondo',
  bgImageDesc: 'Sube una imagen para usarla como fondo. El color de fondo quedará debajo',
  banner: 'Banner',
  bannerDesc: 'Sube una imagen para usarla en la sección del título',
  colorScheme: 'Esquema de color',
  colorSchemeDesc: 'Cambia los colores del borde y del texto para que coincidan mejor con el fondo',
  blurBgImage: 'Desenfocar imagen de fondo',
  blurBgImageDesc: 'Recomendado para fondos de baja calidad y baja legibilidad',
  uploadMultipleImages: 'Subir varias imagenes',
  uploadMultipleImagesDesc: 'Las imágenes se sobrescribirán. Haz clic o pulsa el botón subir para leer más',
  dimensions: 'Dimensiones',
  dimensionsDesc: 'Los primeros botones cambian las filas, los segundos botones cambian las columnas',
  extraSquares: '# Casillas extra',
  extraSquaresDesc: 'Por si las casillas normales no son suficientes para ti',
  loadSave: 'Gestión de archivos',
  loadSaveDesc: 'Carga un bingo o guárdalo en tu dispositivo. O dale a reiniciar para empezar de nuevo',
  separateSquares: 'Separar casillas',
  separateSquaresDesc: 'Define una separación entre casillas',
  roundBorderSquares: 'Bordes redondeados',
  roundBorderSquaresDesc: 'Define bordes redondeados para las casillas',
  load: 'Cargar',
  save: 'Guardar',
  reset: 'Reiniciar',
  adjust: 'Ajustar',
  upload: 'Subir',
  theme: 'Tema',
  dark: 'Oscuro',
  light: 'Claro',
  madeWith: 'Hecho con ❤ por',
  croppingImage: 'Recortando imagen',
  croppingBanner: 'Recortando banner',
  uploadMultipleImagesText: 'Puedes subir varias imágenes aquí. Ten en cuenta que las imágenes de las casillas se pueden sobrescribir. Por ejemplo, si cargas 10 imágenes, las imágenes de las 10 primeras casillas serán reemplazadas',
  saveBingo: 'Guardar bingo',
  saveBingoText: 'Guarda la configuración el bingo para compartirla con tus amigos',
  resetBingo: 'Reiniciar bingo',
  resetBingoText: '¿Estás seguro de que quieres restablecer todo?',
  helpText:
    '<p>Este generador de bingos permite generar un bingo a medida con muchas opciones disponibles. La primera sección contiene todas las opciones relacionadas con el bingo. La segunda sección contiene el bingo en sí. ' +
    'Desde aquí puedes editar cada casilla. Añadir texto, subir imágenes, recortarlas, difuminarlas, etc. Si quieres mover las casillas, puedes hacerlo utilizando la función de mover y arrastrando las casillas. ' +
    'Puedes jugar a una partida desde esta misma app. Sólo tienes que guardar los cambios y estarás listo para jugar. Marca las casillas para que aparezca un marcador. Tú eres el que pone las reglas, pero normalmente ' +
    'los dos objetivos principales de este juego son ser el primero en conseguir una línea entre tus amigos y conseguir todas las casillas (bingo).</p>' +
    '<p>Si quieres compartir tu creación, puedes hacerlo eligiendo la opción de compartir y descargando la imagen generada. Luego, puedes compartirla en la red social que quieras.</p>' +
    '<p>Si quieres guardar la configuración de tu bingo puedes hacerlo con la opción de gestión de archivos. Se guardará en tu dispositivo un archivo JSON con toda la información relevante y podrás restaurarlo desde ' +
    'cualquier dispositivo cargando el archivo de configuración que hayas descargado. Por ejemplo, puedes crear un bingo en tu ordenador, guardarlo en un servicio de almacenamiento en la nube y cargarlo desde un teléfono móvil.</p>' +
    '<p>No hay ningún backend involucrado en esta aplicación. Esto es bueno porque significa que no se pueden almacenar datos privados en ningún servidor. Sin embargo, el principal inconveniente es que, como las imágenes tienen que ' +
    'almacenarse en algún lugar, ese lugar es la propia memoria del navegador. Esto afecta dramáticamente al rendimiento. Para bingos de 5x5 (el formato más común) no es tan malo, pero se nota mucho en bingos de 10x10. ' +
    'Además, si subes una imagen grande como fondo o banner, el rendimiento también puede ser bastante malo. No hay mucho que se pueda hacer para mejorar eso (ya he probado comprimiendo las imágenes) aparte de implementar un backend, ' +
    'lo que realmente no quiero hacer por varias razones como el coste, el mantenimiento, la moderación del contenido, etc.</p>' +
    '<p>Espero que disfrutes utilizando esta aplicación tanto como yo he disfrutado haciéndola. Si tienes algún comentario o pregunta, no dudes en ponerte en contacto conmigo :)</p>' +
    '<p>El código está disponible en GitHub</p>' +
    '<p>Esta aplicación está hecha con ❤ por <a style="color:white" target="_blank" href="https://twitter.com/roselcost">Daniel Larrosa</p>',
  eventTitle: 'Título del evento',
  extraSquaresTitle: 'Casillas extra',
  square: 'Casilla',
  extra: 'Extra',
  removeImage: 'Quitar imagen',
  cropImage: 'Ajustar imagen',
  uploadImage: 'Subir imagen individual',
  shuffle: 'Barajar',
  blur: 'Desenfocar',
  edit: 'Editar',
  share: 'Compartir',
  clearMarkers: 'Restablecer marcas',
  download: 'Descargar',
  shareText: 'Puedes compartir tu bingo desde aquí. Dado que hay restricciones al compartir imágenes en redes sociales, tendrás que descargar la imagen y luego compartirla, pero puedo hacer el proceso un poco más fácil ' +
    'poniendo todos los botones para compartir y luego añade la imagen descargada :)',
  clearText: '¿Estás seguro de que quieres restablecer todas las marcas?',
  image: 'Imagen',
  bingoTitlePlaceholder: 'Ponle un nombre a este bingo',
  bingoExtrasPlaceholder: 'Ponle un nombre a las casillas extra',
  yes: 'Sí',
  no: 'No',
  score: 'Puntuación',
  loading: 'Cargando',
  choose: 'Elegir',
  move: 'Mover',
  done: 'Listo',
  of: 'de',
  line: 'línea',
  mode: 'Modo',
  view: 'Vista',
  imageInstructions: 'Haz click o arrastra aquí para subir una imagen',
  alertNotImage: 'Has subido un archivo que no es una imagen',
  notValidJSON: '¡Archivo JSON no válido!'
}
const catalan = {
  // bingo: 'Bingo',
  // pconf: '',
  help: 'Ajuda',
  options: 'Opcions',
  language: 'Idioma',
  markerColor: 'Color de marcador',
  markerDesc: 'El color que es fa servir per marcar caselles al jugar (mode vista) ',
  bgColor: 'Color de fons',
  bgDesc: 'Tria un color pel fons',
  colorPalette: 'Paletes de colors suggerides',
  colorPaletteDesc: 'Conjunts de colors que poden quedar bé amb el teu bingo',
  bgImage: 'Imatge de fons',
  bgImageDesc: 'Puja una imatge per fer-la servir com a fons. El color de fons quedarà sota',
  banner: 'Banner',
  bannerDesc: 'Puja una imatge per fer-la servir en la secció del títol',
  colorScheme: 'Esquema de color',
  colorSchemeDesc: 'Canvia els colors de la vora i de el text perquè coincideixin millor amb el fons',
  blurBgImage: 'Desenfocar imatge de fons',
  blurBgImageDesc: 'Recomanat per a fons de baixa qualitat i baixa llegibilitat',
  uploadMultipleImages: 'Pujar varies imatges',
  uploadMultipleImagesDesc: 'Les imatges es sobreescriuran. Fes clic o prem el botó pujar per llegir més',
  dimensions: 'Dimensions',
  dimensionsDesc: 'Els primers botons canvien les files, els segons botons canvien les columnes',
  extraSquares: '# Caselless extra',
  extraSquaresDesc: 'Per si les caselles normals no són suficients per a tu',
  loadSave: 'Gestió d\'arxius',
  loadSaveDesc: 'Carrega un bingo o guarda\'l al teu dispositiu. O dóna-li a reiniciar per començar de nou',
  separateSquares: 'Separar caselles',
  separateSquaresDesc: 'Defineix una separació entre caselles',
  roundBorderSquares: 'Vores arrodonides',
  roundBorderSquaresDesc: 'Defineix vores arrodonides per a les caselles',
  load: 'Carregar',
  save: 'Guardar',
  reset: 'Reiniciar',
  adjust: 'Ajustar',
  upload: 'Pujar',
  theme: 'Tema',
  dark: 'Fosc',
  light: 'Clar',
  madeWith: 'Fet amb ❤ per',
  croppingImage: 'Retallant imatge',
  croppingBanner: 'Retallant banner',
  uploadMultipleImagesText: 'Pots pujar diverses imatges aquí. Tingues en compte que les imatges de les caselles es poden sobreescriure. Per exemple, si carregues 10 imatges, les imatges de les 10 primeres caselles seran substituïdes',
  saveBingo: 'Guardar bingo',
  saveBingoText: 'Guarda la configuració el bingo per compartir-la amb els teus amics',
  resetBingo: 'Reiniciar bingo',
  resetBingoText: 'Estàs segur que vols restablir tot?',
  helpText:
    '<p>Aquest generador de bingos permet generar un bingo a mida amb moltes opcions disponibles. La primera secció conté totes les opcions relacionades amb el bingo. La segona secció conté el bingo en si. Des d\'aquí pots editar cada casella. ' +
    'Afegir text, pujar imatges, retallar-les, difuminar-les, etc. Si vols moure les caselles, pots fer-ho utilitzant la funció de moure i arrossegant les caselles. Pots jugar a una partida des d\'aquesta mateixa app. Només has de guardar els canvis ' +
    'i estaràs a punt per jugar. Marca les caselles perquè aparegui un marcador. Tu ets el que posa les regles, però normalment els dos objectius principals d\'aquest joc són ser el primer a aconseguir una línia entre els teus amics i aconseguir totes les caselles (bingo).</p>' +
    '<p>Si vols compartir la teva creació, pots fer-ho triant l\'opció de compartir i descarregant la imatge generada. Després, pots compartir-la en la xarxa social que vulguis.</p>' +
    '<p>Si vols guardar la configuració del teu bingo pots fer-ho amb l\'opció de gestió d\'arxius. Es guardarà en el teu dispositiu un arxiu JSON amb tota la informació rellevant i podràs restaurar-des de qualsevol dispositiu carregant el fitxer de configuració que hagis descarregat. ' +
    'Per exemple, pots crear un bingo al teu ordinador, guardar-lo en un servei d\'emmagatzematge en el núvol i carregar des d\'un telèfon mòbil.</p>' +
    '<p>No hi ha cap backend involucrat en aquesta aplicació. Això és bo perquè vol dir que no es poden emmagatzemar dades privades a cap servidor. No obstant això, el principal inconvenient és que, com les imatges s\'han d\'emmagatzemar en algun lloc, aquest lloc és la pròpia memòria ' +
    'del navegador. Això afecta dramàticament al rendiment. Per bingos de 5x5 (el format més comú) no és tan dolent, però es nota molt en bingos de 10x10. A més, si puges una imatge gran com a fons o banner, el rendiment també pot ser bastant dolent. No hi ha molt que es pugui fer per ' +
    'millorar això (ja he provat comprimint les imatges) a part d\'implementar un backend, el que realment no vull fer per diverses raons com el cost, el manteniment, la moderació del contingut, etc.</p>' +
    '<p>Espero que gaudeixis utilitzant aquesta aplicació tant com jo he gaudit fent-la. Si tens algun comentari o pregunta, no dubtis a posar-te en contacte amb mi :)</p>' +
    '<p>El codi està disponible en GitHub</p>' +
    '<p>Aquesta aplicació està feta amb ❤ per <a style="color:white" target="_blank" href="https://twitter.com/roselcost">Daniel Larrosa</p>',
  eventTitle: 'Títol de l\'esdeveniment',
  extraSquaresTitle: 'Caselles extra',
  square: 'Casella',
  extra: 'Extra',
  removeImage: 'Treure imatge',
  cropImage: 'Ajustar imatge',
  uploadImage: 'Pujar imatge individual',
  shuffle: 'Barrejar',
  blur: 'Desenfocar',
  edit: 'Editar',
  share: 'Compartir',
  clearMarkers: 'Restablir marques',
  download: 'Descarregar',
  shareText: 'Pots compartir el teu bingo des d\'aquí. Atès que hi ha restriccions a l\'hora de compartir imatges en xarxes socials, hauràs de descarregar la imatge i després compartir-la, però puc fer el procés una mica més fàcil ' +
    'posant tots els botons per compartir i després afegeix la imatge descarregada :)',
  clearText: 'Estàs segur de que vols restablir totes les marques?',
  image: 'Imatge',
  bingoTitlePlaceholder: 'Posa-li un nom a aquest bingo',
  bingoExtrasPlaceholder: 'Posa-li un nom a les caselles extra',
  yes: 'Sí',
  no: 'No',
  score: 'Puntuació',
  loading: 'Carregant',
  choose: 'Triar',
  move: 'Moure',
  done: 'Fet',
  of: 'de',
  line: 'línia',
  mode: 'Mode',
  view: 'Vista',
  imageInstructions: 'Fes click o arrossega aquí per pujar una imatge',
  alertNotImage: 'Has pujat un arxiu que no és una imatge',
  notValidJSON: 'Arxiu JSON no vàlid!'
}

const strings = {
  en: english,
  es: spanish,
  ca: catalan
}
module.exports = {
  strings
}
