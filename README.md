## Glimpse - An AI-powered voice-assisted news application





<img src="https://user-images.githubusercontent.com/53030762/202796850-30063d39-6323-4544-a19f-0f0a74af8f11.png" align="right" height="420"/>
  
### Project Proposal

Voice-assistive technology has made it effortless for us to fetch information. We enjoy the convenience of obtaining desired information and performing tasks without putting in much effort. So why not integrate this “convenience” in obtaining productive information, say news articles?

**Glimpse** is an AI-powered voice-activated News App. The app would enable users to search for and get news articles based on various categories, search terms, and news sources. It would even read the headlines of the retrieved articles and auto-scroll the screen to display and read subsequent articles. The reader can also issue a voice command to open an article allowing him to browse news without even using the device manually.

### Tools and Technologies

1. **React Native** - React Native is great for mobile apps. It provides a slick, smooth and responsive user interface, while significantly reducing load time. It's also much faster and cheaper to build apps in React Native as opposed to building native ones, without the need to compromise on quality and functionality.
   <br/>

2. **Alan AI** - A Conversational AI platform to build, deploy and manage intelligent and contextual in-app voice assistants. It offers Support for multi-modal, human-like interactions with your app as well as Contextual awareness, superior voice and language processing.
   Link: https://alan.app/
   <br/>

3. **NewsCatcherAPI** - This API allows users to Locate articles and breaking news headlines from news sources and blogs across the web.
   Link: https://newscatcherapi.com/


### Demo

https://user-images.githubusercontent.com/53030762/202789954-28da7ce2-6b30-496a-a2cd-3b39b788aa15.mp4




### Output Screenshots

1. Home Page and fetching news articles

<div align="center">
  <img src="https://user-images.githubusercontent.com/53030762/202797016-cb42e104-5510-4aa9-839e-80a1119ffe26.png" align="center" style="width:90%;"/>
  

</div>

   By default, the home page will show news article for the current day. To fetch new articles, the user can ask Alan voice assistant and input a voice query as show in the screen-2 above. When an article’s headline is being read, it will be indicated using a bottom border below that article and audio gif on article image.

<br/>

2. Search by keyword, source or category


<p align="center">
   <img src="https://user-images.githubusercontent.com/53030762/202797094-bfe4aa73-6199-4b7e-b6ae-9f76fc5e6dc6.png" style="width:90%;" />
</p>

   Users can filter and search articles based on keywords, categories or even news source. Keywords and news source need to be typed on search field. Category can be selected from horizontal flatlist of categories.

<br/>

3. Article Summary Screen and Article Web View

<p align="center">
   <img src="https://user-images.githubusercontent.com/53030762/202797181-187bf989-062d-48d2-b8ce-5afe41c4f59c.png" style="width:90%;" />
</p>



4. Error Screen if news articles not found

<p align="center">
   <img src="https://user-images.githubusercontent.com/53030762/202797230-95650a83-ec23-4b5a-b33a-2e43eb2f3310.png" style="width:90%;" />
</p>




   An error screen will be displayed as in the above figure if there are no news articles for the user's input.


5. Alan Walkthrough

<p align="center">
   <img src="https://user-images.githubusercontent.com/53030762/202797344-566774b7-7d56-4811-a8d6-922c04d47bd7.png" style="width:90%;" />
</p>





<p align="center">
   <img src="https://user-images.githubusercontent.com/53030762/202797387-7cfbf064-a796-4d44-8a1b-1046729f9860.png" style="width:90%;" />
</p>




<p align="center">
   <img src="https://user-images.githubusercontent.com/53030762/202797416-7751d2b2-3bf0-47c9-a34e-b135a393e038.png" style="width:90%;" />
</p>


# Environment Setup
- Install Node and React
- Follow the [Installation Instructions](https://reactnative.dev/docs/environment-setup) to install React Native and React Native CLI
- Update xcode if running on Mac
- Install Android studio and Android emulator if building for android device

# Alan Studio Setup
- Signup and create a project on [Alan AI](https://alan.app/) platform
- Import the voice script from the folder "alan-voice-script" in this repo into your newly created project
- Add your Alan Key in the voice script on line number 5
- Test the voice-script in debug console on Alan Studio

# How to run

- Clone this repo
- Create account on [NewsCatcher API](https://newscatcherapi.com/)
- Create a .env file in the app's roor directory with following keys - ALAN_KEY and NEWS_API_KEY
- Add your actual Alan Key and NewsCatcher API key to the .env file
- Run `npm i` to install node dependencies.
- If building project for IOS
  - Run `cd ios` and then  `pod install` to install pod dependencies. Run `cd ..` to go back to root directory of the app
  - Follow the instructions [here](https://github.com/aiba/react-native-m1) to prevent/debug build 
- Run the app from terminal with `npm run ios` or `npm run android`
