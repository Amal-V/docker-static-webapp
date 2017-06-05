pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                docker build -t web-app .
            }
        }
        stage('Deploy') {
            steps {
                docker run -d -p 9999:8080 webapp
            }
        }
    }
    post {
        success {
            echo 'Succesfully deployed'
        }
    }
}
