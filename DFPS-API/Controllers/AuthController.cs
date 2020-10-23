using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DFPS.API.Data.Interface;
using DFPS.API.DTOs;
using DFPS.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using DFPS_API.Data.Repository.Interfaces;

namespace DFPS.API.Controllers
{
    public class AuthController : ApiController
    {
        private readonly IUserDAO _authDAO;
        private readonly IMesUserDAO _mesUserDAO;
        private readonly IConfiguration _config;
        public AuthController(IUserDAO authDAO, IConfiguration config, IMesUserDAO mesUserDAO)
        {
            _config = config;
            _authDAO = authDAO;
            _mesUserDAO = mesUserDAO;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate request

            userForRegisterDto.Account = userForRegisterDto.Account.ToLower();

            if (await _authDAO.UserExists(userForRegisterDto.Account))
                return BadRequest("User already exists!");

            var userToCreate = new User
            {
                Account = userForRegisterDto.Account,
                Password = userForRegisterDto.Password
            };
            var createdUser = await _authDAO.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }
                [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userForLoginDto)
        {

            var userFromRepo = await _mesUserDAO.Login(userForLoginDto.Account, userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Factory_ID),
                new Claim(ClaimTypes.Name, userFromRepo.User_ID)
                };
            var tokenName = _config.GetSection("AppSettings:Token").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(tokenName));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });

        }
        [HttpPost("logins")]
        public async Task<IActionResult> Logins(UserDto userForLoginDto)
        {

            var userFromRepo = await _authDAO.Login(userForLoginDto.Account.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Account)
                };
            var tokenName = _config.GetSection("AppSettings:Token").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(tokenName));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });

        }
        
    }
}