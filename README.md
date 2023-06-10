# Ask aws for its list of services

This is my attempt at automatically garnering the list of services with a description of the services
let me know if this helps you in any way - of if you think there's place for improvement.

Thanks

Izik

## If you want to run this code, follow these steps
  
1. Install AWS CLI from <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>  
   Please remember that you will need to perform credentialing setup as well so you can use the cli.  
  
2. Test the cli to be sure that it works. Specifically try this command:  
   aws amp help  
   If it works - you are good to go.  
  
3. clone the repo to your computer:  
   git clone <https://github.com/IzikM/AwsHelp.git>  
   (remember to remove the "<" and the ">" around the link)  
  
4. Run "npm i"  
  
5. Run "npm start"  
   Be patient - it takes a while to perform more than 1000 invocations of the cli.  
  
6. Enjoy - the list is in the file theCommands.json
