# hapi-swager-joi-sequelize-example
Example code for combined use of "hapi-swagger" and 'joi-sequelize".  
More specifically, it is gathered code of example code each of dependent project. And it is able to run instantly.  

# WYNTK befor try this project.
 This example project is built on `sequelize@3.30.4` with `sequelize-cli@2.7.0`. plz notice that it is not `sequelize@4.x.x`.
v4 has breaking changes, and this example project doesn't consider about them.

 When I write this example, I intended that if a programmer commands `sequelize model:create --name foo --attribute ...`. Then, Automatically, a Resful API be produced at `/api/foo` path.  **But it doesn's fully works Yet.**

# How can I try?
```bash
git clone https://github.com/rino0601/hapi-swager-joi-sequelize-example.git
cd hapi-swager-joi-sequelize-example
npm install
npm start
```
and then, open http://localhost:3000/documentation to see what happens.


# LoadMap
* ~~auto Generate SIMPLE CRUD API for Sequelize model~~
* provide way to add custom API.
* proper One-to-one relationship handling
* proper One-to-many relationship handling
* proper Many-to-many relationship handling
* provide options for...
  * auto generate white|brack list.
  * proper url prefix
  * ...else?
* auth
