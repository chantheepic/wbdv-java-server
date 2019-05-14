package WebApplication.web_server_java.controllers;
import java.util.ArrayList;

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
public class UserController {
  private ArrayList<User> registeredUsers = new ArrayList<User>();

  @GetMapping("/api/initialize")
  public String initialize() {
    User a = new User("alice", "alice", "Alice", "Wonderland", "Student");
    User b = new User("bob", "bob", "Bob", "Belcher", "Student");
    registeredUsers.add(a);
    registeredUsers.add(b);

    return "intialization successful";
  }

  @GetMapping("/api/users")
  public ArrayList<User> findAllUsers() {
    return registeredUsers;
  }

  @PostMapping("/api/users")
  public User addUser(@RequestBody User user) {
    registeredUsers.add(user);
    return user;
  }

  @DeleteMapping("/api/users")
  public String deleteUser(@RequestBody String stringId) {
    int id = Integer.parseInt(stringId);

    for (int i = 0; i < registeredUsers.size(); i++) {
      if (registeredUsers.get(i).getId() == id) {
        registeredUsers.remove(i);
        return "User " + i + " deleted";
      }
    }

    return "User not found";
  }

  @PutMapping("/api/users")
  public String updateUser(@RequestBody String stringId) {
    int id = Integer.parseInt(stringId);

    for (int i = 0; i < registeredUsers.size(); i++) {
      if (registeredUsers.get(i).getId() == id) {
        return "User " + i + " updated";
      }
    }

    return "User not found";
  }
}
