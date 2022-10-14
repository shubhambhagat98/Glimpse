## Project Proposal

### Problem Statement

Convenience has evolved into a new societal standard. We are accustomed to obtaining information with a few clicks. This is especially true about smartphones applications. Audio books, for example, have grown in popularity since they provide consumers with convenience by reading the content of the books aloud. This prompted me to consider how we may combine the convenience of a voice-enabled software to obtain useful information rather than utilizing it for leisure activities. Adding to this, "Can we incorporate some equivalent functionalities to create a **Voice-enabled News App**?"

### Solution

Today's readers demand outstanding material in bite-sized chunks. They don't want to have to navigate a complicated website to find it. People want to access relevant information quickly and easily. When it comes to smartphones, simple actions like a swipe-up help you digest a lot of information. What if we could eliminate this activity entirely and instead provide a method for retrieving information and reading it to the user? What if we could reduce the amount of clicks necessary to find information in the first place?

This prompted me to devise a method for creating an AI-powered voice-activated News App – **Glimpse**. The app would enable users to search for and get news articles based on various categories, search terms, and news sources. It would even read the headlines of the retrieved articles and auto-scroll the screen to display and read subsequent articles. The reader can also issue a voice command to open an article allowing him to browse news without even using the device manually.

### Tools and Technologies

1. **React Native** - React Native is great for mobile apps. It provides a slick, smooth and responsive user interface, while significantly reducing load time. It's also much faster and cheaper to build apps in React Native as opposed to building native ones, without the need to compromise on quality and functionality.
   <br/>

2. **Alan AI** - A comprehensive Voice AI Platform to create and manage intelligent and contextual in-app voice assistants. It offers Support for multi-modal, human-like interactions with your app as well as Contextual awareness, superior voice and language processing.
   Link: https://alan.app/
   <br/>

3. **NewsAPI** - This API allows users to Locate articles and breaking news headlines from news sources and blogs across the web.
   Link: https://newsapi.org/

### Planned Output

1. Landing screen (splash screen) and initial guidelines

   When the user opens the app for first time, there will be a “Get Started” button on the splash screen. Clicking on that button will guide the user through some tutorial examples on how to use the voice- activated search.

<br/>

2. Home Page and fetching news articles
   By default, the home page will show news article for the current day. To fetch new articles, the user can click on the microphone icon and input a voice query as show in the screen-2 above. After that, the voice-assistant will fetch the news article and ask the user if he wants the headlines to be read aloud. If the user responds yes, the voice assistant will start reading the headlines of the articles one by one for a count of 5 articles. After that, the voice assistant will ask the user if he wants the reading to continue or not. If the user responds yes, the voice-assistant will auto scroll the article list and continue reading. When an article’s headline is being read, it will be indicated using a progress bar below that article.

<br/>

3. Opening an article
   Each article fetched is associated with a number that acts an as index. The user can use the AI-powered voice-assistant and issue a command as shown in the figure above to open a particular article. On successful processing of the query the complete details of the article will be displayed in the new screen.

<br/>

4. Error Screen if internet not available
   An error screen will be displayed as in the above figure if there is no internet connection to the user’s smartphone.