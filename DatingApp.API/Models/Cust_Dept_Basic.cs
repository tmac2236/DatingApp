using System.ComponentModel.DataAnnotations;
namespace DatingApp.API.Models
{
    public class Cust_Dept_Basic
    {
        [Key]
        public long Id { get; set; }
        [StringLength(1)]
        public string Factory_ID { get; set; }
        [StringLength(3)]
        public string Dept_ID { get; set; }
        [StringLength(40)]
        public string Dept_Desc { get; set; }
    }
}