package WebApplication.web_server_java.controllers;

import WebApplication.web_server_java.models.DataType;
import WebApplication.web_server_java.models.Widget;
import WebApplication.web_server_java.models.WidgetType;
import java.util.*;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.web.bind.annotation.CrossOrigin;
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
public class WidgetController implements ApplicationListener<ApplicationReadyEvent> {

  private ArrayList<Widget> registeredWidgets = new ArrayList<Widget>();
  // auto incrementing wid
  private static int idIndex = 0;

  // auto initialization adds two widgets when service starts. can be called manually to add two more default widgets
  @CrossOrigin(origins = "*")
  @GetMapping("/api/widgets/initialize")
  public String initialize() {
    Widget a = new Widget("Widget 1", idIndex, WidgetType.HEADING, 2, "text", "extUrl", 2, 110, 120, "cssClass",
        "style", "value", DataType.STRING);
    idIndex++;
    Widget b = new Widget("Widget 2", idIndex, WidgetType.HTML, 1, "text", "extUrl", 200, 210, 220, "cssClass",
        "style", "-99999", DataType.INTEGER);
    idIndex++;
    registeredWidgets.add(a);
    registeredWidgets.add(b);

    return "intialization successful";
  }

  @Override
  public void onApplicationEvent(final ApplicationReadyEvent event) {
    initialize();
    return;
  }

  // add given widget. use constructor that takes in wid. return all widgets
  @CrossOrigin(origins = "*")
  @PostMapping("/api/widgets")
  public ArrayList<Widget> addUser(@RequestBody Widget widget) {
    widget.setId(idIndex);
    registeredWidgets.add(widget);
    idIndex++;
    return registeredWidgets;
  }

  // return all widgets
  @CrossOrigin(origins = "*")
  @GetMapping("/api/widgets")
  public ArrayList<Widget> findAllWidgets() {
    Collections.sort(registeredWidgets, new Comparator<Widget>() {
      @Override
      public int compare(Widget o1, Widget o2) {
        return o1.getOrder() - o2.getOrder();
      }
    });
    return registeredWidgets;
  }

  // find widget with given id. return widget
  @CrossOrigin(origins = "*")
  @GetMapping("/api/widgets/{id}")
  public Widget findAllWidgetById(@PathVariable("id") int id) {
    for(Widget widget : registeredWidgets){
      if(widget.getId() == id){
        return widget;
      }
    }
    return null;
  }

  // update widget with given id. return widget
  @CrossOrigin(origins = "*")
  @PutMapping("/api/widgets/{id}")
  public ArrayList<Widget> updateWidgetById(@PathVariable("id") int id, @RequestBody Widget other) {
    for(int i = 0; i < registeredWidgets.size(); i++){
      if(registeredWidgets.get(i).getId() == id){
        Widget w = registeredWidgets.get(i);
        w.setName(other.getName());
        w.setWidgetType(other.getWidgetType());
        w.setOrder(other.getOrder());
        w.setText(other.getText());
        w.setExtUrl(other.getExtUrl());
        w.setSize(other.getSize());
        w.setWidth(other.getWidth());
        w.setHeight(other.getHeight());
        w.setCssClass(other.getCssClass());
        w.setStyle(other.getStyle());
        w.setValue(other.getValue());
        w.setDataType(other.getDataType());
        return findAllWidgets();
      }
    }
    return null;
  }

  // delete widget with given id
  @CrossOrigin(origins = "*")
  @DeleteMapping("/api/widgets/{id}")
  public ArrayList<Widget> deleteWidget(@PathVariable("id") int id) {
    for(int i = 0; i < registeredWidgets.size(); i++){
      if(registeredWidgets.get(i).getId() == id){
        registeredWidgets.remove(i);
      }
    }

    return findAllWidgets();
  }
}
