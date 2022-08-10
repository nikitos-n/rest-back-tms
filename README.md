# REST Auth
- POST http://hostname/api/auth/register CREATE NEW USER ->
- POST http://hostname/api/auth/login LOGIN USER -> 

# REST Users
- GET http://hostname/api/users GET ALL USERS -> userController.getUsers
- GET http://hostname/api/users/{id} GET USER -> userController.getUserById
- PUT http://hostname/api/users/{id} UPDATE USER -> userController.updateUser
- DELETE http://hostname/api/users/{id} DELETE USER -> userController.deleteUserById
- DELETE http://hostname/api/users DELETE USERS -> userController.deleteUsers

# REST Pets
- GET http://hostname/api/pets GET ALL PETS -> petController.getpets 
- GET http://hostname/api/pets/{id} GET PET -> petController.getCatById
- POST http://hostname/api/pets CREATE NEW PET -> petController.createCat (use DB)
- PUT http://hostname/api/pets/{id} UPDATE PET ->  petController.updateCat
- DELETE http://hostname/api/pets/{id} DELETE PET -> petController.deleteCatById