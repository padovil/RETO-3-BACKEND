package mintic.reto3.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mintic.reto3.Repository.MessageRepository;
import mintic.reto3.Model.Message;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Transactional (readOnly = true)
    public List<Message> getAll(){
        return (List <Message>) messageRepository.getAll();
    }

    @Transactional (readOnly = true)
    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    // @Transactional (readOnly = true)
    public Message save(Message Message){
        if(Message.getIdMessage()==null){
            return messageRepository.save(Message);
        }else{
            // Optional<Message> aux = messageRepository.getMessage(Message.getId());
            // if(aux.isEmpty()){
                return messageRepository.save(Message);
            // }else{
            //     return Message;
            // }
        }
    }

    public Message update(Message Message){
        if(Message.getIdMessage()!=null){
            Optional<Message>g=messageRepository.getMessage(Message.getIdMessage());

            // if(!g.isEmpty()){
                if(Message.getMessageText()!=null){
                    g.get().setMessageText(Message.getMessageText());
                    
                }

                // if(Message.getIdClient()!=null){
                //     g.get().setIdClient(Message.getIdClient());
                // }

                // if(Message.getIdCostume() !=null){
                //     g.get().setIdCostume(Message.getIdCostume());
                // }

                return messageRepository.save(g.get());
            // }
        }
        return Message;
    }

    @Transactional 
    public void deleteMessage(int id){
        messageRepository.delete(id);
    }


}
