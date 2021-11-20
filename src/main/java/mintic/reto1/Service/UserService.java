package mintic.reto1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto1.Model.User;
import mintic.reto1.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository UserRepository;

    @Transactional (readOnly = true)
    public List<User> getAll(){
        return (List <User>) UserRepository.getAll();
    }

    @Transactional (readOnly = true)
    public Optional<User> getUser(int  id){
        return UserRepository.getUser(id);
    }

    // @Transactional (readOnly = true)
    public User save(User User){
        if(User.getId()==null){
            return UserRepository.save(User);
        }else{
            Optional<User> aux = UserRepository.getUser(User.getId());
            if(aux.isEmpty()){
                return UserRepository.save(User);
            }else{
                return User;
            }
        }
    }

    // public User update(User User){
    //     if(User.getId()!=null){
    //         Optional<User>g=UserRepository.getUser(User.getId());

    //         if(!g.isEmpty()){
    //             if(User.getUserEmail()!=null){
    //                 g.get().setUserEmail(User.getUserEmail());                    
    //             }

    //             if(User.getUserPassword()!=null){
    //                 g.get().setUserPassword(User.getUserPassword());
    //             }

    //             if(User.getUserName() !=null){
    //                 g.get().setUserName(User.getUserName());
    //             }
          
    //             return UserRepository.save(g.get());
    //         }
    //     }
    //     return User;
    // }

    @Transactional 
    public void deleteUser(int id){
        UserRepository.delete(id);
    }


    @Transactional (readOnly = true)
    public User getByEmail(String  userEmail){        
        // if(UserRepository.getByUserEmail(userEmail)==null){
        //     return false;
        // }
        // return true;  
        return UserRepository.getByEmail(userEmail)      ;
    }

    public User getByEmailAndPassword(String email,String password){
        User g=UserRepository.getByEmailAndPassword(email,password);
        User user = new User();
        
        if(g==null){            
            user.setName("NO DEFINIDO");
            user.setPassword(password);
            user.setEmail(email);  
            return user;         
        }
        return g;
        
           
    }
}
