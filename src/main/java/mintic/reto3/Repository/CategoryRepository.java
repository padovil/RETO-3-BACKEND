package mintic.reto3.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Model.Category;
import mintic.reto3.Repository.Crud.CategoryCrudRepository;

@Repository
public class CategoryRepository {
    
    @Autowired
    private CategoryCrudRepository categoryCrudRepository;
    
    public List<Category> getAll(){
        return  (List<Category>) categoryCrudRepository.findAll();
    }

    public Optional<Category> getCategory(int id){
        return categoryCrudRepository.findById(id);
    }

    public Category save(Category Category){
        return categoryCrudRepository.save(Category);
    }

    public void delete(int id){
        categoryCrudRepository.deleteById(id);        
    }

}
