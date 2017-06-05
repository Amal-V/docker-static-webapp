pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sudo docker build -t web-app .
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
    post {
        success {
            echo 'Succesfully deployed'
        }
    }
}