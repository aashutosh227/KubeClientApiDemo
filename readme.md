>>>Description: This project is to setup a linux environment using kubernetes that is capable of running Node js application in minikube cluster.
This application will be able to communicate with kubernetes client API to perform CRUD operations over kube resources.

>>>Steps:
1. Enable Minikube Docker Daemon:
    Windows:  @FOR /f "tokens=*" %i IN ('minikube -p minikube docker-env --shell cmd') DO @%i
    Linux: eval $(minikube docker-env)

2. Build the docker image:
    docker build -t nodejs-shell:1.0 .

3. Copy the local JS file to Linux pod created inside minikube
kubectl cp ./kube.js nodejs-shell:/workspace/kube.js

4. Enter into bash and run node app
kubectl exec -it nodejs-shell -- bash
node kube.js