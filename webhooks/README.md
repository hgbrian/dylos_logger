gcloud beta pubsub topics publish dylosparticlecounter 2000,50

gcloud config set account example@gmail.com && \
gcloud config set project example_project_id && \
gcloud beta functions deploy log_dylos --trigger-topic dylosparticlecounter --stage-bucket fn-dylosparticlecounter
