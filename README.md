# Requirements
- node.js v16+
- docker, docker-compose

# Stack 
- nginx
- postgresql
- node.js (express.js)
- redis 

# Project installation
- `./install_project.sh` - to init base project config
- `npm run db:migrate` - to run migrations
- `npm run db:seed:all` - to run seeds
- Open [http://localhost/api/docs](http://localhost/api/docs) - to test API
