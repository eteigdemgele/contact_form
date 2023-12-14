# contact_form

## typescript

1- Initialize the project:
> npm init -y

2- Install TypeScript express node:
> npm install express typescript @types/node @types/express ts-node nodemon --save-dev

3- Install TypeScript - redundant:
> npm install typescript --save-dev

4-Transpile the TypeScript code into JavaScript: Add the necessary elements in the Script part of the package.json file:
"scripts": {
"build": "tsc",
"start": "node dist/app.js",
"dev": "nodemon src/app.ts",
"lint": "eslint src --fix",
"test": "echo \"Error: no test specified\" && exit 1"
},

5- Create the tconfig.json file at the root of the project:
> touch tconfig.json

and copy this into tconfig.json:
{ "compilerOptions": {
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

6- Integrate a linter and a code formatter:
For ESLint:
> npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

For Prettier:
> npm install --save-dev --save-exact prettier

7- Add all dependencies:
> npm install "library name"

then the type definition by doing
> npm i --save-dev @types/"library name"

## docker

8- Build the Docker image
> docker build -t contact_form .

9- Check that the Docker image has been built correctly
> docker image
## build the docker and typescript

10- Check that the server is working:
First, by creating a "src" directory in which we have the "app.ts" file
And then,
> npm run dev

11- Launch the docker and build it
> docker-compose up --build :

11- Force the rebuild in case of problem:
> docker-compose up --build --force-recreate .