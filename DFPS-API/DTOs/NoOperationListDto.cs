using System;
using System.Collections.Generic;

namespace DFPS.API.DTOs
{
    public class NoOperationListDto
    {
        public DateTime? StartDate { get; set; }
        public List<NoOperationDto>? NoOperationDtos { get; set; }
    }
}