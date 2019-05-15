package WebApplication.web_server_java.controllers;
import java.util.ArrayList;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import WebApplication.web_server_java.models.User;

@RestController
public class UserController implements ApplicationListener<ApplicationReadyEvent> {
  private ArrayList<User> registeredUsers = new ArrayList<User>();
  private static int idIndex = 0;

  @GetMapping("/api/initialize")
  public String initialize() {
    User a = new User(idIndex, "alice", "alice", "Alice", "Wonderland", "Student");
    idIndex++;
    User b = new User(idIndex,"bob", "bob", "Bob", "Belcher", "Student");
    idIndex++;
    registeredUsers.add(a);
    registeredUsers.add(b);

    return "intialization successful";
  }

  // Thanks to raspacorp for instructions on running methods on startup
  // https://stackoverflow.com/questions/27405713/running-code-after-spring-boot-starts#44923402
  @Override
  public void onApplicationEvent(final ApplicationReadyEvent event) {
    initialize();
    return;
  }

  @GetMapping("/api/users")
  public ArrayList<User> findAllUsers() {
    return registeredUsers;
  }

  @GetMapping("/api/users/{userid}")
  public User findUserById(@PathVariable("userid") int userid) {

    for (int i = 0; i < registeredUsers.size(); i++) {
      if (registeredUsers.get(i).getId() == userid) {
        return registeredUsers.get(i);
      }
    }
    return null;
  }

  @PostMapping("/api/users")
  public User addUser(@RequestBody User user) {
    User newUser = new User(idIndex, user);
    registeredUsers.add(newUser);
    idIndex++;
    return newUser;
  }

  @DeleteMapping("/api/users/{userid}")
  public String deleteUser(@PathVariable("userid") int userid) {

    for (int i = 0; i < registeredUsers.size(); i++) {
      if (registeredUsers.get(i).getId() == userid) {
        registeredUsers.remove(i);
        return "User " + userid + " deleted";
      }
    }
    return "User not found";
  }

  @PutMapping("/api/users")
  public String updateUser(@RequestBody User user) {

    for (int i = 0; i < registeredUsers.size(); i++) {
      if (registeredUsers.get(i).getId() == user.getId()) {
        User target = registeredUsers.get(i);
        target.setUsername(user.getUsername());
        target.setPassword(user.getPassword());
        target.setFirstName(user.getFirstName());
        target.setLastName(user.getLastName());
        target.setRole(user.getRole());

        return "User " + user.getId() + " updated";
      }
    }
    return "User not found";
  }
}
