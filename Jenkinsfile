pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sudo docker build -t web-app .
            }
        }
        stage('Deploy') {
            steps {
                sudo docker run -d -p 9999:8080 webapp
            }
        }
    }
    post {
        success {
            sudo echo 'Succesfully deployed'
        }
    }
}
