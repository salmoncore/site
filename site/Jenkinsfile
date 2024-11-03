pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/salmoncore/site.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                // Clean build folder
                sh 'rm -rf /var/www/site/build/*'
                
                // Copy build files to build folder
                sh 'cp -R out/* /var/www/site/build/'

                // Move the files from build to current (the live site)
                sh 'rm -rf /var/www/site/current/*'
                sh 'cp -R /var/www/site/build/* /var/www/site/current/'
            }
}

    }
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
