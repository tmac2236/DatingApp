using DFPS.API.Data;
using DFPS_API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DFPS.API.Controllers
{
    public class PlanWorkerController : ApiController
    {
        private readonly DataContext _context;
        public PlanWorkerController(DataContext context)
        {
            _context = context;
        }
        //http://localhost:5000/api/planWorker/getPlan
        [HttpGet("getPlan")]
        public async Task<IActionResult> GetTestJustName()
        {
            var deptList = from t1 in _context.SampleWorkBase
                           join t2 in _context.SampleWorkProcess on t1.Fid equals t2.Hid
                           join t3 in _context.SampleWorkWorker on t2.Fid equals t3.Hid
                           where t1.SampleNr != null && t1.Maker != null
                           select new PlanProcessWork
                           {
                               Maker = t1.Maker,
                               SampleNr = t1.SampleNr,
                               SampleDesc = t1.SampleDesc,
                               OrdinalNum = t2.OrdinalNum,
                               ProcessNum = t2.ProcessNum,
                               Description = t2.Description,
                               WorkerNum = t3.WorkerNum,
                               WorkerName = t3.WorkerName
                           };
            var list = await deptList.ToListAsync().ConfigureAwait(false); // <-- notice the `await`

            return Ok(list);
        }
        //http://localhost:5000/api/planWorker/getOnePlan?sampleNr=LAF12&maker=L2B
        [HttpGet("getOnePlan")]
        public async Task<IActionResult> GetPlanProcessWorkByLeanNModelNo(string sampleNr, string maker)
        {
            var deptList = from t1 in _context.SampleWorkBase
                           join t2 in _context.SampleWorkProcess on t1.Fid equals t2.Hid
                           join t3 in _context.SampleWorkWorker on t2.Fid equals t3.Hid
                           where t1.SampleNr == sampleNr && t1.Maker == maker
                           select new PlanProcessWork
                           {
                               Maker = t1.Maker,
                               SampleNr = t1.SampleNr,
                               SampleDesc = t1.SampleDesc,
                               OrdinalNum = t2.OrdinalNum,
                               ProcessNum = t2.ProcessNum,
                               Description = t2.Description,
                               WorkerNum = t3.WorkerNum,
                               WorkerName = t3.WorkerName
                           };
            var list = await deptList.ToListAsync().ConfigureAwait(false); // <-- notice the `await`

            return Ok(list);
        }


    }
}