package mintic.reto1.Repository.Crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import mintic.reto1.Model.Footwears;

public interface FootwearsCrudRepository extends MongoRepository<Footwears, String> {

}
