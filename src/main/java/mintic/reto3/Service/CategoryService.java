package mintic.reto3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Repository.CategoryRepository;
import mintic.reto3.Model.Category;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional (readOnly = true)
    public List<Category> getAll(){
        return (List <Category>) categoryRepository.getAll();
    }

    @Transactional (readOnly = true)
    public Optional<Category> getCategory(int id){
        return categoryRepository.getCategory(id);
    }

    // @Transactional (readOnly = true)
    public Category save(Category Category){
        if(Category.getId()==null){
            return categoryRepository.save(Category);
        }else{
            // Optional<Category> aux = categoryRepository.getCategory(Category.getId());
            // if(aux.isEmpty()){
                return categoryRepository.save(Category);
            // }else{
            //     return Category;
            // }
        }
    }

    public Category update(Category Category){
        if(Category.getId()!=null){
            Optional<Category>g=categoryRepository.getCategory(Category.getId());

            // if(!g.isEmpty()){
                if(Category.getName()!=null){
                    g.get().setName(Category.getName());                    
                }

                if(Category.getDescription()!=null){
                    g.get().setDescription(Category.getDescription());
                }              
          
                return categoryRepository.save(g.get());
            // }
        }
        return Category;
    }

    @Transactional 
    public void deleteCategory(int id){
        categoryRepository.delete(id);
    }


}
