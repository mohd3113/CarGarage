using Xunit;
using CarGarageBackEnd.Controllers;
using CarGarageBackEnd.Data;
using CarGarageBackEnd.Models;
using CarGarageBackEnd.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CarGarageBackEnd.Dtos;
using AutoMapper;
using System.Collections.Generic;

namespace CarGarageBackEnd.Tests;

public class CarControllerTest
{
    private readonly CarsController _controller;
    private readonly ICarGarageRepo _repo;
    private readonly IMapper _mapper;
    public CarControllerTest()
    {
        _repo = new CarGarageFakeRepo();
        var mapperConfig = new MapperConfiguration(mc =>
           {
               mc.AddProfile(new AutoMapperProfiles());
           });
        _mapper = new Mapper(mapperConfig);
        _controller = new CarsController(_repo, _mapper);
    }
    [Fact]
    public void ReturnsOkResult()
    {
        var okResult = _controller.GetCars(new CarParams());
        Assert.IsType<OkObjectResult>(okResult as OkObjectResult);
    }

    [Fact]
    public void GetAllCarsTest()
    {
        var okResult = _controller.GetCars(new CarParams()) as OkObjectResult;
        var items = Assert.IsType<List<CarForListDto>>(okResult.Value);
        Assert.Equal(2, items.Count);
    }
}