Section 1

The application has a user interface tier with Thymeleaf templates for dashboard views and Rest API consumer for all other modules, an application layer with  both MVC and REST controllers, services, and business logic and a data tier with MySQL for structured data  and MongoDB for flexible data. 

Section 2

1. Users can access the web based view such as Admin Dashboard or Doctor Dashboard or interact with modules such appointments, patient dashboard, and patient record
2. The requests of web based view are sent to a Thymeleaf controller and the modules to the Rest Controller
3. The controller delegates the request to the service layer which looks for the correct interpretation of requests using applicable business logic and validations, applicable workflows and separates data access.
4. The repository then assists with taking the right actions in the database such as fetching and persisting data. The MySQL contains structured relational data such as patients, doctor and appointments, and admin records. The Mongo DB contains flexible data such as document-based records
5. The database performs these actions like storing, organising or retrieving the required data permanently
6. For MySQL data (rows) are compared by Hibernate with the matching Entity defined earlier in the Entity java class file and Hibernate/JPA creates a new entity. This is taken to spring interface model object in the controller and returns the name of the html view thymeleaf template.
7. Thymeleaf converts the placeholders to real data using the template and then  this shown in the browser. 
