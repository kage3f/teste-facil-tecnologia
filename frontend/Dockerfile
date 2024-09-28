# Use uma imagem oficial do Node.js como imagem pai
FROM node:14

# Configure o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do projeto
COPY . .

# O app usa a porta 3000
EXPOSE 3000

# Defina o comando para executar o app em modo de desenvolvimento
CMD ["npm", "start"]