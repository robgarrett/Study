# Base Image (SPfx doesn't support 11.x and 12.0)
FROM node:10.20.0

# Expose ports
EXPOSE 5432 4321 35729

# Create a persisted volume.
VOLUME /usr/app/spfx
WORKDIR /usr/app/spfx

# Install dependencies.
RUN apt-get update -y && apt-get -y upgrade

# Pull down tools.
RUN npm i -g -s --no-optional npm && \
    npm i -g -s --no-optional gulp yo @microsoft/generator-sharepoint && \
    npm cache verify

# Create a user and set up volume owner.
RUN useradd --create-home --shell /bin/bash spfx && \
    usermod -aG sudo spfx && \
    chown -R spfx:spfx /usr/app/spfx

# Add change directory to the bash startup.
RUN echo "cd /usr/app/spfx" >> /home/spfx/.bashrc

# Run as user.
USER spfx

# Execute bash
ENTRYPOINT ["/bin/bash"]
