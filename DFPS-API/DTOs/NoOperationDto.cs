using System;
namespace DFPS.API.DTOs
{
    public class NoOperationDto
    {
        public DateTime? StartDate { get; set; }
        public string? Lean { get; set; }
        public decimal? Status { get; set; }
        public int? IOrder { get; set; }
        public int? OnDuty { get; set; }
    }
}