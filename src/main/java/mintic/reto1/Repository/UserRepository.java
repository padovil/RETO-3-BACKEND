package mintic.reto1.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;

import mintic.reto1.Model.User;
import mintic.reto1.Repository.Crud.UserCrudRepository;

@Repository
public class UserRepository {
    
    @Autowired
    private UserCrudRepository UserCrudRepository;
    
    public List<User> getAll(){
        return  (List<User>) UserCrudRepository.findAll();
    }

    public Optional<User> getUser(int id){
        return UserCrudRepository.findById(id);
    }

    public User save(User User){
        return UserCrudRepository.save(User);
    }

    public void delete(int id){
        UserCrudRepository.deleteById(id);        
    }

    public User getByEmail(String email){
        return UserCrudRepository.findByEmail(email);
    }

    public User getByEmailAndPassword(String email,String password){
        return UserCrudRepository.findNameByEmailAndPassword(email,password);
    }
}
