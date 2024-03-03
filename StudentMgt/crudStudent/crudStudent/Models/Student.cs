using System.ComponentModel.DataAnnotations;

namespace crudStudent.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ContactPerson { get; set; }

        public string? ContactNo { get; set; }
        public string? Email { get; set; }
        public string? Dob { get; set; }

        public string? Age { get; set; }
        public string? Classroom { get; set; }

    }
}
