pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
        IMAGE_NAME = "sursin01/frontend-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${IMAGE_NAME}:latest

                        docker logout
                    '''
                }
            }
        }
        stage('Deploy') {

    steps {

        sh '''

            kubectl set image deployment/frontend \

            frontend=sursin01/frontend-app:${BUILD_NUMBER} \

            -n project

            kubectl rollout status deployment/frontend -n project

        '''

    }

}
    }

    post {
        success {
            echo "Docker image pushed successfully."
        }

        failure {
            echo "Pipeline failed."
        }
    }
}