# contact_form

## typescript  

1- Initialiser le projet :
> npm init -y

2- Installer TypeScript express node :
> npm install express typescript @types/node @types/express ts-node nodemon --save-dev

3- Installer TypeScript - redondant :
> npm install typescript --save-dev

4-**Transpiler le code typescripten javascript :** Ajouter les éléments nécessaires dans la partie Script du fichier package.json :
"scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "lint": "eslint src --fix",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
    
5- Créer le fichier tconfig.json  à la racine du projet :
> touch tconfig.json

et copier ceci dans tconfig.json: 
	{  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/app.ts"],
  "exclude": ["node_modules"]
}

6- Intégrer un linter et un formatteur de code :
**Pour ESLint :**
> npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

**Pour Prettier :**
> npm install --save-dev --save-exact prettier
 
7- Ajouter tous les dépendances :
> npm installle"le nom du bibliothèque"

puis la définition des types en faisant 
> npm i --save-dev @types/"le nom du bibliothèque" 

## docker

8- Construire l'image Docker
> docker build -t contact_form .

9- Vérifier que l'image Docker a bien été construit
> docker image
## builder le docker et typescript 

10- Vérifier que le serveur fonctionne :
Tout d'abord, en créeant un répertoire "src" dans lequel on a le fichier "app.ts"
Et ensuite,
> npm run dev

11- Lancer le docker et le builder
> docker-compose up --build :

11- Forcer le rebuild en cas de problème: 
> docker-compose up --build  --force-recreate