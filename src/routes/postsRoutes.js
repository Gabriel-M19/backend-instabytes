import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados pelo Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório onde os arquivos serão salvos
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo salvo, mantendo o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições com corpo em formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;