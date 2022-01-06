

Application Pre Requirements

1) .Net Core 6.0
2) Angular CLI: 11.2.3


Application Running Methods.

1) First Method: Easy Way :)

Open the running application from the following link:
https://cargaragebackend.azurewebsites.net/


2) Second Method : Long Way

a) Clone the current repo from GitHub.

(Back-End)
a) Set the SQL Server Connection String in 'appsettings.Development.json' and 'appsettings.json' files.
b) Navigate to 'CarGarageBackEnd' Folder in CMD
c) run the command -> dotnet restore
d) run the commad -> dotnet ef database update
e) run the command -> dotnet run

(Front-End)
a) Navigate to 'CarGarageFrontEnd' Folder in CMD
b) run the command -> npm install
c) run the command -> ng serve
d) open broser on localhost:4200

(Back-End Unit-Test)
a) Navigate to 'CarGarageBackEnd.Tests' Folder in CMD
b) run the command -> dotnet restore
c) run the command -> dotnet test


If you get ERR_CERT_AUTHORITY_INVALID (Problem retrieving data) error in the browser console you need to remove the HTTPS setting in the development environment, so follow the following steps.
1) Go to 'Startup.cs' file in CarGarageBackEnd folder.
2) In 'Configure' Method remove or comment ' app.UseHttpsRedirection();' line.
3) Go to 'environment.ts' file in CarGarageFrontEnd -> src -> environments folder
4) Change the  'apiUrl' value to ' http://localhost:5064'/api/'
5) run the command -> ng serve
6) open broser on localhost:4200


You can access Admin Page from "/login" 
Username : Admin
Password: password

Enjoy ;)
