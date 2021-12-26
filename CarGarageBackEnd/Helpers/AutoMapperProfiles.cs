using AutoMapper;
using CarGarageBackEnd.Dtos;
using System.Security.Claims;
using CarGarageBackEnd.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CarGarageBackEnd.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Vehicle, CarForListDto>()
            .ForMember(m => m.CarLocation, opt => opt.MapFrom(u => u.Car.Location))
            .ForMember(m => m.WarehouseName, opt => opt.MapFrom(u => u.Car.Warehouse.Name))
            .ForMember(m => m.Lat, opt => opt.MapFrom(u => u.Car.Warehouse.Location.Lat))
            .ForMember(m => m.Long, opt => opt.MapFrom(u => u.Car.Warehouse.Location.Long));
        }
    }
}