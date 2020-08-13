using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        //Get api/api
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            //throw new Exception("Test Exception");  
            return new string[] { "value1", "value2" };
        }
    }
}