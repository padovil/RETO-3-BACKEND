/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mintic.reto1.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mintic.reto1.Model.User;
import mintic.reto1.Repository.UserRepository;

/**
 *
 * @author USUARIO
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() {
        return userRepository.getAll();
    }

    public Optional<User> getUser(int id) {

        return userRepository.getUser(id);
    }

    public User create(User user) {
        if (user.getId() == null) {
            return user;
        } else {
            Optional<User> e = userRepository.getUser(user.getId());
            if (!e.isPresent()) {
                if (emailExists(user.getEmail()) == false) {
                    return userRepository.create(user);
                } else {
                    return user;
                }
            } else {
                return user;
            }
        }
    }

    // @Transactional (readOnly = true)
    public User save(User User) {
        if (User.getId() == null) {
            return UserRepository.save(User);
        } else {
            // Optional<User> aux = UserRepository.getUser(User.getId());
            // if(aux.isEmpty()){
            return UserRepository.save(User);
            // }else{
            // return User;
            // }

        }
    }

    public User update(User user) {

        if (user.getId() != null) {
            Optional<User> userDb = userRepository.getUser(user.getId());
            if (userDb.isPresent()) {
                if (user.getIdentification() != null) {
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null) {
                    userDb.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                }

                userRepository.update(userDb.get());
                return userDb.get();
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    public boolean delete(int userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public boolean emailExists(String email) {
        return userRepository.emailExists(email);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> usuario = userRepository.authenticateUser(email, password);

        if (!usuario.isPresent()) {
            return new User();
        } else {
            return usuario.get();
        }
    }

}
