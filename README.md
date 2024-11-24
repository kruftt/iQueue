# iqueue

[IQueue homepage](https://hci.stanford.edu/courses/cs147/2017/au/projects/education/iqueue/)

IQueue boilerplate was provided by react native seed.
Uses CRNA allows easy cross-platform compilation and integration with Expo.  
Uses redux for state management. 
Uses "native base" component library with native android / ios components.  
  
Does not include firebase or AWS integration, using an actual webserver will require some additional work.  


## Tech stack Links  
https://reactnativeseed.com  
https://facebook.github.io/react-native/docs/getting-started.html  
https://github.com/react-community/create-react-native-app  
https://yarnpkg.com/en/docs/usage  
https://docs.expo.io/versions/latest/index.html  
https://redux.js.org  
https://docs.nativebase.io/#Introduction  
  
https://shift.infinite.red/a-tour-of-react-native-part-1-the-visuals-7822f48151f6  
https://shift.infinite.red/a-tour-of-react-native-part-2-redux-friends-4fed022aaa1e  
  
  
## How to update

pull update from git:
```
cd iqueue
rm -rf node_modules/
npm install
yarn
```

run project:
Startup Expo XDE  
import project folder
click 'restart' to refresh the package cache
load the app using emulator or phone

View live state debugging information:
http://remotedev.io/local/
