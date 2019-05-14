package WebApplication.web_server_java.models;

public class User {
  private static int idIndex = 0;
  private int id;
  private String username;
  private String password;
  private String firstName;
  private String lastName;
  private String role;

  public User(){
    super();
    this.id = idIndex;
    idIndex++;
  }

  public User(String username, String password, String firstName, String lastName, String role) {
    this.id = idIndex;
    idIndex++;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

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
  public String setRole() {
    return role;
  }
}
