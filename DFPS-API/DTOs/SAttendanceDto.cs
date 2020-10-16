using System;
namespace DFPS.API.DTOs
{
    public class SAttendanceDto
    {
        public DateTime WorkDate { get; set; }
        public string PDC { get; set; }
        public string Building { get; set; }
        public string Lean { get; set; }
        public string Team { get; set; }
        public int OnDuty { get; set; }
        public int OffDuty { get; set; }
        public int TotalDuty { get; set; }
        public double OnDutyPercent { get; set; }
        public double OffDutyPercent { get; set; }
        public string OrderBy { get; set; }
    }
}