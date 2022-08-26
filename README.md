# REST Auth
- POST http://hostname/api/auth/register REGISTER NEW USER (use db) -> 
- POST http://hostname/api/auth/login LOGIN USER (use db) ->
- POST http://hostname/api/auth/logout LOGOUT USER -> 

# REST Users
- GET http://hostname/api/users GET ALL USERS (use db) ->
- GET http://hostname/api/users/{id} GET USER (use db) ->
- PUT http://hostname/api/users/{id} UPDATE USER (use db) ->
- DELETE http://hostname/api/users/{id} DELETE USER (use db) ->
- POST http://hostname/api/users/{id}/upload/photo UPLOAD USER PHOTO -> 

# REST Pets
- GET http://hostname/api/pets GET ALL PETS (use db) ->
- GET http://hostname/api/pets/{id} GET PET (use db) ->
- POST http://hostname/api/pets CREATE NEW PET (use db) ->
- PUT http://hostname/api/pets/{id} UPDATE PET (use db) ->
- DELETE http://hostname/api/pets/{id} DELETE PET (use db) ->
- POST http://hostname/api/users/{id}/pets/photo UPLOAD PET PHOTO ->
