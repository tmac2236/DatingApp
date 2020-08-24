using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data.Interface;
using DatingApp.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    public class UsersController : ApiController
    {
        private readonly IUserRepository _userDAO;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userDAO, IMapper mapper)
        {
            _mapper = mapper;
            _userDAO = userDAO;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userDAO.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userDAO.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

    }
}