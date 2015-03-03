# Docker version 1.1.2, build d84a070
# https://gist.github.com/visualjeff/ea33feb4f77bdfa60eb3
FROM    ubuntu:14.04
 
RUN apt-get update && apt-get install -y \
    git \
    software-properties-common \
    python-software-properties \
    make\
    gcc \
    g++ \
    curl \
    wget \
    tar \
    openssh-server \
    nano
 
RUN mkdir /var/run/sshd
RUN echo 'root:tomster'|chpasswd
 
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update && apt-get install -y \
	nodejs
 
# Create a nonroot user, and switch to it
RUN /usr/sbin/useradd --create-home --home-dir /usr/local/nonroot --shell /bin/bash nonroot
RUN /usr/sbin/adduser nonroot sudo
RUN echo 'nonroot:tomster'|chpasswd
RUN chown -R nonroot /usr/local/
RUN chown -R nonroot /usr/lib/
RUN chown -R nonroot /usr/bin/
 
RUN /bin/su nonroot
 
RUN npm install -g ember-cli
RUN npm install -g bower
RUN npm install -g phantomjs
RUN npm install -g forever
 
RUN exit
EXPOSE 22
EXPOSE 4200
