# Étape 1, basé sur Node.js pour construire et compiler l'application Angular
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# TODO VOIR LE FICHIER DIST ET CE QU'IL Y A APRES POUR LA LIGNE EN DESSOUS
# Étape 2, basée sur Nginx pour avoir uniquement le contenu compilé pour servir avec Nginx
RUN npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist/k9-club/browser/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
