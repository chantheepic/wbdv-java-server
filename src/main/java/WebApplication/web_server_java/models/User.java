package WebApplication.web_server_java.models;

// implementation of user model
public class User {
  private int id;
  private String username;
  private String password;
  private String firstName;
  private String lastName;
  private String role;

  // default constructor
  public User(){
    super();
  }

  // constructor for auto incrementing function
  public User(int id, User other) {
    this.id = id;
    this.username = other.getUsername();
    this.password = other.getPassword();
    this.firstName = other.getFirstName();
    this.lastName = other.getLastName();
    this.role = other.getRole();
  }

  // large constructor
  public User(int id, String username, String password, String firstName, String lastName, String role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

  // setters and getters
  public void setId(int id) {
    this.id = id;
  }
  public int getId() {
    return id;
  }

  public void setUsername(String username) {
    this.username = username;
  }
  public String getUsername() {
    return username;
  }

  public void setPassword(String password) {
    this.password = password;
  }
  public String getPassword() {
    return password;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }
  public String getFirstName() {
    return firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  public String getLastName() {
    return lastName;
  }

  public void setRole(String role) {
    this.role = role;
  }
  public String getRole() {
    return role;
  }
}
