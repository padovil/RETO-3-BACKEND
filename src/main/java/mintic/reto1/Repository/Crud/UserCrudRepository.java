package mintic.reto1.Repository.Crud;


import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import mintic.reto1.Model.User;


public interface UserCrudRepository extends CrudRepository<User,Integer>{
    public User findByEmail(String email);

    @Query("select u from User u where u.email = :email and u.password = :password")
    User findNameByEmailAndPassword(@Param("email") String email,
                                   @Param("password") String password);
}

