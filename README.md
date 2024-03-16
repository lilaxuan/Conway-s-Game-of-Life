# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Conway-s-Game-of-Life

1. Initialize the React App:

`npm create vite@latest`

Select react, and javascript; then choose the app name; and package name

2. install the dependencies 

`npm install`

3. run the app on localhost

cd into the package directory

`npm run dev`

4. Add React Reouter to help to route accross different pages
`npm install react-router-dom`   (this will automatically add the dependency in the package.json)

# Host React Application on Heroku
## 1. build the React application
`npm run build`

## 2. Install express
`npm install express`

## 3. create a server.js

## 4. Prepare Your Heroku Environment
### 4.1 Install the Heroku CLI: 
On MacOS: 

`brew tap heroku/brew && brew install heroku`
`heroku --version`
`heroku login` or `heroku login -i`
`cd ~/myapp`
`heroku create`



// Move all files from Conways-Game-of-life-react-app to root directory
cd 
mv * .[^.]* ..
cd ..
