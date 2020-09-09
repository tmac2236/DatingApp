using System.Threading.Tasks;
using DFPS.API.Models;
using System.Collections.Generic;

namespace DFPS.API.Data.Interface
{
    public interface IUserDAO
    {

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);


        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);

    }
}