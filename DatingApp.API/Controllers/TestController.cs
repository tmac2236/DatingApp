using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    public class TestController : ApiController
    {
        private readonly DataContext _context;
        public TestController(DataContext context)
        {
            _context = context;
        }
        //http://localhost:5000/api/test/getTest
        [HttpGet("getTest")]
        public async Task<IActionResult> GetTestJustName()
        {
            var deptList = await _context.Cust_Dept_Basic.ToListAsync();
            return Ok(deptList);
        }
        //http://localhost:5000/api/test/5
        [HttpGet("{deptId}")]
        public async Task<IActionResult> GetTestById(long deptId){
            var dept = await _context.Cust_Dept_Basic.FirstOrDefaultAsync(x => x.Id == deptId);
            return Ok(dept);
        }

    }
}