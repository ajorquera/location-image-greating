FROM public.ecr.aws/lambda/nodejs:14


RUN yum -y update && yum install -y gcc gcc-c++ glibc-devel make \
                                    cairo-devel libjpeg-turbo-devel pango-devel giflib-devel zlib-devel librsvg2-devel

RUN npm install -g yarn
ENV LD_PRELOAD=/var/task/node_modules/canvas/build/Release/libz.so.1

# Copy function code
COPY ./ /usr/app/
WORKDIR /usr/app/

RUN yarn && yarn build
RUN mv node_modules dist/node_modules
RUN mv /usr/app/dist/* ${LAMBDA_TASK_ROOT}

WORKDIR ${LAMBDA_TASK_ROOT}

ENV IP_REGISTRY_DOMAIN ${IP_REGISTRY_DOMAIN}
ENV IP_REGISTRY_API_KEY ${IP_REGISTRY_API_KEY}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.handler" ]