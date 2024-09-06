import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import todoRoutes from './routes/todo';
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";

const app: Express = express();
const PORT = 8000;

const file = fs.readFileSync("./docs/swagger.yml", "utf8");
const swaggerDocumentYaml = YAML.parse(file);
// YAMLドキュメントを提供するエンドポイント
app.use(
  "/api-docs",
  swaggerUi.serveFiles(swaggerDocumentYaml),
  swaggerUi.setup(swaggerDocumentYaml),
);

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(morgan('dev'));

// /todos エンドポイントに対して todoRoutes を使用
app.use('/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
