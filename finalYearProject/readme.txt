To run docker:
sudo docker run -d --name mysqldb -e MYSQL_ROOT_PASSWORD=password mysql:latest
sudo docker run -d --name drupal-cfl --link mysqldb -p 8080:80 -e MYSQL_USER:root -e MYSQL_PASSWORD:password drupal:8-apache

Does not require server to run. Open home.html to begin