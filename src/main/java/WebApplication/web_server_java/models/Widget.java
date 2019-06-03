package WebApplication.web_server_java.models;

public class Widget {

  private String name;
  private int id;
  private WidgetType widgetType;
  private int order;
  private String text;
  private String extUrl;
  private int size;
  private int width;
  private int height;
  private String cssClass;
  private String style;
  private String value;
  private DataType dataType;

  public Widget() {
    super();
  }

  public Widget(String name, int id, WidgetType widgetType, int order, String text, String extUrl, int size, int width,
      int height, String cssClass, String style, String value, DataType dataType) {
    this.name = name;
    this.id = id;
    this.widgetType = widgetType;
    this.order = order;
    this.text = text;
    this.extUrl = extUrl;
    this.size = size;
    this.width = width;
    this.height = height;
    this.cssClass = cssClass;
    this.style = style;
    this.value = value;
    this.dataType = dataType;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getId() {
    return id;
  }

  public void setId(int wid) {
    this.id = wid;
  }

  public WidgetType getWidgetType() {
    return widgetType;
  }

  public void setWidgetType(WidgetType widgetType) {
    this.widgetType = widgetType;
  }

  public int getOrder() {
    return order;
  }

  public void setOrder(int order) {
    this.order = order;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getExtUrl() {
    return extUrl;
  }

  public void setExtUrl(String extUrl) {
    this.extUrl = extUrl;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }

  public int getWidth() {
    return width;
  }

  public void setWidth(int width) {
    this.width = width;
  }

  public int getHeight() {
    return height;
  }

  public void setHeight(int height) {
    this.height = height;
  }

  public String getCssClass() {
    return cssClass;
  }

  public void setCssClass(String cssClass) {
    this.cssClass = cssClass;
  }

  public String getStyle() {
    return style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public DataType getDataType() {
    return dataType;
  }

  public void setDataType(DataType dataType) {
    this.dataType = dataType;
  }
}
