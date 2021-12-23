using System.Collections.Generic;
using System.Linq;
using CarGarageBackEnd.Dtos;
using CarGarageBackEnd.Models;
using Microsoft.AspNetCore.Identity;
using CarGarageBackEnd.Data;
using Newtonsoft.Json;

namespace CarGarageBackEnd.Data

{
    public class Seed
    {
        public static void SeedWarehouses(UserManager<User> userManager, RoleManager<Role> roleManager,DataContext context)
        {
            if (!userManager.Users.Any())
            {
                var warehouseData = System.IO.File.ReadAllText("Data/warehouses.json");
                var warehouses = JsonConvert.DeserializeObject<List<CarsFromJsonDto>>(warehouseData);

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var ware in warehouses)
                {
                    Warehouse warehouse = new Warehouse
                    {
                        Name = ware.name,
                        Location = new Location
                        {
                            Lat = ware.location.lat,
                            Long = ware.location.lon
                        },
                        Cars = new Car
                        {
                            Location = ware.cars.location,
                            Vehicles = ware.cars.vehicles.Select(p => new Vehicle
                            {
                                Make = p.make,
                                Model = p.model,
                                YearModel = p.year_model,
                                Price = p.price,
                                Licensed = p.licensed,
                                DateAdded = p.date_added
                            }).ToList()
                        }
                    };
                    context.Warehouses.Add(warehouse);
                    context.SaveChanges();
                }
                
                var adminUser = new User
                {
                    UserName = "Admin",
                    Gender = "Male",
                    Created = DateTime.Now,
                    About = "The Garage Owner"
                };

                var result = userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin" }).Wait();
                }
            }

        }
    }
}