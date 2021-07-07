class Camara {
  constructor(videoNode) {
    this.videoNode = videoNode;
  }

  encender() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 300,
          height: 300,
        },
        audio: false,
      })
      .then((stream) => {
        this.videoNode.srcObject = stream;
        this.stream = stream;
      });
  }

  apagar() {
    // Congela el vídeo
    this.videoNode.pause();

    if (this.stream) {
      this.stream.getTracks()[0].stop(); //La primera [0] es el vídeo
    }
    // navigator.mediaDevices.getUserMedia({ video: false, audio: false });
  }

  tomarFoto() {
    // Crear un elemento HTML canvas para renderizar la foto
    let canvas = document.createElement("canvas");

    // Colocar dimensiones igual al elemento del vídeo
    canvas.setAttribute("width", 300);
    canvas.setAttribute("height", 300);

    // Obtener el contexto del canvas
    let context = canvas.getContext("2d"); //Simple imagen

    // Renderizar la imagen dentro del canvas
    context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

    // String en base 64 que funciona como src
    this.foto = context.canvas.toDataURL();

    // Limpieza
    canvas = null;
    context = null;

    return this.foto;
  }
}
