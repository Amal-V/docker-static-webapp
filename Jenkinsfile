pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'sudo docker build -t web-app .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'sudo docker run -d -p 9999:8080 web-app'
            }
        }
    }
    post {
        success {
            echo 'Succesfully deployed'
        }
    }
}