FROM node

COPY code/ /opt/server
COPY entrypoint.sh /opt/entrypoint.sh
EXPOSE 8080
RUN chmod +x /opt/entrypoint.sh

ENV SERVICE_URL_1 www.google.com
ENV SERVICE_URL_2 www.facebook.com

RUN npm install -g http-server
CMD /opt/entrypoint.sh


#docker run -d --env "SERVICE_URL_1"="www.site1.com" --env "SERVICE_URL_2"="www.site2.com" -p 8080:8080  <image> 