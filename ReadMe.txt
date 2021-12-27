How to Run the Application


1) First Way: Easy way :)

Open the running application from the following link:
http://mohd31132-001-site5.btempurl.com/


2) Hard Way 

a) Clone the current repo from GitHub.

(Back-End)

b) Set the SQL Server Connection String in appsettings.Development.json and appsettings.json files.
c) Navigate to CarGarageBackEnd Folder in CMD
d) run the command -> dotnet restore
e) run the commad -> dotnet ef database update
f) run the command -> dotnet run

(Front-End)
g) Navigate to CarGarageFrontEnd Folder in CMD
h) run the command -> ng install
i) run the command -> ng serve

(Back-End Unit-Test)
j) Navigate to CarGarageBackEnd.Tests Folder in CMD
k) run the command -> dotnet test