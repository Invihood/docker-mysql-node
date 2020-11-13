Команды для запуска контейнеров с сетью и вручную прописанным IP

docker volume create mysql_volume

docker network create --driver=bridge --subnet=172.28.0.0/16 --ip-range=172.28.5.0/24 --gateway=172.28.5.254 my-net

docker run --rm -d --name mysql-test -v "$PWD/db":/docker-entrypoint-initdb.d -v mysql_volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=TEST_DB mysql:5.7

docker network connect --ip 172.28.5.5 my-net mysql-test

docker build --pull --rm -f "Dockerfile" -t test-server:latest .

docker run --rm --net my-net --volume $(pwd)/server:/usr/src/app -p 8080:8080/tcp test-server



Команды для запуска контейнеров с сетью

docker volume create mysql_volume

docker network create my-net

docker run --rm --net my-net -d --name mysql-test -v "$PWD/db":/docker-entrypoint-initdb.d -v mysql_volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=TEST_DB mysql:5.7

docker build --pull --rm -t test-server:latest .

docker run --rm --net my-net --volume $(pwd)/server:/usr/src/app -e MYSQL_ROOT_PASSWORD=password -e MYSQL_USER=root -e MYSQL_HOST=mysql-test -e MYSQL_DATABASE=TEST_DB -p 8080:8080/tcp test-server
