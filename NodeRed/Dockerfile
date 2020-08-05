FROM nodered/node-red:latest

# Additional listening ports.
EXPOSE 3456

# Add startup to bashrc.
RUN echo "nohup npm start --cache /data/.npm -- --userDir /data &" >> /usr/src/node-red/.bashrc

# Override entry point.
ENTRYPOINT ["/bin/bash"]

#ENTRYPOINT ["npm", "start", "--cache", "/data/.npm", "--", "--userDir", "/data"]
