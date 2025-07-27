FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /workspace

RUN npm init -y && \
    npm install @kubernetes/client-node

CMD [ "bash" ]
