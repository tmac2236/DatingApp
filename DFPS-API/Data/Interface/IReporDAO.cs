using System.Collections.Generic;
using System.Threading.Tasks;
using DFPS.API.DTOs;
using DFPS_API.DTOs;

namespace DFPS.API.Data.Interface
{
    public interface IReporDAO
    {
        Task<IEnumerable<GetReportDataPassDto>> GetReportDataPass(SReportDataPassDto sReportDataPassDto);
    }
}