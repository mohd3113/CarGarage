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

            CreateMap<Request, RequestForListDto>()
             .ForMember(m => m.Total, opt => opt.MapFrom(u => u.RequestVihicles.Sum(c => c.Vehicle.Price)));

            CreateMap<RequestForListDto, Request>();

            CreateMap<Request, RequestToAddDto>().ReverseMap();

            CreateMap<Request, RequestForDetailsDto>()
            .ForMember(m => m.Vehicles, opt => opt.MapFrom(u => u.RequestVihicles.Select(p => p.Vehicle).ToList()))
            .ForMember(m => m.Total, opt => opt.MapFrom(u => u.RequestVihicles.Sum(c => c.Vehicle.Price)));

            CreateMap<RequestForDetailsDto, Request>();

        }
    }
}