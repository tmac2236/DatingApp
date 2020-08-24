using System.Threading.Tasks;
using DatingApp.API.Models;
using System.Collections.Generic;

namespace DatingApp.API.Data.Interface
{
    public interface IUserRepository
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